from tempfile import TemporaryFile
from django.shortcuts import render
from django.apps import apps 
from django.core import serializers
from django.db import transaction
from rest_framework import generics, status
from .serializers import (
    DepartmentSerializer,
    POSTDepartmentSerializer,

    CustomerSerializer,
    POSTCustomerSerializer,

    CouponSerializer,
    POSTCouponSerializer,

    ItemSerializer,
    POSTItemSerializer,

    ItemCategorySerializer,
    POSTItemCategorySerializer,

    TransactionSerializer,
    POSTTransactionSerializer,

    EmployeeSerializer,
    POSTEmployeeSerializer,

    StoreSerializer,
    POSTStoreSerializer

)
from .models import Department, Customer,Coupon, ItemCategory, Item, Transaction, Store, Employee
from rest_framework.views import APIView
from rest_framework.response import Response


#
# Begin CUSTOMER Views
#


class CustomerView(generics.CreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

# Searches Customers using Prepared statements
class GETSEARCHCustomerView(APIView):
    serializer_class = CustomerSerializer
    lookup_url_kwarg = "first_name"

    def get(self, request, format=None):
        cust_fname = request.GET.get(self.lookup_url_kwarg)
        cust_lname = cust_fname
        print(cust_fname)
        if cust_fname.find(' ') != -1:
            cust_lname = cust_fname[cust_fname.index(' ') + 1:]
            cust_fname = cust_fname[0:cust_fname.index(' ')]


        query = F"SELECT * FROM api_customer WHERE first_name LIKE '%{cust_fname}%' OR last_name LIKE '%{cust_lname}%'"
        data = serializers.serialize('json', Customer.objects.raw(query))
        if (data):
            return Response(data, status=status.HTTP_200_OK)
    
        return Response(
                    {"Bad Request": "Invalid Customer ID."},
                    status=status.HTTP_404_NOT_FOUND,
                )

class GETCustomerView(APIView):
    serializer_class = CustomerSerializer
    lookup_url_kwarg = "customer_id"

    def get(self, request, format=None):
        cust_id = request.GET.get(self.lookup_url_kwarg)
        if cust_id != None:
            cust = Customer.objects.filter(customer_id=cust_id)
            if len(cust) > 0:
                data = CustomerSerializer(cust[0]).data
                return Response(data, status=status.HTTP_200_OK)
            return Response(
                {"Bad Request": "Invalid Customer ID."},
                status=status.HTTP_404_NOT_FOUND,
            )
        else:
            cust = CustomerSerializer(Customer.objects.all(), many=True).data
            return Response(cust, status=status.HTTP_200_OK)


class POSTCustomerView(APIView):
    serializer_class = POSTCustomerSerializer

    def post(self, request, format=None):

        cust_id = request.data["customer_id"]
        cust = None
        try:
            cust = Customer.objects.get(customer_id=cust_id)
        except:
            cust = None

        serializer = self.serializer_class(cust, data=request.data)
        if serializer.is_valid():
            with transaction.atomic():
                new_customer_id = request.data["customer_id"]
                new_first_name = request.data["first_name"]
                new_last_name = request.data["last_name"]
                new_email_address = request.data["email_address"]
                new_address = request.data["address"]
                new_phone = request.data["phone"]
                new_member = request.data["member"]

                queryset = Customer.objects.filter(customer_id=new_customer_id)

                if queryset.exists():
                    cust = queryset[0]
                    cust.customer_id = new_customer_id
                    cust.first_name = new_first_name
                    cust.last_name = new_last_name
                    cust.email_address = new_email_address
                    cust.address = new_address
                    cust.phone = new_phone
                    cust.member = new_member
                    cust.save(
                        update_fields=[
                            "customer_id",
                            "first_name",
                            "last_name",
                            "email_address",
                            "address",
                            "phone",
                            "member",
                        ]
                    )
                else:
                    # create a new customer here
                    cust = Customer(
                        customer_id=new_customer_id,
                        first_name=new_first_name,
                        last_name=new_last_name,
                        email_address=new_email_address,
                        address=new_address,
                        phone=new_phone,
                        member=new_member,
                    )
                    cust.save()

                return Response(
                    POSTCustomerSerializer(cust).data, status=status.HTTP_201_CREATED
                )
                

            return Response(
                {"Bad Request": "Invalid data..."}, status=status.HTTP_400_BAD_REQUEST
            )


#
# End CUSTOMER Views
#

#
# Begin DEPARTMENT Views
#


class DepartmentView(generics.CreateAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer


class GETDepartmentView(APIView):
    serializer_class = DepartmentSerializer
    lookup_url_kwarg = "department_id"

    def get(self, request, format=None):
        dept_id = request.GET.get(self.lookup_url_kwarg)
        if dept_id != None:
            dept = Department.objects.filter(department_id=dept_id)
            if len(dept) > 0:
                data = DepartmentSerializer(dept[0]).data
                return Response(data, status=status.HTTP_200_OK)
            return Response(
                {"Bad Request": "Invalid Department ID."},
                status=status.HTTP_404_NOT_FOUND,
            )
        else:
            dept = DepartmentSerializer(Department.objects.all(), many=True).data
            return Response(dept, status=status.HTTP_200_OK)


class POSTDepartmentView(APIView):
    serializer_class = POSTDepartmentSerializer

    def post(self, request, format=None):

        dept_id = request.data["department_id"]
        dept = Department.objects.get(department_id=dept_id)

        serializer = self.serializer_class(dept, data=request.data)
        if serializer.is_valid():
            new_department_id = request.data["department_id"]
            new_department_name = request.data["department_name"]

            queryset = Department.objects.filter(department_id=new_department_id)

            if queryset.exists():
                dept = queryset[0]
                dept.department_name = new_department_name
                dept.department_id = new_department_id
                dept.save(update_fields=["department_name", "department_id"])
            else:
                # create a new department here
                dept = Department(
                    department_id=new_department_id, department_name=new_department_name
                )
                dept.save()

            return Response(
                POSTDepartmentSerializer(dept).data, status=status.HTTP_201_CREATED
            )

        return Response(
            {"Bad Request": "Invalid data..."}, status=status.HTTP_400_BAD_REQUEST
        )


class DELETEDepartmentView(APIView):
    serializer_class = DepartmentSerializer
    lookup_url_kwarg = "department_id"

    def delete(self, request, format=None):
        dept_id = request.data["department_id"]
        dept = Department.objects.get(department_id=dept_id)

        if dept_id != None:
            if Department.objects.filter(department_id=dept_id).exists():
                dept.delete()
                return Response(
                    {"Department deleted"}, status=status.HTTP_204_NO_CONTENT
                )
            return Response(
                {"Bad Request": "Invalid Department ID."},
                status=status.HTTP_404_NOT_FOUND,
            )
        else:
            return Response(
                {"Bad Request": "Invalid Department ID."},
                status=status.HTTP_404_NOT_FOUND,
            )
    
#
# End DEPARTMENT Views
#

#
# Begin COUPON Views
#

class CouponView(generics.CreateAPIView):
    queryset = Coupon.objects.all()
    serializer_class = CouponSerializer

class GETCouponView(APIView):
    serializer_class = CouponSerializer
    lookup_url_kwarg = "coupon_id"


    def get(self,request,format = None):
        coupon_id = request.GET.get(self.lookup_url_kwarg)
        if coupon_id != None:
            coupon = Coupon.objects.filter(coupon_id=coupon_id)
            if len(coupon) > 0:
                data = CouponSerializer(coupon[0]).data
                return Response(data,status=status.HTTP_200_OK)
            return Response(
                {"Bad Request": "Invalid Coupon ID."},
                status=status.HTTP_404_NOT_FOUND,
            )
        else:
            dept = CouponSerializer(Coupon.objects.all(), many=True).data
            return Response(dept, status=status.HTTP_200_OK)

class POSTCouponView(APIView):
    serialzer_class = POSTCouponSerializer

    def post(self, request, format=None):

        coupon_id = request.data["coupon_id"]
        coupon = None
        try:
            coupon = Coupon.objects.get(coupon_id=coupon_id)
        except:
            coupon = None

        serializer = self.serialzer_class(coupon, data=request.data)
        if serializer.is_valid():
            new_coupon_id = request.data["coupon_id"]
            new_discount_rate = request.data["discount_rate"]
            new_valid_from = request.data["valid_from"]
            new_valid_end = request.data["valid_end"]
            queryset = Coupon.objects.filter(coupon_id=new_coupon_id)

            if queryset.exists():
                coupon = queryset[0]
                coupon.discount_rate = new_discount_rate
                coupon.valid_from = new_valid_from
                coupon.valid_end = new_valid_end
                coupon.coupon_id = new_coupon_id
                coupon.save(
                    update_fields=[
                        "discount_rate",
                        "valid_from",
                        "valid_end",
                        "coupon_id",
                    ]
                )
            else:
                # create a new coupon here
                coupon = Coupon(
                    coupon_id=new_coupon_id,
                    discount_rate=new_discount_rate,
                    valid_from=new_valid_from,
                    valid_end=new_valid_end,
                )
                coupon.save()
            
            return Response(
                CouponSerializer(coupon).data, status=status.HTTP_201_CREATED
            )

        return Response(
            {"Bad Request": "Invalid data..."}, status=status.HTTP_400_BAD_REQUEST
        )

#
# End COUPON Views
#

#
# Start ITEM Views
#

class ItemView(generics.CreateAPIView):
    queryset = Item.objects.order_by('item_id')
    serializer_class = ItemSerializer

class GETItemView(APIView):
    serializer_class = ItemSerializer
    lookup_url_kwarg = "item_id"


    def get(self,request,format = None):
        item_id = request.GET.get(self.lookup_url_kwarg)
        if item_id != None:
            item = Item.objects.filter(item_id=item_id)
            if len(item) > 0:
                data = ItemSerializer(item[0]).data
                return Response(data,status=status.HTTP_200_OK)
            return Response(
                {"Bad Request": "Invalid Item ID."},
                status=status.HTTP_404_NOT_FOUND,
            )
        else:
            dept = ItemSerializer(Item.objects.all(), many=True).data
            return Response(dept, status=status.HTTP_200_OK)

class POSTItemView(APIView):
    serialzer_class = POSTItemSerializer

    def post(self, request, format=None):

        item_id = request.data["item_id"]
        try:
            item = Item.objects.get(item_id=item_id)
        except:
            item = None

        if item != None:
            queryset = Item.objects.filter(item_id=item_id)
            item = queryset[0]

            item.quantity = request.data['quantity']

            item.save(
                update_fields=[
                    "quantity",
                ]
                )
            
            return Response(
                ItemSerializer(item).data, status=status.HTTP_201_CREATED
            )



        serializer = self.serialzer_class(item, data=request.data)
        if serializer.is_valid():
            new_item_id = request.data["item_id"]
            new_item_name = request.data["name"]
            new_item_price = request.data["price"]
            new_item_quantity = request.data["quantity"]
            new_item_category_id = request.data["category_id"]
            new_item_store_id = request.data["store_id"]

            queryset = Item.objects.filter(item_id=new_item_id)
            if queryset.exists():
                item = queryset[0]

                item.quantity = new_item_quantity

                item.save(
                    update_fields=[
                        "quantity",
                    ]
                )
            else:
                # create a new item here
                item = Item(
                    item_id=new_item_id,
                    name=new_item_name,
                    price=new_item_price,
                    quantity=new_item_quantity,
                    category_id=new_item_category_id,
                    store_id=new_item_store_id,
                )
                item.save()
            
            return Response(
                ItemSerializer(item).data, status=status.HTTP_201_CREATED
            )
        
        return Response(
            {"Bad Request": "Invalid data..."}, status=status.HTTP_400_BAD_REQUEST
        )





#
# Begin ITEMCATEGORY Views
#

class ItemCategoryView(generics.CreateAPIView):
    queryset = ItemCategory.objects.all()
    serializer_class = ItemCategorySerializer


class GETItemCategoryView(APIView):
    serializer_class = ItemCategorySerializer
    lookup_url_kwarg = "category_id"

    def get(self,request,format = None):
        category_id = request.GET.get(self.lookup_url_kwarg)
        if category_id != None:
            itemCategory = ItemCategory.objects.filter(category_id=category_id)
            if len(itemCategory) > 0:
                data = ItemCategorySerializer(itemCategory[0]).data
                return Response(data,status=status.HTTP_200_OK)
            return Response(
                {"Bad Request": "Invalid Category ID."},
                status=status.HTTP_404_NOT_FOUND,
            )
        else:
            categ = ItemCategorySerializer(ItemCategory.objects.all(), many=True).data
            return Response(categ, status=status.HTTP_200_OK)

class POSTItemCategoryView(APIView):
    serializer_class = POSTItemCategorySerializer

    def post(self, request, format=None):

        categ_id = request.data["category_id"]
        categ = ItemCategory.objects.get(category_id=categ_id)

        serializer = self.serializer_class(categ, data=request.data)
        if serializer.is_valid():
            new_category_id = request.data["category_id"]
            new_category_name = request.data["category_name"]

            queryset = ItemCategory.objects.filter(category_id=new_category_id)

            if queryset.exists():
                categ = queryset[0]
                categ.category_name = new_category_name
                categ.category_id = new_category_id
                categ.save(update_fields=["category_name", "category_id"])
            else:
                # create a new item category here
                categ = ItemCategory(
                    category_id=new_category_id, category_name=new_category_name
                )
                categ.save()

            return Response(
                POSTItemCategorySerializer(categ).data, status=status.HTTP_201_CREATED
            )

        return Response(
            {"Bad Request": "Invalid data..."}, status=status.HTTP_400_BAD_REQUEST
        )

class DELETEItemCategoryView(APIView):
    serializer_class = ItemCategorySerializer
    lookup_url_kwarg = "category_id"

    def delete(self, request, format=None):
        categ_id = request.data["category_id"]
        categ = ItemCategory.objects.get(category_id=categ_id)

        if categ_id != None:
            if ItemCategory.objects.filter(category_id=categ_id).exists():
                categ.delete()
                return Response(
                    {"Item Category deleted"}, status=status.HTTP_204_NO_CONTENT
                )
            return Response(
                {"Bad Request": "Invalid Item Category ID."},
                status=status.HTTP_404_NOT_FOUND,
            )
        else:
            return Response(
                {"Bad Request": "Invalid Item Category ID."},
                status=status.HTTP_404_NOT_FOUND,
            )

#
# Begin TRANSACTION Views
#

class TransactionView(generics.CreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

class PATCHTransactionView(APIView):
    serializer_class = TransactionSerializer
    lookup_url_kwarg = "transaction_id"

    def patch(self,request,format = None):
        transaction_id = request.GET.get(self.lookup_url_kwarg)
        if transaction_id != None:
            transaction = Transaction.objects.filter(transaction_id=transaction_id)
            if len(transaction) > 0:
                data = TransactionSerializer(transaction[0]).data
                return Response(data, status=status.HTTP_200_OK)
            return Response(
                {"Bad Request": "Invalid Transaction ID."},
                status=status.HTTP_404_NOT_FOUND,
            )
        else:
            transaction = TransactionSerializer(Transaction.objects.all(), many=True).data
            sortBy = request.data["sortBy"]
            if (sortBy == "Transaction Date"):
                transaction.sort(key=lambda x:x["transaction_date"])
            elif (sortBy == "Employee ID"):
                transaction.sort(key=lambda x:x["employee_id"] or float("inf"))
            elif (sortBy == "No. of Item"):
                transaction.sort(key=lambda x:len(x["items_id"].split(",")) or 0)
            elif (sortBy == "Coupon ID"):
                transaction.sort(key=lambda x:x["coupon_id"] or "9"*20)
            elif (sortBy == "Transaction ID"):
                transaction.sort(key=lambda x:x["transaction_id"] or float("inf"))
            limit = int(request.data["restriction"])
            return Response(transaction[:limit], status=status.HTTP_200_OK)

class POSTTransactionView(APIView):
    serializer_class = POSTTransactionSerializer

    def post(self,request,format=None):
        transaction_id = request.data["transaction_id"]
        transaction = None
        try:
            transaction = Transaction.objects.get(transaction_id=transaction_id)
        except:
            transaction = None
        
        serializer = self.serializer_class(transaction,data=request.data)
        if serializer.is_valid():
            new_transaction_id = request.data["transaction_id"]
            new_transaction_date = request.data["transaction_date"]
            new_total = request.data["total"]
            new_customer_id = request.data["customer_id"]
            new_coupon_id = request.data["coupon_id"]
            new_store_id = request.data["store_id"]
            new_employee_id = request.data["employee_id"]
            new_items_id = request.data["items_id"]

            existing_item_ids = list(map(lambda x:x["item_id"],ItemSerializer(Item.objects.all(),many=True).data))
            for item in new_items_id.split(", "):
                if item not in existing_item_ids:
                    return Response({"message":"Invalid"},status=status.HTTP_404_NOT_FOUND)
                else:
                    item_entry = Item.objects.get(item_id=item)
                    item_entry.quantity -= 1
                    item_entry.save(update_fields=["quantity"])
                
            if transaction:
                transaction.transaction_id = new_transaction_id
                transaction.transaction_date = new_transaction_date
                transaction.total = new_total
                transaction.customer_id = new_customer_id
                transaction.coupon_id = new_coupon_id
                transaction.store_id = new_store_id
                transaction.employee_id = new_employee_id
                transaction.items_id = new_items_id
                transaction.save(
                    update_fields=[
                        "transaction_id","transaction_date","total",
                        "customer_id","coupon_id","store_id","employee_id",
                        "items_id"
                        ]
                )
            else:
                transaction = Transaction(
                    transaction_id = new_transaction_id,
                    transaction_date = new_transaction_date,
                    total = new_total,
                    customer_id = new_customer_id,
                    coupon_id = new_coupon_id,
                    store_id = new_store_id,
                    employee_id = new_employee_id,
                    items_id = new_items_id
                )
                transaction.save()
                
            return Response(
                POSTTransactionSerializer(transaction).data,status=status.HTTP_201_CREATED
            )
        return Response(
            {"Bad Request": "Invalid data..."}, status=status.HTTP_400_BAD_REQUEST
        )

class CALCTransactionView(APIView):
    serializer_class = TransactionSerializer

    def get(self,request,format=None):
        queryset = Transaction.objects.all()
        amount = 0
        for query in queryset:
            entry = TransactionSerializer(query).data
            if(entry["coupon_id"]):
                coupon = None
                try:
                    coupon = Coupon.objects.get(coupon_id=entry["coupon_id"])
                    discount_rate = float((CouponSerializer(coupon).data)["discount_rate"])
                    amount += (100-discount_rate)/100*float(entry["total"])
                except:
                    continue
            else:
                amount += float(entry["total"])
            
        amount = round(amount,2)
        return Response({"amount":amount},status=status.HTTP_200_OK)

#
# End TRANSACTION Views
#

#
# Begin STORE Views
#

class StoreView(generics.CreateAPIView):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer


class GETStoreView(APIView):
    serializer_class = StoreSerializer
    lookup_url_kwarg = "store_id"

    def get(self, request, format=None):
        stor_id = request.GET.get(self.lookup_url_kwarg)
        if stor_id != None:
            stor = Store.objects.filter(store_id=stor_id)
            if len(stor) > 0:
                data = StoreSerializer(stor[0]).data
                return Response(data, status=status.HTTP_200_OK)
            return Response(
                {"Bad Request": "Invalid Store ID."},
                status=status.HTTP_404_NOT_FOUND,
            )
        else:
            stor = StoreSerializer(Store.objects.all(), many=True).data
            return Response(stor, status=status.HTTP_200_OK)

# Searches Store using Prepared statements
class GETSEARCHStoreView(APIView):
    serializer_class = StoreSerializer
    lookup_url_kwarg = "store_address"

    def get(self, request, format=None):
        address = request.GET.get(self.lookup_url_kwarg)

        query = F"SELECT * FROM api_store WHERE store_address LIKE '%{address}%'"
        data = serializers.serialize('json', Store.objects.raw(query))
        if (data):
            return Response(data, status=status.HTTP_200_OK)
    
        return Response(
                    {"Bad Request": "Invalid Query."},
                    status=status.HTTP_404_NOT_FOUND,
                )


class POSTStoreView(APIView):
    serializer_class = POSTStoreSerializer

    def post(self, request, format=None):

        stor_id = request.data["store_id"]
        stor = Store.objects.get(store_id=stor_id)

        serializer = self.serializer_class(stor, data=request.data)
        if serializer.is_valid():
            new_store_id = request.data["store_id"]
            new_store_addr = request.data["store_address"]
            new_store_city = request.data["store_city"]
            new_store_country = request.data["store_country"]

            queryset = Store.objects.filter(store_id=new_store_id)

            if queryset.exists():
                stor = queryset[0]
                stor.store_address = new_store_addr
                stor.store_id = new_store_id
                stor.store_city = new_store_city
                stor.store_country = new_store_country

                stor.save(update_fields=["store_address", "store_id", "store_city", "store_country"])
            else:
                # create a new store here
                stor = Store(
                    store_id=new_store_id, 
                    store_address=new_store_addr,
                    store_city=new_store_city,
                    store_contry=new_store_country,
                )
                stor.save()

            return Response(
                POSTStoreSerializer(stor).data, status=status.HTTP_201_CREATED
            )

        return Response(
            {"Bad Request": "Invalid data..."}, status=status.HTTP_400_BAD_REQUEST
        )


class DELETEStoreView(APIView):
    serializer_class = StoreSerializer
    lookup_url_kwarg = "store_id"

    def delete(self, request, format=None):
        stor_id = request.data["store_id"]
        stor = Store.objects.get(store_id=stor_id)

        if stor_id != None:
            if Store.objects.filter(store_id=stor_id).exists():
                stor.delete()
                return Response(
                    {"Store deleted"}, status=status.HTTP_204_NO_CONTENT
                )
            return Response(
                {"Bad Request": "Invalid Store ID."},
                status=status.HTTP_404_NOT_FOUND,
            )
        else:
            return Response(
                {"Bad Request": "Invalid Store ID."},
                status=status.HTTP_404_NOT_FOUND,
            )

#
# End STORE Views
#

# 
# Start EMPLOYEE Views
#

class EmployeeView(generics.CreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

class GETEmployeeView(APIView):
    serializer_class = EmployeeSerializer
    lookup_url_kwarg = "employee_id"

    def get(self, request, format=None):
        empl_id = request.GET.get(self.lookup_url_kwarg)
        if empl_id != None:
            empl = Employee.objects.filter(employee_id=empl_id)
            if len(empl) > 0:
                data = EmployeeSerializer(empl[0]).data
                return Response(data, status=status.HTTP_200_OK)
            return Response(
                {"Bad Request": "Invalid Employee ID."},
                status=status.HTTP_404_NOT_FOUND,
            )
        else:
            empl = EmployeeSerializer(Employee.objects.all(), many=True).data
            return Response(empl, status=status.HTTP_200_OK)

class POSTEmployeeView(APIView):
    serializer_class = POSTEmployeeSerializer

    def post(self, request, format=None):
        
        empl_id = request.data["employee_id"]
        empl = None

        print(request.data["department_id"])

        try:
            empl = Employee.objects.get(employee_id=empl_id)
        except:
            empl = None

        serializer = self.serializer_class(empl, data=request.data)

        if serializer.is_valid():
            new_employee_id = request.data["employee_id"]
            new_first_name = request.data["first_name"]
            new_last_name = request.data["last_name"]
            new_department_id = request.data["department_id"]
            new_email = request.data["email"]
            new_address = request.data["address"]
            new_phone = request.data["phone"]
            new_job_title = request.data["job_title"]
            new_salary = request.data["salary"]

            queryset = Employee.objects.filter(employee_id=new_employee_id)

            if queryset.exists():
                empl = queryset[0]
                empl.employee_id = new_employee_id
                empl.first_name = new_first_name
                empl.last_name = new_last_name
                empl.department_id = new_department_id
                empl.email = new_email
                empl.address = new_address
                empl.phone = new_phone
                empl.job_title = new_job_title
                empl.salary = new_salary
                empl.save(
                    update_fields=[
                        "employee_id",
                        "department_id",
                        "first_name",
                        "last_name",
                        "email",
                        "address",
                        "phone",
                        "job_title",
                        "salary",
                    ]
                )
            else:
                # create a new customer here
                empl = Employee(
                    employee_id=new_employee_id,
                    first_name=new_first_name,
                    last_name=new_last_name,
                    department_id=new_department_id,
                    email=new_email,
                    address=new_address,
                    phone=new_phone,
                    job_title=new_job_title,
                    salary = new_salary,
                )
                empl.save()

            return Response(
                POSTEmployeeSerializer(empl).data, status=status.HTTP_201_CREATED
            )

        return Response(
            {"Bad Request": "Invalid data..."}, status=status.HTTP_400_BAD_REQUEST
        )


class DELETEEmployeeView(APIView):
    serializer_class = EmployeeSerializer
    lookup_url_kwarg = "employee_id"

    def delete(self, request, format=None):
        emp_id = request.GET.get(self.lookup_url_kwarg)
        emp = Employee.objects.get(employee_id=emp_id)

        if emp_id != None:
            if Employee.objects.filter(employee_id=emp_id).exists():
                emp.delete()
                return Response(
                    {"Employee deleted"}, status=status.HTTP_204_NO_CONTENT
                )
            return Response(
                {"Bad Request": "Invalid Employee ID."},
                status=status.HTTP_404_NOT_FOUND,
            )
        else:
            return Response(
                {"Bad Request": "Invalid Employee ID."},
                status=status.HTTP_404_NOT_FOUND,
            )

#
# End EMPLOYEE Views
#

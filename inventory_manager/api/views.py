from django.shortcuts import render
from rest_framework import generics, status
from .serializers import (
    DepartmentSerializer,
    POSTDepartmentSerializer,

    CustomerSerializer,
    POSTCustomerSerializer,

    CouponSerializer,
    POSTCouponSerializer,
    
    ItemCategorySerializer,
    
    TransactionSerializer,
    POSTTransactionSerializer
)
from .models import Department, Customer,Coupon, ItemCategory, Transaction
from rest_framework.views import APIView
from rest_framework.response import Response


#
# Begin CUSTOMER Views
#


class CustomerView(generics.CreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


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

#
# End COUPON Views
#

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
            itemcategory = ItemCategory.objects.filter(category_id=category_id)
            if len(itemcategory) > 0:
                data = ItemCategorySerializer(itemcategory[0]).data
                return Response(data,status=status.HTTP_200_OK)
            return Response(
                {"Bad Request": "Invalid Category ID."},
                status=status.HTTP_404_NOT_FOUND,
            )
        else:
            categ = ItemCategorySerializer(ItemCategory.objects.all(), many=True).data
            return Response(categ, status=status.HTTP_200_OK)

#
# Begin TRANSACTION Views
#

class TransactionView(generics.CreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

class GETTransactionView(APIView):
    serializer_class = TransactionSerializer
    lookup_url_kwarg = "transaction_id"

    def get(self,request,format = None):
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
            return Response(transaction, status=status.HTTP_200_OK)

class POSTTransactionView(APIView):
    serializer_class = POSTTransactionSerializer
    

    def post(self,request,format=None):
        transaction_id = request.data["transaction_id"]
        transaction = None
        try:
            transaction = Transaction.objects.get(transaction_id=transaction_id)
        except:
            transaction = None

        serializer = self.serializer_class(transaction,transaction=request.data)
        if serializer.is_valid():
            new_transaction_id = request.data["transaction_id"]
            new_transaction_date = request.data["transaction_date"]
            new_total = request.data["total"]

            # Ensures that customers exists
            new_customer_id = request.data["customer_id"]
            customer = None
            try:
                customer = Customer.objects.get(customer_id=new_customer_id)
            except:
                return Response(
                    {"Bad Request": "Invalid data..."}, status=status.HTTP_400_BAD_REQUEST
                )
            new_coupon_id =  request.data["coupon_id"]

            if transaction:
                transaction.transaction_id = new_transaction_id
                transaction.transaction_date = new_transaction_date
                transaction.data = new_total
                transaction.customer_id = new_customer_id
                transaction.coupon_id = new_coupon_id
                transaction.save(
                    update_fields=[
                        "transaction_id","transaction_data","total","customer_id","coupon_id"
                        ]
                )
            else:
                transaction = Transaction(
                    transaction_id = new_transaction_id,
                    transaction_date = new_transaction_date,
                    total = new_total,
                    customer_id = new_customer_id,
                    coupon_id = new_coupon_id
                )
                transaction.save()
            
            return Response(
                POSTTransactionSerializer(transaction).data,status=status.HTTP_201_CREATED
            )


        return Response(
            {"Bad Request": "Invalid data..."}, status=status.HTTP_400_BAD_REQUEST
        )

#
# End TRANSACTION Views
#

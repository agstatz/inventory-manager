from django.shortcuts import render
from rest_framework import generics, status
from .serializers import DepartmentSerializer, POSTDepartmentSerializer, CouponSerializer
from .models import Coupon, Department
from rest_framework.views import APIView
from rest_framework.response import Response

import json

# Create your views here.

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

from django.urls import path
from .views import (
    DepartmentView,
    POSTDepartmentView,
    GETDepartmentView,
    DELETEDepartmentView,
    GETCouponView
)

urlpatterns = [
    path("department", DepartmentView.as_view()),
    path("post-department", POSTDepartmentView.as_view()),
    path("get-department", GETDepartmentView.as_view()),
    path("delete-department", DELETEDepartmentView.as_view()),
    path("get-coupon",GETCouponView.as_view())
]

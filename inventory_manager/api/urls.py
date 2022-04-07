from django.urls import path
from .views import (
    DepartmentView,
    POSTDepartmentView,
    GETDepartmentView,
    DELETEDepartmentView,
    CustomerView,
    GETCustomerView,
    POSTCustomerView,
)

urlpatterns = [
    # customer related url patterns for api
    path("customer", CustomerView.as_view()),
    path("get-customer", GETCustomerView.as_view()),
    path("post-customer", POSTCustomerView.as_view()),
    # department related url patterns for api
    path("department", DepartmentView.as_view()),
    path("post-department", POSTDepartmentView.as_view()),
    path("get-department", GETDepartmentView.as_view()),
    path("delete-department", DELETEDepartmentView.as_view()),
]

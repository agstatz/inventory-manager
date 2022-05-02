from django.urls import path
from .views import index

urlpatterns = [
    path("", index),
    path("inventory/", index),
    path("locations/", index),
    path("reports/", index),
    path("login/", index),
    # customer related paths
    path("customer/", index),
    path("customer/create", index),
    path("customer/all", index),
    path("customer/search", index),
    # department related paths
    path("department/", index),
    path("department/create", index),
    path("department/edit", index),

    path("coupon/", index),
    path("coupon/create", index),
    path("coupon/edit", index),

    path("item/", index),
    path("item/create", index),
    path("item/edit", index),

    # itemcategory related paths
    path("itemcategory/", index),
    path("itemcategory/create", index),
    path("itemcategory/search", index),
    path("itemcategory/edit", index),

    # transaction related paths
    path("transaction/", index),
    path("transaction/create",index),

     # employee related paths
    path("employee/", index),
    path("employee/all", index),
    path("employee/add", index),
    path("employee/edit", index),

    # store related paths
    path("store/", index),
    path("store/search", index),
    path("store/create", index),
    path("store/edit", index),
    path("store/search", index),
]

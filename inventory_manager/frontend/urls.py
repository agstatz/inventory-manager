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
    path("customer/all", index),
    path("customer/search", index),
    # department related paths
    path('department/', index),
    path('department/create', index),
    path('department/edit', index),
    path('coupon/',index),
    # itemcategory related paths
    path('itemcategory/', index),
    path('itemcategory/create', index),
    path('itemcategory/search', index)
]

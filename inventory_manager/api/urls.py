from django.urls import path
from .views import (
    DepartmentView,
    
    POSTDepartmentView,
    GETDepartmentView,
    DELETEDepartmentView,

    GETCouponView,
    POSTCouponView,

    CustomerView,
    GETCustomerView,
    POSTCustomerView,

    ItemView,
    GETItemView,
    POSTItemView,

    ItemCategoryView,
    GETItemCategoryView,

    TransactionView,
    PATCHTransactionView,
    POSTTransactionView,
    CALCTransactionView

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
    # coupon related url patterns for api
    path("get-coupon", GETCouponView.as_view()),
    path('post-coupon', POSTCouponView.as_view()),

    path("get-item", GETItemView.as_view()),
    path('post-item', POSTItemView.as_view()),

    # item-category related url patterns for api
    path("itemcategory", ItemCategoryView.as_view()),
    path("get-itemcategory", GETItemCategoryView.as_view()),
    #path("post-category", ItemCategoryView.as_view()),
    #transaction related
    path("transaction",TransactionView.as_view()),
    path("patch-transaction",PATCHTransactionView.as_view()),
    path("post-transaction",POSTTransactionView.as_view()),
    path("get-calc",CALCTransactionView.as_view())
]

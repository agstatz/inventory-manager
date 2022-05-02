from django.urls import path
from .views import (
    DELETEEmployeeView,
    DepartmentView,
    
    POSTDepartmentView,
    GETDepartmentView,
    DELETEDepartmentView,

    GETCouponView,
    POSTCouponView,

    CustomerView,
    GETCustomerView,
    GETSEARCHCustomerView,
    POSTCustomerView,

    ItemView,
    GETItemView,
    POSTItemView,

    ItemCategoryView,
    GETItemCategoryView,
    POSTItemCategoryView,
    DELETEItemCategoryView,

    TransactionView,
    PATCHTransactionView,
    POSTTransactionView,
    CALCTransactionView,

    StoreView,
    GETStoreView,
    GETSEARCHStoreView,
    POSTStoreView,
    DELETEStoreView,

    EmployeeView,
    GETEmployeeView,
    POSTEmployeeView,
    DELETEEmployeeView,

)

urlpatterns = [
    # customer related url patterns for api
    path("customer", CustomerView.as_view()),
    path("get-customer", GETCustomerView.as_view()),
    path("get-search-customer", GETSEARCHCustomerView.as_view()),
    path("post-customer", POSTCustomerView.as_view()),
    # department related url patterns for api
    path("department", DepartmentView.as_view()),
    path("post-department", POSTDepartmentView.as_view()),
    path("get-department", GETDepartmentView.as_view()),
    path("delete-department", DELETEDepartmentView.as_view()),

    # coupon related url patterns for api
    path("get-coupon", GETCouponView.as_view()),
    path("post-coupon", POSTCouponView.as_view()),

    path("get-item", GETItemView.as_view()),
    path('post-item', POSTItemView.as_view()),
    path('edit-item', POSTItemView.as_view()),

    # item-category related url patterns for api
    path("itemcategory", ItemCategoryView.as_view()),
    path("get-itemcategory", GETItemCategoryView.as_view()),
    path("post-itemcategory", POSTItemCategoryView.as_view()),
    path("delete-itemcategory", DELETEItemCategoryView.as_view()),

    
    #transaction related
    path("transaction",TransactionView.as_view()),
    path("patch-transaction",PATCHTransactionView.as_view()),
    path("post-transaction",POSTTransactionView.as_view()),
    path("get-calc",CALCTransactionView.as_view()),

    # Store related url patterns for api
    path("store", StoreView.as_view()),
    path("get-store", GETStoreView.as_view()),
    path("post-store", POSTStoreView.as_view()),
    path("delete-store", DELETEStoreView.as_view()),
    path("get-search-store", GETSEARCHStoreView.as_view()),
    
    # Employee related url patterns for api
    path("employee",EmployeeView.as_view()),
    path("get-employee",GETEmployeeView.as_view()),
    path("post-employee",POSTEmployeeView.as_view()),
    path("delete-employee", DELETEEmployeeView.as_view())
    

]

from django.urls import path
from .views import DepartmentView, POSTDepartmentView, GETDepartmentView

urlpatterns = [
    path('department', DepartmentView.as_view()),
    path('post-department', POSTDepartmentView.as_view()),
    path('get-department', GETDepartmentView.as_view())
]
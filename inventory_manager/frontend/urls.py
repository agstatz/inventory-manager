from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('inventory/', index),
    path('locations/', index),
    path('reports/', index),
    path('login/', index),

    # department related paths
    path('department/', index),
    path('department/create', index),
    
]
from django.urls import path
from .views import index 

app_name = 'frontend'

urlpatterns = [
    path('', index, name=''),
    path('song', index),
    path('home/<str:homeCode>', index),
    path('settings', index)
]

from django.urls import path
from .views import HomeView, CreateHomeView, GetHome

urlpatterns = [
    path('home', HomeView.as_view()),
    path('create-home', CreateHomeView.as_view()),
    path('get-home', GetHome.as_view())
]
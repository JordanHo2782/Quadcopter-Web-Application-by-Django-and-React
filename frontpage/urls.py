from django.urls import path
from . import views

urlpatterns = [
    path('', views.FrontpageListCreate.as_view() ),
]
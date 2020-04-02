from django.shortcuts import render

# Create your views here.

from .models import frontpage
from .serializers import FrontpageSerializer
from rest_framework import generics

class FrontpageListCreate(generics.ListCreateAPIView):
    queryset = frontpage.objects.all()
    serializer_class = FrontpageSerializer
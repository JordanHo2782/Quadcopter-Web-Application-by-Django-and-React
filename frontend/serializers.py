from rest_framework import serializers
from .models import frontend

class FrontendSerializer(serializers.ModelSerializer):
    class Meta:
        model = frontend
        fields = ('id', 'currentlatitude', 'currentlongtitude', 'currentAddress', 'targetlatituide', 'targetlongtitude', 'targetAddress', 'distance', 'RouteCoordinate', 'created_at')
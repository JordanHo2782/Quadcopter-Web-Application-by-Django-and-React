from rest_framework import serializers
from .models import frontpage

class FrontpageSerializer(serializers.ModelSerializer):
    class Meta:
        model = frontpage
        fields = ('id', 'currentlatitude', 'currentlongtitude', 'currentAddress', 'targetlatituide', 'targetlongtitude', 'targetAddress', 'distance', 'RouteCoordinate', 'created_at')
from djongo import models
from jsonfield import JSONField


# Create your models here.

class frontpage(models.Model):
    currentlatitude=models.DecimalField(max_digits=30, decimal_places=27)
    currentlongtitude=models.DecimalField(max_digits=30, decimal_places=27)
    currentAddress=models.TextField()
    targetlatituide=models.DecimalField(max_digits=30, decimal_places=27)
    targetlongtitude=models.DecimalField(max_digits=30, decimal_places=27)
    targetAddress=models.TextField()
    distance=models.IntegerField() #In meters
    RouteCoordinate=JSONField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)

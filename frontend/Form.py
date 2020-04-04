from django import forms

class Form(forms.Form):
    distance = forms.IntegerField() #In meters
    RouteCoordinate = forms.CharField()
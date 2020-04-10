from django.shortcuts import render
from .models import frontend
from .Form import Form
import json
from django.views.decorators.csrf import ensure_csrf_cookie
import requests
# from .goto import Goto
# import requests


@ensure_csrf_cookie
def index(request):
    # return render(request, 'frontend/index.html')
    url = 'http://172.20.10.10:5000'
    if request.method == 'GET':
        return render(request, 'frontend/index.html')
    elif request.method == 'POST':
        DictPostData = json.loads(request.body) #Dict Data is Dictonary
        Distance = DictPostData['distance']
        RouteCoordinate = DictPostData['RouteCoordinate'] #RouteCoordinate is list
         #See app.py for ip adress for url
        Data_sendto_Quadcopter = json.dumps(RouteCoordinate)
        # json.loads(Data_sendto_Quadcopter)
        headers = {'Content-Type': 'application/json'}
        POST_to_quadcopter = requests.post(url=url,headers=headers,data=Data_sendto_Quadcopter)

        Data = frontend(
            currentlatitude = 0,
            currentlongtitude = 0,
            currentAddress = 0,
            targetlatituide = 0,
            targetlongtitude = 0,
            targetAddress = 'Testing',
            distance = Distance,
            RouteCoordinate = str(RouteCoordinate),
        )

        # Goto(RouteCoordinate)

        Data.save()


        return render(request, 'frontend/index.html')



    
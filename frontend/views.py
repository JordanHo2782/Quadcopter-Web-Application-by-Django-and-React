from django.shortcuts import render
from .models import frontend
from .Form import Form
import json



def index(request):
    # return render(request, 'frontend/index.html')

    if request.method == 'GET':
        return render(request, 'frontend/index.html')
    elif request.method == 'POST':
        DictPostData = json.loads(request.body) #Dict Data is Dictonary
        Distance = DictPostData['distance']
        RouteCoordinate = DictPostData['RouteCoordinate'] #RouteCoordinate is list

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

        Data.save()

        



        # 
        # print(DictData['RouteCoordinate'])

        # print(form)
        return render(request, 'frontend/index.html')


        # print(request)
        # print(request.POST.get('distance'))
        # return render(request,'frontend/index.html')
    # return render(request, 'frontend/index.html')

    #def get(self, request):
    
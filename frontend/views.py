from django.shortcuts import render

def index(request):
    return render(request, 'frontend/index.html')

    # if request.method == 'GET':
        # return render(request, 'frontend/index.html')
    # elif request.method == 'POST':

    # return render(request, 'frontend/index.html')

    #def get(self, request):
    
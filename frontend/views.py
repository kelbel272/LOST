from django.shortcuts import render

# Create your views here.
#Render the index tgemplate 

def index(request, *args, **kwargs):
    return render(request, 'frontend/index.html')
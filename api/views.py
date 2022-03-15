from cgitb import lookup
from django.shortcuts import render
from rest_framework import generics, status
from .serializers import HomeSerializer, CreateHomeSerializer
from .models import Home
from rest_framework.views import APIView
from rest_framework.response import Response


# Create your views here.

#List of all users who authenticated
class HomeView(generics.ListAPIView):
    queryset = Home.objects.all()
    serializer_class = HomeSerializer

#Get the users homepage & code
class GetHome(APIView):
    serializer_class = HomeSerializer
    lookup_url_kwarg = 'code'

    def get(self, request, format=None):
        code = request.GET.get(self.lookup_url_kwarg)
        #If home page exists, get the home code 
        if code != None:
            home = Home.objects.filter(code=code)
            if len(home) > 0:
                data = HomeSerializer(home[0]).data
                # check if the person trying to access the home page belongs to that home page 
                data['is_user'] = self.request.session.session_key == home[0].user
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Home Not Found': 'Invalid Home Code'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Code parameter not found in request'}, status=status.HTTP_400_BAD_REQUEST)

#Load Users HomePage 
class CreateHomeView(APIView):
    serializer_class = CreateHomeSerializer

    #Check if current user has an active session 
    def post(self, request, format=None):

        #if they dont have a session, create one 
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create() 

        serializer = self.serializer_class(data=request.data)
        # Update Home Settings  
        # User has multiple sessions and restart session
        # Create new room with same settings 
        if serializer.is_valid():
            night_mode = serializer.data.get('night_mode')
            user = self.request.session.session_key
            # Is there any user in the database that already has a home page 
            queryset = Home.objects.filter(user=user)
            # If user has a home page, update info 
            if queryset.exists():
                home = queryset[0]
                home.night_mode = night_mode
                home.save(update_fields=['night_mode'])
            #Create home page 
            else: 
                home = Home(user=user, night_mode=night_mode)
                home.save()
                #Create room 
                return Response(HomeSerializer(home).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
    







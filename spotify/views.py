from django.shortcuts import render, redirect
from .credentials import REDIRECT_URI, CLIENT_SECRET, CLIENT_ID
from rest_framework.views import APIView
from requests import Request, post
from rest_framework import status
from rest_framework.response import Response
from .util import * 
from api.models import Home

# Create your views here.

#Returns URL to authenticate spotify application 
class AuthURL(APIView):
    def get(self, request, fornat=None):
        # info we want to access in the app (need to add more scopes later)
        # find more scopes @ developer.spotify.com
        # https://developer.spotify.com/documentation/general/guides/authorization/code-flow/
        scopes = 'user-read-playback-state user-modify-playback-state user-read-currently-playing'

        # URL to authorize account
        url = Request('GET', 'https://accounts.spotify.com/authorize', params={
            'scope': scopes,
            'response_type': 'code',    #Requesting the code to authenticate user
            'redirect_uri': REDIRECT_URI,
            'client_id': CLIENT_ID
        }).prepare().url   #have front end get url 

        return Response({'url': url}, status=status.HTTP_200_OK)

#Send request to get access to all the tokens and send to the frontend 
def spotify_callback(request, format=None):
    code = request.GET.get('code')
    error = request.GET.get('error')

    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': REDIRECT_URI,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()

    access_token = response.get('access_token')
    token_type = response.get('token_type')
    refresh_token = response.get('refresh_token')
    expires_in = response.get('expires_in')
    error = response.get('error')

    #create database to store all of the tokens and refresh tokens (new session needs new tokens and etc )

    #Check if there is a session key, if not, create 
    if not request.session.exists(request.session.session_key):
        request.session.create()

    update_or_create_user_tokens(
        request.session.session_key, access_token, token_type, expires_in, refresh_token)

    return redirect('frontend:')  #put in name of application (frontend:) after : put page to go to 

#Call util is_spotify_autneticated to see if user is authenticated 
#return the response 
class IsAuthenticated(APIView):
    def get(self, request, format=None):
        is_authenticated = is_spotify_authenticated(self.request.session.session_key)
        return Response({'status': is_authenticated}, status=status.HTTP_200_OK)
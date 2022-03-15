# Takes all python related code and translates Room to json response 

from rest_framework import serializers 
from .models import Home

# Take Home object and serialize it 
class HomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Home
        fields = ('id', 'code', 'user', 'night_mode')

# Post request that gives information to the Home Page
class CreateHomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Home
        fields = ('night_mode',) 

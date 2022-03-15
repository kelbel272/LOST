from turtle import back
from django.db import models
import string 
import random

#Generate random code assigned to user 
def generate_unique_code():
    length = 6

    # Check if code is unique
    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        # if unique, return the code 
        if Home.objects.filter(code=code).count() == 0:
            break

    return code

# Create your models here.
# https://docs.djangoproject.com/en/4.0/ref/models/fields/
class Home(models.Model):
    # Code given to users home page/dashboard 
    code = models.CharField(max_length=8, default=generate_unique_code, unique=True)

    # User assigned to this home page  
    user = models.CharField(max_length=50, unique=True)

    # Color Theme user wants for the website 
    night_mode = models.BooleanField(null=False, default=False)

  


from django.db import models

# built in user model from Django
from django.contrib.auth.models import User

# user-defined categories containing clothing items
class Capsule(models.Model):
  #items = models.ForeignKey(Item, related_name='capsules')
  name = models.CharField(max_length=64)
  description = models.TextField()
  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='capsules')

  def __str__(self):
      return self.name

# type of clothing, ie. shirt
class Type(models.Model):
  name = models.CharField(max_length=64)

  def __str__(self):
      return self.name

# the weather in which the item would be worn
class Weather(models.Model):
  name = models.CharField(max_length=64)
  

  def __str__(self):
      return self.name


# the actual item of clothing itself
class Item(models.Model):
  capsule = models.ForeignKey(Capsule, on_delete=models.CASCADE, related_name='items', null=True, blank=True)
  type = models.ForeignKey(Type, on_delete=models.SET_DEFAULT, related_name='items', default=1)
  weather = models.ForeignKey(Weather, on_delete=models.SET_NULL, related_name='items', null=True, blank=True)
  color_pattern = models.CharField(max_length=100)
  brand = models.CharField(max_length=64)
  # user will upload photo to cloudinary, its url will be stored here
  image_url = models.TextField(max_length=2000)

  def __str__(self):
      return self.color_pattern + " " + self.type.name 
  

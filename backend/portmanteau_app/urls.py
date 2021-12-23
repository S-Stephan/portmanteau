from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import *

#create router instance
r = DefaultRouter()

#associate viewsets
r.register(r"capsule", CapsuleViewSet, basename="capsule")
r.register(r"item", ItemViewSet, basename="item")
r.register(r"type", TypeViewSet, basename="type")
r.register(r"weather", WeatherViewSet, basename="weather")
r.register(r"user", UserViewSet, basename="user")

#get urls
urlpatterns = r.urls

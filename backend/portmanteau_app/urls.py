from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import *

#create router instance
r = DefaultRouter()

#associate viewsets
r.register(r"capsule", CapsuleViewSet, basename="capsule")
r.register(r"item", ItemViewSet, basename="item")

#get urls
urlpatterns = r.urls

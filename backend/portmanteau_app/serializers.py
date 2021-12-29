from rest_framework.serializers import ModelSerializer, StringRelatedField
from .models import *

class UserSerializer(ModelSerializer):
  class Meta:
    model = User
    fields = ["id", "username"]

class TypeSerializer(ModelSerializer):
  class Meta:
    model = Type
    fields = ["id", "name"]

class WeatherSerializer(ModelSerializer):
  class Meta:
    model = Weather
    fields = ["id", "name"] 

class ItemSerializer(ModelSerializer):
  class Meta:
    model = Item
    fields = ["id", "capsule", "type", "weather", "color_pattern", "brand", "image_url"] 

  def to_representation(self, instance):
    self.fields["type"] = TypeSerializer()
    self.fields["weather"] = WeatherSerializer()
    return super().to_representation(instance)  

  
class CapsuleSerializer(ModelSerializer):
  class Meta:
    model = Capsule
    fields = ["id", "name", "description", "user", "items"]

  def to_representation(self, instance):
    print(instance)
    print(self.fields["items"])
    self.fields["items"] = ItemSerializer(many=True)
    return super().to_representation(instance)
  

  


from rest_framework import serializers
from .models import Interface

class InterfaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interface
        fields = ('id', 'title', 'description', 'completed')

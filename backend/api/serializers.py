from django.contrib.auth.models import User
from rest_framework import serializers

# este serializer se usa para registrar nuevos usuarios. Permite crear un usuario desde un endpoint de la API
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

# Este serializer se usa para manejar el login de usuarios. Permite iniciar sesión desde un endpoint de la API
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

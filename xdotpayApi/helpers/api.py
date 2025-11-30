from ninja.security import HttpBearer
from rest_framework.authtoken.models import Token


class Auth(HttpBearer):
    def authenticate(self, request, token):
        try:
            tok = Token.objects.select_related('user').get(key=token)

            return tok.user

        except Token.DoesNotExist:
            return None

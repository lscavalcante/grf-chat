from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser


class UserManager(BaseUserManager):
    def create_superuser(self, email, password):
        user = self.model(
            email=self.normalize_email(email)
        )

        user.set_password(password)
        user.is_superuser = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser):
    avatar = models.TextField(default='/media/avatars/default-avatar.png')
    name = models.CharField(max_length=80)
    email = models.EmailField(unique=True)
    is_superuser = models.BooleanField(default=False)
    last_access = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_superuser

    class Meta:
        db_table = 'users'


"""
user
    - username
    - password    
    - is_admin
    - is_cliente
    - is_operacional
"""

"""
cliente
    - nome
    - razao_social
    - cnpj
    - ramo_de_atividade
    - email (contato_responsavel)
    - telefone (contato_responsavel)
    - endereco 
    - user_id
"""

"""
operacional
    - nome
    - cpf
    - assinatura
    - email
    - user_id
"""

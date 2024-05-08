from django.contrib import admin
from .models import Profile, TestRecord, CustomUser

# Register your models here.
admin.site.register(Profile)
admin.site.register(TestRecord)
admin.site.register(CustomUser)

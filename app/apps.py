from django.apps import AppConfig
# from .signals import create_profile, save_profile as app_signal


class MyAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app'
    # name = 'eduTool.app'

    # def ready(self):
        # import eduTool.app.signals


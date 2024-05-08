from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('', views.home, name='home'),
    # path('about/', views.about, name='about'),
    path('register/', views.register, name='register'),
    path('login/', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(template_name='logout.html'), name='logout'),
    path('account/', views.account, name='account'),
    path('articles/', views.articles, name='articles'),
    path('basics/', views.basics, name='basics'),
    path('sql_injection/', views.sql_injection, name='sql_injection'),
    path('xss_injection/', views.xss_injection, name='xss_injection'),
    path('insecure_deserialization/', views.insecure_deserialization, name='insecure_deserialization'),
    path('unsafe_reflection/', views.unsafe_reflection, name='unsafe_reflection'),
    path('csrf/', views.csrf, name='csrf'),
    path('tests/', views.tests, name='tests'),
    path('exercises/', views.exercises, name='exercises'),
    path('save_test_data/', views.save_test_data, name='save_test_data'),
]

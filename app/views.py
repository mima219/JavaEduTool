from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .forms import CustomUserRegisterForm, UserUpdateForm, ProfileUpdateForm
from .models import TestRecord, Profile
import json
from django.http import JsonResponse


# Create your views here.
def home(request):
    return render(request, 'home.html')


def register(request):
    if request.method == 'POST':
        form = CustomUserRegisterForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            messages.success(request, f'Welcome {username}! You are now able to log in.')
            return redirect('login')
    else:
        form = CustomUserRegisterForm()
    return render(request, 'register.html', {"form": form})


@login_required
def account(request):
    if request.method == 'POST':
        u_form = UserUpdateForm(request.POST, instance=request.user)
        p_form = ProfileUpdateForm(request.POST,
                                   request.FILES,
                                   instance=request.user.profile)
        if u_form.is_valid() and p_form.is_valid():
            u_form.save()
            p_form.save()
            messages.success(request, f'Your account has been updated!')
            return redirect('account')
    else:
        u_form = UserUpdateForm(instance=request.user)
        p_form = ProfileUpdateForm(instance=request.user.profile)

    user_test_history = TestRecord.objects.filter(author=request.user)
    context = {'u_form': u_form,
               'p_form': p_form,
               'test_history': user_test_history}
    return render(request, 'account.html', context)


def tests(request):
    return render(request, 'tests.html')


@login_required(login_url='login')
def save_test_data(request):
    if request.method == 'POST':
        # Extract the test data from the request body
        data = json.loads(request.body)
        tests_values = data.get('tests_values')

        # Save the test data to the database
        for test in tests_values:
            test_title = test.get('title')
            score = test.get('score')

            current_user = request.user
            TestRecord.objects.create(title=test_title, score=score, author=current_user)

        return JsonResponse({'message': 'Test data saved successfully'}, status=200)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)


def exercises(request):
    return render(request, 'exercises.html')


def articles(request):
    return render(request, 'articles-base.html')


def basics(request):
    return render(request, 'basics.html')


def sql_injection(request):
    return render(request, 'sql-injection.html')


def xss_injection(request):
    return render(request, 'xss-injection.html')


def insecure_deserialization(request):
    return render(request, 'deserialization.html')


def unsafe_reflection(request):
    return render(request, 'unsafe-reflection.html')


def csrf(request):
    return render(request, 'csrf.html')

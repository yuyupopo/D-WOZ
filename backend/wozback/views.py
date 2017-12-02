import json

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.forms.models import model_to_dict
from django.http import (HttpResponse, HttpResponseNotAllowed,
                         HttpResponseNotFound, JsonResponse)
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie

from .models import *


def signup(request):
    print(request)
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        password = req_data['password']
        User.objects.create_user(username=username, password=password)
        return HttpResponse(status=201)
    else:
        return HttpResponseNotAllowed(['POST'])

def signin(request):
    if request.method == 'POST':
        request_data = json.loads(request.body.decode())
        username = request_data['username']
        password = request_data['password']
        user = authenticate(request, username = username, password = password)
        if user is None:
            return HttpResponse(status=401) # unauthorized
        else:
            login(request, user)
            return HttpResponse(status=200)
    else:
        return HttpResponseNotAllowed(['POST'])

def signout(request):
    if request.method == 'GET':
        logout(request)
        return HttpResponse(status=200)
    else:
        return HttpResponseNotAllowed(['GET'])

@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])

# Agent
def agentList(request):
    if request.user.is_authenticated:
        if request.method == 'GET':
            print('get agent list')
            agentList = Agent.objects.prefetch_related('triggers').filter(user = request.user.id).values()
            for agent in agentList:
                agent.pop('user_id')
            return JsonResponse(list(agentList), safe=False)
        elif request.method == 'POST':
            requestJsonData = json.loads(request.body.decode())
            name = requestJsonData['name']
            explanation = requestJsonData['explanation']
            new_agent = Agent(title=title, content=content)
            new_agent.user = request.user
            new_agent.save()
            return HttpResponse(status=201)
        else:
            return HttpResponseNotAllowed(['GET', 'POST'])
    else:
        return HttpResponse(status=401)

def agentDetail(request, agent_id):
    if request.user.is_authenticated:
        agent_id = int(agent_id)
        if request.method == 'GET':
            try:
                agent = Agent.objects.get(id=agent_id)
            except Agent.DoesNotExist:
                return HttpResponseNotFound()
            triggerList = agent.getTriggers()
            dialogList = agent.getDialogs()
            behaviorList = agent.getBehaviors()

            agent = model_to_dict(agent)
            agent['triggers'] = triggerList
            agent['dialogs'] = dialogList
            agent['behaviors'] = behaviorList
            agent.pop('user')

            return JsonResponse(agent)
        elif request.method == 'PUT':
            pass
            jsonData = json.loads(request.body.decode())
            name = jsonData['name']
            explanation = jsonData['explanation']
            try:
                agent = Agent.objects.get(id=agent_id)
            except Agent.DoesNotExist:
                return HttpResponseNotFound()
            if request.user.id == agent.user_id:
                agent.name = name
                agent.explanation = explanation
                agent.save()
                return HttpResponse(status=204)
            else:
                return HttpResponse(status=403)            
        elif request.method == 'DELETE':
            try:
                agent = Agent.objects.get(id=agent_id)
            except Agent.DoesNotExist:
                return HttpResponseNotFound()
            if request.user.id == agent.user_id:
                agent.delete()
                return HttpResponse(status=204)
            else:
                return HttpResponse(status=403)
        else:
            return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'])
    else:
        return HttpResponse(status=401)

# Trigger
def triggerList(request):
    if request.user.is_authenticated:
        if request.method == 'GET':
            triggerList = Trigger.objects.select_related('triggers').filter(user = request.user.id).values()
            for trigger in triggerList:
                trigger.pop('user_id')
            return JsonResponse(list(triggerList), safe=False)
        elif request.method == 'POST':
            requestJsonData = json.loads(request.body.decode())
            name = requestJsonData['name']
            explanation = requestJsonData['explanation']
            new_trigger = Trigger(title=title, content=content)
            new_trigger.user = request.user
            new_trigger.save()
            return HttpResponse(status=201)
        else:
            return HttpResponseNotAllowed(['GET', 'POST'])
    else:
        return HttpResponse(status=401)

def triggerDetail(request, trigger_id):
    if request.user.is_authenticated:
        trigger_id = int(trigger_id)
        if request.method == 'GET':
            try:
                trigger = Trigger.objects.get(id=trigger_id)
            except Trigger.DoesNotExist:
                return HttpResponseNotFound()
            
            trigger = model_to_dict(trigger)
            trigger.pop('user')
            return JsonResponse(trigger)
        elif request.method == 'PUT':
            pass
            jsonData = json.loads(request.body.decode())
            name = jsonData['name']
            explanation = jsonData['explanation']
            try:
                trigger = Trigger.objects.get(id=trigger_id)
            except Trigger.DoesNotExist:
                return HttpResponseNotFound()
            if request.user.id == trigger.user_id:
                trigger.name = name
                trigger.explanation = explanation
                trigger.save()
                return HttpResponse(status=204)
            else:
                return HttpResponse(status=403)            
        elif request.method == 'DELETE':
            try:
                trigger = Trigger.objects.get(id=trigger_id)
            except Trigger.DoesNotExist:
                return HttpResponseNotFound()
            if request.user.id == trigger.user_id:
                trigger.delete()
                return HttpResponse(status=204)
            else:
                return HttpResponse(status=403)
        else:
            return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'])
    else:
        return HttpResponse(status=401)


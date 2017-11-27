from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout

from django.views.decorators.csrf import csrf_protect
from django.views.decorators.csrf import ensure_csrf_cookie

from django.http import HttpResponse, HttpResponseNotAllowed
from django.http import HttpResponseNotFound, JsonResponse

from django.forms.models import model_to_dict

from .models import *
import json

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
            return JsonResponse(list(Agent.objects.filter(user = request.user.id)), safe=False)
        elif request.method == 'POST':
            # requestJsonData = json.loads(request.body.decode())
            # title = requestJsonData['title']
            # content = requestJsonData['content']

            # new_agent = Agent(title=title, content=content)
            # new_agent.user = request.user
            # new_agent.save()
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
            agent = model_to_dict(agent)
            agent['agent_id'] = agent.pop('agent')
            return JsonResponse(agent)
        elif request.method == 'PUT':
            pass
            # jsonData = json.loads(request.body.decode())
            # title = jsonData['title']
            # content = jsonData['content']
            # try:
            #     agent = Agent.objects.get(id=agent_id)
            # except Agent.DoesNotExist:
            #     return HttpResponseNotFound()
            # if request.user.id == agent.author_id:
            #     agent.title = title
            #     agent.content = content
            #     agent.save()
            #     return HttpResponse(status=204)
            # else:
            #     return HttpResponse(status=403)            
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
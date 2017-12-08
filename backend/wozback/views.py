import json

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.forms.models import model_to_dict
from django.http import (HttpResponse, HttpResponseNotAllowed,
                         HttpResponseNotFound, JsonResponse)
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie

from .models import *

from hashids import Hashids


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

# Experiment
def experimentList(request):
    if request.user.is_authenticated:
        if request.method == 'GET':
            experimentList = Experiment.objects.filter(user = request.user.id)
            agentList = []
            for experiment in experimentList:
                agents = experiment.agents.all()
                agentList.append([agent.id for agent in agents])
            experimentList = experimentList.values()
            for experiment in experimentList:
                experiment.pop('user_id')
                experiment['agents'] = agentList.pop()
            return JsonResponse(list(experimentList), safe=False)
        elif request.method == 'POST':
            requestJsonData = json.loads(request.body.decode())
            name = requestJsonData['name']
            instruction = requestJsonData['instruction']
            scenario = requestJsonData['scenario']
            new_experiment = Experiment(name=name, instruction=instruction, scenario=scenario)
            new_experiment.user = request.user
            new_experiment.save()
            return HttpResponse(status=201)
        else:
            return HttpResponseNotAllowed(['GET', 'POST'])
    else:
        return HttpResponse(status=401)

def experimentDetail(request, experiment_id):
    if request.user.is_authenticated:
        experiment_id = int(experiment_id)
        if request.method == 'GET':
            try:
                experiment = Experiment.objects.get(id=experiment_id)
            except Experiment.DoesNotExist:
                return HttpResponseNotFound()
            print(experiment.agents)
            experiment = model_to_dict(experiment)
            experiment.pop('user')
            return JsonResponse(experiment)
        elif request.method == 'PUT':
            pass
            jsonData = json.loads(request.body.decode())
            name = jsonData['name']
            instruction = jsonData['instruction']
            scenario = jsonData['scenario']
            try:
                experiment = Experiment.objects.get(id=experiment_id)
            except Experiment.DoesNotExist:
                return HttpResponseNotFound()
            if request.user.id == experiment.user_id:
                experiment.name = name
                experiment.instruction = instruction
                experiment.scenario = scenario
                experiment.save()
                return HttpResponse(status=204)
            else:
                return HttpResponse(status=403)            
        elif request.method == 'DELETE':
            try:
                experiment = Experiment.objects.get(id=experiment_id)
            except Experiment.DoesNotExist:
                return HttpResponseNotFound()
            if request.user.id == experiment.user_id:
                experiment.delete()
                return HttpResponse(status=204)
            else:
                return HttpResponse(status=403)
        else:
            return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'])
    else:
        return HttpResponse(status=401)

# test
def testList(request, experiment_id):
    experiment_id = int(experiment_id)
    if request.user.is_authenticated:
        if request.method == 'GET':
            requestJsonData = json.loads(request.body.decode())

            hashids = Hashids(salt='DWOZ')

            link = hashids.encode(experiment_id)

            new_test = Test(experiment_id=experiment_id, link=link)
            new_test.user = request.user
            new_test.save()
            return JsonResponse()
        else:
            return HttpResponseNotAllowed(['GET'])
    else:
        return HttpResponse(status=401)

def testDetail(request, hash_id):
    test_id = int(test_id)
    if request.method == 'GET':
        try:
            test = Test.objects.get(id=test_id)
        except Test.DoesNotExist:
            return HttpResponseNotFound()
        print(test.agents)
        test = model_to_dict(test)
        test.pop('user')
        return JsonResponse(test)
    if request.user.is_authenticated:
        if request.method == 'PUT':
            pass
            jsonData = json.loads(request.body.decode())
            name = jsonData['name']
            instruction = jsonData['instruction']
            scenario = jsonData['scenario']
            try:
                test = Test.objects.get(id=test_id)
            except Test.DoesNotExist:
                return HttpResponseNotFound()
            if request.user.id == test.user_id:
                test.name = name
                test.instruction = instruction
                test.scenario = scenario
                test.save()
                return HttpResponse(status=204)
            else:
                return HttpResponse(status=403)            
        elif request.method == 'DELETE':
            try:
                test = Test.objects.get(id=test_id)
            except Test.DoesNotExist:
                return HttpResponseNotFound()
            if request.user.id == test.user_id:
                test.delete()
                return HttpResponse(status=204)
            else:
                return HttpResponse(status=403)
        else:
            return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'])
    else:
        return HttpResponse(status=401)


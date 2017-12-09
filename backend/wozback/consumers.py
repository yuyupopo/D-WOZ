import json
import logging
from django.http import HttpResponse
from django.forms.models import model_to_dict
from channels import Channel, Group
from channels.handler import AsgiHandler
from channels.sessions import channel_session
from channels.auth import channel_session_user, channel_session_user_from_http
from .models import *
import logging
import pdb

log = logging.getLogger(__name__)

def http_consumer(message):
    # Make standard HTTP response - access ASGI path attribute directly
    response = HttpResponse("Hello world! You asked for %s" % message.content['path'])
    # Encode that response into message format (ASGI)
    for chunk in AsgiHandler.encode_response(response):
        message.reply_channel.send(chunk)

@channel_session
def ws_connect(message):
    print(message)
    message.reply_channel.send({"accept": True})
    


    # try:
    #     prefix, label = message['path'].strip('/').split('/')
    #     if prefix != 'chat':
    #         log.debug('invalid ws path=%s', message['path'])
    #         return
    #     room = Room.objects.get(label=label)
    # except ValueError:
    #     log.debug('invalid ws path=%s', message['path'])
    #     return
    # except Room.DoesNotExist:
    #     log.debug('ws room does not exist label=%s', label)
    #     return
 
    # log.debug('chat connect room=%s client=%s:%s path=%s reply_channel=%s', 
    #     room.label, message['client'][0], message['client'][1], message['path'], message.reply_channel)
    
    # # Need to be explicit about the channel layer so that testability works
    # # This may be a FIXME?
    # message.reply_channel.send({"accept": True})
    

# Connected to websocket.receive
@channel_session
def ws_message(message):
    print(message)
    
    try:
        text = json.loads(message.content['text'].replace("'", "\""))
        command = text['header']
        body = text['body']
    except KeyError:
        message.reply_channel.send({"text": 
                json.dumps({"header": "response", "accept": 'False', "body": "header and body needed"})})
        return
    except ValueError:
        message.reply_channel.send({"text":
                json.dumps({"header": "response", "accept": 'False', "body": "header and body needed"})})
        return
    
    if not command:
        message.reply_channel.send({"text":
                json.dumps({"header": "response", "accept": 'False', "body": "empty command"})})
        return

    if command == 'start_experiment':
        try:
            experiment_id = int(body['experiment_id'])
            experiment = Experiment.objects.get(id=experiment_id)
        except KeyError:
            message.reply_channel.send({"text": 
                json.dumps({"header": "start_experiment", "accept": 'False', "body": "experiment id not integer"})})
            return
        except Experiment.DoesNotExist:
            message.reply_channel.send({
                "text": json.dumps({"header": "start_experiment", "accept": 'False', "body": "experiment not exist"})})
            return
        
        Group('test-apprentice'+str(experiment_id), channel_layer=message.channel_layer).add(message.reply_channel)
        message.channel_session['experiment_id'] = int(experiment.id)

        e = {'id': experiment_id, 'instruction': experiment.instruction, 'scenario': experiment.scenario}

        Group('test-apprentice'+str(experiment_id), channel_layer=message.channel_layer).send({"text": 
            json.dumps({"header": "start_experiment", "accept": 'True', "body": e })})
        Group('test_wizard-'+str(experiment_id), channel_layer=message.channel_layer).send({"text": 
            json.dumps({"header": "start_experiment", "accept": 'True', "body": e })})
        return 
    
    elif command == 'start_supervision':
        experiment_id = int(body['experiment_id'])
        Group('test_wizard-'+str(experiment_id), channel_layer=message.channel_layer).add(message.reply_channel)
        message.reply_channel.send({"text": 
                json.dumps({"header": "start_supervision", "accept": 'True', "body": 'ok' })})
        return 

    elif command == 'send_trigger':
        try:
            trigger = str(body['trigger'])
            experiment_id = int(message.channel_session['experiment_id'])
            experiment = Experiment.objects.get(id=experiment_id)
        except KeyError:
            message.reply_channel.send({"text": 
                json.dumps({"header": "send_trigger", "accept": 'False', "body": "experiment id not integer"})})
            return
        except Experiment.DoesNotExist:
            message.reply_channel.send({
                "text": json.dumps({"header": "send_trigger", "accept": 'False', "body": "experiment not exist"})})
            return

        agent_id = experiment.agents.all()[0].id
        triggers = Trigger.objects.filter(agent_id=agent_id).values('trigger', 'dialog_id')
        triggerList = [trigger['trigger'] for trigger in triggers ]
        print(triggerList)

        selectedTriggerIdx = matchString(trigger, triggerList)
        print (selectedTriggerIdx)
        if (selectedTriggerIdx >= 0):
            nextDialogId = triggers[selectedTriggerIdx]['dialog_id']
            try:
                dialog = Dialog.objects.get(id=nextDialogId)
            except Dialog.DoesNotExist:
                message.reply_channel.send({"text": 
                    json.dumps({"header": "send_action", "accept": 'False', "body": 'no dialog' })})

            print(dialog)
            message.channel_session['dialog_id'] = int(dialog.id)
            Group('test-apprentice'+str(experiment_id), channel_layer=message.channel_layer).send({"text": 
                json.dumps({"header": "send_action", "accept": 'True', "body": dialog.action })})
            Group('test_wizard-'+str(experiment_id), channel_layer=message.channel_layer).send({"text": 
                json.dumps({"header": "send_action", "accept": 'True', "body": {'behavior': trigger, 'action': dialog.action} })})
        else: 
            message.reply_channel.send({"text": 
                json.dumps({"header": "send_action", "accept": 'False', "body": 'no trigger' })})
            Group('test_wizard-'+str(experiment_id), channel_layer=message.channel_layer).send({"text": 
                json.dumps({"header": "send_action", "accept": 'False', "body": {'err': 'no trigger', 'behavior': trigger, 'hypothesisList': triggerList} })})
                
        return 

    elif command == 'send_behavior':
        try:
            behavior = str(body['behavior'])
            dialog_id = int(message.channel_session['dialog_id'])
            experiment_id = int(message.channel_session['experiment_id'])
            experiment = Experiment.objects.get(id=experiment_id)
        except KeyError:
            message.reply_channel.send({"text": 
                json.dumps({"header": "send_behavior", "accept": 'False', "body": "experiment id not integer"})})
            return
        except Experiment.DoesNotExist:
            message.reply_channel.send({
                "text": json.dumps({"header": "send_behavior", "accept": 'False', "body": "experiment not exist"})})
            return

        behaviors = Behavior.objects.filter(dialog_id=dialog_id).values('behavior', 'next_dialog')
        nextDialogId = -1
        print('user behavior', behavior)
        for b in behaviors:
            
            hypothesis = b['behavior']
            print('hypothesis', hypothesis)
            if (hypothesis == behavior):
                nextDialogId = b['next_dialog']
                break
        
        print(nextDialogId)

        if (nextDialogId >= 0):
            try:
                dialog = Dialog.objects.get(id=nextDialogId)
            except Dialog.DoesNotExist:
                message.reply_channel.send({"text": 
                    json.dumps({"header": "send_action", "accept": 'False', "body": 'no dialog' })})

            print(dialog)
            message.channel_session['dialog_id'] = nextDialogId
            Group('test-apprentice'+str(experiment_id), channel_layer=message.channel_layer).send({"text": 
                json.dumps({"header": "send_action", "accept": 'True', "body": dialog.action })})
            Group('test_wizard-'+str(experiment_id), channel_layer=message.channel_layer).send({"text": 
                json.dumps({"header": "send_action", "accept": 'True', "body": {'behavior': behavior, 'action': dialog.action} })})
        else: 
            message.reply_channel.send({"text": 
                json.dumps({"header": "send_action", "accept": 'False', "body": 'no hypothesis' })})

            behaviors = [b['behavior'] for b in list(behaviors)]

            Group('test_wizard-'+str(experiment_id), channel_layer=message.channel_layer).send({"text": 
                json.dumps({"header": "send_action", "accept": 'False', "body": {'err': 'no hypothesis', 'behavior': behavior, 'hypothesisList': behaviors} })})
        return 
    

@channel_session_user
# Connected to websocket.disconnect
def ws_disconnect(message):
    Group("chat").discard(message.reply_channel)

def matchString(str, list):
    for i in range(len(list)):
        print (list[i], str)
        if list[i] == str:
            return i
    return -1
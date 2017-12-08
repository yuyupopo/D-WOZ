from django.db import models
from django.conf import settings
from django.contrib.auth.models import User

class Agent(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='agents'
    )
    name = models.CharField(max_length = 100, help_text = 'agent name is max 100 characters')
    explanation = models.TextField()

    def __str__(self):
        return 'Agent: ' + self.name

    def getTriggers(self):
        return [{"id": trigger['id'], "trigger": trigger['trigger'], "dialog": trigger['dialog_id']} for trigger in self.triggers.values()]

    def getDialogs(self):
        return [{"id": dialog.id, "action":dialog.action, "behavior": dialog.getBehavior()} for dialog in self.dialogs.all()]

    def getBehaviors(self):
        return [{"id": b.id, "behavior": b.behavior, "next_dialog": b.next_dialog_id } for b in self.behaviors.all()]

class Trigger(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='triggers'
    )
    trigger = models.CharField(max_length = 100, help_text = 'trigger is max 100 characters')
    agent = models.ForeignKey(
        Agent,
        related_name='triggers',
        null = True
    )
    dialog = models.OneToOneField(
        'Dialog',
        related_name='trigger',
        null = True
    )
    def __str__(self):
        return 'Trigger: ' + self.trigger

class Dialog(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='dialogs',
        null = True
    )
    agent = models.ForeignKey(
        Agent,
        related_name='dialogs',
        null = True
    )
    action = models.CharField(max_length = 100, help_text = 'dialog is max 100 characters')
    def __str__(self):
        return 'Dialog: ' + self.action 

    def getBehavior(self):
        return [behavior['id'] for behavior in self.behaviors.values()]

class Behavior(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='behaviors'
    )
    agent = models.ForeignKey(
        Agent,
        related_name='behaviors',
        null = True
    )
    dialog = models.ForeignKey(
        Dialog,
        related_name='behaviors',
        null = True
    )
    behavior = models.CharField(max_length = 100, help_text = 'agent name is max 100 characters')
    next_dialog = models.OneToOneField(
        Dialog,
        related_name='prev_behavior',
        blank = True,
        null = True
    )
    def __str__(self):
        return 'Behavior: ' + self.behavior

class Experiment(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='experiments'
    )
    name = models.TextField(max_length=100, help_text = 'agent name is max 100 characters' )
    instruction = models.TextField()
    scenario = models.TextField()
    agents = models.ManyToManyField(
        Agent,
        related_name='experiments'
    )

    def __str__(self):
        return 'Experiment: ' + self.name

class ExperimentResult(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='results'
    )
    experiment = models.ForeignKey(
        Experiment,
        related_name='results',
        null = True
    )
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return 'Result: ' + self.experiment.name + ", created at n" + self.created.strftime('%d %B %Y')

class Test(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='tests'
    )
    experiment = models.OneToOneField(
        Experiment,
        related_name='test',
        null = True
    )
    link = models.CharField(max_length=100)
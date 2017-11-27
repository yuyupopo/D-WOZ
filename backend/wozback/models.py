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
    experiments = models.ManyToManyField(
        'Experiment',
        related_name='agents'
    )

class Trigger(models.Model):
    name = models.CharField(max_length = 100, help_text = 'agent name is max 100 characters')
    agent = models.ForeignKey(
        'Agent',
        related_name='triggers'
    )
    dialog = models.OneToOneField(
        'Dialog',
        related_name='trigger'
    )

class Dialog(models.Model):
    action = models.CharField(max_length = 100, help_text = 'agent name is max 100 characters')

class Behavior(models.Model):
    dialog = models.ForeignKey(
        'Dialog',
        related_name='behaviors'
    )
    behavior = models.CharField(max_length = 100, help_text = 'agent name is max 100 characters')
    next_dialog = models.ForeignKey(
        'Dialog',
        related_name='prev_behavior'
    )

class Experiment(models.Model):
    pass
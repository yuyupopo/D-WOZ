from django.contrib import admin
from .models import Agent, Dialog, Behavior, Experiment

# Register your models here.
admin.site.register(Agent)
admin.site.register(Dialog)
admin.site.register(Behavior)
admin.site.register(Experiment)
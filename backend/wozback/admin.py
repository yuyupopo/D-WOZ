from django.contrib import admin
from .models import Agent, Trigger, Dialog, Behavior, Experiment, ExperimentResult

# Register your models here.
admin.site.register(Agent)
admin.site.register(Trigger)
admin.site.register(Dialog)
admin.site.register(Behavior)
admin.site.register(Experiment)
admin.site.register(ExperimentResult)
# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-12-02 02:13
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Agent',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='agent name is max 100 characters', max_length=100)),
                ('explanation', models.TextField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='agents', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Behavior',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('behavior', models.CharField(help_text='agent name is max 100 characters', max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Dialog',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('action', models.CharField(help_text='dialog is max 100 characters', max_length=100)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='dialogs', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Experiment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(help_text='agent name is max 100 characters', max_length=100)),
                ('instruction', models.TextField()),
                ('scenario', models.TextField()),
                ('agents', models.ManyToManyField(related_name='experiments', to='wozback.Agent')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='experiments', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ExperimentResult',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('experiment', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='results', to='wozback.Experiment')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='results', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Trigger',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('trigger', models.CharField(help_text='trigger is max 100 characters', max_length=100)),
                ('agent', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='triggers', to='wozback.Agent')),
                ('dialog', models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='trigger', to='wozback.Dialog')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='triggers', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='behavior',
            name='dialog',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='behaviors', to='wozback.Dialog'),
        ),
        migrations.AddField(
            model_name='behavior',
            name='next_dialog',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='prev_behavior', to='wozback.Dialog'),
        ),
        migrations.AddField(
            model_name='behavior',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='behaviors', to=settings.AUTH_USER_MODEL),
        ),
    ]

# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-12-02 05:34
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('wozback', '0005_auto_20171202_0506'),
    ]

    operations = [
        migrations.AddField(
            model_name='behavior',
            name='agent',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='behaviors', to='wozback.Agent'),
        ),
        migrations.AddField(
            model_name='behavior',
            name='user',
            field=models.ForeignKey(default=2, on_delete=django.db.models.deletion.CASCADE, related_name='behaviors', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='dialog',
            name='agent',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='dialogs', to='wozback.Agent'),
        ),
        migrations.AddField(
            model_name='dialog',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='dialogs', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='experimentresult',
            name='user',
            field=models.ForeignKey(default=2, on_delete=django.db.models.deletion.CASCADE, related_name='results', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='trigger',
            name='user',
            field=models.ForeignKey(default=2, on_delete=django.db.models.deletion.CASCADE, related_name='triggers', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]

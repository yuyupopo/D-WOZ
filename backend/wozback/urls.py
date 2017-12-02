from django.conf.urls import url
from wozback import views
from channels.routing import route

from wozback.consumers import ws_add, ws_message, ws_disconnect

urlpatterns = [
    url('^signup$', views.signup, name='signup'),
    url('^signin$', views.signin, name='signin'),
    url('^signout$', views.signout, name='signout'),
    url('^token$', views.token, name='token'),
    url(r'^agent$', views.agentList, name='agentList'),
    url(r'^agent/(?P<agent_id>[0-9]+)$', views.agentDetail, name='agentDetail'),
    url(r'^trigger$', views.triggerList, name='triggerList'),
    url(r'^trigger/(?P<trigger_id>[0-9]+)$', views.triggerDetail, name='triggerDetail'),

]

channel_routing = [
    # route("http.request", "wozback.consumers.http_consumer"),
    route("websocket.connect", ws_add),
    route("websocket.receive", ws_message),
    route("websocket.disconnect", ws_disconnect),
]


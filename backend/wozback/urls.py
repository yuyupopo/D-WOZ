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

    url(r'^experiment$', views.experimentList, name='experimentList'),
    url(r'^experiment/(?P<experiment_id>[0-9]+)$', views.experimentDetail, name='experimentDetail'),

    url(r'^experiment/(?P<experiment_id>[0-9]+)/test$', views.experimentTestList, name='experimentTestList'),
    url(r'^test/(?P<hash_id>[a-zA-Z0-9]+)$', views.testDetail, name='testDetail'),
]

channel_routing = [
    # route("http.request", "wozback.consumers.http_consumer"),
    route("websocket.connect", ws_add),
    route("websocket.receive", ws_message),
    route("websocket.disconnect", ws_disconnect),
]


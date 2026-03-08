from django.urls import path
from . import views

urlpatterns = [
    path("", views.dashboard, name="dashboard"),
    path("components/", views.components, name="components"),
    path("forms/", views.forms_demo, name="forms"),
    path("chat/", views.chat_demo, name="chat"),
    path("analytics/", views.analytics, name="analytics"),
    path("ui/", views.ui_components, name="ui_components"),
    path("users/", views.users, name="users"),
    path("messages/", views.messages_demo, name="messages"),
    path("settings/", views.settings_page, name="settings"),
    path("ai/", views.ai_assistant, name="ai_assistant"),
    path("docs/", views.docs_index, name="docs"),
    path("docs/<str:slug>/", views.docs_page, name="docs_page"),
]

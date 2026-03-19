import json
from pathlib import Path

import markdown as md
from django.http import Http404
from django.shortcuts import render

THEME_DOCS_DIR = Path(__file__).resolve().parent.parent / "theme" / "docs"

# Ordered list of docs for sidebar navigation
DOCS_PAGES = [
    {"slug": "STYLE_GUIDE", "title": "Style Guide", "icon": "palette"},
    {"slug": "LAYOUT", "title": "Layout", "icon": "layout"},
    {"slug": "COMPONENTS", "title": "Components", "icon": "layout-grid"},
    {"slug": "ANIMATIONS", "title": "Animations", "icon": "sparkles"},
    {"slug": "FORMS_TABLES", "title": "Forms & Tables", "icon": "file-text"},
    {"slug": "CHAT_INTERFACE", "title": "Chat Interface", "icon": "message-square"},
    {"slug": "DATA_VIZ", "title": "Data Visualization", "icon": "bar-chart-3"},
    {"slug": "UI_COMPONENTS", "title": "UI Components", "icon": "layers"},
    {"slug": "ACCESSIBILITY", "title": "Accessibility", "icon": "shield-check"},
    {"slug": "COMPONENT_INDEX", "title": "Component Index", "icon": "list"},
    {"slug": "INTEGRATION", "title": "Integration Reference", "icon": "plug"},
    {"slug": "MIGRATION", "title": "Migration Guide", "icon": "arrow-right-circle"},
]


def landing(request):
    return render(request, "demo/landing.html")


STATS = [
    {"title": "Total Users", "value": "12,847", "change": "+12.5%", "trend": "up", "icon": "users"},
    {"title": "Revenue", "value": "$48,352", "change": "+8.2%", "trend": "up", "icon": "dollar-sign"},
    {"title": "Active Sessions", "value": "1,429", "change": "-3.1%", "trend": "down", "icon": "activity"},
    {"title": "AI Queries", "value": "89,241", "change": "+24.7%", "trend": "up", "icon": "sparkles"},
]


def components(request):
    context = {
        "stats": STATS,
        "colors": [
            {"name": "Primary", "var": "primary", "hex": "#5E6AD2"},
            {"name": "Secondary", "var": "secondary", "hex": "#64748B"},
            {"name": "Tertiary", "var": "tertiary", "hex": "#8B5CF6"},
            {"name": "Accent", "var": "accent", "hex": "#0EA5E9"},
            {"name": "AI", "var": "ai", "hex": "#D946EF"},
            {"name": "Success", "var": "success", "hex": "#10B981"},
            {"name": "Danger", "var": "danger", "hex": "#EF4444"},
            {"name": "Warning", "var": "warning", "hex": "#F59E0B"},
            {"name": "Info", "var": "info", "hex": "#06B6D4"},
        ],
    }
    return render(request, "demo/components.html", context)


def forms_demo(request):
    from .forms import ContactForm, SearchForm, LoginForm, ValidationDemoForm

    context = {
        "contact_form": ContactForm(),
        "search_form": SearchForm(),
        "login_form": LoginForm(),
        "validation_form": ValidationDemoForm(),
        "table_data": [
            {"id": 1, "name": "Alice Chen", "initials": "AC", "email": "alice@example.com", "role": "Engineer", "status": "active", "last_active": "2 min ago"},
            {"id": 2, "name": "Bob Martinez", "initials": "BM", "email": "bob@example.com", "role": "Designer", "status": "active", "last_active": "15 min ago"},
            {"id": 3, "name": "Carol White", "initials": "CW", "email": "carol@example.com", "role": "Manager", "status": "away", "last_active": "1 hour ago"},
            {"id": 4, "name": "David Kim", "initials": "DK", "email": "david@example.com", "role": "Engineer", "status": "offline", "last_active": "3 hours ago"},
            {"id": 5, "name": "Eva Patel", "initials": "EP", "email": "eva@example.com", "role": "Support", "status": "active", "last_active": "5 min ago"},
            {"id": 6, "name": "Frank Liu", "initials": "FL", "email": "frank@example.com", "role": "Engineer", "status": "busy", "last_active": "30 min ago"},
            {"id": 7, "name": "Grace Obi", "initials": "GO", "email": "grace@example.com", "role": "Designer", "status": "active", "last_active": "Just now"},
            {"id": 8, "name": "Henry Ross", "initials": "HR", "email": "henry@example.com", "role": "Sales", "status": "offline", "last_active": "1 day ago"},
        ],
    }
    return render(request, "demo/forms_tables.html", context)


def chat_demo(request):
    context = {
        "channels": [
            {"name": "general", "icon": "hash", "unread": 0, "active": False},
            {"name": "engineering", "icon": "hash", "unread": 3, "active": True},
            {"name": "design", "icon": "hash", "unread": 0, "active": False},
            {"name": "ai-research", "icon": "sparkles", "unread": 1, "active": False},
        ],
        "dms": [
            {"name": "Alice Chen", "status": "online", "unread": 0},
            {"name": "Bob Martinez", "status": "away", "unread": 2},
            {"name": "AI Assistant", "status": "online", "unread": 0},
        ],
        "messages": [
            {
                "id": 1,
                "type": "system",
                "body": "Carol White joined #engineering",
            },
            {
                "id": 2,
                "type": "user",
                "author": "Alice Chen",
                "initials": "AC",
                "timestamp": "10:23 AM",
                "is_self": True,
                "body": "Hey team, I've pushed the new API changes to staging. Can someone review the auth middleware?",
                "reactions": [
                    {"emoji": "👍", "count": 3, "active": False},
                    {"emoji": "👀", "count": 1, "active": True},
                ],
                "thread_count": 2,
                "thread_preview": "Bob: I'll take a look...",
                "thread_replies": [
                    {
                        "author": "Bob Martinez",
                        "initials": "BM",
                        "timestamp": "10:31 AM",
                        "body": "I'll take a look at the auth changes this afternoon.",
                    },
                    {
                        "author": "Alice Chen",
                        "initials": "AC",
                        "timestamp": "10:33 AM",
                        "body": "Thanks Bob! Pay special attention to the token refresh logic.",
                    },
                ],
            },
            {
                "id": 3,
                "type": "user",
                "author": "Bob Martinez",
                "initials": "BM",
                "timestamp": "10:35 AM",
                "body": "Also, here's the updated API spec for the new endpoints.",
                "attachments": [
                    {"name": "api-spec-v2.pdf", "size": "2.4 MB", "icon": "file-text"},
                    {"name": "schema.json", "size": "18 KB", "icon": "file-code"},
                ],
            },
            {
                "id": 4,
                "type": "ai",
                "author": "AI Assistant",
                "timestamp": "10:42 AM",
                "body": "I've analyzed the auth middleware changes. Here's a summary:\n\n**Changes detected:**\n\n- Token refresh now uses sliding window expiration\n- Added rate limiting per user (100 req/min)\n- New `X-Auth-Version` header for API versioning",
                "reactions": [
                    {"emoji": "🎯", "count": 2, "active": False},
                    {"emoji": "🙏", "count": 1, "active": False},
                ],
                "embed": {
                    "type": "Code Review",
                    "icon": "git-pull-request",
                    "title": "PR #247: Auth middleware refactor",
                    "status": "success",
                    "status_text": "All checks passed",
                },
            },
            {
                "id": 5,
                "type": "user",
                "author": "Bob Martinez",
                "initials": "BM",
                "timestamp": "10:44 AM",
                "body": "Here's what I found in the **auth middleware**:\n\n"
                        "- Token refresh uses `sliding_window` strategy\n"
                        "- Rate limit: `100 req/min` per user\n"
                        "- New header: `X-Auth-Version`\n\n"
                        "Looks solid! See the [PR diff](#) for details.\n\n"
                        "```python\ndef refresh_token(request):\n    token = request.auth\n    if token.is_expired():\n        return Token.objects.create(user=token.user)\n```",
            },
            {
                "id": 6,
                "type": "user",
                "author": "Alice Chen",
                "initials": "AC",
                "timestamp": "10:45 AM",
                "is_self": True,
                "body": "Perfect analysis! Can you also check for any potential security issues?",
            },
            {
                "id": 7,
                "type": "ai",
                "author": "AI Assistant",
                "timestamp": "10:46 AM",
                "body": "",
                "streaming": True,
                "streaming_text": "I've reviewed the code for security vulnerabilities. The implementation looks solid overall. The token refresh mechanism properly invalidates old tokens, and the rate limiting will help prevent brute-force attacks. One suggestion: consider adding CSRF protection to the token refresh endpoint.",
            },
        ],
    }
    return render(request, "demo/chat.html", context)


def analytics(request):
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    revenue = [32, 38, 42, 35, 48, 52, 45, 58, 62, 55, 68, 72]
    expenses = [22, 25, 28, 24, 30, 32, 28, 35, 38, 33, 40, 42]

    ai_hours = [f"{h}:00" for h in range(24)]
    ai_data = [120, 85, 60, 45, 38, 52, 95, 180, 320, 450, 520, 480,
               420, 460, 510, 490, 380, 350, 420, 380, 290, 220, 180, 150]

    activity_data = [1240, 1580, 1420, 1680, 1520, 890, 720]

    sources_chart = [
        {"value": 42, "name": "Direct", "itemStyle": {"color": "#5E6AD2"}},
        {"value": 28, "name": "Search", "itemStyle": {"color": "#0EA5E9"}},
        {"value": 18, "name": "Social", "itemStyle": {"color": "#D946EF"}},
        {"value": 8, "name": "Referral", "itemStyle": {"color": "#10B981"}},
        {"value": 4, "name": "Email", "itemStyle": {"color": "#F59E0B"}},
    ]

    traffic_sources = [
        {"name": "Direct", "pct": 42, "color": "#5E6AD2"},
        {"name": "Search", "pct": 28, "color": "#0EA5E9"},
        {"name": "Social", "pct": 18, "color": "#D946EF"},
        {"name": "Referral", "pct": 8, "color": "#10B981"},
        {"name": "Email", "pct": 4, "color": "#F59E0B"},
    ]

    sparkline_data = [
        {"x": months[-7:], "y": [32, 35, 42, 38, 48, 52, 58], "color": "#5E6AD2"},
        {"x": months[-7:], "y": [8200, 8500, 8900, 9200, 9800, 10400, 12847], "color": "#0EA5E9"},
        {"x": months[-7:], "y": [92, 94, 91, 95, 93, 96, 94], "color": "#10B981"},
        {"x": months[-7:], "y": [45000, 52000, 58000, 64000, 72000, 80000, 89241], "color": "#D946EF"},
    ]

    context = {
        "kpis": [
            {
                "label": "Revenue",
                "value": "$72.4K",
                "change": "+12.5%",
                "trend": "up",
                "icon": "dollar-sign",
                "color": "primary",
                "sparkline": True,
                "detail": "vs $64.3K last month",
                "progress": None,
                "progress_label": "",
            },
            {
                "label": "Total Users",
                "value": "12,847",
                "change": "+24.1%",
                "trend": "up",
                "icon": "users",
                "color": "accent",
                "sparkline": True,
                "detail": "+2,647 this month",
                "progress": None,
                "progress_label": "",
            },
            {
                "label": "Uptime",
                "value": "99.94%",
                "change": "+0.02%",
                "trend": "up",
                "icon": "activity",
                "color": "success",
                "sparkline": True,
                "detail": "SLA target: 99.9%",
                "progress": None,
                "progress_label": "",
            },
            {
                "label": "AI Queries",
                "value": "89.2K",
                "change": "+34.7%",
                "trend": "up",
                "icon": "sparkles",
                "color": "ai",
                "sparkline": True,
                "detail": "Peak: 520 req/hr",
                "progress": None,
                "progress_label": "",
            },
        ],
        "months": json.dumps(months),
        "revenue_data": json.dumps(revenue),
        "expenses_data": json.dumps(expenses),
        "sources_chart_data": json.dumps(sources_chart),
        "traffic_sources": traffic_sources,
        "activity_data": json.dumps(activity_data),
        "ai_hours": json.dumps(ai_hours),
        "ai_data": json.dumps(ai_data),
        "sparkline_data": json.dumps(sparkline_data),
        "perf_metrics": [
            {"name": "Avg Response", "value": "142ms", "color": "#5E6AD2"},
            {"name": "Error Rate", "value": "0.06%", "color": "#10B981"},
            {"name": "Throughput", "value": "2.4K/s", "color": "#0EA5E9"},
            {"name": "P99 Latency", "value": "380ms", "color": "#F59E0B"},
            {"name": "Cache Hit", "value": "96.2%", "color": "#8B5CF6"},
        ],
        "top_pages": [
            {"path": "/dashboard", "visitors": "4,281", "bounce": 32, "avg_time": "3m 42s", "trend": "up", "change": "+12%"},
            {"path": "/api/v2/auth", "visitors": "3,847", "bounce": 18, "avg_time": "0m 08s", "trend": "up", "change": "+28%"},
            {"path": "/chat", "visitors": "2,193", "bounce": 25, "avg_time": "8m 15s", "trend": "up", "change": "+45%"},
            {"path": "/settings", "visitors": "1,456", "bounce": 52, "avg_time": "2m 10s", "trend": "down", "change": "-5%"},
            {"path": "/docs/api", "visitors": "1,102", "bounce": 65, "avg_time": "5m 30s", "trend": "up", "change": "+8%"},
            {"path": "/billing", "visitors": "894", "bounce": 41, "avg_time": "1m 55s", "trend": "down", "change": "-3%"},
        ],
    }
    return render(request, "demo/analytics.html", context)


def ui_components(request):
    context = {
        "progress_colors": [
            {"name": "primary", "label": "Primary", "value": 75},
            {"name": "success", "label": "Success", "value": 88},
            {"name": "danger", "label": "Danger", "value": 32},
            {"name": "warning", "label": "Warning", "value": 60},
            {"name": "info", "label": "Info", "value": 45},
            {"name": "ai", "label": "AI", "value": 92},
            {"name": "accent", "label": "Accent", "value": 55},
        ],
        "timeline_events": [
            {"time": "2 minutes ago", "title": "Deployment completed", "desc": "v2.4.1 deployed to production successfully.", "color": "success", "icon": "check"},
            {"time": "15 minutes ago", "title": "AI analysis started", "desc": "Running security scan on auth middleware.", "color": "ai", "icon": "sparkles"},
            {"time": "1 hour ago", "title": "PR merged", "desc": "PR #247 merged into main by Alice Chen.", "color": "primary", "icon": "git-merge"},
            {"time": "3 hours ago", "title": "Build failed", "desc": "CI pipeline failed on test_auth_refresh.", "color": "danger", "icon": "x"},
            {"time": "5 hours ago", "title": "Issue created", "desc": "Token refresh race condition reported.", "color": "warning", "icon": "alert-triangle"},
            {"time": "Yesterday", "title": "Sprint started", "desc": "Sprint 24 kicked off with 18 story points.", "color": "info", "icon": "play"},
        ],
    }
    return render(request, "demo/ui_components.html", context)


def users(request):
    context = {
        "users": [
            {
                "name": "Alice Chen",
                "email": "alice@synth.io",
                "initials": "AC",
                "avatar_color": "primary",
                "presence": "online",
                "role": "Admin",
                "role_color": "primary",
                "status": "Active",
                "status_color": "success",
                "last_active": "Just now",
            },
            {
                "name": "Marcus Johnson",
                "email": "marcus@synth.io",
                "initials": "MJ",
                "avatar_color": "accent",
                "presence": "online",
                "role": "Editor",
                "role_color": "info",
                "status": "Active",
                "status_color": "success",
                "last_active": "5 min ago",
            },
            {
                "name": "Priya Sharma",
                "email": "priya@synth.io",
                "initials": "PS",
                "avatar_color": "ai",
                "presence": "away",
                "role": "Admin",
                "role_color": "primary",
                "status": "Active",
                "status_color": "success",
                "last_active": "20 min ago",
            },
            {
                "name": "David Kim",
                "email": "david@synth.io",
                "initials": "DK",
                "avatar_color": "success",
                "presence": "busy",
                "role": "Viewer",
                "role_color": "secondary",
                "status": "Active",
                "status_color": "success",
                "last_active": "1 hour ago",
            },
            {
                "name": "Sofia Rodriguez",
                "email": "sofia@synth.io",
                "initials": "SR",
                "avatar_color": "warning",
                "presence": "online",
                "role": "Editor",
                "role_color": "info",
                "status": "Active",
                "status_color": "success",
                "last_active": "12 min ago",
            },
            {
                "name": "James Okafor",
                "email": "james@synth.io",
                "initials": "JO",
                "avatar_color": "tertiary",
                "presence": "offline",
                "role": "Viewer",
                "role_color": "secondary",
                "status": "Inactive",
                "status_color": "danger",
                "last_active": "3 days ago",
            },
            {
                "name": "Lina Tanaka",
                "email": "lina@synth.io",
                "initials": "LT",
                "avatar_color": "danger",
                "presence": "online",
                "role": "Editor",
                "role_color": "info",
                "status": "Active",
                "status_color": "success",
                "last_active": "2 min ago",
            },
            {
                "name": "Erik Lindqvist",
                "email": "erik@synth.io",
                "initials": "EL",
                "avatar_color": "info",
                "presence": "offline",
                "role": "Viewer",
                "role_color": "secondary",
                "status": "Inactive",
                "status_color": "danger",
                "last_active": "2 weeks ago",
            },
        ],
    }
    return render(request, "demo/users.html", context)


def messages_demo(request):
    inbox = [
        {
            "name": "Bob Martinez",
            "initials": "BM",
            "preview": "That makes sense. I ran a quick query and the token table has grown by 40%.",
            "time": "2m ago",
            "color": "success",
            "status": "online",
            "unread": True,
            "active": True,
        },
        {
            "name": "Carol White",
            "initials": "CW",
            "preview": "Sprint retro notes are in the shared doc. Let me know if you have any additions.",
            "time": "1h ago",
            "color": "warning",
            "status": "offline",
            "unread": False,
            "active": False,
        },
        {
            "name": "AI Assistant",
            "initials": "AI",
            "preview": "Analysis complete: 3 security recommendations for the API gateway configuration.",
            "time": "2h ago",
            "color": "ai",
            "status": "online",
            "unread": True,
            "active": False,
        },
        {
            "name": "David Kim",
            "initials": "DK",
            "preview": "Pushed the fix for the race condition in token refresh. Can you merge when ready?",
            "time": "4h ago",
            "color": "info",
            "status": "busy",
            "unread": False,
            "active": False,
        },
        {
            "name": "Eva Patel",
            "initials": "EP",
            "preview": "Customer feedback report for Q4 is attached. Revenue metrics look promising.",
            "time": "Yesterday",
            "color": "danger",
            "status": "offline",
            "unread": False,
            "active": False,
        },
        {
            "name": "Priya Sharma",
            "initials": "PS",
            "preview": "Can you check the staging environment? The migration script needs review.",
            "time": "Yesterday",
            "color": "ai",
            "status": "away",
            "unread": False,
            "active": False,
        },
    ]

    active_thread = {
        "name": "Bob Martinez",
        "initials": "BM",
        "color": "success",
        "status": "online",
        "status_label": "Active now",
    }

    conversation = [
        {
            "author": "Bob Martinez",
            "initials": "BM",
            "color": "success",
            "time": "Today at 9:15 AM",
            "body": "Hey! I noticed some unusual latency spikes in the auth service logs this morning. Have you seen anything on your end?",
        },
        {
            "author": "Alice Chen",
            "initials": "AC",
            "color": "primary",
            "is_self": True,
            "time": "Today at 9:22 AM",
            "body": "Yeah, I saw those too. Looks like the token refresh endpoint is hitting the database more than expected. Could be the new sliding window implementation.",
        },
        {
            "author": "Bob Martinez",
            "initials": "BM",
            "color": "success",
            "time": "Today at 9:28 AM",
            "body": "That makes sense. I ran a quick query and the token table has grown by 40% since we deployed. We might need to add a cleanup job for expired tokens.",
            "attachments": [
                {"name": "query-results.csv", "icon": "file-text"},
                {"name": "latency-graph.png", "icon": "image"},
            ],
        },
        {
            "author": "Alice Chen",
            "initials": "AC",
            "color": "primary",
            "is_self": True,
            "time": "Today at 9:35 AM",
            "body": "Good catch. I'll set up a cron job to purge expired tokens every hour. Should bring the table size back down and fix the latency issue.",
        },
    ]

    context = {
        "inbox": inbox,
        "active_thread": active_thread,
        "conversation": conversation,
    }
    return render(request, "demo/messages.html", context)


def settings_page(request):
    context = {
        "user_profile": {
            "name": "Alice Chen",
            "initials": "AC",
            "email": "alice.chen@synth.io",
            "role": "Senior Engineer",
            "bio": "Full-stack engineer focused on AI-driven applications and distributed systems.",
        },
        "timezones": [
            {"value": "utc", "label": "UTC (Coordinated Universal Time)", "selected": False},
            {"value": "est", "label": "US/Eastern (EST/EDT)", "selected": False},
            {"value": "cst", "label": "US/Central (CST/CDT)", "selected": False},
            {"value": "pst", "label": "US/Pacific (PST/PDT)", "selected": True},
            {"value": "gmt", "label": "Europe/London (GMT/BST)", "selected": False},
            {"value": "cet", "label": "Europe/Berlin (CET/CEST)", "selected": False},
            {"value": "jst", "label": "Asia/Tokyo (JST)", "selected": False},
        ],
        "languages": [
            {"value": "en", "label": "English", "selected": True},
            {"value": "es", "label": "Spanish", "selected": False},
            {"value": "fr", "label": "French", "selected": False},
            {"value": "de", "label": "German", "selected": False},
            {"value": "ja", "label": "Japanese", "selected": False},
        ],
        "theme_options": [
            {"value": "light", "label": "Light", "icon": "sun", "selected": False},
            {"value": "dark", "label": "Dark", "icon": "moon", "selected": True},
            {"value": "system", "label": "System", "icon": "monitor", "selected": False},
        ],
        "accent_colors": [
            {"name": "Indigo", "value": "primary", "hex": "#5E6AD2", "selected": True},
            {"name": "Sky", "value": "accent", "hex": "#0EA5E9", "selected": False},
            {"name": "Violet", "value": "tertiary", "hex": "#8B5CF6", "selected": False},
            {"name": "Orchid", "value": "ai", "hex": "#D946EF", "selected": False},
            {"name": "Emerald", "value": "success", "hex": "#10B981", "selected": False},
            {"name": "Amber", "value": "warning", "hex": "#F59E0B", "selected": False},
        ],
        "font_sizes": [
            {"value": "compact", "label": "Compact", "description": "13px base — fits more content on screen.", "selected": False},
            {"value": "default", "label": "Default", "description": "15px base — balanced readability.", "selected": True},
            {"value": "comfortable", "label": "Comfortable", "description": "17px base — easier on the eyes.", "selected": False},
        ],
        "notification_groups": [
            {
                "title": "Email Notifications",
                "icon": "mail",
                "color": "primary",
                "items": [
                    {"label": "New messages", "description": "Receive an email when someone sends you a direct message.", "enabled": True},
                    {"label": "Weekly digest", "description": "Summary of activity, metrics, and AI insights every Monday.", "enabled": True},
                    {"label": "Security alerts", "description": "Get notified about sign-ins from new devices or locations.", "enabled": True},
                ],
            },
            {
                "title": "Push Notifications",
                "icon": "bell",
                "color": "primary",
                "items": [
                    {"label": "Real-time alerts", "description": "System alerts and threshold breaches delivered instantly.", "enabled": True},
                    {"label": "Mentions", "description": "Get notified when someone mentions you in a conversation.", "enabled": False},
                ],
            },
            {
                "title": "AI Notifications",
                "icon": "sparkles",
                "color": "ai",
                "items": [
                    {"label": "Analysis complete", "description": "Notified when an AI analysis finishes processing.", "enabled": True},
                    {"label": "Suggestions available", "description": "AI-generated recommendations ready for review.", "enabled": False},
                ],
            },
        ],
        "api_keys": [
            {
                "name": "Production API",
                "masked_key": "sk-prod-****************************a3Bf",
                "created": "Jan 15, 2026",
                "last_used": "2 hours ago",
            },
            {
                "name": "Staging Environment",
                "masked_key": "sk-stag-****************************k9Xm",
                "created": "Feb 28, 2026",
                "last_used": "5 days ago",
            },
            {
                "name": "CI/CD Pipeline",
                "masked_key": "sk-cicd-****************************w2Qr",
                "created": "Mar 01, 2026",
                "last_used": "12 minutes ago",
            },
        ],
    }
    return render(request, "demo/settings.html", context)


def ai_assistant(request):
    context = {
        "selected_model": "Claude 3.5 Sonnet",
        "models": [
            {"name": "Claude 3.5 Sonnet", "desc": "Fast & capable"},
            {"name": "GPT-4", "desc": "Broad reasoning"},
            {"name": "Llama 3.1 70B", "desc": "Open source"},
        ],
        "messages": [
            {
                "type": "ai",
                "author": "AI Assistant",
                "timestamp": "2:00 PM",
                "body": "Hello! I'm your AI assistant. I can help with **data analysis**, "
                        "**code generation**, **document summarization**, and more. "
                        "How can I help you today?",
            },
            {
                "type": "user",
                "author": "Alice Chen",
                "initials": "AC",
                "timestamp": "2:01 PM",
                "is_self": True,
                "body": "Can you help me analyze our Q4 sales data? I need to identify trends and outliers.",
            },
            {
                "type": "ai",
                "author": "AI Assistant",
                "timestamp": "2:01 PM",
                "body": "Of course! Here's what I found after analyzing your Q4 sales data:\n\n"
                        "**Key Trends:**\n\n"
                        "- Revenue grew **18.3%** quarter-over-quarter\n"
                        "- Enterprise segment outperformed SMB by **2.4x**\n"
                        "- Highest growth region: **APAC** (+32%)\n\n"
                        "**Outliers detected:**\n\n"
                        "```\n"
                        "Region     | Expected   | Actual     | Deviation\n"
                        "-----------|------------|------------|----------\n"
                        "APAC       | $1.2M      | $1.58M     | +31.7%\n"
                        "EMEA       | $2.1M      | $1.74M     | -17.1%\n"
                        "LATAM      | $480K      | $620K      | +29.2%\n"
                        "```\n\n"
                        "The EMEA dip correlates with the delayed product launch in October. "
                        "Would you like me to drill deeper into any region?",
            },
            {
                "type": "user",
                "author": "Alice Chen",
                "initials": "AC",
                "timestamp": "2:03 PM",
                "is_self": True,
                "body": "That's great. Can you write a SQL query to pull the raw data for the EMEA analysis?",
            },
            {
                "type": "ai",
                "author": "AI Assistant",
                "timestamp": "2:03 PM",
                "body": "Here's a query to pull the EMEA sales breakdown:\n\n"
                        "```sql\nSELECT \n"
                        "    p.product_name,\n"
                        "    DATE_TRUNC('month', o.order_date) AS month,\n"
                        "    COUNT(o.id) AS order_count,\n"
                        "    SUM(o.total_amount) AS revenue,\n"
                        "    AVG(o.total_amount) AS avg_order_value\n"
                        "FROM orders o\n"
                        "JOIN products p ON o.product_id = p.id\n"
                        "WHERE o.region = 'EMEA'\n"
                        "    AND o.order_date BETWEEN '2024-10-01' AND '2024-12-31'\n"
                        "GROUP BY p.product_name, month\n"
                        "ORDER BY month, revenue DESC;\n```\n\n"
                        "This groups by product and month so you can see exactly "
                        "which products underperformed during the October launch delay. "
                        "Want me to add any filters or breakdowns?",
            },
        ],
        "suggested_prompts": [
            {"title": "Analyze sales trends", "desc": "Identify patterns in revenue data", "icon": "trending-up"},
            {"title": "Generate SQL query", "desc": "Build complex database queries", "icon": "database"},
            {"title": "Summarize document", "desc": "Extract key points from text", "icon": "file-text"},
            {"title": "Debug this code", "desc": "Find and fix issues in your code", "icon": "bug"},
        ],
        "capabilities": [
            {"icon": "code", "label": "Code generation & review"},
            {"icon": "bar-chart-3", "label": "Data analysis & visualization"},
            {"icon": "file-search", "label": "Document summarization"},
            {"icon": "database", "label": "SQL query building"},
            {"icon": "shield-check", "label": "Security analysis"},
            {"icon": "languages", "label": "Multi-language translation"},
        ],
        "recent_conversations": [
            {"title": "API authentication refactor", "timestamp": "Yesterday, 4:30 PM"},
            {"title": "Q3 revenue forecast model", "timestamp": "Mar 5, 11:15 AM"},
            {"title": "Database migration strategy", "timestamp": "Mar 3, 9:00 AM"},
        ],
    }
    return render(request, "demo/ai_assistant.html", context)


def calendar_demo(request):
    return render(request, "demo/calendar.html")


def email_demo(request):
    return render(request, "demo/email.html")


def docs_index(request):
    """Redirect to first doc page."""
    return docs_page(request, DOCS_PAGES[0]["slug"])


def docs_page(request, slug):
    """Render a markdown doc from theme/docs/ as HTML."""
    filepath = THEME_DOCS_DIR / f"{slug}.md"
    if not filepath.is_file():
        raise Http404(f"Doc not found: {slug}")

    raw = filepath.read_text(encoding="utf-8")
    html = md.markdown(raw, extensions=["fenced_code", "tables", "toc", "nl2br"])

    # Find current page title
    current = next((p for p in DOCS_PAGES if p["slug"] == slug), None)
    title = current["title"] if current else slug

    context = {
        "doc_html": html,
        "doc_title": title,
        "doc_slug": slug,
        "docs_pages": DOCS_PAGES,
    }
    return render(request, "demo/docs.html", context)

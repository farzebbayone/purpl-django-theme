# Chat Interface

Slack-style full-width messaging with AI integration.

## Layout

```
┌─────────────────┬──────────────────────────────────┐
│ Channel List    │ Channel Header                    │
│                 ├──────────────────────────────────┤
│ # general       │ Messages                          │
│ # engineering   │   [system message]                │
│ # design        │   [user message + reactions]      │
│                 │   [AI message + embed]            │
│ Direct Messages │   [typing indicator]              │
│ ● Alice         ├──────────────────────────────────┤
│ ○ Bob           │ Composer                          │
│ ● AI Assistant  │   [toolbar] [input] [send]        │
└─────────────────┴──────────────────────────────────┘
```

## Message Types

### User Message
```html
<div class="message">
  <div class="message__row">
    <div class="message__avatar">AC</div>
    <div class="message__content">
      <div class="message__header">
        <span class="message__author">Alice Chen</span>
        <span class="message__timestamp">10:23 AM</span>
      </div>
      <div class="message__body"><p>Message text</p></div>
    </div>
  </div>
</div>
```

### Current User's Own Message
Add `.message--self` — subtle primary-tinted background to distinguish the logged-in user's messages from other users.

```html
<div class="message message--self">
  <!-- same structure as user message -->
</div>
```

### AI Message
Add `.message--ai` — avatar uses AI color, author label colored, optional AI badge.

### System Message
Add `.message--system` — no avatar, italic muted text, no header.

## Hover Actions

`.message__actions` — toolbar appears on message hover (top-right). Contains `.message__action-btn` buttons for reply, react, pin, more.

## Reactions

```html
<div class="reactions">
  <button class="reaction reaction--active">
    <span class="reaction__emoji">👍</span>
    <span class="reaction__count">3</span>
  </button>
</div>
```

## Threaded Replies

```html
<div class="thread">
  <button class="thread__toggle" data-thread-toggle="thread-1">
    <span class="thread__count">2 replies</span>
    <span class="thread__preview">Bob: I'll take a look...</span>
  </button>
  <div class="thread__replies" id="thread-1" style="display:none;">
    <!-- nested message rows -->
  </div>
</div>
```

## Typewriter / Streaming Effect

For AI responses that stream character-by-character:

```html
<div class="typewriter" data-typewriter
     data-typewriter-content="The full text to stream"
     data-typewriter-speed="20">
  <span class="typewriter__text"></span>
  <span class="typewriter__cursor"></span>
</div>
```

- `data-typewriter-content` — full text to display
- `data-typewriter-speed` — milliseconds per character (default: 20)
- `.typewriter__cursor` — blinking purple cursor (AI color)
- Auto-initializes on page load

**JS API** for dynamic use:
```js
var el = document.querySelector('.typewriter');
ThemeTypewriter.stream(el, "Text to stream", 20);
```

## Typing Indicator

```html
<div class="typing-indicator">
  <div class="typing-indicator__dots">
    <span class="typing-indicator__dot"></span>
    <span class="typing-indicator__dot"></span>
    <span class="typing-indicator__dot"></span>
  </div>
  <span>AI Assistant is thinking...</span>
</div>
```

## File Attachments

```html
<div class="message__attachments">
  <a href="#" class="message__attachment">
    <i data-lucide="file-text" class="message__attachment-icon"></i>
    <span class="message__attachment-name">document.pdf</span>
    <span class="message__attachment-size">2.4 MB</span>
  </a>
</div>
```

## Embedded Components

For inline cards within messages (code reviews, previews, etc.):

```html
<div class="message__embed">
  <div class="message__embed-header">
    <i data-lucide="git-pull-request"></i> Code Review
  </div>
  <div class="message__embed-body">
    Content here
  </div>
</div>
```

## Composer

```html
<div class="composer">
  <div class="composer__toolbar">
    <button class="composer__tool-btn" data-format="bold" title="Bold (Ctrl+B)">B</button>
    <button class="composer__tool-btn" data-format="italic" title="Italic (Ctrl+I)">I</button>
    <button class="composer__tool-btn" data-format="strikethrough" title="Strikethrough">S</button>
    <button class="composer__tool-btn" data-format="code" title="Code (Ctrl+E)">`</button>
    <button class="composer__tool-btn" data-format="link" title="Link (Ctrl+K)">🔗</button>
    <button class="composer__tool-btn" data-format="list" title="Bullet list">•</button>
    <button class="composer__tool-btn" data-format="list-ordered" title="Ordered list">1.</button>
    <button class="composer__tool-btn" data-format="blockquote" title="Quote">></button>
    <button class="composer__tool-btn" data-format="code-block" title="Code block">```</button>
  </div>
  <div class="composer__input-row">
    <textarea class="composer__input" placeholder="Message #channel"></textarea>
    <button class="btn btn-primary btn-sm composer__send">Send</button>
  </div>
</div>
```

### Formatting Toolbar

Add `data-format` attribute to `.composer__tool-btn` buttons. The theme JS automatically binds these to wrap selected text in the textarea with markdown-style formatting.

| `data-format` | Wraps with | Keyboard shortcut |
|----------------|------------|-------------------|
| `bold` | `**text**` | Ctrl/Cmd + B |
| `italic` | `_text_` | Ctrl/Cmd + I |
| `strikethrough` | `~~text~~` | — |
| `code` | `` `text` `` | Ctrl/Cmd + E |
| `link` | `[text](url)` | Ctrl/Cmd + K |
| `list` | `- text` | — |
| `list-ordered` | `1. text` | — |
| `blockquote` | `> text` | — |
| `code-block` | `` ```\ntext\n``` `` | — |

If text is selected, it wraps the selection. If nothing is selected, it inserts a placeholder and selects it.

The textarea auto-expands as content grows (up to `max-height: 10rem`). Enter sends, Shift+Enter adds a newline.

## Channel List

```html
<ul class="channel-list__items">
  <li class="channel-list__item channel-list__item--active">
    <i data-lucide="hash" class="channel-list__icon"></i>
    <span>general</span>
    <span class="channel-list__badge">3</span>
  </li>
</ul>
```

## Markdown Rendering

The theme includes a `|markdown` template filter that converts markdown text to HTML. This pairs with the composer formatting toolbar — users type markdown, and messages display as rich HTML.

### Setup

```python
# Already included via theme_tags — just load in your template:
{% load theme_tags %}
```

### Usage

```html
<div class="message__body">
  {{ msg.body|markdown }}
</div>
```

### Supported Syntax

| Syntax | Renders as |
|--------|------------|
| `**bold**` | **bold** |
| `_italic_` | *italic* |
| `~~strikethrough~~` | ~~strikethrough~~ |
| `` `inline code` `` | `inline code` |
| `[link](url)` | [link](url) |
| `- item` | bullet list |
| `1. item` | numbered list |
| `> quote` | blockquote |
| ` ```code``` ` | fenced code block |
| `| tables |` | HTML tables |

### Extensions Enabled

- **fenced_code** — triple-backtick code blocks with language hints
- **tables** — pipe-style markdown tables
- **nl2br** — newlines become `<br>` (chat-friendly)

All rendered HTML elements are already styled inside `.message__body` (code blocks, lists, blockquotes, tables, etc.).

### Security Note

The `|markdown` filter uses `mark_safe` — only use it with trusted content (e.g., your own users' messages). For untrusted input, sanitize first with `bleach` or similar.

---

## htmx Integration

```html
<!-- Send message -->
<form hx-post="/api/messages/" hx-target="#messages" hx-swap="beforeend">
  <textarea name="body" class="composer__input"></textarea>
  <button type="submit" class="btn btn-primary btn-sm">Send</button>
</form>

<!-- Load thread -->
<button hx-get="/api/thread/123/" hx-target="#thread-123" hx-swap="innerHTML"
        class="thread__toggle">
  2 replies
</button>

<!-- Toggle reaction -->
<button hx-post="/api/react/456/" hx-swap="outerHTML" class="reaction">
  <span class="reaction__emoji">👍</span>
  <span class="reaction__count">3</span>
</button>
```

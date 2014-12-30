---
---
var indexJson = [
{% for entry_hash in site.data.entries %}
    {% assign entry = entry_hash[1] %}
    {% assign i = forloop.index -1 %}
{
"id":"entry-{{forloop.index | minus:1}}",
"name":"{{entry.name}}",
"url":"{{entry.url}}",
"repoUrl":"{{entry.repoUrl}}",
"companyName":"{{entry.companyName}}",
"companyPage":"{{entry.companyUrl}}",
"languagesSupported":"{% for ls in entry.languagesSupported %}{{ls}},{% endfor %}",
"language":"{{entry.language}}",
"description":"{{entry.description | strip_newlines}}",
"tags":"{% for tag in entry.tags %}{{tag}},{% endfor %}"
} {% unless forloop.last %},{% endunless %}
{% endfor %}
]
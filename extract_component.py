import json
import os

log_path = r'C:\Users\Varun\.gemini\antigravity-ide\brain\1b52ec92-4e8f-4fdc-be5b-10f1cd304f19\.system_generated\logs\transcript_full.jsonl'
output_path = r'temp_component.json'

last_user_input = None

with open(log_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            entry = json.loads(line)
            if entry.get('type') == 'USER_INPUT':
                last_user_input = entry.get('content')
        except json.JSONDecodeError:
            pass

if last_user_input:
    # Try to parse the content as JSON (it starts with { "action": "pasted_component", ...)
    try:
        # It might have a prefix like <USER_REQUEST>\n
        content = last_user_input.strip()
        if content.startswith('<USER_REQUEST>'):
            content = content.replace('<USER_REQUEST>', '').replace('</USER_REQUEST>', '').strip()
            
        data = json.loads(content, strict=False)
        with open(output_path, 'w', encoding='utf-8') as out:
            json.dump(data, out)
        print("Successfully extracted to temp_component.json")
    except Exception as e:
        print(f"Failed to parse JSON: {e}")
else:
    print("No USER_INPUT found.")

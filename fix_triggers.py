import os
import re
import glob

migration_dir = 'supabase/migrations'
sql_files = glob.glob(os.path.join(migration_dir, '*.sql'))

# Pattern for CREATE TRIGGER trigger_name ... ON table_name
pattern = re.compile(r'(?i)create\s+trigger\s+([a-zA-Z0-9_]+)\s+(?:after|before|instead of)[\s\S]*?on\s+([a-zA-Z0-9_\.]+)')

for file_path in sql_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    triggers = pattern.findall(new_content)
    for trigger_name, table_name in triggers:
        drop_stmt = f'drop trigger if exists {trigger_name} on {table_name};'
        if drop_stmt.lower() not in new_content.lower():
            # Find the exact match
            match = re.search(r'(?i)create\s+trigger\s+' + re.escape(trigger_name) + r'\s+(?:after|before|instead of)[\s\S]*?on\s+' + re.escape(table_name), new_content)
            if match:
                create_stmt = match.group(0)
                new_content = new_content.replace(create_stmt, drop_stmt + '\n' + create_stmt)

    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed triggers in {os.path.basename(file_path)}")


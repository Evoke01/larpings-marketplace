import os
import re
import glob

migration_dir = 'supabase/migrations'
sql_files = glob.glob(os.path.join(migration_dir, '*.sql'))

# Pattern to find create policy and its table. We need to handle case-insensitivity and whitespace.
# We also want to only prepend if the drop doesn't already exist.
pattern = re.compile(r'(?i)create\s+policy\s+"([^"]+)"\s+on\s+([a-zA-Z0-9_\.]+)')
drop_pattern = re.compile(r'(?i)drop\s+policy\s+if\s+exists\s+"([^"]+)"')

for file_path in sql_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    lines = content.split('\n')
    new_lines = []
    
    i = 0
    while i < len(lines):
        line = lines[i]
        
        # Check if line has create policy (this regex is simple and works if they are on same or next line, but let's just do a full string replacement for robustness)
        i += 1

    # Alternative full string approach:
    # Find all matches of create policy
    matches = pattern.finditer(content)
    
    # We will reconstruct the file.
    # Actually, it's easier to find matches and then check if the previous statement was a drop for that policy.
    # Let's just do a simple replacement:
    
    new_content = content
    # Find all unique policies in this file
    policies = pattern.findall(new_content)
    for policy_name, table_name in policies:
        # Check if there is already a drop policy for this
        drop_stmt = f'drop policy if exists "{policy_name}" on {table_name};'
        if drop_stmt.lower() not in new_content.lower():
            # Replace the first occurrence of create policy (or all)
            # Find the exact create policy string
            match = re.search(r'(?i)create\s+policy\s+"' + re.escape(policy_name) + r'"\s+on\s+' + re.escape(table_name), new_content)
            if match:
                create_stmt = match.group(0)
                new_content = new_content.replace(create_stmt, drop_stmt + '\n' + create_stmt)

    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed {os.path.basename(file_path)}")


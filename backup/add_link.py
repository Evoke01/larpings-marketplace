import re

html = open('index.html', encoding='utf-8').read()

# Replace "Marketplace" link to also include a link to instagram.html
# We will just find one of the Marketplace links and duplicate it with modified href/text.

match = re.search(r'(<a[^>]*href="https://handles\.gg/marketplace"[^>]*>.*?</a>)', html)
if match:
    original = match.group(1)
    new_link = original.replace('https://handles.gg/marketplace', 'instagram.html')
    new_link = new_link.replace('Marketplace', 'Instagram')
    html = html.replace(original, new_link + original, 1)
    open('index.html', 'w', encoding='utf-8').write(html)
    print("Added Instagram link to navigation.")
else:
    print("Marketplace link not found.")

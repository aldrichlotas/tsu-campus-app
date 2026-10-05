import json
import os

with open('C:/Users/Aldrich/.gemini/antigravity-ide/brain/fab164f9-7436-4d05-8b37-eeeac438e488/.system_generated/steps/68/output.txt', encoding='utf-8') as f:
    data = json.load(f)

targets = [
    'Campus Hub (Collegiate)', 
    'Campus Shuttle (Collegiate)', 
    'Canteen Express (Collegiate)', 
    'Print Hub (Collegiate)', 
    'Merch Store (Collegiate CBA)'
]

screens = [s for s in data.get('screens', []) if s.get('title') in targets]

os.makedirs('d:/Coding/Jelo/.impeccable/screens', exist_ok=True)

for s in screens:
    # Use a safe filename
    filename = s.get('title').replace(' ', '-').replace('(', '').replace(')', '')
    filepath = f'd:/Coding/Jelo/.impeccable/screens/{filename}.json'
    with open(filepath, 'w', encoding='utf-8') as out:
        json.dump(s, out, indent=2)
        
print(f'Saved {len(screens)} screens')

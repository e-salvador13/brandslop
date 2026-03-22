#!/usr/bin/env python3
"""Generate logo images for example brands using Pollinations API."""

import urllib.request
import urllib.parse
import os
import time

LOGOS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'public', 'logos')
os.makedirs(LOGOS_DIR, exist_ok=True)

brands = [
    {
        'name': 'velta',
        'prompt': 'minimal flat vector logo symbol for Velta fintech brand, geometric diamond icon mark, clean simple design, purple and teal gradient on solid black background, professional brand identity, vector style, no text no letters no words no typography',
        'seed': 42,
    },
    {
        'name': 'kindling',
        'prompt': 'minimal flat vector logo symbol for Kindling specialty coffee roaster, warm flame icon mark, clean simple design, copper brown color palette on solid black background, professional brand identity, vector style, no text no letters no words no typography',
        'seed': 77,
    },
    {
        'name': 'arc',
        'prompt': 'minimal flat vector logo symbol for ARC fitness app, energetic arc curve icon mark, clean simple design, orange and lime green on solid black background, professional brand identity, vector style, no text no letters no words no typography',
        'seed': 99,
    },
]

for brand in brands:
    print(f"Generating {brand['name']} logo...")
    encoded = urllib.parse.quote(brand['prompt'])
    url = f"https://image.pollinations.ai/prompt/{encoded}?width=1024&height=1024&seed={brand['seed']}&model=flux&nologo=true"
    
    out_path = os.path.join(LOGOS_DIR, f"{brand['name']}.png")
    
    try:
        req = urllib.request.Request(url)
        req.add_header('User-Agent', 'BrandSlop/1.0')
        with urllib.request.urlopen(req, timeout=60) as resp:
            data = resp.read()
            # Check if it's actually an image (PNG starts with \x89PNG)
            if data[:4] == b'\x89PNG':
                with open(out_path, 'wb') as f:
                    f.write(data)
                print(f"  ✓ Saved {out_path} ({len(data)} bytes)")
            elif data[:3] == b'\xff\xd8\xff':
                # JPEG
                with open(out_path, 'wb') as f:
                    f.write(data)
                print(f"  ✓ Saved {out_path} ({len(data)} bytes, JPEG)")
            else:
                print(f"  ✗ Got non-image response: {data[:200]}")
        
        # Be nice to the API
        time.sleep(2)
    except Exception as e:
        print(f"  ✗ Error: {e}")

print("\nDone!")

#!/bin/bash
# Generate logo images for the 3 example brands using Pollinations API

LOGOS_DIR="$(dirname "$0")/../public/logos"
mkdir -p "$LOGOS_DIR"

echo "Generating Velta logo..."
PROMPT_VELTA="minimal flat vector logo symbol for Velta, modern fintech brand, geometric diamond icon mark, clean simple design, purple and teal color palette on solid black background, professional brand identity, vector style, no text no letters no words"
curl -sL "https://image.pollinations.ai/prompt/$(python3 -c "import urllib.parse; print(urllib.parse.quote('$PROMPT_VELTA'))")?width=1024&height=1024&seed=42&model=flux&nologo=true" -o "$LOGOS_DIR/velta.png"
echo "✓ Velta logo saved"

echo "Generating Kindling logo..."
PROMPT_KINDLING="minimal flat vector logo symbol for Kindling, specialty coffee roaster, warm flame icon mark, clean simple design, copper brown color palette on solid black background, professional brand identity, vector style, no text no letters no words"
curl -sL "https://image.pollinations.ai/prompt/$(python3 -c "import urllib.parse; print(urllib.parse.quote('$PROMPT_KINDLING'))")?width=1024&height=1024&seed=77&model=flux&nologo=true" -o "$LOGOS_DIR/kindling.png"
echo "✓ Kindling logo saved"

echo "Generating ARC logo..."
PROMPT_ARC="minimal flat vector logo symbol for ARC, data-driven fitness app, energetic arc curve icon mark, clean simple design, orange and lime green color palette on solid black background, professional brand identity, vector style, no text no letters no words"
curl -sL "https://image.pollinations.ai/prompt/$(python3 -c "import urllib.parse; print(urllib.parse.quote('$PROMPT_ARC'))")?width=1024&height=1024&seed=99&model=flux&nologo=true" -o "$LOGOS_DIR/arc.png"
echo "✓ ARC logo saved"

echo ""
echo "All logos generated in $LOGOS_DIR"
ls -la "$LOGOS_DIR"

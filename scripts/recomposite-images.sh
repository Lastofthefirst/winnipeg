#!/bin/bash
# Recomposite images onto correct parchment background (#F5EFE3)
# Uses ImageMagick floodfill 15% from corners - proven best approach
# Usage: ./scripts/recomposite-images.sh

set -e

PARCHMENT="#F5EFE3"
PUBLIC_DIR="$(cd "$(dirname "$0")/../public" && pwd)"

echo "Using parchment color: $PARCHMENT"
echo "Working in: $PUBLIC_DIR"
echo ""

# Function to process a single image with floodfill
process_image() {
    local src="$1"
    local dest="$2"
    local filename=$(basename "$src")

    # Clean up filename (remove _00001_ suffix if present)
    local clean_name=$(echo "$filename" | sed 's/_00001_//')
    local dest_file="$dest/$clean_name"

    echo "  Processing: $filename -> $clean_name"

    # Get dimensions
    local W=$(identify -format "%w" "$src")
    local H=$(identify -format "%h" "$src")
    local W1=$((W-1))
    local H1=$((H-1))

    # Floodfill 15% from all corners
    convert "$src" -fuzz 15% -fill "$PARCHMENT" \
        -draw "color 0,0 floodfill" \
        -draw "color 0,$H1 floodfill" \
        -draw "color $W1,0 floodfill" \
        -draw "color $W1,$H1 floodfill" \
        "$dest_file"
}

# Function to process a directory
process_directory() {
    local src_dir="$1"
    local dest_dir="$2"

    if [ ! -d "$src_dir" ]; then
        echo "Source directory not found: $src_dir"
        return
    fi

    echo ""
    echo "=== Processing $src_dir ==="
    echo "    Output to: $dest_dir"

    mkdir -p "$dest_dir"

    for img in "$src_dir"/*.png; do
        [ -f "$img" ] || continue
        process_image "$img" "$dest_dir"
    done
}

# Process flower patches from ComfyUI output
if [ -d "/home/quddus/sd/ComfyUI/output/flower-patches" ]; then
    process_directory "/home/quddus/sd/ComfyUI/output/flower-patches" "$PUBLIC_DIR/flowers-clean"
fi

# Process other directories as needed
# process_directory "$PUBLIC_DIR/background-art-v2" "$PUBLIC_DIR/background-art-clean"
# process_directory "$PUBLIC_DIR/background-art-garden" "$PUBLIC_DIR/garden-clean"

echo ""
echo "=== Done! ==="
echo "All images processed with floodfill 15% onto $PARCHMENT"

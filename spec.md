# Spec

## Image Generation & Style Switcher

- Use the fast-t2i workflow to create sample images for this site
- Add a temporary floating button that switches out the styles across the site for easy previewing and iterating/adding additional styles to try
- The images should be in the style of actual art mediums for example water color paper's distinctive texture gives it life
- They should lean towards symbolic rather than literal subject/contents
- It could also be a symbolic scene
- Choose dimensions based on where the image would go in the site
- The models default to white people, but the community this site is for is a global diverse community. And the images often accidentally misrepresent values with those of other groups so the nature pictures have been much better so far.
- More nature, no parking lots. A path is one thing but a parking lot, oof. Don't want yards unless showing a whole neighborhood. Stop trying to generate a Bahá'í centre — be symbolic because you don't know what their centre looks like. Books in study circle photos don't look realistic so think of another way to represent. Lean in to Winnipeg style.

## Background Art System (Apr 15, 2026)

### Winnipeg habitat themes per page
- Home/About: Prairie (wheat, prairie grass, big sky, meadowlark, prairie crocus)
- Community Life: Garden (roses, sunflowers, butterflies, garden paths)
- Learn More: River (The Forks confluence, river stones, heron, cattails)
- Events: Forest/Boreal (birch, pine, ferns, owl)
- News: Marsh (cattails, water lilies, dragonflies)
- Seasonal: Winter (snow branches, aurora, chickadee)

### Scattered overlay elements
- Each page gets floating elements matching its theme (falling leaves, rose petals, water droplets, dandelion wisps, snowflakes)
- Different theme for each page

### Nav menu decorations
- Bottom of nav menu: decorative horizontal strip on burgundy background
- Bottom-right corner of each nav button: small themed icon (80x80) matching the page's habitat

### Scene frame approach
- Think of each habitat as a location, choose multiple "frames" from that scene
- River page: rock in water, small waterfall, river itself, river bird
- All pieces share same artistic style, color temperature, level of abstraction
- Consistent art style across themes

### Dimension coordination
- Images generated in dimensions intentional for their placement
- Hero: 600-1000px wide, landscape
- Side art: 350-500px wide, portrait
- Quote backgrounds: 500-700px, centered
- Nav buttons: 80x80px
- Nav bottom: 1400x100px strip

### Technical workflow
- Generate with ink generate CLI using flat background prompts (see batch-06 and batch-07 for reference)
- Process with ImageMagick floodfill 15% from corners to replace background with exact parchment (#F5EFE3)
- Place with correct dimensions for component

### Background processing command
```bash
# Floodfill 15% from all corners - proven best approach
W=$(identify -format "%w" "$INPUT")
H=$(identify -format "%h" "$INPUT")
convert "$INPUT" -fuzz 15% -fill '#F5EFE3' \
  -draw "color 0,0 floodfill" \
  -draw "color 0,$((H-1)) floodfill" \
  -draw "color $((W-1)),0 floodfill" \
  -draw "color $((W-1)),$((H-1)) floodfill" \
  "$OUTPUT"
```

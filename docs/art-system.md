# Background Art System

Design system for seamless painterly background elements across the Winnipeg Baha'i site.

## Technical Process

1. **Generate** with `ink generate` CLI using flat background prompts
   - Include in positive: "on completely flat solid cream background color #F5EFE3, no background texture no gradient pure flat single color background"
   - Include in negative: "textured background, gradient background, patterned background, noisy background, paper texture, watercolor paper, canvas texture"
2. **Process** with ImageMagick floodfill 15% from corners to replace background with exact #F5EFE3
3. **Place** in appropriate component with correct dimensions

### Floodfill Processing (Proven Best Approach)

```bash
# Floodfill 15% from all corners
W=$(identify -format "%w" "$INPUT")
H=$(identify -format "%h" "$INPUT")
convert "$INPUT" -fuzz 15% -fill '#F5EFE3' \
  -draw "color 0,0 floodfill" \
  -draw "color 0,$((H-1)) floodfill" \
  -draw "color $((W-1)),0 floodfill" \
  -draw "color $((W-1)),$((H-1)) floodfill" \
  "$OUTPUT"
```

This approach was chosen over rembg because:
- Preserves watercolor edge effects and paint splatters
- Faster processing (no ML model needed)
- More predictable results with flat-background prompts

## Color Palette

- **Parchment** (background): `#F5EFE3`
- **Burgundy** (nav/accents): `#722F37` range
- **Gold** (highlights): `#B8860B` range
- **Persian Blue** (accent): `#1C3D5A` range

---

## Winnipeg Habitat Themes

Each page gets a distinct habitat theme drawn from Manitoba's landscape. Elements should feel like frames from a continuous scene.

### 1. Prairie Theme (Home / About)
Wide open grasslands, big sky, wheat fields - the iconic Manitoba landscape.

**Elements:**
- Prairie grass swaying
- Wheat stalks / wild oats
- Big sky clouds
- Distant horizon line
- Wild prairie flowers (coneflowers, black-eyed susans)
- Meadowlark silhouette
- Bison silhouette (distant)
- Prairie crocus (Manitoba's flower)

**Scattered overlays:**
- Falling grass seeds
- Floating dandelion wisps
- Drifting wheat chaff

### 2. River Theme (Learn More)
The Red and Assiniboine rivers - Winnipeg sits at their confluence (The Forks).

**Elements:**
- River flowing/meandering
- Smooth river stones
- Small waterfall/rapids
- River reeds/cattails
- Great blue heron
- Kingfisher diving
- Reflection ripples
- Driftwood
- River bank with wildflowers

**Scattered overlays:**
- Water droplets
- Floating leaves on water
- Mist/spray particles

### 3. Garden Theme (Community Life)
Cultivated beauty, community gardens, the Baha'i principle of cultivation.

**Elements:**
- Rose bushes in bloom
- Garden path stones
- Arbor with climbing vines
- Herb garden patches
- Sunflowers
- Honeybees
- Butterfly on flower
- Garden bench
- Potted plants
- Bird bath

**Scattered overlays:**
- Falling rose petals
- Floating flower petals (mixed)
- Drifting pollen motes
- Butterflies

### 4. Forest/Boreal Theme (Events)
The boreal forest edge that defines northern Manitoba.

**Elements:**
- Birch tree trunks
- Pine/spruce branches
- Forest floor moss
- Ferns unfurling
- Wild berries
- Owl perched
- Red squirrel
- Mushrooms on log
- Fallen leaves
- Morning mist through trees

**Scattered overlays:**
- Falling autumn leaves (birch, maple)
- Pine needles drifting
- Floating seed pods
- Fireflies (evening themes)

### 5. Winter Theme (Special occasions / seasonal)
Manitoba's dramatic winters - snow, frost, northern lights.

**Elements:**
- Snow-covered pine branches
- Frost crystals
- Northern lights (aurora)
- Snow drifts
- Ice crystals
- Chickadee on branch
- Bare birch silhouettes
- Frozen river
- Snow bunting

**Scattered overlays:**
- Falling snowflakes
- Ice crystals floating
- Frost particles
- Aurora shimmer

### 6. Marsh/Wetland Theme (News / secondary pages)
Delta Marsh, Oak Hammock - important Manitoba ecosystems.

**Elements:**
- Cattails
- Water lilies
- Marsh grasses
- Canada goose
- Mallard duck
- Red-winged blackbird
- Dragonfly
- Lily pads
- Bulrushes

**Scattered overlays:**
- Cattail fluff floating
- Dragonflies
- Water ripple rings

---

## Component Placement Specifications

### A. Nav Menu Bottom (Burgundy Background)

**Location:** Bottom of the open nav drawer, full width
**Background:** Burgundy (#722F37)
**Purpose:** Decorative footer element that grounds the navigation

**Dimensions:** 
- Width: Full bleed (1400px+)
- Height: 80-120px
- Format: Horizontal strip, fade to transparent at top

**Subject suggestions:**
- Horizontal landscape silhouette (prairie horizon, treeline, river bank)
- Wave pattern (river flowing)
- Grass/wheat border from below

**Art style:** Silhouette or very subtle, must work on burgundy
**Colors:** Cream/parchment (#F5EFE3), gold accents, or darker burgundy tones

### B. Nav Button Corners (Burgundy Background)

**Location:** Bottom-right corner of each nav menu button
**Background:** Burgundy (#722F37)
**Purpose:** Themed accent that hints at page content

**Dimensions:**
- Width: 60-100px
- Height: 60-100px  
- Format: Square or slight rectangle, organic edges

**Per-page assignments:**
- Home: Prairie grass tuft
- About: Wheat stalk
- Community Life: Rose bloom
- Learn More: River stone stack
- Events: Birch branch
- News: Cattail

**Art style:** Small vignette, fading edges
**Colors:** Same as nav bottom (cream/gold on burgundy)

### C. Hero Section Backgrounds

**Location:** Behind hero text, extending beyond viewport edges
**Background:** Parchment (#F5EFE3)
**Purpose:** Create atmosphere and visual interest

**Dimensions:**
- Width: 600-1000px (extend past edges)
- Height: 400-700px
- Format: Landscape orientation, organic edges

**Opacity:** 40-70% typical

### D. Section Side Art

**Location:** Left or right side of content sections, partially extending off-screen
**Background:** Parchment (#F5EFE3)
**Purpose:** Frame content, add depth

**Dimensions:**
- Width: 350-500px
- Height: 400-600px
- Format: Portrait or square, positioned to peek in from edge

**Opacity:** 60-80% typical

### E. Quote/Blockquote Backgrounds

**Location:** Centered behind quotation text
**Background:** Parchment (#F5EFE3)
**Purpose:** Create reverent atmosphere for sacred text

**Dimensions:**
- Width: 500-700px
- Height: 400-500px
- Format: Centered, symmetrical preferred

**Subject suggestions:** Lotus, light rays, gentle radiance, circular motifs

**Opacity:** 30-50% (very subtle)

### F. Scattered Overlay Elements

**Location:** Floating across page sections
**Background:** Transparent PNG or parchment-matched
**Purpose:** Add life and movement, reinforce theme

**Dimensions:**
- Individual elements: 30-80px
- Pattern tile: 400-600px for repeating

**Implementation:** CSS animation for floating/falling effect

---

## Scene Frame Approach

Think of each habitat as a location you're photographing. Each page needs multiple "frames" from that scene:

**Example - River Theme (Learn More page):**
1. **Hero:** Wide river flowing, distant view
2. **Section 1 side:** River stones in foreground
3. **Section 2 side:** Small rapids/waterfall
4. **Quote background:** Concentric water ripples
5. **Section 3 side:** Great blue heron
6. **Scattered:** Water droplets, floating leaves
7. **Nav button:** Stack of smooth river stones

All pieces share:
- Same artistic style (watercolor/ink wash)
- Same color temperature
- Same level of abstraction
- Coherent "place" feeling

---

## Generation Prompts Base Template

```
[Subject description], watercolor and ink wash style on cream parchment background, 
soft organic edges fading to background, Manitoba prairie aesthetic, 
muted earth tones with burgundy and gold accents, painterly texture, 
no hard borders, ethereal and contemplative mood, [orientation] composition,
background color #F5EFE3
```

**Orientation options:**
- `horizontal landscape` for hero/wide
- `vertical portrait` for side art
- `square centered` for quote backgrounds
- `small vignette corner` for nav buttons
- `horizontal strip footer` for nav bottom

---

## Existing Clean Artwork Inventory

Located in `/public/background-art-clean/`:

- `flourish-persian-01.png` - Decorative Persian-style flourish
- `lotus-bloom-01.png` - Lotus flower, good for quotes
- `lotus-petals-01.png` - Lotus petals detail
- `petals-falling-01.png` - Falling flower petals
- `prairie-grass-01.png` - Prairie grass horizontal
- `prairie-vertical-01.png` - Prairie grass vertical
- `ribbon-burgundy-01.png` - Flowing ribbon element
- `ribbon-burgundy-02.png` - Flowing ribbon variation
- `ribbon-dual-01.png` - Dual ribbon design
- `ribbon-vertical-01.png` - Vertical ribbon
- `river-confluence-01.png` - Two rivers meeting
- `river-flow-01.png` - Flowing river
- `river-unity-01.png` - River unity concept
- `wheat-stalks-01.png` - Wheat detail

---

## Next Batch Priorities

### Batch 1: Nav Decorations (Burgundy-safe)
- [ ] `nav-bottom-prairie-horizon.png` - 1400x100 strip
- [ ] `nav-button-prairie-grass.png` - 80x80 corner
- [ ] `nav-button-wheat-stalk.png` - 80x80 corner
- [ ] `nav-button-rose-bloom.png` - 80x80 corner
- [ ] `nav-button-river-stones.png` - 80x80 corner
- [ ] `nav-button-birch-branch.png` - 80x80 corner
- [ ] `nav-button-cattail.png` - 80x80 corner

### Batch 2: Scattered Elements
- [ ] `scatter-falling-leaves-autumn.png` - 400x600 pattern
- [ ] `scatter-rose-petals.png` - 400x600 pattern
- [ ] `scatter-water-droplets.png` - 400x600 pattern
- [ ] `scatter-dandelion-wisps.png` - 400x600 pattern
- [ ] `scatter-snowflakes.png` - 400x600 pattern

### Batch 3: Garden Theme Suite
- [ ] `garden-rose-bush-01.png` - 500x500 side art
- [ ] `garden-sunflower-01.png` - 400x600 side art
- [ ] `garden-butterfly-01.png` - 300x300 accent
- [ ] `garden-path-stones-01.png` - 600x400 bottom art
- [ ] `garden-arbor-01.png` - 500x600 framing

### Batch 4: Forest Theme Suite
- [ ] `forest-birch-trunks-01.png` - 400x600 side art
- [ ] `forest-pine-branch-01.png` - 500x400 corner
- [ ] `forest-ferns-01.png` - 500x300 bottom edge
- [ ] `forest-owl-01.png` - 300x400 accent

### Batch 5: Winter Theme Suite
- [ ] `winter-snow-branch-01.png` - 500x400 side art
- [ ] `winter-frost-crystals-01.png` - 400x400 pattern
- [ ] `winter-aurora-01.png` - 800x300 hero background
- [ ] `winter-chickadee-01.png` - 200x200 accent

---

## Image Processing Workflow

### For parchment background (main content):
```bash
# Floodfill 15% from corners (preferred method)
W=$(identify -format "%w" input.png)
H=$(identify -format "%h" input.png)
convert input.png -fuzz 15% -fill '#F5EFE3' \
  -draw "color 0,0 floodfill" \
  -draw "color 0,$((H-1)) floodfill" \
  -draw "color $((W-1)),0 floodfill" \
  -draw "color $((W-1)),$((H-1)) floodfill" \
  output-clean.png
```

### For burgundy background (nav elements):
```bash
W=$(identify -format "%w" input.png)
H=$(identify -format "%h" input.png)
convert input.png -fuzz 15% -fill '#722F37' \
  -draw "color 0,0 floodfill" \
  -draw "color 0,$((H-1)) floodfill" \
  -draw "color $((W-1)),0 floodfill" \
  -draw "color $((W-1)),$((H-1)) floodfill" \
  output-burgundy.png
```

---

## File Naming Convention

```
[theme]-[subject]-[variant].png

Examples:
prairie-grass-01.png
river-stones-02.png
garden-rose-side-01.png
nav-bottom-treeline.png
scatter-petals-rose.png
```

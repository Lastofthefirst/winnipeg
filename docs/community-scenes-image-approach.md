# Community Scenes: Image Generation Approach

## Purpose

Generate a library of watercolor illustration scenes depicting universal human moments — 
contemplation, connection, learning, generosity — for use across the Winnipeg Bahá'í 
community site. Images should feel warm, timeless, and broadly relatable without 
presupposing any specific religious or cultural context.

---

## Style

### Reference Image
`/home/quddus/sd/ComfyUI/output/river-confluence-v7/v7-029_00001_.png`

The hero image on the site: two rivers converging, rendered in Persian blue watercolor 
wash over a rough pencil sketch underdrawing on a flat cream background. The pencil 
remains visible and expressive beneath the wash. Confident brushwork, strong negative 
space, dramatic composition.

### Core Style Prompt Elements
```
bold watercolor wash over rough exploratory pencil sketch underdrawing,
pencil lines remain visible and expressive beneath the wash,
Persian blue for clothing and shadows,
warm amber and brown skin tones, natural hair colors,
confident dramatic brushwork, strong use of negative space
```

### Background
Always: `on completely flat solid warm cream background color #F5EFE3, no texture no gradient pure single flat color background`

**Do NOT use the word "parchment"** — the model interprets it as a material (scroll/aged paper) rather than a color.

### Negative Prompt
```
photorealistic, 3d render, anime, cartoon, flat vector, clipart, text, logos,
dark background, textured background, gradient background,
watercolor paper texture, canvas texture,
head-on symmetrical portrait, blue hair, purple hair
```

---

## Composition Principles

### What Works
Learned through v2 and v3 batches:

- **Strong profile shots** — side silhouette with subject at left/right and vast empty cream opposite
- **From behind** — figures seen from behind, no faces, yet deeply intimate (children walking, elder and child on a wall)
- **Low angle** — looking up at a figure gives presence and dignity
- **Extreme close-ups** — hands on a book, a hand on a child's head, hands turning a page; the detail of the gesture carries the emotion
- **Over-the-shoulder** — viewer feels included in the moment
- **Small figure, big space** — solitary person tiny in a wide frame; conveys contemplation and openness
- **Two profiles facing** — space between the faces is the subject

### What to Avoid
- Head-on symmetrical portraits (generic, no tension)
- Groups that imply a specific gathering or ritual (e.g. a circle of people in meditation poses reads as "Bahá'í devotional" not "universal moment")
- Scenes that require cultural or religious knowledge to decode
- Figures too centered and static

### Formats
- Landscape 1024×512 — best for profiles, from-behind, wide shots, close-ups
- Portrait 768×1024 — for dramatic vertical compositions (low angle, tall figures)
- Square 768×768 — for overhead/top-down shots, hand close-ups

---

## Winnipeg Population Demographics (2021 Census)

Scenes should reflect the actual population of Winnipeg:

| Group | Share | Notes |
|-------|-------|-------|
| European/white | ~53% | Majority |
| Filipino | ~11% | Largest visible minority in Winnipeg — unusual nationally; must be represented |
| Indigenous (First Nations, Métis) | ~12% | Largest urban Indigenous population in Canada |
| South Asian | ~5–8% | Growing community |
| Black/African | ~4–5% | |
| East Asian | ~4% | |

**Key implication:** Filipino characters should appear frequently. Indigenous characters 
should appear frequently. A scene with only white and Black characters, while diverse, 
does not reflect Winnipeg specifically.

### How to Specify Demographics in Prompts
- Filipino: "Filipino woman", "Filipino teenage boy"
- Indigenous: "Indigenous woman with long dark hair", "Métis elder"
- South Asian: "South Asian man", "South Asian woman"
- Black: "Black woman", "Black teenage girl"
- White/European: "white man", "elderly white woman"
- East Asian: "East Asian woman", "East Asian man"

---

## Processing Workflow

### Generation
```bash
ink generate prompts/<batch-name>.jsonl
```

### Floodfill (background normalization)
Use 10% fuzz — tighter than the 15% documented in art-system.md, which was found to 
eat into watercolor edge effects.

```bash
W=$(identify -format "%w" "$INPUT")
H=$(identify -format "%h" "$INPUT")
convert "$INPUT" -fuzz 10% -fill '#F5EFE3' \
  -draw "color 0,0 floodfill" \
  -draw "color 0,$((H-1)) floodfill" \
  -draw "color $((W-1)),0 floodfill" \
  -draw "color $((W-1)),$((H-1)) floodfill" \
  "$OUTPUT"
```

For use on ivory (`#FFFCF5`) card backgrounds, substitute that color as the fill.

### Output Location
- Raw generated: `/home/quddus/sd/ComfyUI/output/<batch-name>/`
- Processed for site use: `/public/community-scenes/` (only images selected for use)

---

## Prompt Batches

| Batch | File | Count | Notes |
|-------|------|-------|-------|
| v1 | `prompts/community-scenes-v1.jsonl` | 100 | Head-on portraits; too generic; not used |
| v2 | `prompts/community-scenes-v2.jsonl` | 15 | First composition experiments; several strong images |
| v3 | `prompts/community-scenes-v3.jsonl` | 13 | Universal human moments; strong batch overall |
| v4 | `prompts/community-scenes-v4.jsonl` | — | Flower sharing; Winnipeg demographics explicit |

### Best Images So Far (v2 + v3)
- `v2/profile-elder-prayer-01` — elder profile, strong negative space
- `v2/low-angle-reading-01` — dramatic upward angle, figure with book
- `v2/writing-hands-close-01` — hands and journal, intimate
- `v2/elder-child-from-behind-01` — two figures on wall, from behind
- `v3/hand-on-childs-head-01` — elderly hand on child's head, stunning
- `v3/two-profiles-conversation-01` — two profiles facing, space between
- `v3/child-profile-listening-01` — child looking upward in wonder
- `v3/old-young-hands-on-page-01` — two very different hands on same page
- `v3/profile-young-woman-reading-01` — strong profile, negative space
- `v3/low-angle-elder-seated-01` — elder on bench, upward angle, tree branch
- `v3/woman-walking-path-01` — solitary figure, path receding, vast sky

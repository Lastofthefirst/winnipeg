# Seamless Background Art Approach

## Concept

Create decorative background elements that appear to "rest" on the page itself, adding depth and elegance without disrupting content. The key technique: **edges of the artwork match the site background color exactly**, making the art appear seamlessly integrated rather than contained in a box.

## Technical Requirements

- **Background color**: Must match `parchment` (#F5EFE3)
- **Edge treatment**: Artwork fades to or is masked against the background color at all edges
- **Format**: PNG with the parchment background (not transparent, to ensure seamless blending)
- **Resolution**: High-res for crisp display (2000px+ width recommended)
- **Placement**: Positioned absolutely, behind content with low z-index

## Color Palette

### Primary
- **Parchment** (background): #F5EFE3
- **Burgundy** (accent): #4A1D2E, #722F37, #8B3A4A
- **Gold** (highlight): #C4A35A, #D4AF37

### Complementary
- **Dusty Blue**: #6B8E9F, #7BA3B5 (river/water elements)
- **Sage Green**: #8B9E7C (nature elements)
- **Warm Tan**: #C9B896, #D4C4A8 (prairie/wheat)

## Art Categories

### 1. Flowing Ribbons
Elegant silk-like ribbons with soft folds and shadows. Can be burgundy with gold edges, or softer neutral tones.

### 2. River Currents
Abstract flowing water shapes representing the confluence at The Forks. Dusty blue-grey tones with subtle movement.

### 3. Prairie Elements
- Sweeping grass silhouettes
- Wheat stalks with gentle curves
- Soft, wind-blown forms

### 4. Botanical
- Lotus petals (floating, layered)
- Delicate flower stems
- Leaf arrangements

### 5. Calligraphic Flourishes
Persian-inspired decorative swirls and curves. Elegant, hand-drawn quality.

### 6. Atmospheric
- Soft watercolor washes
- Light rays/beams
- Cloud wisps

### 7. Geometric
- Subtle nine-pointed star rays
- Interlocking circles
- Arabesque patterns

## Placement Guidelines

- **Hero sections**: Large, dramatic pieces positioned to frame content
- **Section dividers**: Horizontal flowing elements between content sections
- **Corners**: Decorative corner pieces that don't interfere with text
- **Full-width backgrounds**: Subtle, low-opacity pieces spanning sections

## Implementation

```tsx
// Example component usage
<div className="relative">
  <img 
    src="/backgrounds/ribbon-burgundy-01.png"
    alt=""
    className="absolute -top-20 -right-10 w-[600px] opacity-60 -z-10 pointer-events-none"
  />
  <Content />
</div>
```

## Generation Prompts Structure

All prompts should include:
1. Subject description
2. Color specification matching our palette
3. "on warm parchment cream background #F5EFE3"
4. "edges fading seamlessly into background"
5. Style keywords: elegant, sophisticated, subtle, soft shadows

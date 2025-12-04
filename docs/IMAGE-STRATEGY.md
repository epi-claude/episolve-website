# Episolve Website - Image & Graphics Strategy

**Date:** December 4, 2024
**Goal:** Add professional visual polish while maintaining fast load times

---

## Image Requirements by Section

### 1. Home Page Hero
**Dimensions:** 1920x1080 (16:9) minimum
**Format:** WebP (with JPG fallback)
**Style:** Abstract tech illustration or gradient mesh
**Colors:** Navy (#254071), Yellow accent (#FDFC8C), Light blues

**Options:**
- **AI Prompt:** "Abstract technology network visualization, flowing data streams, navy blue and soft yellow accents, minimal modern style, clean professional aesthetic, 16:9 aspect ratio"
- **Stock Search:** "abstract technology background blue" + apply color overlay
- **Alternative:** Subtle gradient mesh (CSS-based, no image needed)

**Upload to:** `/public/images/hero-home.webp`

---

### 2. Service Pages (3 images needed)

#### IT Consulting
**Dimensions:** 1200x800
**Style:** Professional, consultative
**AI Prompt:** "Professional IT consultant working with business owner, modern office, navy and yellow color scheme, clean illustration style, friendly atmosphere"
**Stock Alternative:** "business consulting meeting technology"

#### Software Development
**Dimensions:** 1200x800
**Style:** Code/development focused
**AI Prompt:** "Modern software development workspace, code on screens, abstract geometric shapes, navy blue dominant, yellow accents, professional clean style"
**Stock Alternative:** "software developer coding workspace"

#### Cloud Solutions
**Dimensions:** 1200x800
**Style:** Cloud/infrastructure abstract
**AI Prompt:** "Abstract cloud infrastructure visualization, connected nodes, navy blue and light blue gradient, modern minimalist tech illustration"
**Stock Alternative:** "cloud computing abstract visualization"

**Upload to:** `/public/images/services/[service-slug].webp`

---

### 3. About Page

#### Team Section Background
**Dimensions:** 1920x600
**Style:** Subtle, not distracting
**Approach:** Soft gradient or abstract pattern (can be CSS)

#### Founder Photo
**Dimensions:** 800x800 (square)
**Style:** Professional headshot
**Source:** Real photo (upload via script)
**Upload to:** `/public/images/team/robert-barnes.jpg`

---

### 4. Blog/Insights Posts (2 initial images)

#### "5 Signs Your Business Needs an IT Strategy"
**Dimensions:** 1200x630 (social share optimized)
**AI Prompt:** "Illustration of business strategy meeting, charts and technology icons, navy and yellow brand colors, modern clean style"
**Upload to:** `/public/images/blog/it-strategy-signs.webp`

#### "Cloud Migration for Small Businesses"
**Dimensions:** 1200x630
**AI Prompt:** "Small business office transitioning to cloud, upward arrows, cloud icons, navy blue and soft pastels, optimistic modern illustration"
**Upload to:** `/public/images/blog/cloud-migration-guide.webp`

---

### 5. Background Patterns & Decorative Elements

#### Subtle Grid Pattern
**Use:** Section backgrounds
**Approach:** SVG pattern (inline, no file)
**Code:**
```tsx
<svg className="absolute inset-0 -z-10" aria-hidden="true">
  <defs>
    <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
      <path d="M0 32V.5H32" fill="none" stroke="currentColor" strokeOpacity="0.05" />
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#grid)" />
</svg>
```

#### Gradient Orbs (Already in CTA)
**Current implementation:** Working well
**Expand usage:** Consider for hero sections

---

## Image Optimization Settings

### For AI-Generated Images
1. Generate at 2x intended display size (e.g., 3840x2160 for 1920x1080)
2. Export as PNG from AI tool
3. Convert to WebP:
   ```bash
   cwebp -q 80 input.png -o output.webp
   ```
4. Create JPG fallback:
   ```bash
   convert input.png -quality 85 output.jpg
   ```

### For Stock Photos
1. Download highest resolution available
2. Resize to required dimensions:
   ```bash
   sips -z 1080 1920 input.jpg --out output.jpg
   ```
3. Optimize:
   ```bash
   pnpm tsx scripts/optimize-image.ts input.jpg
   ```

---

## Quick Start: 3-Step Process

### Step 1: Generate Hero Image (15 min)

**Using Midjourney (Best Quality):**
```
/imagine abstract flowing data visualization, navy blue #254071 and bright yellow #FDFC8C accents, soft gradients, modern professional tech aesthetic, clean minimalist style, high-end corporate website hero, 16:9 --ar 16:9 --v 6
```

**Using DALL-E 3 (Easier):**
```
Create a modern, abstract hero image for a technology consulting website. Style: clean, minimal, professional. Colors: deep navy blue (#254071) as dominant, with bright yellow (#FDFC8C) accents and soft light blue gradients. Theme: data visualization, connected networks, flowing information. Mood: trustworthy, modern, sophisticated. Aspect ratio 16:9.
```

**Or Use Stock:**
- Go to Unsplash.com
- Search: "abstract technology blue"
- Download highest resolution
- Apply navy overlay in your image editor

### Step 2: Upload to Project

**Create images directory structure:**
```bash
mkdir -p public/images/{hero,services,team,blog,patterns}
```

**Upload via script:**
```bash
pnpm tsx scripts/upload-image.ts /path/to/hero-home.jpg "hero-home"
```

### Step 3: Update Content to Use Images

**Option A: Via Payload Admin**
- Navigate to Pages → Home
- Edit Hero section
- Upload media via Media tab
- Select uploaded hero image

**Option B: Via Script (Faster)**
```bash
pnpm tsx scripts/update-hero-images.ts
```

---

## Alternative: Start with CSS Gradients

**If you want to launch quickly without waiting for images:**

### Modern Gradient Heroes
```tsx
// Replace hero image with gradient
className="bg-gradient-to-br from-episolve-navy via-episolve-blue-medium to-episolve-blue-light"
```

### Mesh Gradients (Very Modern)
```tsx
<div className="absolute inset-0 bg-gradient-to-br from-episolve-navy to-episolve-blue-medium">
  <div className="absolute inset-0" style={{
    backgroundImage: `
      radial-gradient(at 20% 30%, rgb(37 64 113 / 0.8) 0px, transparent 50%),
      radial-gradient(at 80% 70%, rgb(74 116 168 / 0.6) 0px, transparent 50%),
      radial-gradient(at 40% 80%, rgb(253 252 140 / 0.3) 0px, transparent 50%)
    `
  }} />
</div>
```

### Abstract Shapes (SVG)
- Use tools like **Haikei** (haikei.app) to generate free SVG backgrounds
- Export with your brand colors
- Inline as component

---

## Recommended Immediate Actions

### Priority 1: Home Hero (Impact: High, Time: 30 min)
- [ ] Generate or select 1 hero image
- [ ] Optimize to WebP
- [ ] Upload via Payload admin
- [ ] Update Home page hero

### Priority 2: Service Icons (Impact: Medium, Time: 15 min)
- [ ] Use existing icon library (Lucide React already installed)
- [ ] Add icons to service cards (already have `icon` field)
- [ ] Map: `lightbulb` → service

### Priority 3: Blog Featured Images (Impact: Medium, Time: 45 min)
- [ ] Generate 2 blog post images
- [ ] Upload via admin
- [ ] Associate with posts

### Priority 4: Background Patterns (Impact: Low, Time: 15 min)
- [ ] Add subtle grid SVG to sections
- [ ] Add decorative blobs to heroes
- [ ] Consider alternating section backgrounds

---

## Budget-Friendly Options

### Free AI Generation
- **Bing Image Creator (DALL-E 3):** Free, 15 images/day
- **Leonardo.ai:** 150 free credits/day
- **Playground.ai:** 500 free images/day

### Free Stock Photos
- **Unsplash:** Unlimited downloads
- **Pexels:** Unlimited downloads
- **Pixabay:** Unlimited downloads

### Free Design Tools
- **Canva (Free tier):** Create graphics with templates
- **Figma (Free tier):** Design custom illustrations
- **Haikei:** Generate abstract SVG backgrounds

---

## Image Optimization Script

Create this for batch optimization:

```typescript
// scripts/optimize-images.ts
import sharp from 'sharp'
import { readdirSync, statSync } from 'fs'
import { join } from 'path'

async function optimizeImage(inputPath: string, outputDir: string) {
  const filename = inputPath.split('/').pop()?.replace(/\.(jpg|jpeg|png)$/i, '')

  // Generate WebP
  await sharp(inputPath)
    .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(join(outputDir, `${filename}.webp`))

  console.log(`✅ Optimized: ${filename}.webp`)
}
```

---

## Example Hero Image Prompts (Copy-Paste Ready)

### Midjourney Prompts

**Modern Tech Abstract:**
```
abstract flowing network visualization, deep navy blue #254071 gradient background, bright yellow #FDFC8C light streaks, clean minimal professional, corporate technology website hero image, soft lighting, high quality, 16:9 --ar 16:9 --style raw --v 6
```

**Geometric Clean:**
```
geometric abstract shapes, navy blue and light blue gradient, yellow accent highlights, modern professional minimalist, technology consulting aesthetic, clean lines, sophisticated, 16:9 --ar 16:9 --style raw --v 6
```

**Data Visualization:**
```
elegant data visualization abstract, flowing charts and graphs, navy blue #254071 and yellow #FDFC8C color scheme, soft gradients, professional corporate website, modern clean aesthetic, 16:9 --ar 16:9 --v 6
```

### DALL-E 3 Prompts (via ChatGPT)

**For Home Hero:**
```
Create a wide, abstract hero image for a professional technology consulting website. The image should feature flowing, interconnected network lines suggesting data and connectivity. Use a sophisticated color palette of deep navy blue (#254071) as the primary color, with bright yellow (#FDFC8C) as strategic accent highlights, and soft light blue (#8FB4D9) for subtle gradients. The style should be minimal, modern, and professional - think high-end corporate website aesthetic. The composition should work well as a background with white text overlaid. Aspect ratio 16:9, horizontal orientation.
```

**For Service Pages:**
```
Create an illustration representing [IT consulting/software development/cloud solutions] in a modern, professional style. Use navy blue (#254071) as the dominant color with bright yellow (#FDFC8C) accents. The style should be clean, minimal, and abstract - not photorealistic. Think geometric shapes, flowing lines, and professional corporate aesthetic. Horizontal composition, 16:9 aspect ratio.
```

---

## Next Steps

1. **Choose your approach:**
   - Quick: Use CSS gradients (0 time, 0 cost)
   - Free: Generate with DALL-E 3 via Bing (30 min, $0)
   - Premium: Use Midjourney (1 hour, $10/month)
   - Stock: Download from Unsplash (15 min, $0)

2. **Start with home hero** (biggest impact)

3. **Add service images** (medium impact)

4. **Polish with patterns** (subtle enhancement)

Let me know which approach you want to take and I can help implement it!

# Vibe Coding Guide for Episolve Website

This guide shows you how to manage and build your website using natural language and AI-powered workflows.

## Quick Start

Set your database URL once:
```bash
export DATABASE_URI="postgresql://postgres:lrPhqmvYSuhnBHVOvZXDLQTaoUFCWuJR@centerbeam.proxy.rlwy.net:16516/railway"
```

Add this to `~/.zshrc` or `~/.bashrc` to make it permanent.

---

## Method 1: Interactive Vibe Interface (Easiest)

Launch the conversational interface:
```bash
pnpm vibe
```

Then just describe what you want in plain English:

```
✨ What would you like to do? Create a service about cloud security

✨ What would you like to do? Add a team member named Sarah as VP of Engineering

✨ What would you like to do? List all services

✨ What would you like to do? Generate a blog post about AI trends in 2025
```

Type `help` for examples, `exit` to quit.

---

## Method 2: Direct CLI Scripts

### Content Management Scripts

**1. AI Content Generation** (`ai-generate.ts`)
```bash
# Generate and preview service content
pnpm tsx scripts/ai-generate.ts service generate \
  --title "Cloud Security Solutions" \
  --keywords "AWS,compliance,encryption" \
  --tone "professional"

# Create service immediately
pnpm tsx scripts/ai-generate.ts service create \
  --title "Cloud Security Solutions" \
  --keywords "AWS,compliance,encryption" \
  --icon "shield" \
  --featured "true" \
  --publish "true"

# Generate blog post
pnpm tsx scripts/ai-generate.ts blog create \
  --title "5 Cloud Migration Best Practices" \
  --category "Cloud Solutions" \
  --publish "true"

# Generate team bio
pnpm tsx scripts/ai-generate.ts bio generate \
  --name "Jane Doe" \
  --role "Chief Technology Officer" \
  --background "20 years tech leadership"

# Generate testimonial
pnpm tsx scripts/ai-generate.ts testimonial create \
  --name "John Smith" \
  --role "CEO" \
  --company "Acme Corp" \
  --service "cloud migration" \
  --featured "true"
```

**2. Update Existing Content** (`update-service.ts`)
```bash
# Update service title
pnpm tsx scripts/update-service.ts it-consulting --title "IT Strategy & Consulting"

# Make service featured
pnpm tsx scripts/update-service.ts cloud-solutions --featured true

# Change icon
pnpm tsx scripts/update-service.ts cybersecurity --icon shield

# Update CTA button
pnpm tsx scripts/update-service.ts it-consulting \
  --cta-text "Book a Strategy Session" \
  --cta-link "/contact"
```

**3. Create Pages** (`create-page.ts`)
```bash
# Create draft page
pnpm tsx scripts/create-page.ts "Privacy Policy" privacy

# Create and publish immediately
pnpm tsx scripts/create-page.ts "About Us" about --published
```

**4. Upload Images** (`upload-image.ts`)
```bash
# Upload team photo
pnpm tsx scripts/upload-image.ts ./john-doe-headshot.jpg --alt "John Doe, CEO"

# Upload service image
pnpm tsx scripts/upload-image.ts ./cloud-diagram.png --alt "Cloud Architecture Diagram"
```

**5. Manage Testimonials** (`manage-testimonials.ts`)
```bash
# Create testimonial
pnpm tsx scripts/manage-testimonials.ts create \
  --quote "Episolve transformed our cloud infrastructure" \
  --name "Sarah Johnson" \
  --role "CTO" \
  --company "TechCorp" \
  --featured true

# Update testimonial
pnpm tsx scripts/manage-testimonials.ts update <id> --featured true

# List all testimonials
pnpm tsx scripts/manage-testimonials.ts list

# Delete testimonial
pnpm tsx scripts/manage-testimonials.ts delete <id>
```

**6. Bulk Operations** (`bulk-update.ts`)
```bash
# Make all services not featured
pnpm tsx scripts/bulk-update.ts services all --featured false

# Update multiple services by slug
pnpm tsx scripts/bulk-update.ts services "it-consulting,cloud-solutions" --featured true

# Increment order for all team members
pnpm tsx scripts/bulk-update.ts team-members all --order-increment 1

# Update specific item by ID
pnpm tsx scripts/bulk-update.ts testimonials id:123 --featured true
```

---

## Method 3: Talk to Claude Code (Most Powerful)

The real magic is conversing with me directly in this terminal. Here's how different workflows work:

### Workflow 1: Content from Description

**You say:**
> "I want to add a new service page for 'AI Strategy & Implementation'. It should focus on helping healthcare companies adopt AI ethically. Make it technical but approachable. Featured on homepage. Include keywords: HIPAA compliance, machine learning, clinical decision support."

**I will:**
1. Use `ai-generate.ts` to create the service
2. Generate appropriate content based on your keywords
3. Set up proper metadata for SEO
4. Show you the result and URL

### Workflow 2: Design from Reference Sites

**You say:**
> "I want our About page to look like https://stripe.com/about - that hero with the diagonal split, the animated stats section, and the team grid with hover effects."

**I will:**
1. Fetch and analyze the reference site
2. Identify the design patterns (layout, animations, components)
3. Create/update the About page in Payload
4. Apply the patterns using your Episolve brand colors
5. Show you the deployed result

### Workflow 3: Image-Based Design

**You say:**
> "Here's a screenshot of a services section I like [attach/upload image]. Make our /services page similar but with our colors."

**I will:**
1. Read and analyze the screenshot
2. Identify: grid layout, card styles, spacing, typography
3. Update services page with similar structure
4. Use Episolve brand colors (Pantone 2945C, 368C, Cool Gray 11C)
5. Deploy and show you the result

### Workflow 4: Complete Feature from Scratch

**You say:**
> "Add a Case Studies section. Create a new collection with fields: title, client name/logo, industry (dropdown: Healthcare/Finance/Tech/Retail), challenge, solution, results (bullet points), and testimonial quote. Create a listing page at /case-studies with filters by industry. Each card shows client logo, title, industry badge, and one result metric. Detail page has full case study."

**I will:**
1. Create `CaseStudies` collection with all specified fields
2. Build `/case-studies/page.tsx` with filtering
3. Build `/case-studies/[slug]/page.tsx` for details
4. Style with Episolve branding
5. Add sample content using AI generation
6. Run migrations and deploy

### Workflow 5: Content Strategy

**You say:**
> "Generate 10 blog post ideas about cloud migration for healthcare companies. Then write the top 3 as full posts. Use a professional but not overly technical tone. Include CTAs to our Cloud Solutions service."

**I will:**
1. Generate list of 10 relevant topics
2. Show you for approval
3. Use `ai-generate.ts` to create the top 3 posts
4. Add internal links to `/services/cloud-solutions`
5. Set appropriate categories
6. Publish to the site

### Workflow 6: Batch Content Updates

**You say:**
> "I want to reorganize the services. Make 'Cloud Solutions' first (order 1), 'IT Consulting' second (order 2), 'Software Development' third (order 3). Only 'Cloud Solutions' should be featured. Update all the short descriptions to be more concise - under 120 characters."

**I will:**
1. Use `bulk-update.ts` to set all featured=false
2. Update individual services with new order numbers
3. Set Cloud Solutions as featured
4. Review and shorten descriptions using AI
5. Apply updates
6. Confirm changes

### Workflow 7: Visual Refinements

**You say:**
> "The homepage hero feels too corporate. Make it more modern and dynamic - maybe add a subtle gradient, make the CTA buttons more prominent with hover animations, and use a softer font weight for the subheading."

**I will:**
1. Locate the hero component
2. Update styling: add gradient, enhance CTAs, adjust typography
3. Show you the changes
4. Deploy if approved

---

## Tips for Best Results

### Be Specific
**Good:** "Create a service about cybersecurity focusing on healthcare compliance with HIPAA and HITRUST. Keywords: threat detection, vulnerability assessment, compliance auditing. Use the shield icon."

**Less Good:** "Add a security service."

### Reference Examples
**Good:** "Make the team section like https://example.com/team - the grid with circular photos that expand on hover to show bios."

**Less Good:** "Make the team section look better."

### Iterate Freely
Don't worry about getting it perfect the first time. You can always say:
- "Make it more technical"
- "That's too formal, make it friendlier"
- "Change the icon to something else"
- "Actually, don't make it featured"

### Provide Context
**Good:** "Our target audience is mid-size healthcare organizations (50-500 employees) who need to modernize their IT infrastructure but don't have large internal teams."

**Less Good:** "Make it sound professional."

---

## Common Workflows

### Launch New Service Offering
```
You: "We're launching a new DevOps consulting service. Generate content emphasizing CI/CD, Kubernetes, infrastructure as code. Target audience is startups scaling from 10-50 engineers. Make it featured, use the settings icon, publish immediately."

Me: [Uses ai-generate.ts, creates service, deploys]

You: "Great! Now create a matching blog post announcing the service."

Me: [Uses ai-generate.ts for blog, links to service page]

You: "Perfect. Upload this image as the service hero image."

Me: [Uses upload-image.ts, attaches to service]
```

### Redesign a Page
```
You: "The /about page needs work. Here's a site I like: https://example.com/about"

Me: [Fetches site, analyzes structure]

You: "Yes, that three-column values section and the timeline. Let's do that."

Me: [Updates About page in Payload with new blocks]

You: "Change the middle value from 'Innovation' to 'Partnership'"

Me: [Quick edit using update script]
```

### Batch Content Creation
```
You: "Generate 5 services: Cloud Migration, DevOps, Cybersecurity, Data Analytics, Custom Software. Use AI to create descriptions for each. All should be unpublished drafts so I can review."

Me: [Loops through ai-generate.ts, creates all 5 as drafts]

You: "Show me what you created."

Me: [Lists all services with descriptions]

You: "Publish Cloud Migration and DevOps, delete Data Analytics."

Me: [Updates status, deletes one service]
```

---

## Environment Setup

### Set Database URL Permanently

**For zsh (macOS default):**
```bash
echo 'export DATABASE_URI="postgresql://postgres:lrPhqmvYSuhnBHVOvZXDLQTaoUFCWuJR@centerbeam.proxy.rlwy.net:16516/railway"' >> ~/.zshrc
source ~/.zshrc
```

**For bash:**
```bash
echo 'export DATABASE_URI="postgresql://postgres:lrPhqmvYSuhnBHVOvZXDLQTaoUFCWuJR@centerbeam.proxy.rlwy.net:16516/railway"' >> ~/.bashrc
source ~/.bashrc
```

**Verify it's set:**
```bash
echo $DATABASE_URI
```

---

## Available Icons

When creating services, you can use these icons:
- `lightbulb` - Strategy, consulting, ideas
- `code` - Software development, programming
- `chart` - Analytics, data, reporting
- `shield` - Security, compliance, protection
- `cloud` - Cloud services, infrastructure
- `database` - Data management, storage
- `settings` - Configuration, optimization, DevOps
- `users` - Team services, collaboration, training

---

## Script Reference

| Script | Purpose | Example |
|--------|---------|---------|
| `vibe.ts` | Interactive conversational interface | `pnpm vibe` |
| `ai-generate.ts` | AI-powered content generation | `pnpm tsx scripts/ai-generate.ts service create --title "Security"` |
| `update-service.ts` | Update existing services | `pnpm tsx scripts/update-service.ts it-consulting --featured true` |
| `create-page.ts` | Create new pages | `pnpm tsx scripts/create-page.ts "Privacy" privacy --published` |
| `upload-image.ts` | Upload media files | `pnpm tsx scripts/upload-image.ts photo.jpg --alt "Team photo"` |
| `manage-testimonials.ts` | CRUD for testimonials | `pnpm tsx scripts/manage-testimonials.ts list` |
| `bulk-update.ts` | Batch operations | `pnpm tsx scripts/bulk-update.ts services all --featured false` |
| `seed-content.ts` | Initial content seeding | `pnpm tsx scripts/seed-content.ts` |

---

## What's Next?

Just start talking to Claude Code! The workflows above show you what's possible, but the real power is in having a conversation:

1. **Start simple:** "List all services"
2. **Make changes:** "Create a new service about [topic]"
3. **Iterate:** "Make it more [formal/casual/technical]"
4. **Go big:** "Redesign the entire homepage based on [reference site]"

The AI understands context, so you can reference previous messages, refine ideas, and build complex features through natural conversation.

**Ready to start vibe coding?** Just tell me what you want to build!

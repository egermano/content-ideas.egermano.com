import { topics } from './topics'
import { getTodaysDate } from './get-date'
import fs from 'fs'
import path from 'path'

const currentDate = getTodaysDate()

const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

const generateContent = (topic: string) => {
  return `---
title: '${topic}'
pubDate: '${currentDate}'
---
Start the filename with \`_\` to mark it as a draft and hide it from the list.

## Summary
A detailed exploration of ${topic}.

## Why now
There is a growing interest in ${topic} within the web development community.

## References
- https://example.com/blog-post-on-${slugify(topic)}
- https://github.com/example/${slugify(topic)}-repo

## Scores
- novelty: 8 (estimated)
- search_demand: 7 (estimated)
- competition: 6
- effort: 5
- monetization: 7
- virality: 6
- composite (weighted, 0–100): 70

## SEO keywords
Primary: ${topic}
Related: web development, AI, ${slugify(topic)}

## Content angles
- Tutorial: How to get started with ${topic}.
- Case study: A real-world application of ${topic}.
- Opinion: The future of ${topic} in web development.

## Production effort
Estimated: medium (12–18 hours)

## CTA/Monetization
Sign up for our newsletter for more content on ${topic}.

## Experiment plans
### Experiment 1 — A basic implementation of ${topic}
- Objective: To demonstrate a simple, working example of ${topic}.
- Stack: Node.js, TypeScript
- Steps:
  1. Set up a new project.
  2. Implement a basic version of ${topic}.
  3. Run and test the implementation.
- Expected: A working demo of ${topic}.
- Time est: 4–6 hours
- Difficulty: medium

## Validation checklist
- Technical: Unit tests, integration tests.
- SEO quick tests: A/B testing different titles and meta descriptions.
- Success metrics: 1,500 views in 3 weeks OR a top-5 ranking for the primary keyword within 4 months.

## Editorial brief
- Video titles: ["Getting Started with ${topic}", "A Deep Dive into ${topic}", "${topic} Explained"]
- Video hook: "In this video, we'll explore the exciting world of ${topic}."
- Video outline: Intro (1m) → Core Concepts (5m) → Demo (8m) → Conclusion (1m)
- Blog outline: H1: ${topic}, H2: Core Concepts, H3: Getting Started
- Thumbnail ideas: A graphic related to ${topic}.
- Social copies:
  - x: "Learn all about ${topic} in our new blog post! [link]"
  - linkedin: "We've just published a new article on ${topic}. [link]"
  - instagram: "Check out our new post on ${topic}! [link]"
- Tags/meta description: A meta description for a blog post about ${topic}.
- Links: internal: /tag/ai; external: [list URLs]
- CTAs: Sign up for our newsletter.

## Notes/assumptions
- The information in this document is based on current trends and estimations.
`
}

const main = () => {
  topics.forEach((topic) => {
    const slug = slugify(topic)
    const filename = `_${currentDate}-${slug}.md`
    const filepath = path.join('src/content/posts', filename)
    const content = generateContent(topic)
    fs.writeFileSync(filepath, content)
  })
}

main()

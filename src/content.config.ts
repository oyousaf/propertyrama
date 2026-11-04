import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

const services = defineCollection({
  loader: file('src/content/services.json'),
  schema: z.object({
    order: z.number(),
    name: z.string(),
    icon: z.string(),
    summary: z.string(),
    jobs: z.array(z.string()).min(1),
  }),
});

const reviews = defineCollection({
  loader: file('src/content/reviews.json'),
  schema: z.object({
    headline: z.string(),
    quote: z.string(),
    author: z.string(),
    job: z.string(),
    source: z.string().min(1),
  }),
});

export const collections = { services, reviews };

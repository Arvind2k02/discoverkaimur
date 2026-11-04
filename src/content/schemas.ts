import { z } from 'zod';
export const schemas = {
  home: z.object({
    "sections": z.array(z.object({
      "href": z.string(),
      "label": z.string(),
      "eyebrow": z.string(),
      "description": z.string(),
      "img": z.string(),
      "cta": z.string(),
      "id": z.string()
    }))
  }),
  places: z.object({
    "places": z.array(z.object({
      "name": z.string(),
      "tag": z.string(),
      "description": z.string(),
      "highlight": z.string(),
      "img": z.string(),
      "time": z.string(),
      "rating": z.string(),
      "details": z.array(z.string()),
      "id": z.string()
    }))
  }),
  culture: z.object({
    "cultureItems": z.array(z.object({
      "title": z.string(),
      "subtitle": z.string(),
      "description": z.string(),
      "img": z.string(),
      "facts": z.array(z.string()),
      "id": z.string()
    })),
    "festivals": z.array(z.object({
      "name": z.string(),
      "month": z.string(),
      "description": z.string(),
      "id": z.string()
    }))
  }),
  food: z.object({
    "foods": z.array(z.object({
      "name": z.string(),
      "tag": z.string(),
      "description": z.string(),
      "img": z.string(),
      "ingredients": z.array(z.string()),
      "where": z.string(),
      "id": z.string()
    })),
    "tips": z.array(z.object({
      "tip": z.string(),
      "id": z.string()
    }))
  }),
  roadmap: z.object({
    "roadmapDays": z.array(z.object({
      "day": z.string(),
      "title": z.string(),
      "color": z.string(),
      "stops": z.array(z.object({
        "time": z.string(),
        "place": z.string(),
        "note": z.string(),
        "id": z.string()
      })),
      "id": z.string()
    })),
    "travelTips": z.array(z.object({
      "label": z.string(),
      "tip": z.string(),
      "id": z.string()
    }))
  })
};
export type Schemas = typeof schemas;
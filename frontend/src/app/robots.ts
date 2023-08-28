import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
    },
    sitemap: 'https://www.skinquire.net/sitemap.xml',
    host: "https://www.skinquire.net",
  }
}
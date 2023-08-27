import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.skinquire.net',
      lastModified: new Date(),
    },
    {
      url: 'https://www.skinquire.net/about',
      lastModified: new Date(),
    },
    {
      url: 'https://www.skinquire.net/contact',
      lastModified: new Date(),
    },
    {
        url: 'https://www.skinquire.net/terms-and-conditions',
        lastModified: new Date(),
      },
      {
        url: 'https://www.skinquire.net/privacy-policy',
        lastModified: new Date(),
      },
  ]
}
import { MetadataRoute } from 'next'
import { asyncFetcher } from '@/utils/graphql';
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await asyncFetcher("query {products {data {id }}}");

  const productRoutes = data.products.data.map((product: {id: Number}) => ({
    url: `https://www.skinquire.net/product-list/${product.id}`,
    lastModified: new Date(),
  }))

  const routes = ["", "/product-list", "/register","/about", "/contact", "/terms-and-conditions", "/privacy-policy"].map((route) => ({
    url: `https://www.skinquire.net${route}`,
    lastModified: new Date(),
  }));

  return [...routes, ...productRoutes]
}
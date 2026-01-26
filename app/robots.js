export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/dashboard/',
    },
    sitemap: 'https://aulaplan.cr/sitemap.xml',
  }
}
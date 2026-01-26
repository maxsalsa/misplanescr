import { MetadataRoute } from 'next'

export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin', '/dashboard/'],
        },
        sitemap: 'https://misplanescr.com/sitemap.xml',
    }
}

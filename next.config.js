import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
	poweredByHeader: false,
	images: {
		formats: ['image/avif', 'image/webp'],
		remotePatterns: [
			{ protocol: 'https', hostname: 'images.hostinger.com' },
			{ protocol: 'https', hostname: 'horizons-cdn.hostinger.com' },
		],
	},
	// www.alaz.pro answered 200 with a full copy of the site. One host keeps Search Console,
	// the sitemap and the canonical URLs (all https://alaz.pro) in agreement.
	async redirects() {
		return [
			// The default locale has no prefix; an explicit /en URL is the same page and must not split signals.
			{ source: '/en', destination: '/', permanent: true },
			{ source: '/en/:path*', destination: '/:path*', permanent: true },
			// The ALPHA / BETA / GAMMA placeholder projects were removed; send their old URLs to the archive.
			{ source: '/case-studies/:slug(alpha|beta|gamma)', destination: '/case-studies', permanent: true },
			{ source: '/tr/case-studies/:slug(alpha|beta|gamma)', destination: '/tr/case-studies', permanent: true },
			{
				source: '/:path*',
				has: [{ type: 'host', value: 'www.alaz.pro' }],
				destination: 'https://alaz.pro/:path*',
				permanent: true,
			},
		];
	},
	async headers() {
		return [
			// Project images and videos never change in place; let browsers and the CDN keep them for a year.
			{
				source: '/:prefix(videos|projects)/:path*',
				headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
			},
			{
				source: '/:path*',
				headers: [
					{ key: 'X-Content-Type-Options', value: 'nosniff' },
					{ key: 'X-Frame-Options', value: 'DENY' },
					{ key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
					{ key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
				],
			},
		];
	},
};

export default withNextIntl(nextConfig);

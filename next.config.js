import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
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

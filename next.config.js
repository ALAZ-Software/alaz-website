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

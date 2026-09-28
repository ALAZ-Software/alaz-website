import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: 'images.hostinger.com' },
			{ protocol: 'https', hostname: 'horizons-cdn.hostinger.com' },
		],
	},
};

export default withNextIntl(nextConfig);

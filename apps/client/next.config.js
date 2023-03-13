/** @type {import('next').NextConfig} */
const nextConfig = {
	swcMinify: true,
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	compress: true,
	experimental: {
		appDir: true
	},
	images: {
		domains: ['i.imgur.com', 'secure.gravatar.com', 'pub-c95c75d085c748ba8128bc8046a97e87.r2.dev']
	}
};

module.exports = nextConfig;

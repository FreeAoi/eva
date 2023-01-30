/** @type {import('next').NextConfig} */
const nextConfig = {
	swcMinify: true,
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	compress: true
};

module.exports = nextConfig;

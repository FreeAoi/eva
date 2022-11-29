/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	compress: true,
	// async rewrites() {
	// 	return [
	// 	  {
	// 		source: '/api/:slug*',
	// 		destination: 'http://localhost:3001/api/:slug*',
	// 	  },
	// 	]
	// },
};

module.exports = nextConfig;

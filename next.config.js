/** @type {import('next').NextConfig} */

// configuration file for next.js

const nextConfig = {
    experimental: {
        typedRoutes: true, //Generate Route types and enable type checking for Link and Router.push, etc.
        serverActions: true // lets us pass async server actions to client components
    },
		images: {
			domains: ['cdn.benzinga.com']
		}

}

module.exports = nextConfig

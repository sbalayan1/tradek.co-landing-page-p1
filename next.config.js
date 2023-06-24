/** @type {import('next').NextConfig} */

// configuration file for next.js

const nextConfig = {
    experimental: {
        typedRoutes: true, //Generate Route types and enable type checking for Link and Router.push, etc.
        serverActions: true // lets us pass async server actions to client components
    }, 
    // webpack(config, { nextRuntime }) { 
    //     // as of Next.js latest versions, the nextRuntime is preferred over `isServer`, because of edge-runtime
    //     if (typeof nextRuntime === "undefined") {
    //       const { IgnorePlugin } = require("webpack");
    //       const ignoreFs = new IgnorePlugin({ resourceRegExp: /fs/ });
    //       config.plugins.push(ignoreFs);
    //     }
    
    //     return config;
    // },
}

module.exports = nextConfig

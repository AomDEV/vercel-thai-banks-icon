/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    serverRuntimeConfig: {
        PROJECT_ROOT: __dirname,
    }
};

module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lastfm.freetls.fastly.net'],
      },
    eslint:{ 
        ignoreDuringBuilds: true,
      },
    typescript: {
        ignoreBuildErrors: true,
      },
};



export default nextConfig;

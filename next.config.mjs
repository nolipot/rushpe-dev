/** @type {import('next').NextConfig} */
const nextConfig = {
    // basePath: '/rushpe-dev',
    // distDir: 'dist',
    images: {
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 31_536_000,
    }
};

export default nextConfig;

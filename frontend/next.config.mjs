import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
};

export default withPWA(nextConfig);

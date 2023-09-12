/** @type {import('next').NextConfig} */
module.exports = {
    async rewrites() {
        return [
          {
            source: '/api/v1/:path*',
            destination: 'http://127.0.0.1:8000/api/v1/:path*/',
          },
        ]
    },
};

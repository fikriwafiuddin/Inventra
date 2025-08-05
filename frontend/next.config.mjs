/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL(
        "https://res.cloudinary.com/dvsoqr5sn/image/upload/v1754348068/Inventra/**"
      ),
    ],
  },
}

export default nextConfig

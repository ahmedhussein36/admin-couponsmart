import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin(
    "./i18n/request.ts"
);

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "res.cloudinary.com",
            "avatars.githubusercontent.com",
            "lh3.googleusercontent.com",
        ],
    },
};

export default withNextIntl(nextConfig);

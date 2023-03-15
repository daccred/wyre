/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
};

module.exports = {
    ...nextConfig,
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(ts|tsx)$/,
            loader: 'babel-loader',
            options: {
                presets: ['next/babel'],
            },
        });
        return config;
    },
};
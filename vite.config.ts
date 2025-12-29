import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    plugins: [
        react(),
        svgr({
            svgrOptions: {
                ref: true,
                svgo: true,
                titleProp: true,
            },
            include: '**/*.svg',
        }),
    ],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './utils/tests/setup.ts',
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html', 'json-summary'],
            exclude: [
                'node_modules/**',
                'dist/**',
                '**/*.d.ts',
                '**/*.config.*',
                '**/*.test.*',
                '**/*.spec.*',
                '**/*.stories.*',
                'coverage/**',
                '.storybook/**',
            ],
            reportOnFailure: true,
        },
    },
    css: {
        modules: {
            localsConvention: 'camelCase',
            generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
        preprocessorOptions: {
            scss: {
                includePaths: ['node_modules'],
                alias: {
                    '~': 'node_modules/',
                    '@cobalt/ui': __dirname,
                },
            },
        },
    },
    resolve: {
        alias: {
            '@cobalt/ui': __dirname,
        },
    },
});

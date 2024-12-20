import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                background: resolve(__dirname, 'src/background.js'),
                content: resolve(__dirname, 'src/scripts/content.js'),
                popuphtml: resolve(__dirname, 'src/popup/popup.html'),
                popup: resolve(__dirname, 'src/popup/popup.js'),
            },
            output: {
                entryFileNames: 'scripts/[name].js',
                chunkFileNames: 'scripts/[name].js',
                assetFileNames: 'scripts/[name].[ext]',
            },
        },
        outDir: 'dist',
        emptyOutDir: true,
    },
});

import glslify from 'rollup-plugin-glslify';
import { defineConfig } from 'vite';

const fullReloadAlways = {
    name: 'full-reload',
    handleHotUpdate({ server }) {
        server.ws.send({ type: 'full-reload' });
        return [];
    },
};

export default defineConfig({
    plugins: [glslify(), fullReloadAlways],
});

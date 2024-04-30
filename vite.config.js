import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
});

//TODO - Add alias to vite.config.js
// import { defineConfig } from 'vite';
// import reactRefresh from '@vitejs/plugin-react-refresh';
// import path from 'path';

// export default defineConfig({
//   plugins: [reactRefresh()],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, 'src'),

//     },
//   },
// });

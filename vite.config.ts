import { defineConfig, UserConfigExport } from 'vite';
import vue from '@vitejs/plugin-vue';
import tsConfigPaths from 'vite-tsconfig-paths';

import rawPlayers from './src/players.json';

// https://vitejs.dev/config/
const viteConfig: UserConfigExport = {
  plugins: [
    vue(),
    tsConfigPaths({
      loose: true,
    }),
  ],
};
export default defineConfig({
  ...viteConfig,
  ...({
    ssgOptions: {
      includedRoutes(_paths, _routes) {
        const paths = ['/'];
        rawPlayers.forEach((player) => {
          paths.push(`/${player.twitter}`);
        });
        return paths;
      },
    },
  } as any),
});

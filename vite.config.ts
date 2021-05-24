import { defineConfig, loadEnv } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import { resolve } from "path";
import styleImport from "vite-plugin-style-import";
import vue from "@vitejs/plugin-vue";

const env = loadEnv("", process.cwd());

const plugins = [
  vue(),
  styleImport({
    libs: [
      {
        libraryName: "element-plus",
        esModule: true,
        ensureStyleFile: true,
        resolveStyle: (name) => {
          const fileName = name.slice(3);
          return `element-plus/packages/theme-chalk/src/${fileName}.scss`;
        },
        resolveComponent: (name) => {
          return `element-plus/lib/${name}`;
        }
      }
    ]
  })
];

if (process.env.analyze) {
  plugins.push(
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  );
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins,
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/style/variables.scss";`
      }
    }
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      vue: "vue/dist/vue.esm-bundler.js" //fix runtime compiler
    }
  },
  base: "./",
  server: {
    port: parseInt(env.VITE_SERVER_PORT) || 4500,
    open: true,
    cors: true
  },
  build: {
    terserOptions: {
      compress: {
        drop_console: true
      }
    }
  }
});

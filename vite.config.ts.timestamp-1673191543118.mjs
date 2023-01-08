// vite.config.ts
import reactJs from "file:///C:/Users/Zaydek%20MG/GitHub/app-feathericons/node_modules/@vitejs/plugin-react/dist/index.mjs";
import unoCss from "file:///C:/Users/Zaydek%20MG/GitHub/app-feathericons/node_modules/unocss/dist/vite.mjs";
import { defineConfig } from "file:///C:/Users/Zaydek%20MG/GitHub/app-feathericons/node_modules/vite/dist/node/index.js";
var vite_config_default = defineConfig({
  plugins: [
    unoCss(),
    reactJs({
      //// babel: {
      //// 	"plugins": ["styled-jsx/babel"],
      //// },
      fastRefresh: false
    })
  ],
  preview: { host: true, port: 3e3 },
  server: { host: true, port: 3e3 }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxaYXlkZWsgTUdcXFxcR2l0SHViXFxcXGFwcC1mZWF0aGVyaWNvbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFpheWRlayBNR1xcXFxHaXRIdWJcXFxcYXBwLWZlYXRoZXJpY29uc1xcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvWmF5ZGVrJTIwTUcvR2l0SHViL2FwcC1mZWF0aGVyaWNvbnMvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3RKcyBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIlxuaW1wb3J0IHVub0NzcyBmcm9tIFwidW5vY3NzL3ZpdGVcIlxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIlxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuXHRwbHVnaW5zOiBbXG5cdFx0dW5vQ3NzKCksXG5cdFx0cmVhY3RKcyh7XG5cdFx0XHQvLy8vIGJhYmVsOiB7XG5cdFx0XHQvLy8vIFx0XCJwbHVnaW5zXCI6IFtcInN0eWxlZC1qc3gvYmFiZWxcIl0sXG5cdFx0XHQvLy8vIH0sXG5cdFx0XHRmYXN0UmVmcmVzaDogZmFsc2UsXG5cdFx0fSksXG5cdF0sXG5cdHByZXZpZXc6IHsgaG9zdDogdHJ1ZSwgcG9ydDogMzAwMCB9LFxuXHRzZXJ2ZXI6ICB7IGhvc3Q6IHRydWUsIHBvcnQ6IDMwMDAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTRULE9BQU8sYUFBYTtBQUNoVixPQUFPLFlBQVk7QUFDbkIsU0FBUyxvQkFBb0I7QUFFN0IsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDM0IsU0FBUztBQUFBLElBQ1IsT0FBTztBQUFBLElBQ1AsUUFBUTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BSVAsYUFBYTtBQUFBLElBQ2QsQ0FBQztBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVMsRUFBRSxNQUFNLE1BQU0sTUFBTSxJQUFLO0FBQUEsRUFDbEMsUUFBUyxFQUFFLE1BQU0sTUFBTSxNQUFNLElBQUs7QUFDbkMsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K

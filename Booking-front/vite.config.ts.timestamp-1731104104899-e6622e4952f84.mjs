// vite.config.ts
import react from "file:///C:/Users/Thinkpad/source/repos/Booking/Booking-front/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///C:/Users/Thinkpad/source/repos/Booking/Booking-front/node_modules/vite/dist/node/index.js";
var vite_config_default = defineConfig({
  base: "/",
  plugins: [react()],
  preview: {
    port: 5173,
    strictPort: true
  },
  resolve: {
    alias: {
      assets: "/src/assets",
      data: "/src/data",
      components: "/src/components",
      constants: "/src/constants",
      hooks: "/src/hooks",
      pages: "/src/pages",
      services: "/src/services",
      store: "/src/store",
      types: "/src/types",
      utils: "/src/utils",
      motion: "/src/motion",
      interfaces: "/src/interfaces"
    }
  },
  server: {
    port: 5173,
    strictPort: true,
    host: "0.0.0.0",
    origin: "http://0.0.0.0:5173"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxUaGlua3BhZFxcXFxzb3VyY2VcXFxccmVwb3NcXFxcQm9va2luZ1xcXFxCb29raW5nLWZyb250XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxUaGlua3BhZFxcXFxzb3VyY2VcXFxccmVwb3NcXFxcQm9va2luZ1xcXFxCb29raW5nLWZyb250XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9UaGlua3BhZC9zb3VyY2UvcmVwb3MvQm9va2luZy9Cb29raW5nLWZyb250L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xyXG5pbXBvcnQge2RlZmluZUNvbmZpZ30gZnJvbSAndml0ZSdcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgICBiYXNlOiBcIi9cIixcclxuICAgIHBsdWdpbnM6IFtyZWFjdCgpXSxcclxuICAgIHByZXZpZXc6IHtcclxuICAgICAgICBwb3J0OiA1MTczLFxyXG4gICAgICAgIHN0cmljdFBvcnQ6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgICAgIGFzc2V0czogXCIvc3JjL2Fzc2V0c1wiLFxyXG4gICAgICAgICAgICBkYXRhOiBcIi9zcmMvZGF0YVwiLFxyXG4gICAgICAgICAgICBjb21wb25lbnRzOiBcIi9zcmMvY29tcG9uZW50c1wiLFxyXG4gICAgICAgICAgICBjb25zdGFudHM6IFwiL3NyYy9jb25zdGFudHNcIixcclxuICAgICAgICAgICAgaG9va3M6IFwiL3NyYy9ob29rc1wiLFxyXG4gICAgICAgICAgICBwYWdlczogXCIvc3JjL3BhZ2VzXCIsXHJcbiAgICAgICAgICAgIHNlcnZpY2VzOiBcIi9zcmMvc2VydmljZXNcIixcclxuICAgICAgICAgICAgc3RvcmU6IFwiL3NyYy9zdG9yZVwiLFxyXG4gICAgICAgICAgICB0eXBlczogXCIvc3JjL3R5cGVzXCIsXHJcbiAgICAgICAgICAgIHV0aWxzOiBcIi9zcmMvdXRpbHNcIixcclxuICAgICAgICAgICAgbW90aW9uOiBcIi9zcmMvbW90aW9uXCIsXHJcbiAgICAgICAgICAgIGludGVyZmFjZXM6IFwiL3NyYy9pbnRlcmZhY2VzXCIsXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgICBwb3J0OiA1MTczLFxyXG4gICAgICAgIHN0cmljdFBvcnQ6IHRydWUsXHJcbiAgICAgICAgaG9zdDogJzAuMC4wLjAnLFxyXG4gICAgICAgIG9yaWdpbjogXCJodHRwOi8vMC4wLjAuMDo1MTczXCIsXHJcbiAgICB9LFxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTRWLE9BQU8sV0FBVztBQUM5VyxTQUFRLG9CQUFtQjtBQUczQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixNQUFNO0FBQUEsRUFDTixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsU0FBUztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sWUFBWTtBQUFBLEVBQ2hCO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDSCxRQUFRO0FBQUEsTUFDUixNQUFNO0FBQUEsTUFDTixZQUFZO0FBQUEsTUFDWixXQUFXO0FBQUEsTUFDWCxPQUFPO0FBQUEsTUFDUCxPQUFPO0FBQUEsTUFDUCxVQUFVO0FBQUEsTUFDVixPQUFPO0FBQUEsTUFDUCxPQUFPO0FBQUEsTUFDUCxPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsTUFDUixZQUFZO0FBQUEsSUFDaEI7QUFBQSxFQUNKO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDSixNQUFNO0FBQUEsSUFDTixZQUFZO0FBQUEsSUFDWixNQUFNO0FBQUEsSUFDTixRQUFRO0FBQUEsRUFDWjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==

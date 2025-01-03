/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  // The directory where Remix will output your build files
  buildDirectory: "build",

  // The file that contains the server-side logic (typically for SSR)
  serverBuildFile: "index.js",

  // The directory for static assets (public files)
  publicPath: "/",

  // Whether to enable file-based routing in Remix
  // 'auto' will use the default directory structure for routes.
  routes: async (defineRoutes) => {
    return defineRoutes((route) => {
      route("/", "index.tsx"); // Default route setup
      // Define other routes as needed
    });
  },

  // Enables the dev server to run using Vite for hot module reloading, etc.
  server: {
    // Use Vite for SSR
    hmr: {
      clientPort: 3000,
      serverPort: 3000,
    },
    // Additional server-side settings for SSR can be added here if necessary
  },

  // You can add additional settings to control data fetching, error handling, etc.
  future: {
    // Remix has various experimental features that can be enabled here
    v3_fetcherPersist: true,
    v3_relativeSplatPath: true,
    v3_throwAbortReason: true,
  },

  // Enable typescript support for Remix
  typescript: {
    // Setting this to false would disable type checking in Remix dev
    // (you can handle it with an external tool like ESLint or tsc separately).
    check: true,
  },

  // Tailwind CSS support (optional, but likely based on your setup)
  postcss: {
    // This can be adjusted depending on how you handle your postcss setup.
    plugins: [require("tailwindcss")(), require("autoprefixer")()],
  },

  // Other Remix-specific configurations can be added here as needed
};

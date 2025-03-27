# Native Federation with Expo & Re.Pack

This repository demonstrates how to build universal React Native applications (iOS, Android, and Web) using a micro-frontend architecture powered by Webpack's Module Federation. It leverages **Expo**, **Re.Pack**, **pnpm workspaces**, and **Turborepo**.

## Core Technologies

*   **[Expo](https://expo.dev/):** Framework and platform for universal React applications. Used for project initialization, native module access, config plugins, web support, and build services (EAS).
*   **[Re.Pack](https://github.com/callstack/repack):** A Webpack-based toolkit for React Native development, enabling advanced bundling features like Module Federation for mobile apps. It replaces Metro in this setup for mobile bundling.
*   **[Webpack](https://webpack.js.org/):** The underlying module bundler used by Re.Pack for mobile and directly (via `@expo/webpack-config`) for the web build.
*   **[Module Federation](https://webpack.js.org/concepts/module-federation/):** A Webpack feature allowing separate application builds to share code and dependencies dynamically at runtime.
*   **[pnpm](https://pnpm.io/):** Fast, disk space efficient package manager used for managing the monorepo workspaces.
*   **[Turborepo](https://turbo.build/repo):** High-performance build system for JavaScript/TypeScript monorepos, used here to manage and optimize build/dev tasks.

## Architecture Overview

This project follows a micro-frontend approach using Module Federation:

1.  **`apps/host`:** The main application shell.
    *   Acts as the **Host** application in Module Federation terms.
    *   Responsible for core navigation, initial setup, and shared context/services.
    *   Dynamically loads components/screens/apps from the `remotes` (`app1`, `app2`).
    *   Requires a **Development Client** build for mobile due to the native integration of Re.Pack.
2.  **`apps/app1`, `apps/app2`:** Feature-specific micro-applications.
    *   Act as **Remotes** in Module Federation terms.
    *   Expose specific components (e.g., their main `App` component) to be consumed by the `host`.
    *   Can be developed and potentially deployed independently.
3.  **Shared Dependencies:** Key libraries like `react`, `react-native`, and `react-native-web` are configured as `shared` in the Module Federation setup. This ensures only one instance is loaded at runtime, preventing version conflicts and optimizing bundle size.

## Getting Started

**Prerequisites:**

*   Node.js (LTS recommended)
*   pnpm (`npm install -g pnpm`)
*   Expo CLI (`pnpm install -g expo-cli`) - Optional, but useful for `expo prebuild`.
*   Watchman (Recommended for macOS/Linux for file watching)
*   Xcode (for iOS development)
*   Android Studio (for Android development)
*   EAS CLI (`pnpm install -g eas-cli`) - For building the dev client.

**Setup:**

1.  **Clone the repository:**
    ```bash
    git clone [<your-repo-url>](https://github.com/MuhammedBasith/expo-rn-repack-webpack.git)
    cd expo-rn-repack-webpack
    ```
2.  **Install dependencies:**
    ```bash
    pnpm install
    ```
3.  **Configure Local IP Address:**
    *   Module Federation relies on direct network communication during development. Find your machine's local IP address.
    *   Search and replace the placeholder IP (e.g., `192.168.X.X`) in all `webpack.mobile.config.mjs` and `webpack.web.config.mjs` files with **your** local IP address. Look for the `remotes` section and the `devServer.host` setting.
4.  **Configure Expo Project ID (Optional but recommended for EAS):**
    *   If using EAS, update the `expo.extra.eas.projectId` field in each app's `app.json` with your Expo project IDs.

**Usage:**

1.  **Build the Host Development Client (Mobile):**
    *   You need a development client build for the `host` app to include the native Re.Pack integration.
    *   Log in to Expo: `eas login`
    *   Build the client (example for Android local build):
        ```bash
        cd apps/host
        eas build --profile development --platform android --local
        # Or for iOS simulator:
        # eas build --profile development --platform ios --local
        ```
    *   Install the resulting `.apk` or `.app` file onto your device or simulator.

2.  **Run Development Servers (Mobile & Web):**
    *   This command starts the Webpack dev servers for all apps concurrently using Turborepo.
    *   **For Mobile:**
        ```bash
        pnpm dev
        ```
        *   This typically starts servers on ports like 8081 (host), 9001 (app1), 9002 (app2).
    *   **For Web:**
        ```bash
        pnpm dev:web
        ```
        *   This typically starts servers on ports like 8082 (host), 8083 (app1), 8084 (app2).

3.  **Connect the Mobile Dev Client:**
    *   Launch the `host` development client app you installed earlier.
    *   When prompted (or via the dev menu), enter the URL for the **host's mobile bundle**:
        *   Example: `http://<YOUR_LOCAL_IP>:8081/index.bundle?platform=<ios|android>` (replace IP and platform).
    *   The host app will load, and when it tries to access components from `app1` or `app2`, Module Federation will fetch their bundles from their respective dev servers (e.g., `http://<YOUR_LOCAL_IP>:9001/app1.container.bundle`).

4.  **Access the Web App:**
    *   Ensure the web dev servers are running (`pnpm dev:web`).
    *   Open your browser to the **host's web URL**:
        *   Example: `http://<YOUR_LOCAL_IP>:8082` or `http://localhost:8082`
    *   The host web app will load, and Module Federation will fetch the `remoteEntry.js` files from the other apps as needed.

## How it Works: Mobile vs. Web

**Mobile (iOS/Android):**

1.  **Expo Config Plugin (`plugin/withRepack.js`):** Modifies the native iOS/Android projects during `eas build` or `expo prebuild`. It adjusts build scripts and native entry points to use Re.Pack/Webpack instead of Metro and load bundles from the Webpack dev server URL or embedded bundle.
2.  **Re.Pack (`webpack.mobile.config.mjs`):** Uses Webpack with Re.Pack's specific plugins (`@callstack/repack/platform/webpack/WebpackPlugin`) to create React Native compatible bundles (`.bundle`).
3.  **Module Federation:** Fetches remote container bundles (`.container.bundle`) using Re.Pack's native `ScriptManager` when an import like `import('app1/App')` is encountered in the host.
4.  **Development Client:** Necessary because the native project is modified by the Re.Pack plugin.

**Web:**

1.  **Expo Webpack Config (`@expo/webpack-config`):** Provides a standard base configuration for building web apps with Expo.
2.  **`webpack.web.config.mjs`:** Extends the base Expo config, adding the `ModuleFederationPlugin` configured for standard web outputs (e.g., `remoteEntry.js`).
3.  **`react-native-web`:** Used (often automatically via `babel-preset-expo`) to provide web-compatible implementations of React Native components.
4.  **Module Federation:** Uses standard browser mechanisms (e.g., `<script>` tags or dynamic fetch) to load `remoteEntry.js` files when remote modules are imported.
5.  **Runs Directly in Browser:** No special client build needed.

## Key Configuration Files

*   `apps/*/app.json`: Expo app configuration, including the entry point for the Re.Pack config plugin.
*   `apps/*/plugin/withRepack.js`: The Expo Config Plugin that integrates Re.Pack into the native build process.
*   `apps/*/webpack.mobile.config.mjs`: Webpack configuration used by Re.Pack for bundling iOS and Android. Contains Module Federation setup for mobile.
*   `apps/*/webpack.web.config.mjs`: Webpack configuration for the web build. Contains Module Federation setup for web.
*   `turbo.json`: Defines build/dev pipelines for Turborepo.
*   `pnpm-workspace.yaml`: Defines the location of packages within the monorepo for pnpm.

## References

*   [Expo Documentation](https://docs.expo.dev/)
*   [Re.Pack Documentation](https://re-pack.dev/)
*   [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/)
*   [Turborepo Documentation](https://turbo.build/repo/docs)
*   [pnpm Workspaces](https://pnpm.io/workspaces)

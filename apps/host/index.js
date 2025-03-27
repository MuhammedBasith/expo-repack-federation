// Import all needed modules at the top level
import { ScriptManager, Script, Federated } from "@callstack/repack/client";
import { Platform } from "react-native";
import { registerRootComponent } from "expo";
import App from "./App";

// For web platforms, we need to properly initialize the shared modules
if (typeof window !== 'undefined' && window.navigator.product !== 'ReactNative') {
  // Web platform - dynamically import bootstrap
  // Use require.context to make webpack aware of the import
  Promise.resolve().then(() => {
    require('./src/bootstrap');
  }).catch(err => console.error(err));
} else {
  // React Native platform - directly import and register the app
  // Resolver configuration for mobile federation
  const resolveURL = Federated.createURLResolver({
    containers: {
      app1: 'http://192.168.29.162:9000/[name][ext]',
      app2: 'http://192.168.29.162:9001/[name][ext]',
    },
  });

  ScriptManager.shared.addResolver(async (scriptId, caller) => {
    let url;
    if (caller === 'main') {
      url = Script.getDevServerURL(scriptId);
    } else {
      url = resolveURL(scriptId, caller);
    }

    if (!url) {
      return undefined;
    }

    return {
      url,
      cache: false, // For development
      query: {
        platform: Platform.OS,
      },
    };
  });

  registerRootComponent(App);
}

import { registerRootComponent } from "expo";
import { AppRegistry, Platform } from "react-native";
import App from "./src/components/App";

// This registers the component for both Expo and Web
// For Expo/Mobile, we use registerRootComponent
// For Web, we use AppRegistry.registerComponent
if (Platform.OS === 'web') {
  // For React 18 on web, use createRoot instead of legacy render
  import('react-dom/client').then(({ createRoot }) => {
    const rootTag = document.getElementById('root');
    if (rootTag) {
      const root = createRoot(rootTag);
      root.render(<App />);
    }
  }).catch(err => {
    console.error('Error importing react-dom/client:', err);
  });
} else {
  // For Expo/Mobile
  registerRootComponent(App);
}

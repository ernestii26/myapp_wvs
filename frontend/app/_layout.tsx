import { API_RESOURCE, AppId, ENDPOINT } from "@/constants/config";
import { SocialProvider } from "@/container/hooks/useSocial";
import { LogtoProvider } from "@logto/rn";
import { Stack } from "expo-router";
import { Platform } from 'react-native';
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  // 避免在 Server Side Rendering (SSR) 時渲染 LogtoProvider，因為它依賴原生模組或瀏覽器 API
  if (typeof window === 'undefined' && Platform.OS === 'web') {
      return null;
  }

  return (
    <LogtoProvider 
        config={{ 
            endpoint: ENDPOINT, 
            appId: AppId,
            resources: [API_RESOURCE],
            scopes: ['all'], 
        }}
    >
        <SocialProvider>
            <Stack screenOptions={{headerShown: false}}>
                <Stack.Screen name="(main)" options={{ headerShown: false }} />
                <Stack.Screen name="welcome" options={{ headerShown: false }} />
                <Stack.Screen name="login" options={{ headerShown: false }} />
            </Stack>
            <Toast />
        </SocialProvider>
    </LogtoProvider>
  )
}

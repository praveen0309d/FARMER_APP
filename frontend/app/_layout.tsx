import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
// import { loadAuthData } from "./pages/AuthService"; // 👈 adjust path

export default function RootLayout() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const saved = await loadAuthData();
      if (saved?.token) {
        setInitialRoute("pages/HomeScreen"); // already logged in → go Home
      } else {
        setInitialRoute("pages/langu"); // first time → language selection
      }
    };
    checkAuth();
  }, []);


  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="pages/langu" options={{ headerShown: false }} />
      <Stack.Screen name="pages/login" options={{ headerShown: false }} />

      <Stack.Screen name="pages/Quick_Actions/SeasonalCalendar" options={{ headerShown: false }} />
      <Stack.Screen name="pages/Quick_Actions/irrigationTips" options={{ headerShown: false }} />
      <Stack.Screen name="pages/Quick_Actions/plantingGuide" options={{ headerShown: false }} />

      <Stack.Screen name="pages/guider/guideme" options={{ headerShown: false }} />
      <Stack.Screen name="pages/image_upload/cropimg" options={{ headerShown: false }} />
      {/* <Stack.Screen name="pages/voice" options={{ headerShown: false }} /> */}
      <Stack.Screen name="pages/yield_predict/recommendation" options={{ headerShown: false }} />
      <Stack.Screen name="pages/market_prices/marketPrices" options={{ headerShown: false }} />
      <Stack.Screen
        name="pages/HomeScreen"
       options={{ headerShown: false }}
      />
    </Stack>
  );
}

// Settings icon component
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { loadAuthData } from "../services/AuthService"; // adjust path

function SettingsButton() {
  const router = useRouter();

  const openSettings = async () => {
    // For now → log out directly
    await clearAuthData();
    router.replace("/pages/langu"); // back to language selection
  };

  return (
    <TouchableOpacity onPress={openSettings} style={{ marginRight: 15 }}>
      <Ionicons name="settings-outline" size={24} color="black" />
    </TouchableOpacity>
  );
}

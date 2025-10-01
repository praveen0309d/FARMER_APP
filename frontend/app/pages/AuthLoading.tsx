import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { loadAuthData } from "../../services/AuthService";

export default function AuthLoading() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const saved = await loadAuthData();
      if (saved && saved.token) {
        router.replace("/pages/HomeScreen"); // ✅ go straight to home
      } else {
        router.replace("/pages/langu"); // ✅ first time → go to langu
      }
    };

    checkAuth();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}

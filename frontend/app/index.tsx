import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store"; // for language flag
import React, { useEffect, useState } from "react";
import { Animated, Easing, Image, StyleSheet, Text } from "react-native";
import { loadAuthData } from "../services/AuthService"; // your auth storage helper

export default function Index() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Animation values
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);
  const logoRotate = new Animated.Value(0);

  useEffect(() => {
    // Start entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.elastic(1),
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(async () => {
      // Check if user already logged in
      const authData = await loadAuthData();
      const langChosen = await SecureStore.getItemAsync("language");

      let nextRoute = "/pages/langu"; // default

      if (authData) {
        // user is logged in
        nextRoute = "/pages/HomeScreen";
      } else if (langChosen) {
        // language already chosen, but not logged in
        nextRoute = "/pages/login";
      }

      // Fade out before navigation
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setLoading(false);
        router.replace(nextRoute);
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Interpolate rotation value
  const rotateInterpolate = logoRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  if (loading) {
    return (
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <Animated.View
          style={{
            transform: [{ scale: scaleAnim }, { rotate: rotateInterpolate }],
          }}
        >
          <Image
            source={require("../assets/images/loadcomp.png")}
            style={styles.logo}
          />
        </Animated.View>

        <Text style={styles.appName}>Farmer Friendly</Text>
        <Text style={styles.tagline}>Amazing experiences await</Text>
        <Text style={styles.loadingText}>Loading...</Text>
      </Animated.View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    marginBottom: 20,
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  tagline: {
    fontSize: 14,
    color: "#666",
    marginBottom: 30,
  },
  loadingText: {
    fontSize: 12,
    color: "#999",
    fontStyle: "italic",
  },
});

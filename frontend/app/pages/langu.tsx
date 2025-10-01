import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated, Easing, Dimensions, StyleSheet,Platform } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import i18n from "../i18n";
import styles from "./langu.styles";
const { width, height } = Dimensions.get("window");

export default function Langu() {
  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(30));
  const [buttonScales] = useState({
    en: new Animated.Value(1),
    hi: new Animated.Value(1),
    ta: new Animated.Value(1),
    ml: new Animated.Value(1)

  });

  useEffect(() => {
    // Animate on component mount
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: Platform.OS !== "web"
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.exp),
        useNativeDriver: Platform.OS !== "web"
      }),
    ]).start();
  }, []);

  const handleSelect = (lang: string) => {
    setSelectedLang(lang);
    
    // Button press animation for the selected language
    Animated.sequence([
      Animated.timing(buttonScales[lang as keyof typeof buttonScales], {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: Platform.OS !== "web"
      }),
      Animated.timing(buttonScales[lang as keyof typeof buttonScales], {
        toValue: 1,
        duration: 100,
        useNativeDriver: Platform.OS !== "web"
      }),
    ]).start();

    // Change app language
    i18n.changeLanguage(lang);

    // Show redirecting state
    setIsRedirecting(true);

    // Animate on selection
    Animated.timing(slideAnim, {
      toValue: -15,
      duration: 200,
      useNativeDriver: Platform.OS !== "web"
    }).start();

    setTimeout(() => {
      router.push("/pages/login"); // Navigate to login after language selection
    }, 800);
  };

  const languages = [
    { code: "en", label: "English", icon: "language", flag: "🇺🇸", color: "#4A90E2" },
    { code: "hi", label: "हिन्दी", icon: "translate", flag: "🇮🇳", color: "#F5A623" },
    { code: "ta", label: "தமிழ்", icon: "g-translate", flag: "🇮🇳", color: "#50E3C2" }, 
    { code: "ml", label: "മലയാളം", icon: "g-translate", flag: "🇮🇳", color: "#FFB74D" },

  ];

  return (
    <LinearGradient 
      colors={["#E8F5E9", "#F1F8E9", "#F9FBE7"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
          alignItems: "center",
          width: "100%",
        }}
      >
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="translate" size={32} color="#000000ff" />
          </View>
          <Text style={styles.title}>Choose Your Language</Text>
          <Text style={styles.subtitle}>Select your preferred language to continue</Text>
        </View>

        <View style={styles.languageContainer}>
          {languages.map((lang) => (
            <Animated.View
              key={lang.code}
              style={[
                { transform: [{ scale: buttonScales[lang.code as keyof typeof buttonScales] }] }
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.languageButton,
                  { borderColor: lang.color },
                  selectedLang === lang.code && [styles.languageButtonSelected, { backgroundColor: lang.color }],
                ]}
                onPress={() => handleSelect(lang.code)}
                activeOpacity={0.7}
                disabled={isRedirecting}
              >
                <View style={styles.languageContent}>
                  <Text style={styles.flag}>{lang.flag}</Text>
                  <Text
                    style={[
                      styles.languageText,
                      selectedLang === lang.code && styles.languageTextSelected,
                    ]}
                  >
                    {lang.label}
                  </Text>
                </View>
                {selectedLang === lang.code && (
                  <View style={styles.checkContainer}>
                    <MaterialIcons 
                      name="check-circle" 
                      size={22} 
                      color="#fff" 
                    />
                  </View>
                )}
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        {isRedirecting && (
          <Animated.View 
            style={styles.redirectingContainer}
            entering={Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 500,
              useNativeDriver: Platform.OS !== "web"
            })}
          >
            <Text style={styles.redirectingText}>Redirecting...</Text>
            <View style={styles.dotsContainer}>
              <Animated.View style={[styles.dot, styles.dot1]} />
              <Animated.View style={[styles.dot, styles.dot2]} />
              <Animated.View style={[styles.dot, styles.dot3]} />
            </View>
          </Animated.View>
        )}
      </Animated.View>
    </LinearGradient>
  );
}
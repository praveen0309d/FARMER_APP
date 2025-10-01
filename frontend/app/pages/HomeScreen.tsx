import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { clearAuthData, loadAuthData } from "../../services/AuthService.ts";
import i18n from "../i18n";
import styles from "./home.styles";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const saved = await loadAuthData();
      if (saved && saved.user?.name) {
        setUserName(saved.user.name);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await clearAuthData();
    setSettingsVisible(false);
    router.replace("/pages/langu");
  };

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setSettingsVisible(false);
  };

  const goToSeasonalCalendar = () => {
  router.push("/pages/Quick_Actions/SeasonalCalendar");
};
  const irrigationTips = () => {
  router.push("/pages/Quick_Actions/irrigationTips");

};  
const plantingGuide = () => {
  router.push("/pages/Quick_Actions/plantingGuide");
};
const guideme = () => {
  router.push("/pages/guideme");
};

  const features = [
    {
      id: 1,
      title: i18n.t("GuideMe"),
      description: i18n.t("guidemeDesc"),
      icon: "signpost",
      color: "#4CAF50",
      action: () => router.push("/pages/guider/guideme")
    },
    {
      id: 2,
      title: i18n.t("uploadCropImage"),
      description: i18n.t("uploadCropImageDesc"),
      icon: "cloud-upload",
      color: "#2196F3",
      action: () => router.push("/pages/image_upload/cropimg")
    },
    {
      id: 3,
      title: i18n.t("getCropRecommendation"),
      description: i18n.t("getCropRecommendationDesc"),
      icon: "spa",
      color: "#FF9800",
      action: () => router.push("/pages/yield_predict/recommendation")
    },
    {
      id:4,
      title: i18n.t("marketPrices"),
      description: i18n.t("marketPricesDesc"),
      icon: "attach-money",
      color: "#9C27B0",
      action: () => router.push("/pages/market_prices/marketPrices")
    }
  ];

  return (
    <View style={styles.container}>
      {/* Header with welcome and settings */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>
            {i18n.t("welcome")}, {userName || "User"}!
          </Text>
          <Text style={styles.subtitle}>{i18n.t("whatToDoToday")}</Text>
        </View>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => setSettingsVisible(true)}
        >
          <Ionicons name="settings-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Main content with feature cards */}
      <ScrollView contentContainerStyle={styles.featuresContainer}>
        {features.map((feature) => (
          <TouchableOpacity
            key={feature.id}
            style={[styles.featureCard, { borderLeftColor: feature.color }]}
            onPress={feature.action}
          >
            <View style={[styles.iconContainer, { backgroundColor: `${feature.color}20` }]}>
              <MaterialIcons name={feature.icon} size={32} color={feature.color} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={20} color="#666" />
          </TouchableOpacity>
        ))}
        
        {/* Statistics section */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>{i18n.t("cropHealthStats")}</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>85%</Text>
              <Text style={styles.statLabel}>{i18n.t("healthyCrops")}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12%</Text>
              <Text style={styles.statLabel}>{i18n.t("needsAttention")}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>3%</Text>
              <Text style={styles.statLabel}>{i18n.t("diseased")}</Text>
            </View>
          </View>
        </View>
        
        {/* Quick actions */}
        <Text style={styles.sectionTitle}>{i18n.t("quickActions")}</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickAction}  onPress={plantingGuide}>
            <FontAwesome5 name="seedling" size={20} color="#4CAF50" />
            <Text style={styles.quickActionText}>{i18n.t("plantingGuide")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction} onPress={irrigationTips}>
            <Ionicons name="water" size={20} color="#2196F3" />
            <Text style={styles.quickActionText}>{i18n.t("irrigationTips")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction} onPress={goToSeasonalCalendar}>
            <FontAwesome5 name="calendar-alt" size={20} color="#FF9800" />
            <Text style={styles.quickActionText}>{i18n.t("seasonalCalendar")}</Text>
          </TouchableOpacity>
        </View>
            </ScrollView>



      {/* Settings Modal */}
      <Modal
        visible={settingsVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setSettingsVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{i18n.t("settings")}</Text>
              <TouchableOpacity onPress={() => setSettingsVisible(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.modalSectionTitle}>{i18n.t("language")}</Text>
            <View style={styles.languageOptions}>
              <TouchableOpacity
                onPress={() => handleChangeLanguage("en")}
                style={styles.languageOption}
              >
                <Text>English</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleChangeLanguage("hi")}
                style={styles.languageOption}
              >
                <Text>हिन्दी</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleChangeLanguage("ta")}
                style={styles.languageOption}
              >
                <Text>தமிழ்</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleChangeLanguage("ml")}
                style={styles.languageOption}
              >
                <Text>മലയാളം</Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity
              onPress={handleLogout}
              style={styles.logoutButton}
            >
              <Text style={styles.logoutText}>{i18n.t("logout")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}


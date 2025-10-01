import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import i18n from "../../i18n";
import styles from "./plantingGuide.styles";

const { width } = Dimensions.get("window");

export default function PlantingGuide() {
  const router = useRouter();
  const [expandedSection, setExpandedSection] = useState(null);

  const plantingTips = [
    {
      id: 1,
      title: i18n.t("soilPreparation"),
      icon: "terrain",
      color: "#8D6E63",
      tips: [
        i18n.t("soilTip1"),
        i18n.t("soilTip2"),
        i18n.t("soilTip3"),
        i18n.t("soilTip4")
      ]
    },
    {
      id: 2,
      title: i18n.t("seedSelection"),
      icon: "spa",
      color: "#4CAF50",
      tips: [
        i18n.t("seedTip1"),
        i18n.t("seedTip2"),
        i18n.t("seedTip3"),
        i18n.t("seedTip4")
      ]
    },
    {
      id: 3,
      title: i18n.t("plantingTechniques"),
      icon: "nature-people",
      color: "#795548",
      tips: [
        i18n.t("plantingTip1"),
        i18n.t("plantingTip2"),
        i18n.t("plantingTip3"),
        i18n.t("plantingTip4")
      ]
    },
    {
      id: 4,
      title: i18n.t("seasonalPlanning"),
      icon: "calendar-today",
      color: "#FF9800",
      tips: [
        i18n.t("seasonalTip1"),
        i18n.t("seasonalTip2"),
        i18n.t("seasonalTip3"),
        i18n.t("seasonalTip4")
      ]
    },
    {
      id: 5,
      title: i18n.t("cropRotation"),
      icon: "autorenew",
      color: "#607D8B",
      tips: [
        i18n.t("rotationTip1"),
        i18n.t("rotationTip2"),
        i18n.t("rotationTip3"),
        i18n.t("rotationTip4")
      ]
    }
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{i18n.t("plantingGuide")}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.introText}>
          {i18n.t("plantingIntro")}
        </Text>

        {plantingTips.map((section) => (
          <TouchableOpacity
            key={section.id}
            style={[styles.sectionCard, expandedSection === section.id && styles.sectionCardExpanded]}
            onPress={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
            activeOpacity={0.7}
          >
            <View style={styles.sectionHeader}>
              <View style={[styles.iconContainer, { backgroundColor: `${section.color}20` }]}>
                <MaterialIcons name={section.icon} size={24} color={section.color} />
              </View>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Ionicons
                name={expandedSection === section.id ? "chevron-up" : "chevron-down"}
                size={20}
                color="#666"
              />
            </View>

            {expandedSection === section.id && (
              <View style={styles.tipsContainer}>
                {section.tips.map((tip, index) => (
                  <View key={index} style={styles.tipItem}>
                    <View style={[styles.tipBullet, { backgroundColor: section.color }]} />
                    <Text style={styles.tipText}>{tip}</Text>
                  </View>
                ))}
              </View>
            )}
          </TouchableOpacity>
        ))}

        <View style={styles.quickTips}>
          <Text style={styles.quickTipsTitle}>{i18n.t("quickTips")}</Text>
          <View style={styles.tipBox}>
            <Ionicons name="bulb-outline" size={24} color="#FFD700" />
            <Text style={styles.tipBoxText}>{i18n.t("generalTip")}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


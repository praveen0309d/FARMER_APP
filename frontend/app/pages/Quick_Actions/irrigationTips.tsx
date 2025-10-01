import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import i18n from "../../i18n";
import styles from "./irrigationTips.styles";
const { width } = Dimensions.get("window");

export default function IrrigationTips() {
  const router = useRouter();
  const [expandedSection, setExpandedSection] = useState(null);

  const irrigationMethods = [
    {
      id: 1,
      title: i18n.t("dripIrrigation"),
      icon: "opacity",
      color: "#2196F3",
      benefits: [
        i18n.t("dripBenefit1"),
        i18n.t("dripBenefit2"),
        i18n.t("dripBenefit3"),
        i18n.t("dripBenefit4")
      ],
      suitableFor: i18n.t("dripSuitable")
    },
    {
      id: 2,
      title: i18n.t("sprinklerIrrigation"),
      icon: "invert-colors",
      color: "#03A9F4",
      benefits: [
        i18n.t("sprinklerBenefit1"),
        i18n.t("sprinklerBenefit2"),
        i18n.t("sprinklerBenefit3"),
        i18n.t("sprinklerBenefit4")
      ],
      suitableFor: i18n.t("sprinklerSuitable")
    },
    {
      id: 3,
      title: i18n.t("floodIrrigation"),
      icon: "waves",
      color: "#00BCD4",
      benefits: [
        i18n.t("floodBenefit1"),
        i18n.t("floodBenefit2"),
        i18n.t("floodBenefit3"),
        i18n.t("floodBenefit4")
      ],
      suitableFor: i18n.t("floodSuitable")
    },
    {
      id: 4,
      title: i18n.t("waterConservation"),
      icon: "eco",
      color: "#4CAF50",
      tips: [
        i18n.t("conservationTip1"),
        i18n.t("conservationTip2"),
        i18n.t("conservationTip3"),
        i18n.t("conservationTip4")
      ]
    },
    {
      id: 5,
      title: i18n.t("irrigationTiming"),
      icon: "access-time",
      color: "#FF9800",
      tips: [
        i18n.t("timingTip1"),
        i18n.t("timingTip2"),
        i18n.t("timingTip3"),
        i18n.t("timingTip4")
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
        <Text style={styles.headerTitle}>{i18n.t("irrigationTips")}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.introText}>
          {i18n.t("irrigationIntro")}
        </Text>

        {irrigationMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={[styles.methodCard, expandedSection === method.id && styles.methodCardExpanded]}
            onPress={() => setExpandedSection(expandedSection === method.id ? null : method.id)}
            activeOpacity={0.7}
          >
            <View style={styles.methodHeader}>
              <View style={[styles.iconContainer, { backgroundColor: `${method.color}20` }]}>
                <MaterialIcons name={method.icon} size={24} color={method.color} />
              </View>
              <Text style={styles.methodTitle}>{method.title}</Text>
              <Ionicons
                name={expandedSection === method.id ? "chevron-up" : "chevron-down"}
                size={20}
                color="#666"
              />
            </View>

            {expandedSection === method.id && (
              <View style={styles.detailsContainer}>
                {method.benefits && (
                  <>
                    <Text style={styles.subtitle}>{i18n.t("benefits")}</Text>
                    {method.benefits.map((benefit, index) => (
                      <View key={index} style={styles.detailItem}>
                        <View style={[styles.bullet, { backgroundColor: method.color }]} />
                        <Text style={styles.detailText}>{benefit}</Text>
                      </View>
                    ))}
                  </>
                )}
                
                {method.tips && (
                  <>
                    <Text style={styles.subtitle}>{i18n.t("tips")}</Text>
                    {method.tips.map((tip, index) => (
                      <View key={index} style={styles.detailItem}>
                        <View style={[styles.bullet, { backgroundColor: method.color }]} />
                        <Text style={styles.detailText}>{tip}</Text>
                      </View>
                    ))}
                  </>
                )}
                
                {method.suitableFor && (
                  <>
                    <Text style={styles.subtitle}>{i18n.t("suitableFor")}</Text>
                    <Text style={styles.suitableText}>{method.suitableFor}</Text>
                  </>
                )}
              </View>
            )}
          </TouchableOpacity>
        ))}

        <View style={styles.waterTip}>
          <Ionicons name="water" size={32} color="#2196F3" />
          <Text style={styles.waterTipText}>{i18n.t("waterWisdom")}</Text>
        </View>
      </ScrollView>
    </View>
  );
}


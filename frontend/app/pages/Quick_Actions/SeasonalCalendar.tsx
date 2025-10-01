import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { loadAuthData } from "../../../services/AuthService";
import i18n from "../../i18n";
import seasonalData from "../../seasonaldata/seasonal.json";
import styles from "./SeasonalCalendar.styles";
import { useRouter } from "expo-router";
const { width } = Dimensions.get("window");

export default function SeasonalCalendarPage() {
  const router = useRouter();
  const [userState, setUserState] = useState("tamilnadu");
  const [crops, setCrops] = useState([]);
  const [selectedLang, setSelectedLang] = useState(i18n.language);
  const [selectedSeason, setSelectedSeason] = useState("all");
  const [expandedCrop, setExpandedCrop] = useState(null);

  useEffect(() => {
    const fetchUserState = async () => {
      const user = await loadAuthData();
      if (user?.user?.state) setUserState(user.user.state);
    };
    fetchUserState();
  }, []);

  useEffect(() => {
    if (seasonalData[userState] && seasonalData[userState][selectedLang]) {
      setCrops(seasonalData[userState][selectedLang]);
    } else {
      setCrops([]);
    }
  }, [userState, selectedLang]);

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setSelectedLang(lang);
  };

  const getSeasonsList = () => {
    const allSeasons = new Set();
    crops.forEach(crop => {
      crop.seasons.forEach(season => allSeasons.add(season));
    });
    return ["all", ...Array.from(allSeasons)];
  };

  const filteredCrops = selectedSeason === "all" 
    ? crops 
    : crops.filter(crop => crop.seasons.includes(selectedSeason));

  const seasonNames = {
    all: i18n.t("allSeasons"),
    kharif: i18n.t("kharifSeason"),
    rabi: i18n.t("rabiSeason"),
    zaid: i18n.t("zaidSeason"),
    // Add more season translations as needed
  };

  return (
    <View style={styles.container}>
      {/* Header */}

       <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{i18n.t("seasonalCalendar")}</Text>
        <Text style={styles.subtitle}>
          {i18n.t("for")} {userState.charAt(0).toUpperCase() + userState.slice(1)}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Filters */}
      <View style={styles.filterContainer}>
        <View style={styles.filterRow}>
          <View style={styles.filterItem}>
            <Text style={styles.filterLabel}>{i18n.t("selectState")}</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={userState}
                style={styles.picker}
                onValueChange={setUserState}
                dropdownIconColor="#4CAF50"
              >
                {Object.keys(seasonalData).map((state) => (
                  <Picker.Item
                    key={state}
                    label={state.charAt(0).toUpperCase() + state.slice(1)}
                    value={state}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.filterItem}>
            <Text style={styles.filterLabel}>{i18n.t("selectSeason")}</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedSeason}
                style={styles.picker}
                onValueChange={setSelectedSeason}
                dropdownIconColor="#4CAF50"
              >
                {getSeasonsList().map((season) => (
                  <Picker.Item
                    key={season}
                    label={seasonNames[season] || season}
                    value={season}
                  />
                ))}
              </Picker>
            </View>
          </View>
        </View>

      </View>

      {/* Content */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {filteredCrops.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="leaf-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>{i18n.t("noCropsFound")}</Text>
            <Text style={styles.emptySubtext}>{i18n.t("tryDifferentFilter")}</Text>
          </View>
        ) : (
          <>
            <Text style={styles.resultsText}>
              {filteredCrops.length} {i18n.t("cropsFound")}
            </Text>
            
            {filteredCrops.map((crop) => (
              <TouchableOpacity
                key={crop.id}
                style={[styles.card, expandedCrop === crop.id && styles.cardExpanded]}
                onPress={() => setExpandedCrop(expandedCrop === crop.id ? null : crop.id)}
                activeOpacity={0.7}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.cropInfo}>
                    <Text style={styles.cropName}>{crop.name}</Text>
                    <View style={styles.seasonBadges}>
                      {crop.seasons.map((season) => (
                        <View key={season} style={styles.seasonBadge}>
                          <Text style={styles.seasonBadgeText}>
                            {seasonNames[season] || season}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                  <Ionicons
                    name={expandedCrop === crop.id ? "chevron-up" : "chevron-down"}
                    size={20}
                    color="#666"
                  />
                </View>

                {expandedCrop === crop.id && (
                  <View style={styles.cardDetails}>
                    <View style={styles.detailRow}>
                      <MaterialIcons name="date-range" size={18} color="#4CAF50" />
                      <View style={styles.detailText}>
                        <Text style={styles.detailLabel}>{i18n.t("plantingTime")}</Text>
                        <Text style={styles.detailValue}>{crop.planting}</Text>
                      </View>
                    </View>

                    <View style={styles.detailRow}>
                      <MaterialIcons name="agriculture" size={18} color="#FF9800" />
                      <View style={styles.detailText}>
                        <Text style={styles.detailLabel}>{i18n.t("harvestingTime")}</Text>
                        <Text style={styles.detailValue}>{crop.harvesting}</Text>
                      </View>
                    </View>

                    <View style={styles.descriptionContainer}>
                      <Text style={styles.description}>{crop.description}</Text>
                    </View>

                  </View>
                )}
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}


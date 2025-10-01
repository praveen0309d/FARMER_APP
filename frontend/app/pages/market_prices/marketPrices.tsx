import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import getBaseUrl from "../../getBaseUrl";
import dropdownData from "../../market_hierarchy.json";
import { Ionicons } from "@expo/vector-icons";
import i18n from "../../i18n";
import { useRouter } from "expo-router";
import styles from "./marketPrices.style";

const COLORS = {
  primary: '#2E7D32',
  primaryLight: '#4CAF50',
  secondary: '#FF9800',
  background: '#F5F5F5',
  surface: '#FFFFFF',
  error: '#D32F2F',
  text: '#212121',
  textSecondary: '#757575',
  border: '#BDBDBD',
  success: '#388E3C',
  warning: '#FF9800',
  info: '#2196F3',
};

export default function PricePredictor() {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const router = useRouter();
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [market, setMarket] = useState("");
  const [commodity, setCommodity] = useState("");
  const [variety, setVariety] = useState("");
  const [predictedPrice, setPredictedPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    if (!state || !district || !market || !commodity || !variety) {
      Alert.alert(i18n.t("error"), i18n.t("pleaseFillAllFields"));
      return;
    }

    const input_date = date.toISOString().split("T")[0];
    setLoading(true);

    try {
      const res = await fetch(`${getBaseUrl()}/api/marketpredict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: input_date, state, district, market, commodity, variety }),
      });
      const json = await res.json();
      if (json.predicted_price !== undefined) {
        setPredictedPrice(json.predicted_price);
      } else {
        Alert.alert(i18n.t("error"), json.error || i18n.t("predictionFailed"));
      }
    } catch (err: any) {
      Alert.alert(i18n.t("error"), err.message || i18n.t("somethingWentWrong"));
    }

    setLoading(false);
  };

  const resetForm = () => {
    setState("");
    setDistrict("");
    setMarket("");
    setCommodity("");
    setVariety("");
    setPredictedPrice(null);
  };

  const renderPicker = (label: string, value: string, setValue: Function, options: string[]) => (
    <View style={styles.pickerContainer}>
      <Text style={[styles.label, { flexWrap: 'wrap' }]}>{label}</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={value}
          onValueChange={setValue}
          style={styles.picker}
          dropdownIconColor={COLORS.primary}
        >
          <Picker.Item label={`${i18n.t("select")} ${label}`} value="" />
          {options.map((item) => (
            <Picker.Item key={item} label={item} value={item} />
          ))}
        </Picker>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { flexWrap: 'wrap' }]}>{i18n.t("cropPricePredictor")}</Text>
        <View style={styles.backButton} />
      </View>

      <Text style={[styles.subtitle, { flexWrap: 'wrap' }]}>{i18n.t("predictorSubtitle")}</Text>

      {/* Date Picker */}
      <View style={styles.dateContainer}>
        <Text style={[styles.label, { flexWrap: 'wrap' }]}>{i18n.t("selectDate")}</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Ionicons name="calendar" size={18} color={COLORS.primary} />
          <Text style={[styles.dateButtonText, { flexWrap: 'wrap' }]}>{date.toDateString()}</Text>
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(_, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      {/* Dropdowns */}
      {renderPicker(i18n.t("state"), state, setState, Object.keys(dropdownData))}
      {state && renderPicker(i18n.t("district"), district, setDistrict, Object.keys(dropdownData[state] || {}))}
      {state && district && renderPicker(i18n.t("market"), market, setMarket, Object.keys(dropdownData[state]?.[district] || {}))}
      {state && district && market && renderPicker(i18n.t("commodity"), commodity, setCommodity, Object.keys(dropdownData[state]?.[district]?.[market] || {}))}
      {state && district && market && commodity && renderPicker(i18n.t("variety"), variety, setVariety, dropdownData[state]?.[district]?.[market]?.[commodity] || [])}

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={resetForm}
        >
          <Ionicons name="refresh" size={18} color={COLORS.text} />
          <Text style={[styles.buttonText, { flexWrap: 'wrap', textAlign: 'center' }]}>{i18n.t("reset")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.predictButton, loading && styles.buttonDisabled]}
          onPress={handlePredict}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <>
              <Ionicons name="analytics" size={18} color="#FFF" />
              <Text style={[styles.predictButtonText, { flexWrap: 'wrap' }]}>{i18n.t("predictPrice")}</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Result */}
      {predictedPrice !== null && (
        <View style={styles.resultContainer}>
          <Text style={[styles.resultTitle, { flexWrap: 'wrap' }]}>{i18n.t("predictionResult")}</Text>

          <View style={styles.resultItem}>
            <View style={styles.iconContainer}>
              <Ionicons name="pricetag" size={20} color={COLORS.primary} />
            </View>
            <View style={styles.resultTextContainer}>
              <Text style={[styles.resultLabel, { flexWrap: 'wrap' }]}>{i18n.t("predictedPrice")}</Text>
              <Text style={styles.resultValue}>₹{predictedPrice.toFixed(2)} / kg</Text>
            </View>
          </View>

          <View style={styles.resultItem}>
            <View style={styles.iconContainer}>
              <Ionicons name="information-circle" size={20} color={COLORS.info} />
            </View>
            <View style={styles.resultTextContainer}>
              <Text style={[styles.resultLabel, { flexWrap: 'wrap' }]}>{i18n.t("note")}</Text>
              <Text style={[styles.resultAdvice, { flexWrap: 'wrap' }]}>{i18n.t("predictionNote")}</Text>
            </View>
          </View>
        </View>
      )}

    </ScrollView>
  );
}



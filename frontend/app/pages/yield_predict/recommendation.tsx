import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  ScrollView, 
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Dimensions
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useTranslation } from "react-i18next";
import { Ionicons } from '@expo/vector-icons';
import "../../i18n";
import styles from "./recommendation.styles";
import statesData from "../../states_districts.json";
import getBaseUrl from "../../getBaseUrl";
import { useRouter } from "expo-router";

const { width } = Dimensions.get('window');

// Color scheme
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
};

export default function App() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [year, setYear] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [rainAnnual, setRainAnnual] = useState("");
  const [rainJJAS, setRainJJAS] = useState("");
  const [tempAnnual, setTempAnnual] = useState("");
  const [tempJunSep, setTempJunSep] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Generate year options dynamically
  const years = [];
  for (let y = 2025; y <= 2035; y++) {
    years.push(y.toString());
  }

  const validateForm = () => {
    const newErrors = {};
    
    if (!year) newErrors.year = t('yearRequired');
    if (!state) newErrors.state = t('stateRequired');
    if (!district) newErrors.district = t('districtRequired');
    if (!rainAnnual) newErrors.rainAnnual = t('rainAnnualRequired');
    else if (isNaN(rainAnnual)) newErrors.rainAnnual = t('mustBeNumber');
    if (!rainJJAS) newErrors.rainJJAS = t('rainJJASRequired');
    else if (isNaN(rainJJAS)) newErrors.rainJJAS = t('mustBeNumber');
    if (!tempAnnual) newErrors.tempAnnual = t('tempAnnualRequired');
    else if (isNaN(tempAnnual)) newErrors.tempAnnual = t('mustBeNumber');
    if (!tempJunSep) newErrors.tempJunSep = t('tempJunSepRequired');
    else if (isNaN(tempJunSep)) newErrors.tempJunSep = t('mustBeNumber');
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePredict = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const response = await fetch(`${getBaseUrl()}/api/yield/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          year,
          state,
          district,
          rain_annual: rainAnnual,
          rain_jjas: rainJJAS,
          temp_annual: tempAnnual,
          temp_junsep: tempJunSep,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setPrediction(`${data.predicted_yield} ${data.unit}`);
      } else {
        Alert.alert(t('error'), data.error || t('somethingWentWrong'));
      }
    } catch (err) {
      Alert.alert(t('error'), err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setYear("");
    setState("");
    setDistrict("");
    setRainAnnual("");
    setRainJJAS("");
    setTempAnnual("");
    setTempJunSep("");
    setPrediction(null);
    setErrors({});
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
          <Text style={styles.title}>{t("yieldpredict")}</Text>
        </View>

        {/* Year Dropdown */}
        <Text style={styles.label}>{t("year")}</Text>
        <View style={[styles.pickerContainer, errors.year && styles.inputError]}>
          <Picker
            selectedValue={year}
            onValueChange={(value) => {
              setYear(value);
              if (errors.year) setErrors({...errors, year: ''});
            }}
            style={styles.picker}
          >
            <Picker.Item label="--" value="" />
            {years.map((y) => (
              <Picker.Item key={y} label={y} value={y} />
            ))}
          </Picker>
        </View>
        {errors.year ? <Text style={styles.errorText}>{errors.year}</Text> : null}

        {/* State Dropdown */}
        <Text style={styles.label}>{t("state")}</Text>
        <View style={[styles.pickerContainer, errors.state && styles.inputError]}>
          <Picker
            selectedValue={state}
            onValueChange={(value) => {
              setState(value);
              setDistrict("");
              if (errors.state) setErrors({...errors, state: ''});
            }}
            style={styles.picker}
          >
            <Picker.Item label="--" value="" />
            {Object.keys(statesData).map((stateName) => (
              <Picker.Item key={stateName} label={stateName} value={stateName} />
            ))}
          </Picker>
        </View>
        {errors.state ? <Text style={styles.errorText}>{errors.state}</Text> : null}

        {/* District Dropdown */}
        <Text style={styles.label}>{t("district")}</Text>
        <View style={[styles.pickerContainer, errors.district && styles.inputError, !state && styles.disabled]}>
          <Picker
            selectedValue={district}
            onValueChange={(value) => {
              setDistrict(value);
              if (errors.district) setErrors({...errors, district: ''});
            }}
            style={styles.picker}
            enabled={!!state}
          >
            <Picker.Item label="--" value="" />
            {state &&
              statesData[state].map((districtName) => (
                <Picker.Item key={districtName} label={districtName} value={districtName} />
              ))}
          </Picker>
        </View>
        {errors.district ? <Text style={styles.errorText}>{errors.district}</Text> : null}

        {/* Rainfall & Temperature Inputs */}
        <TextInput
          style={[styles.input, errors.rainAnnual && styles.inputError]}
          placeholder={t("rainAnnual")}
          keyboardType="numeric"
          value={rainAnnual}
          onChangeText={(text) => {
            setRainAnnual(text);
            if (errors.rainAnnual) setErrors({...errors, rainAnnual: ''});
          }}
        />
        {errors.rainAnnual ? <Text style={styles.errorText}>{errors.rainAnnual}</Text> : null}

        <TextInput
          style={[styles.input, errors.rainJJAS && styles.inputError]}
          placeholder={t("rainJJAS")}
          keyboardType="numeric"
          value={rainJJAS}
          onChangeText={(text) => {
            setRainJJAS(text);
            if (errors.rainJJAS) setErrors({...errors, rainJJAS: ''});
          }}
        />
        {errors.rainJJAS ? <Text style={styles.errorText}>{errors.rainJJAS}</Text> : null}

<Text style={styles.label}>{t("tempAnnual")}</Text>
        <View style={[styles.pickerContainer, errors.state && styles.inputError]}>
<Picker
  selectedValue={tempAnnual}
  onValueChange={(value) => setTempAnnual(value)}
  style={styles.pickerContainer}
>
  <Picker.Item label="--" value="" />
  {Array.from({ length: 41 }, (_, i) => i + 5).map((temp) => (
    <Picker.Item key={temp} label={`${temp} °C`} value={temp.toString()} />
  ))}
</Picker>
</View>

{/* Jun–Sep Temperature Picker */}
<Text style={styles.label}>{t("tempJunSep")}</Text>
        <View style={[styles.pickerContainer, errors.state && styles.inputError]}>
<Picker
  selectedValue={tempJunSep}
  onValueChange={(value) => setTempJunSep(value)}
  style={styles.pickerContainer}
>
  <Picker.Item label="--" value="" />
  {Array.from({ length: 21 }, (_, i) => i + 20).map((temp) => (
    <Picker.Item key={temp} label={`${temp} °C`} value={temp.toString()} />
  ))}
</Picker>
</View>
        {errors.tempJunSep ? <Text style={styles.errorText}>{errors.tempJunSep}</Text> : null}

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.resetButton]} 
            onPress={resetForm}
          >
            <Ionicons name="refresh" size={20} color={COLORS.text} />
            <Text style={styles.resetButtonText}>{t('reset')}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.predictButton]} 
            onPress={handlePredict}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <>
                <Ionicons name="analytics" size={20} color="#FFF" />
                <Text style={styles.predictButtonText}>{t("predict")}</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {prediction && (
<View style={styles.result}>
  <Ionicons name="checkmark-circle" size={32} color={COLORS.success} />
  <Text style={styles.resultText}>
    {t("result")}: <Text style={styles.predictionValue}>{prediction}</Text>
  </Text>
</View>

        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}


import React, { useState } from "react";
import { 
  View, 
  Text, 
  Image, 
  ActivityIndicator, 
  Alert, 
  ScrollView,
  TouchableOpacity,
  StyleSheet 
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from '@expo/vector-icons';
import i18n from "../../i18n";
import getBaseUrl from "../../getBaseUrl";
import { useRouter } from "expo-router";
import styles from "./cropimg.style";

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
  warning: '#FF9800',
  info: '#2196F3',
};

export default function PaddyAdvisor() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<{ disease: string; confidence: string; advice: string } | null>(null);
  const [loading, setLoading] = useState(false);

  // Pick image from gallery
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== "granted") {
      Alert.alert(i18n.t("permissionDenied"), i18n.t("galleryPermissionRequired"));
      return;
    }

    let res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!res.canceled) {
      setImage(res.assets[0].uri);
      setResult(null);
    }
  };

  // Take photo from camera
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(i18n.t("permissionDenied"), i18n.t("cameraPermissionRequired"));
      return;
    }

    let res = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!res.canceled) {
      setImage(res.assets[0].uri);
      setResult(null);
    }
  };

  // Upload to backend
  const uploadImage = async () => {
    if (!image) return;

    setLoading(true);

    // Map i18n language to backend supported lang
    let currentLang = i18n.language;
    let backendLang = "en";
    if (currentLang.startsWith("ta")) backendLang = "ta";
    else if (currentLang.startsWith("ml")) backendLang = "ml";
    else if (currentLang.startsWith("hi")) backendLang = "hi";

    let formData = new FormData();
    formData.append("image", {
      uri: image,
      type: "image/jpeg",
      name: "paddy.jpg",
    } as any);
    formData.append("lang", backendLang);

    try {
      let res = await fetch(`${getBaseUrl()}/api/predict`, {
        method: "POST",
        body: formData,
      });

      let json = await res.json();

      // Clean markdown and handle numbers safely
      let disease = String(json.disease || "").replace(/\*\*/g, "");
      let confidenceRaw = String(json.confidence || "").replace(/\*\*/g, "");
      let advice = String(json.advice || "").replace(/\*\*/g, "");

      // If confidence is numeric, format with %
      let confidence = confidenceRaw;
      if (!isNaN(Number(confidenceRaw))) {
        confidence = `${confidenceRaw}%`;
      }

      setResult({ disease, confidence, advice });
    } catch (err: any) {
      Alert.alert(i18n.t("error"), err.message || i18n.t("somethingWentWrong"));
    }
    setLoading(false);
  };

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>{i18n.t("paddyDiseaseDetector")}</Text>
        <View style={{ width: 24 }} /> {/* Spacer for balance */}
      </View>

      <Text style={styles.subtitle}>{i18n.t("paddyDiseaseDesc")}</Text>

      {/* Image Selection Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
          <Ionicons name="image" size={24} color={COLORS.primary} />
          <Text style={styles.buttonText}>{i18n.t("pickImage")}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.imageButton} onPress={takePhoto}>
          <Ionicons name="camera" size={24} color={COLORS.primary} />
          <Text style={styles.buttonText}>{i18n.t("takePhoto")}</Text>
        </TouchableOpacity>
      </View>

      {/* Image Preview */}
      {image && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: image }}
            style={styles.imagePreview}
            resizeMode="cover"
          />
          <TouchableOpacity 
            style={styles.removeButton} 
            onPress={() => setImage(null)}
          >
            <Ionicons name="close-circle" size={24} color={COLORS.error} />
          </TouchableOpacity>
        </View>
      )}

      {/* Predict Button */}
      <TouchableOpacity 
        style={[styles.predictButton, !image && styles.buttonDisabled]} 
        onPress={uploadImage}
        disabled={!image || loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <>
            <Ionicons name="analytics" size={20} color="#FFF" />
            <Text style={styles.predictButtonText}>{i18n.t("predict")}</Text>
          </>
        )}
      </TouchableOpacity>

      {/* Loading Indicator */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>{i18n.t("analyzingImage")}</Text>
        </View>
      )}

      {/* Results */}
      {result && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>{i18n.t("analysisResults")}</Text>
          
          <View style={styles.resultItem}>
            <View style={styles.iconContainer}>
              <Ionicons name="bug" size={20} color={COLORS.warning} />
            </View>
            <View style={styles.resultTextContainer}>
              <Text style={styles.resultLabel}>{i18n.t("disease")}</Text>
              <Text style={styles.resultValue}>{result.disease}</Text>
            </View>
          </View>

          <View style={styles.resultItem}>
            <View style={styles.iconContainer}>
              <Ionicons name="stats-chart" size={20} color={COLORS.info} />
            </View>
            <View style={styles.resultTextContainer}>
              <Text style={styles.resultLabel}>{i18n.t("confidence")}</Text>
              <Text style={styles.resultValue}>{result.confidence}</Text>
            </View>
          </View>

          <View style={styles.resultItem}>
            <View style={styles.iconContainer}>
              <Ionicons name="bulb" size={20} color={COLORS.success} />
            </View>
            <View style={styles.resultTextContainer}>
              <Text style={styles.resultLabel}>{i18n.t("advice")}</Text>
              <Text style={styles.resultAdvice}>{result.advice}</Text>
            </View>
          </View>
        </View>
      )}

      {/* Instructions when no image selected */}
      {!image && !result && (
        <View style={styles.instructions}>
          <Text style={styles.instructionsTitle}>{i18n.t("howToUse")}</Text>
          <View style={styles.instructionStep}>
            <Ionicons name="1" size={16} color={COLORS.primary} />
            <Text style={styles.instructionText}>{i18n.t("selectOrTakePhoto")}</Text>
          </View>
          <View style={styles.instructionStep}>
            <Ionicons name="2" size={16} color={COLORS.primary} />
            <Text style={styles.instructionText}>{i18n.t("tapPredictButton")}</Text>
          </View>
          <View style={styles.instructionStep}>
            <Ionicons name="3" size={16} color={COLORS.primary} />
            <Text style={styles.instructionText}>{i18n.t("viewResults")}</Text>
          </View>
        </View>
      )}

      
    </ScrollView>

    
  );
}


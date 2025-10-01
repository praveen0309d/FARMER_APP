import * as LocalAuthentication from "expo-local-authentication";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import getBaseUrl from "../getBaseUrl";
import { Picker } from "@react-native-picker/picker";
import styles from "./login.styles";
import { saveAuthData } from "../../services/AuthService";
export default function Login() {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [selectedState, setSelectedState] = useState("");

const router = useRouter();
  // Helpers for secure storage
// Helpers for secure storage
const getItem = async (key: string) => {
  const value =
    Platform.OS === "web"
      ? localStorage.getItem(key)
      : await SecureStore.getItemAsync(key);

  if (!value) return null;

  try {
    return JSON.parse(value); // ✅ works if JSON
  } catch {
    return value; // ✅ works if plain string
  }
};


const setItem = async (key: string, value: any) => {
  const strValue = typeof value === "string" ? value : JSON.stringify(value); // 👈 ensure string
  if (Platform.OS === "web") {
    localStorage.setItem(key, strValue);
  } else {
    await SecureStore.setItemAsync(key, strValue);
  }
};

const deleteItem = async (key: string) =>
  Platform.OS === "web"
    ? localStorage.removeItem(key)
    : await SecureStore.deleteItemAsync(key);


  // const setItem = async (key: string, value: string) =>
  //   Platform.OS === "web"
  //     ? localStorage.setItem(key, value)
  //     : await SecureStore.setItemAsync(key, value);

  // const deleteItem = async (key: string) =>
  //   Platform.OS === "web"
  //     ? localStorage.removeItem(key)
  //     : await SecureStore.deleteItemAsync(key);

  useEffect(() => {
    checkBiometricAvailability();
    checkSavedSession();
  }, []);

  const checkBiometricAvailability = async () => {
    if (Platform.OS === "web") return;
    
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      setBiometricAvailable(compatible && enrolled);
      
      // Check if user has previously enabled biometric auth
      const useBiometric = await getItem("useBiometric");
      setBiometricEnabled(useBiometric === "true");
    } catch (error) {
      console.log("Biometric check error:", error);
    }
  };

  const checkSavedSession = async () => {
    const token = await getItem("userToken");
    const useBiometric = await getItem("useBiometric");
    
    if (token && useBiometric === "true" && biometricAvailable) {
      // Auto-trigger biometric login if available and enabled
      setTimeout(() => {
        handleBiometricLogin();
      }, 500);
    } else if (token) {
      // Alert.alert(t("autoLogin"), t("welcomeBack"));
      // Navigate to Home screen here
    }
  };
const saveUserData = async (data: any, password: string) => {
  const safePassword = String(password);

  await setItem("userData", JSON.stringify({
    token: data.token,
    user: data.user,
    password: safePassword,
  }));

  await setItem("userToken", String(data.token));
  await setItem("userEmail", String(data.user.email));
  await setItem("userPassword", safePassword);
  await setItem("userName", String(data.user.name));
  await setItem("userPhone", String(data.user.phone));
};





const handleBiometricLogin = async () => {
  try {
    const saved: any = await getItem("userData");
    if (!saved) {
      Alert.alert("Error", "No saved credentials found");
      return;
    }

    const savedEmail = saved.user.email;
    const savedPassword = String(saved.password); // force string

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Login with Fingerprint",
    });

    if (result.success) {
      const res = await fetch(`${getBaseUrl()}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: savedEmail, password: savedPassword }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Login failed");

      // Alert.alert("Success", `Welcome back ${data.user.name}`);
      if (res.ok) {
    // ✅ Save both token and user object
    await saveAuthData({
      token: data.token,
      user: data.user,   // 👈 this includes { name, email, phone }
    });
router.replace("/pages/HomeScreen");
  } else {
    alert(data.error);
  }
      
      console.log("JWT Token:", data.token);
    }
  } catch (err: any) {
    Alert.alert("Error", err.message);
  }
};



  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    
    // Validation
    if (!isLogin && password !== confirmPassword) {
      setError(t("passwordsDontMatch"));
      setLoading(false);
      return;
    }
console.log({
      name,
      selectedState,
      email,
      phone,
      password,
      confirmPassword,
    });
    const endpoint = isLogin ? "/api/login" : "/api/signup";
    const payload = isLogin
      ? { email, password }
      : { name, phone, email, password, state: selectedState };

    try {
      const res = await fetch(`${getBaseUrl()}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Save user data
      // in handleSubmit
await saveUserData(data, password);  // ✅ pass the plain password

      
      // After successful signup, prompt to enable biometric auth
      if (!isLogin && biometricAvailable) {
        Alert.alert(
          t("enableBiometric"),
          t("enableBiometricMessage"),
          [
            {
              text: t("notNow"),
              style: "cancel"
            },
            {
              text: t("enable"),
              onPress: async () => {
                await setItem("useBiometric", "true");
                setBiometricEnabled(true);
                Alert.alert(t("success"), t("biometricEnabled"));
              }
            }
          ]
        );
      }

      // Alert.alert(data.message, `${t("welcome")} ${data.user.name}`);
            if (res.ok) {
    // ✅ Save both token and user object
    await saveAuthData({
      token: data.token,
      user: data.user,   // 👈 this includes { name, email, phone }
    });
router.replace("/pages/HomeScreen");
  } else {
    alert(data.error);
  }
      console.log("JWT Token:", data.token);

    } catch (err: any) {
      setError(err.message);
      Alert.alert(t("error"), err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>
          {isLogin ? t("login.title") : t("createAccount")}
        </Text>

        {!isLogin && (
          <>
            <TextInput
              style={styles.input}
              placeholder={t("fullName")}
              value={name}
              onChangeText={setName}
            />

            <View style={styles.formGroup}>
  <Text style={styles.label}>Select State:</Text>
  <View style={styles.dropdownContainer}>
    <Picker
      selectedValue={selectedState}
      onValueChange={(itemValue) => setSelectedState(itemValue)}
      style={styles.picker}
    >
      <Picker.Item label="Select State" value="" enabled={false} />
      <Picker.Item label="Kerala" value="kerala" />
      <Picker.Item label="Tamil Nadu" value="tamilnadu" />
      <Picker.Item label="Jharkhand" value="jharkhand" />
      <Picker.Item label="Maharashtra" value="maharashtra" />
      <Picker.Item label="Punjab" value="punjab" />
    </Picker>
  </View>
  <Text style={styles.selectedText}>Selected: {selectedState}</Text>
</View>

          </>
        )}

        <TextInput
          style={styles.input}
          placeholder={t("login.email")}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        {!isLogin && (
          <TextInput
            style={styles.input}
            placeholder={t("login.phone")}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder={t("login.password")}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
        />

        {!isLogin && (
          <TextInput
            style={styles.input}
            placeholder={t("login.confirmPassword")}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            autoCapitalize="none"
          />
        )}

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {isLogin ? t("login.login") : t("signup")}
            </Text>
          )}
        </TouchableOpacity>

        {isLogin && biometricAvailable && (
          <TouchableOpacity
            style={styles.fingerprintButton}
            onPress={handleBiometricLogin}
            disabled={loading}
          >
            <Text style={styles.fingerprintText}>
              {t("loginWithFingerprint")}
            </Text>
          </TouchableOpacity>
        )}

        {isLogin && biometricEnabled && (
          <View style={styles.biometricNote}>
            <Text style={styles.biometricNoteText}>
              {t("biometricEnabledNote")}
            </Text>
          </View>
        )}

        <TouchableOpacity
          onPress={() => {
            setIsLogin(!isLogin);
            setError("");
          }}
          disabled={loading}
        >
          <Text style={styles.toggleText}>
            {isLogin ? t("noAccount") : t("haveAccount")}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
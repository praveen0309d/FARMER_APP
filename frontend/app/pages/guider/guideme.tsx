import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as Speech from "expo-speech";   // ⬅️ Import expo-speech
import getBaseUrl from "../../getBaseUrl";
import i18n from "@/app/i18n";
import styles from "./guideme.style";

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

export default function AgriChat() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [lang, setLang] = useState("en");
  const [isLoading, setIsLoading] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const scrollRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  // Handle keyboard visibility
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Text-to-Speech for replies
  const speak = (text) => {
    if (!text) return;
    // Clean text (remove *, **, etc.)
    const cleaned = text.replace(/\*/g, "").replace(/\|/g, "");
    Speech.speak(cleaned, {
      language: lang === "ta" ? "ta-IN" : lang === "hi" ? "hi-IN" : "en-US",
    });
  };

  // Send message to Flask API
  const handleSubmit = async () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { role: "user", content: input }]);
    const userMessage = input;
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch(`${getBaseUrl()}/api/agri_chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: userMessage, lang, online: true }),
      });

      const data = await res.json();

      setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      console.log(err);
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: `⚠ ${i18n.t("error")}: ${i18n.t("somethingWentWrong")}` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      {/* Header with Language Picker */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        
        <Text style={styles.headerText}>{i18n.t("agricultureAssistant")}</Text>
        
        <Picker
          selectedValue={lang}
          onValueChange={setLang}
          style={styles.picker}
          dropdownIconColor={COLORS.primary}
        >
          <Picker.Item label={i18n.t("english")} value="en" />
          <Picker.Item label={i18n.t("hindi")} value="hi" />
          <Picker.Item label={i18n.t("tamil")} value="ta" />
        </Picker>
      </View>

      {/* Chat Area */}
      <ScrollView
        style={styles.chatArea}
        contentContainerStyle={styles.chatContent}
        ref={scrollRef}
        keyboardShouldPersistTaps="handled"
      >
        {messages.length === 0 ? (
          <View style={styles.welcomeContainer}>
            <Ionicons name="chatbubbles-outline" size={48} color={COLORS.textSecondary} />
            <Text style={styles.welcomeText}>{i18n.t("chatWelcome")}</Text>
            <Text style={styles.welcomeSubtext}>{i18n.t("chatInstructions")}</Text>
          </View>
        ) : (
          messages.map((msg, idx) => (
            <View
              key={idx}
              style={[
                styles.messageContainer,
                { justifyContent: msg.role === "user" ? "flex-end" : "flex-start" },
              ]}
            >
              <View
                style={[
                  styles.messageBubble,
                  {
                    backgroundColor: msg.role === "user" ? COLORS.primary : COLORS.surface,
                    borderColor: msg.role === "user" ? COLORS.primary : COLORS.border,
                  },
                ]}
              >
                <Text style={[
                  styles.messageText,
                  { color: msg.role === "user" ? "#fff" : COLORS.text }
                ]}>
                  {msg.content}
                </Text>

                {/* 🔊 Speaker button for assistant replies */}
                {msg.role === "assistant" && (
                  <TouchableOpacity onPress={() => speak(msg.content)} style={{ marginTop: 5, alignSelf: "flex-end" }}>
                    <Ionicons name="volume-high-outline" size={20} color={COLORS.primary} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))
        )}
        
        {isLoading && (
          <View style={[styles.messageContainer, { justifyContent: "flex-start" }]}>
            <View style={[styles.messageBubble, styles.assistantBubble]}>
              <ActivityIndicator size="small" color={COLORS.primary} />
              <Text style={styles.thinkingText}>{i18n.t("thinking")}</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Input Area */}
      <View style={[
        styles.inputArea,
        keyboardVisible && styles.inputAreaKeyboardActive
      ]}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder={i18n.t("askQuestion")}
            placeholderTextColor={COLORS.textSecondary}
            value={input}
            onChangeText={setInput}
            multiline
            maxLength={500}
          />
          <TouchableOpacity 
            style={[styles.sendButton, !input.trim() && styles.sendButtonDisabled]} 
            onPress={handleSubmit}
            disabled={!input.trim() || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Ionicons name="send" size={20} color="#fff" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

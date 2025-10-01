import * as SecureStore from "expo-secure-store";

const AUTH_KEY = "userAuthData";

// Save user data (e.g., after login/signup)
export async function saveAuthData(data: { token: string; user: { name: string } }) {
  try {
    await SecureStore.setItemAsync(AUTH_KEY, JSON.stringify(data));
  } catch (err) {
    console.error("Error saving auth data:", err);
  }
}

// Load user data (for HomeScreen / auto-login)
export async function loadAuthData(): Promise<{ token: string; user: { name: string } } | null> {
  try {
    const stored = await SecureStore.getItemAsync(AUTH_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (err) {
    console.error("Error loading auth data:", err);
    return null;
  }
}

// Clear user data (logout)
export async function clearAuthData() {
  try {
    await SecureStore.deleteItemAsync(AUTH_KEY);
  } catch (err) {
    console.error("Error clearing auth data:", err);
  }
}

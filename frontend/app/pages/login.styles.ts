import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f2f8f5",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#2a7f62",
  },
  input: {
    width: "100%",
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#dcdcdc",
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#2a7f62",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  toggleText: {
    color: "#2a7f62",
    fontSize: 14,
    marginTop: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  fingerprintButton: {
    width: "100%",
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2a7f62",
    alignItems: "center",
    marginBottom: 20,
  },
  fingerprintText: {
    color: "#2a7f62",
    fontWeight: "600",
  },
  biometricNote: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#e3f2fd",
    borderRadius: 5,
  },
  biometricNoteText: {
    color: "#1976d2",
    textAlign: "center",
    fontSize: 12,
  },
  formGroup: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  picker: {
    width: "100%",
    height: 50,
    ...Platform.select({
      android: { color: "#333" }, // Android picker text color
    }),
  },
  selectedText: {
    marginTop: 5,
    fontSize: 14,
    color: "#555",
  },
});

export default styles;

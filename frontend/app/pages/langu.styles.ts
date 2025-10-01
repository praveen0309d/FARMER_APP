import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "#F9FBE7", // soft greenish background
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  iconContainer: {
    backgroundColor: "#E0F2F1",
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#2E7D32", // deep green
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#4CAF50",
    textAlign: "center",
    maxWidth: "80%",
  },
  languageContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  languageButton: {
    width: width * 0.85,
    paddingVertical: 18,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#A5D6A7",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  languageButtonSelected: {
    backgroundColor: "#2E7D32",
    borderColor: "#1B5E20",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  languageContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  flag: {
    fontSize: 28,
    marginRight: 15,
  },
  languageText: {
    fontSize: 18,
    padding: 8,   
    fontWeight: "500",
    color: "#2E7D32",
  },
  languageTextSelected: {
    fontWeight: "700",
    color: "#FFFFFF",
  },
  checkContainer: {
    backgroundColor: "#A5D6A7",
    borderRadius: 12,
    padding: 4,
  },
  redirectingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#C8E6C9",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    marginTop: 30,
  },
  redirectingText: {
    color: "#1B5E20",
    marginRight: 10,
    fontSize: 15,
    fontWeight: "500",
  },
  dotsContainer: {
    flexDirection: "row",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#1B5E20",
    marginHorizontal: 2,
  },
});

export default styles;

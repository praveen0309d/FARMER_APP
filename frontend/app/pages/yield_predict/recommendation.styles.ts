import { StyleSheet } from 'react-native';
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
const styles = StyleSheet.create({
  
    container: {
    
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
  },
header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingTop: 20,
  },
  backButton: {
    padding: 4,


  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 10,
  },

  label: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 5,
    marginLeft: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    marginBottom: 5,
    backgroundColor: COLORS.surface,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  disabled: {
    opacity: 0.6,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 15,
    borderRadius: 10,
    marginBottom: 5,
    fontSize: 16,
    backgroundColor: COLORS.surface,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 15,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    gap: 8,
  },
  predictButton: {
    backgroundColor: COLORS.primary,
  },
  predictButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  resetButtonText: {
    color: COLORS.text,
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultContainer: {
    marginTop: 30,
    alignItems: 'center',
    padding: 20,

    borderLeftColor: COLORS.success,
  },
 result: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#f9f9f9",
    padding: 12,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2, // Android shadow
  },
  resultText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
    fontWeight: "600",
  },
  predictionValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.success, // highlights the prediction
  },

});
export default styles;
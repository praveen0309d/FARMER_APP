import { StyleSheet } from "react-native";


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
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    flex: 1,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 25,
  },
  dateContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 10,
  },
  dateButtonText: {
    fontSize: 16,
    color: COLORS.text,
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  pickerContainer: {
    marginBottom: 20,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    backgroundColor: COLORS.surface,
    overflow: 'hidden',
  },
  picker: {
    minHeight: 50,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
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
  resetButton: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  predictButton: {
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  predictButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  resultContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 15,
    textAlign: 'center',
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  iconContainer: {
    marginRight: 12,
    marginTop: 2,
  },
  resultTextContainer: {
    flex: 1,
  },
  resultLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  resultValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  resultAdvice: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 20,
    flexWrap: 'wrap',
  },
});

export default styles;
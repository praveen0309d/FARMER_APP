import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const COLORS = {
    primary: '#4CAF50', // Soil Green
    primaryLight: '#C8E6C9',
    secondary: '#03A9F4', // Water Blue
    secondaryLight: '#B3E5FC',
    background: '#F5F7F6',
    surface: '#FFFFFF',
    text: '#212121',
    textSecondary: '#616161',
    border: '#E0E0E0',
    success: '#4CAF50',
    warning: '#FFC107',
    danger: '#F44336',
    soilBrown: '#8D6E63',
    soilLight: '#D7CCC8',
};

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    // Header 
    headerContainer: {
        padding: 20,
        paddingTop: 40,
        backgroundColor: COLORS.secondary,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    backButton: {
        marginRight: 16,
        padding: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    headerIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    iconCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: -4,
        borderWidth: 2,
        borderColor: COLORS.secondary,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 13,
        color: 'rgba(255, 255, 255, 0.9)',
        fontWeight: '500',
    },

    contentContainer: {
        padding: 16,
        paddingBottom: 40,
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 16,
        marginTop: 8,
        marginLeft: 4,
    },

    // Input Cards (Soil & Water)
    inputSection: {
        backgroundColor: COLORS.surface,
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    inputSectionTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        paddingBottom: 12,
    },
    inputSectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
        marginLeft: 8,
    },

    // Selectors
    selectorGroup: {
        marginBottom: 20,
    },
    selectorLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.textSecondary,
        marginBottom: 10,
    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    optionButton: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.border,
        backgroundColor: COLORS.background,
    },
    optionButtonSelected: {
        backgroundColor: COLORS.primaryLight,
        borderColor: COLORS.primary,
    },
    optionText: {
        fontSize: 14,
        color: COLORS.textSecondary,
        fontWeight: '500',
    },
    optionTextSelected: {
        color: COLORS.primaryDark,
        fontWeight: 'bold',
    },

    // Sliders / Levels
    levelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    levelButton: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
        marginHorizontal: 4,
        borderRadius: 12,
        backgroundColor: COLORS.background,
    },
    levelButtonSelected: {
        backgroundColor: COLORS.secondaryLight,
        borderColor: COLORS.secondary,
    },
    levelText: {
        fontSize: 14,
        color: COLORS.textSecondary,
        fontWeight: '600',
        marginTop: 4,
    },
    levelTextSelected: {
        color: '#0288D1',
    },

    // Predict Button
    predictButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 24,
        elevation: 4,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    predictButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 8,
    },

    // Result Card
    resultCard: {
        backgroundColor: COLORS.surface,
        borderRadius: 20,
        padding: 24,
        marginBottom: 24,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        borderTopWidth: 6,
    },
    resultHeader: {
        alignItems: 'center',
        marginBottom: 20,
    },
    resultIconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    resultTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.text,
        textAlign: 'center',
    },
    resultSubtitle: {
        fontSize: 15,
        color: COLORS.textSecondary,
        textAlign: 'center',
        marginTop: 4,
        paddingHorizontal: 10,
    },
    resultDivider: {
        height: 1,
        backgroundColor: COLORS.border,
        width: '100%',
        marginVertical: 16,
    },
    resultDetailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    resultDetailLabel: {
        fontSize: 15,
        color: COLORS.textSecondary,
        flex: 1,
    },
    resultDetailValue: {
        fontSize: 15,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'right',
    },

    // Crop Recommendations
    cropsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    cropRecCard: {
        width: '48%',
        backgroundColor: COLORS.background,
        borderRadius: 16,
        padding: 12,
        alignItems: 'center',
        marginBottom: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    cropRecIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: COLORS.surface,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        elevation: 1,
    },
    cropRecName: {
        fontSize: 15,
        fontWeight: 'bold',
        color: COLORS.text,
        textAlign: 'center',
    },
    cropRecWater: {
        fontSize: 12,
        color: COLORS.secondary,
        marginTop: 4,
        textAlign: 'center',
    },

    // Tips
    tipCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E8F5E9',
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: COLORS.success,
    },
    tipIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#C8E6C9',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    tipText: {
        flex: 1,
        fontSize: 15,
        color: '#2E7D32',
        lineHeight: 22,
    }
});

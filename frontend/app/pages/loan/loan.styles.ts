import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const COLORS = {
    primary: '#4CAF50', // Primary Green
    primaryLight: '#C8E6C9',
    primaryDark: '#388E3C',
    accent: '#8BC34A', // Leaf Green
    accentLight: '#DCEDC8',
    background: '#F6F8F5',
    surface: '#FFFFFF',
    text: '#212121',
    textSecondary: '#616161',
    border: '#E0E0E0',
    error: '#D32F2F',
    warning: '#FFC107',
    info: '#2196F3',
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
        backgroundColor: COLORS.primary,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        // Add simple gradient effect via shadow/overlay or direct styling later if needed
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
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 14,
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

    // Horizontal Quick Categories
    categoriesContainer: {
        marginBottom: 24,
    },
    categoryCard: {
        width: width * 0.4,
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: 16,
        marginRight: 12,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    categoryIconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    categoryTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.text,
        textAlign: 'center',
        marginBottom: 4,
    },
    categoryDesc: {
        fontSize: 12,
        color: COLORS.textSecondary,
        textAlign: 'center',
    },

    // Detailed Loan Cards
    loanCard: {
        backgroundColor: COLORS.surface,
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderLeftWidth: 4,
        borderLeftColor: COLORS.primary,
    },
    loanHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    loanTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
        flex: 1,
        marginRight: 8,
    },
    loanProvider: {
        fontSize: 14,
        color: COLORS.primaryDark,
        fontWeight: '600',
        backgroundColor: COLORS.primaryLight,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    loanDescription: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginBottom: 16,
    },
    loanDetailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.background,
        padding: 12,
        borderRadius: 12,
        marginBottom: 16,
    },
    detailColumn: {
        flex: 1,
    },
    detailLabel: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginBottom: 4,
    },
    detailValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    cardActions: {
        flexDirection: 'row',
        gap: 12,
    },
    outlineButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: COLORS.primary,
        alignItems: 'center',
    },
    outlineButtonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    primaryButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 30,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
    },
    primaryButtonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff',
    },

    // Calculator Widget
    calculatorContainer: {
        backgroundColor: COLORS.surface,
        borderRadius: 20,
        padding: 20,
        marginBottom: 24,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderTopWidth: 4,
        borderTopColor: COLORS.accent,
    },
    inputGroup: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.textSecondary,
        marginBottom: 8,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 12,
        backgroundColor: COLORS.background,
        paddingHorizontal: 12,
    },
    inputIcon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 12,
        color: COLORS.text,
    },
    calcResults: {
        backgroundColor: COLORS.accentLight,
        borderRadius: 12,
        padding: 16,
        marginTop: 8,
    },
    resultRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    resultLabel: {
        fontSize: 14,
        color: '#1B5E20',
        fontWeight: '600',
    },
    resultValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1B5E20',
    },

    // Nearby Banks
    banksContainer: {
        marginBottom: 24,
    },
    bankCard: {
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    bankIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#E3F2FD',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    bankInfo: {
        flex: 1,
    },
    bankName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 4,
    },
    bankDistance: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginBottom: 4,
    },
    bankTypes: {
        fontSize: 12,
        color: COLORS.primary,
    },
    callButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: COLORS.accentLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },

    // Steps Guide
    stepsContainer: {
        backgroundColor: COLORS.surface,
        borderRadius: 20,
        padding: 20,
        marginBottom: 24,
        elevation: 2,
    },
    stepItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    stepNumberContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        zIndex: 2,
    },
    stepNumber: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    stepContent: {
        flex: 1,
        paddingTop: 4,
    },
    stepTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 4,
    },
    stepLine: {
        position: 'absolute',
        left: 15,
        top: 32,
        bottom: -20,
        width: 2,
        backgroundColor: COLORS.primaryLight,
        zIndex: 1,
    },

    // Required Documents
    docsContainer: {
        backgroundColor: COLORS.surface,
        borderRadius: 20,
        padding: 20,
        marginBottom: 40,
        elevation: 2,
    },
    docItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    docIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFF3E0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    docText: {
        fontSize: 16,
        color: COLORS.text,
        fontWeight: '500',
    },

    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: COLORS.surface,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        height: '85%',
        paddingBottom: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    modalScroll: {
        padding: 20,
    },
    benefitHighlight: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF8E1',
        padding: 16,
        borderRadius: 12,
        marginBottom: 20,
        borderLeftWidth: 4,
        borderLeftColor: '#F57F17',
    },
    benefitText: {
        fontWeight: 'bold',
        color: '#F57F17',
    },
    detailSection: {
        marginBottom: 20,
    },
    detailSectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 8,
    },
    detailText: {
        fontSize: 15,
        color: COLORS.textSecondary,
        lineHeight: 22,
    },
    modalFooter: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        backgroundColor: COLORS.surface,
    },

    // Eligibility Checker Styles
    eligibilityContainer: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    questionText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.text,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 30,
        lineHeight: 28,
    },
    answerButtons: {
        flexDirection: 'row',
        gap: 16,
        width: '100%',
    },
    answerButton: {
        flex: 1,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
    },
    noButton: {
        borderColor: '#E53935',
        backgroundColor: '#FFEBEE',
    },
    noText: {
        color: '#E53935',
        fontSize: 18,
        fontWeight: 'bold',
    },
    yesButton: {
        borderColor: '#4CAF50',
        backgroundColor: '#E8F5E9',
    },
    yesText: {
        color: '#2E7D32',
        fontSize: 18,
        fontWeight: 'bold',
    },
    resultContainer: {
        alignItems: 'center',
        paddingVertical: 30,
        width: '100%',
    },
    resultText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 10,
        paddingHorizontal: 10,
    }
});

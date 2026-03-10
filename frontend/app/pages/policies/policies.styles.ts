import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const COLORS = {
    primary: '#4CAF50',
    primaryLight: '#81C784',
    secondary: '#FFC107',
    background: '#F6F8F5',
    surface: '#FFFFFF',
    text: '#212121',
    textSecondary: '#757575',
    border: '#E0E0E0',
    error: '#D32F2F',
    info: '#2196F3',
};

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    // Header
    headerContainer: {
        padding: 24,
        paddingTop: 30,
        backgroundColor: COLORS.primary,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        // flex: 0.3,
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginBottom: 16,
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
        alignItems: 'center',
        
    },

    // Search Bar
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        borderRadius: 30,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginTop: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    searchInput: {
        flex: 1,
        marginLeft: 12,
        fontSize: 16,
        color: COLORS.text,
    },

    // Content Area
    contentContainer: {
        padding: 16,
        paddingBottom: 40,
    },

    // Categories / Filters
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 16,
        marginLeft: 4,
    },
    categoriesContainer: {
        marginBottom: 24,
    },
    categoryPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 30,
        marginRight: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    categoryPillSelected: {
        backgroundColor: COLORS.primaryLight,
        borderColor: COLORS.primary,
    },
    categoryText: {
        fontSize: 15,
        fontWeight: '600',
        color: COLORS.textSecondary,
        marginLeft: 8,
    },
    categoryTextSelected: {
        color: '#1B5E20',
    },

    // Scheme Cards
    schemeCard: {
        backgroundColor: COLORS.surface,
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    schemeHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    schemeIconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: `${COLORS.primary}15`,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    schemeTitleContainer: {
        flex: 1,
    },
    schemeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 4,
    },
    badge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        marginTop: 4,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#fff',
    },
    schemeDescription: {
        fontSize: 14,
        color: COLORS.textSecondary,
        lineHeight: 20,
        marginBottom: 16,
    },
    benefitHighlight: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: `${COLORS.secondary}20`,
        padding: 12,
        borderRadius: 12,
        marginBottom: 16,
    },
    benefitText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#F57F17',
        marginLeft: 8,
    },
    cardActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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

    // Details Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: COLORS.background,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        height: '90%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 24,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    modalScroll: {
        padding: 24,
    },
    detailSection: {
        marginBottom: 24,
    },
    detailSectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailText: {
        fontSize: 15,
        color: COLORS.textSecondary,
        lineHeight: 24,
    },
    bulletPoint: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    bulletText: {
        fontSize: 15,
        color: COLORS.textSecondary,
        marginLeft: 8,
        flex: 1,
    },
    modalFooter: {
        padding: 24,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        backgroundColor: COLORS.surface,
    },

    // Eligibility Checker Styles
    eligibilityContainer: {
        backgroundColor: COLORS.surface,
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
    },
    questionText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.text,
        textAlign: 'center',
        marginBottom: 24,
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
    },
    yesButton: {
        backgroundColor: COLORS.primaryLight,
    },
    noButton: {
        backgroundColor: '#FFCDD2',
    },
    yesText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1B5E20',
    },
    noText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#B71C1C',
    },
    resultContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    resultText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 12,
    },
});

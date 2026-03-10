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

    // Crop Selection
    cropsContainer: {
        marginBottom: 24,
    },
    cropCard: {
        width: width * 0.28,
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: 12,
        marginRight: 12,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    cropCardSelected: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.primaryLight,
    },
    cropIconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    cropTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.text,
        textAlign: 'center',
    },
    cropTitleSelected: {
        color: COLORS.primaryDark,
    },

    // Fertilizer Recommendation Cards
    nutrientRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 8,
    },
    nutrientBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    nutrientBadgeText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#fff',
    },

    fertilizerCard: {
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
    fertilizerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    fertilizerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.text,
        flex: 1,
    },

    fertilizerDetailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FAFAFA',
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

    // Buttons
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

    // Organic Fertilizer
    organicContainer: {
        marginBottom: 24,
    },
    organicCard: {
        backgroundColor: COLORS.accentLight,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    organicIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.accent,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    organicInfo: {
        flex: 1,
    },
    organicName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 4,
    },
    organicDesc: {
        fontSize: 14,
        color: COLORS.textSecondary,
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
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: COLORS.accent,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        zIndex: 2,
    },
    stepNumber: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    stepContent: {
        flex: 1,
        paddingTop: 6,
    },
    stepTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    stepLine: {
        position: 'absolute',
        left: 17,
        top: 36,
        bottom: -20,
        width: 2,
        backgroundColor: COLORS.accentLight,
        zIndex: 1,
    },

    // Nearby Banks / Shops
    shopsContainer: {
        marginBottom: 24,
    },
    shopCard: {
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
    shopIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#E8EAF6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    shopInfo: {
        flex: 1,
    },
    shopName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 4,
    },
    shopDistance: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginBottom: 4,
    },
    shopTypes: {
        fontSize: 12,
        color: COLORS.primary,
    },
    callButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: COLORS.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    mapButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#E8EAF6',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },

    // Safety Tips
    safetyCard: {
        backgroundColor: '#FFF8E1',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        borderLeftWidth: 4,
        borderLeftColor: COLORS.warning,
    },
    safetyIconContainer: {
        marginRight: 16,
    },
    safetyText: {
        flex: 1,
        fontSize: 15,
        color: COLORS.text,
        fontWeight: '500',
        lineHeight: 22,
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
    detailList: {
        marginTop: 8,
    },
    detailListItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    detailListText: {
        fontSize: 15,
        color: COLORS.textSecondary,
        marginLeft: 8,
        flex: 1,
    },
});

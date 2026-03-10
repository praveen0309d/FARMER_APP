import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const COLORS = {
    primary: '#4CAF50', // Primary Green
    primaryLight: '#E8F5E9',
    primaryDark: '#388E3C',
    accent: '#FF9800', // Transport Orange
    accentLight: '#FFF3E0',
    mapBlue: '#2196F3',
    background: '#F6F8F5',
    surface: '#FFFFFF',
    text: '#212121',
    textSecondary: '#616161',
    border: '#E0E0E0',
    highDemand: '#4CAF50',
    stable: '#FFC107',
    lowDemand: '#F44336',
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
        marginBottom: 8,
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
        marginTop: 16,
        marginLeft: 4,
    },

    // Map Section
    mapContainer: {
        height: 250,
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    map: {
        width: '100%',
        height: '100%',
    },

    // Lists & Cards Base
    card: {
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    cardInfoRow: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 4,
    },
    iconsRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardSubtitle: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginLeft: 4,
    },

    // Horizontal List Base
    horizontalList: {
        marginBottom: 8,
    },
    horizontalCard: {
        width: width * 0.45,
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: 16,
        marginRight: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },

    // Specific Cards: Markets
    marketIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: COLORS.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cropsAccepted: {
        fontSize: 13,
        color: COLORS.primaryDark,
        marginTop: 8,
        fontWeight: '500',
    },

    // Specific Cards: Transport
    transportIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: COLORS.accentLight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadCapacity: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginTop: 8,
    },
    transportCost: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.accent,
        marginTop: 8,
        textAlign: 'right',
    },

    // Specific Cards: Export
    exportIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#E3F2FD',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    exportTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    exportDemand: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FFF',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        marginVertical: 6,
        alignSelf: 'flex-start',
    },
    exportTarget: {
        fontSize: 13,
        color: COLORS.mapBlue,
        fontWeight: '500',
    },

    // Buttons
    buttonRow: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 16,
    },
    outlineButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: COLORS.primary,
        alignItems: 'center',
    },
    outlineButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    primaryButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 30,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
    },
    primaryButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
    },
    accentButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 30,
        backgroundColor: COLORS.accent,
        alignItems: 'center',
    },

    // Price Indicators
    priceCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 4,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    priceCropName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    priceTrendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        elevation: 1,
    },
    priceTrendText: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 6,
    }
});

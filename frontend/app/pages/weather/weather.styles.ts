import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const COLORS = {
    primary: '#2196F3', // Sky Blue
    primaryLight: '#BBDEFB',
    primaryDark: '#1976D2',
    accent: '#FFC107', // Sun Yellow
    background: '#F6F8F5',
    surface: '#FFFFFF',
    text: '#212121',
    textSecondary: '#616161',
    border: '#E0E0E0',
    success: '#4CAF50', // Safe
    warning: '#FF9800', // Caution
    danger: '#F44336', // Warning
    cloud: '#B0BEC5', // Cloud Grey
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
        marginTop: 16,
        marginLeft: 4,
    },

    // Current Weather Card
    currentWeatherCard: {
        backgroundColor: COLORS.surface,
        borderRadius: 24,
        padding: 24,
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        borderTopWidth: 6,
        borderTopColor: COLORS.primary,
        marginBottom: 24,
    },
    weatherLocation: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    locationText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textSecondary,
        marginLeft: 8,
    },
    mainTempContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    mainTemp: {
        fontSize: 64,
        fontWeight: 'bold',
        color: COLORS.text,
        marginLeft: 16,
    },
    weatherCondition: {
        fontSize: 22,
        fontWeight: '600',
        color: COLORS.primaryDark,
        marginBottom: 20,
    },
    weatherStatsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    weatherStat: {
        alignItems: 'center',
        flex: 1,
    },
    weatherStatValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
        marginTop: 4,
    },
    weatherStatLabel: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginTop: 2,
    },

    // 7-Day Forecast
    forecastContainer: {
        marginBottom: 8,
    },
    forecastCard: {
        width: 80,
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: 12,
        marginRight: 12,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    forecastDay: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 8,
    },
    forecastIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    forecastTemp: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    forecastRainRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    forecastRainText: {
        fontSize: 11,
        color: COLORS.primaryDark,
        marginLeft: 2,
    },

    // Alerts
    alertCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        borderLeftWidth: 6,
    },
    alertIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255,255,255,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    alertContent: {
        flex: 1,
    },
    alertTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 4,
    },
    alertMsg: {
        fontSize: 14,
        color: COLORS.textSecondary,
        lineHeight: 20,
    },

    // Recommendations
    recsContainer: {
        marginBottom: 24,
    },
    recCard: {
        flexDirection: 'row',
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        alignItems: 'center',
    },
    recIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#E8F5E9',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    recContent: {
        flex: 1,
    },
    recTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 4,
    },
    recDesc: {
        fontSize: 14,
        color: COLORS.textSecondary,
    },

    // Rainfall Graph (Visual representation)
    graphContainer: {
        backgroundColor: COLORS.surface,
        borderRadius: 20,
        padding: 20,
        marginBottom: 30,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    graphRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    graphDay: {
        width: 40,
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.textSecondary,
    },
    graphBarBg: {
        flex: 1,
        height: 12,
        backgroundColor: COLORS.primaryLight,
        borderRadius: 6,
        marginHorizontal: 12,
        overflow: 'hidden',
    },
    graphBarFill: {
        height: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: 6,
    },
    graphValue: {
        width: 36,
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.primaryDark,
        textAlign: 'right',
    }
});

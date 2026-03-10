import React, { useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import styles from './weather.styles';

// --- Mock API Data ---
const CURRENT_WEATHER = {
    temp: 32,
    condition: 'Sunny',
    location: 'Madurai, Tamil Nadu',
    humidity: '65%',
    wind: '12 km/h',
    rainProb: '10%'
};

const FORECAST_7_DAYS = [
    { id: 'd1', day: 'Today', icon: 'white-balance-sunny', temp: '32°', rain: '10%' },
    { id: 'd2', day: 'Tue', icon: 'weather-partly-cloudy', temp: '30°', rain: '20%' },
    { id: 'd3', day: 'Wed', icon: 'weather-pouring', temp: '26°', rain: '80%' },
    { id: 'd4', day: 'Thu', icon: 'weather-cloudy', temp: '28°', rain: '40%' },
    { id: 'd5', day: 'Fri', icon: 'white-balance-sunny', temp: '33°', rain: '5%' },
    { id: 'd6', day: 'Sat', icon: 'weather-partly-cloudy', temp: '31°', rain: '10%' },
    { id: 'd7', day: 'Sun', icon: 'white-balance-sunny', temp: '34°', rain: '0%' },
];

const FARMING_ALERTS = [
    { id: 'a1', type: 'warning', title: 'Heavy Rain Expected Wed', msg: 'Rain expected in 2 days. Delay fertilizer and pesticide applications.', bg: '#FFF0F0', border: '#F44336', icon: 'weather-pouring', iconColor: '#F44336' },
    { id: 'a2', type: 'caution', title: 'High Temperature Today', msg: 'Current temperature is 32°C. Ensure crops receive adequate irrigation.', bg: '#FFF8E1', border: '#FF9800', icon: 'thermometer-alert', iconColor: '#FF9800' },
    { id: 'a3', type: 'safe', title: 'Good Sowing Conditions', msg: 'Weather is stable for the next 2 days. Ideal for sowing new seeds.', bg: '#E8F5E9', border: '#4CAF50', icon: 'seed', iconColor: '#4CAF50' },
];

const BEST_TIMES = [
    { id: 'r1', title: 'Best time for Irrigation', desc: 'Evening (After 5 PM) to reduce evaporation loss.', icon: 'water', color: '#03A9F4' },
    { id: 'r2', title: 'Spray Pesticides', desc: 'Tomorrow morning (Before 9 AM). Winds will be calm.', icon: 'spray', color: '#9C27B0' },
    { id: 'r3', title: 'Harvesting', desc: 'Favorable conditions from Friday onwards.', icon: 'sickle', color: '#FF9800' },
];

export default function WeatherGuidelinesScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <LinearGradient
                colors={['#2196F3', '#64B5F6']}
                style={styles.headerContainer}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={styles.headerTop}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <View style={styles.headerIconContainer}>
                        <Ionicons name="partly-sunny" size={28} color="#fff" />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.headerTitle}>Weather Guide</Text>
                        <Text style={styles.headerSubtitle}>Plan farming with weather</Text>
                    </View>
                </View>
            </LinearGradient>

            <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>

                {/* 1. Current Weather */}
                <View style={styles.currentWeatherCard}>
                    <View style={styles.weatherLocation}>
                        <Ionicons name="location" size={18} color="#757575" />
                        <Text style={styles.locationText}>{CURRENT_WEATHER.location}</Text>
                    </View>

                    <View style={styles.mainTempContainer}>
                        <MaterialCommunityIcons name="white-balance-sunny" size={60} color="#FFC107" />
                        <Text style={styles.mainTemp}>{CURRENT_WEATHER.temp}°</Text>
                    </View>
                    <Text style={styles.weatherCondition}>{CURRENT_WEATHER.condition}</Text>

                    <View style={styles.weatherStatsRow}>
                        <View style={styles.weatherStat}>
                            <Ionicons name="water-outline" size={24} color="#2196F3" />
                            <Text style={styles.weatherStatValue}>{CURRENT_WEATHER.humidity}</Text>
                            <Text style={styles.weatherStatLabel}>Humidity</Text>
                        </View>
                        <View style={styles.weatherStat}>
                            <MaterialCommunityIcons name="weather-windy" size={24} color="#B0BEC5" />
                            <Text style={styles.weatherStatValue}>{CURRENT_WEATHER.wind}</Text>
                            <Text style={styles.weatherStatLabel}>Wind</Text>
                        </View>
                        <View style={styles.weatherStat}>
                            <Ionicons name="rainy-outline" size={24} color="#4CAF50" />
                            <Text style={styles.weatherStatValue}>{CURRENT_WEATHER.rainProb}</Text>
                            <Text style={styles.weatherStatLabel}>Rain Prob</Text>
                        </View>
                    </View>
                </View>

                {/* 2. 7-Day Forecast */}
                <Text style={styles.sectionTitle}>7-Day Forecast</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.forecastContainer}
                >
                    {FORECAST_7_DAYS.map((day) => (
                        <View key={day.id} style={styles.forecastCard}>
                            <Text style={styles.forecastDay}>{day.day}</Text>
                            <View style={styles.forecastIconContainer}>
                                <MaterialCommunityIcons
                                    name={day.icon as any}
                                    size={24}
                                    color={day.icon.includes('sunny') ? '#FFC107' : '#2196F3'}
                                />
                            </View>
                            <Text style={styles.forecastTemp}>{day.temp}</Text>
                            <View style={styles.forecastRainRow}>
                                <Ionicons name="water" size={12} color="#2196F3" />
                                <Text style={styles.forecastRainText}>{day.rain}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>

                {/* 3. Farming Weather Alerts */}
                <Text style={styles.sectionTitle}>Farming Alerts</Text>
                {FARMING_ALERTS.map((alert) => (
                    <View
                        key={alert.id}
                        style={[
                            styles.alertCard,
                            { backgroundColor: alert.bg, borderLeftColor: alert.border }
                        ]}
                    >
                        <View style={styles.alertIconContainer}>
                            <MaterialCommunityIcons name={alert.icon as any} size={28} color={alert.iconColor} />
                        </View>
                        <View style={styles.alertContent}>
                            <Text style={styles.alertTitle}>{alert.title}</Text>
                            <Text style={styles.alertMsg}>{alert.msg}</Text>
                        </View>
                    </View>
                ))}

                {/* 4. Best Farming Times */}
                <Text style={styles.sectionTitle}>Best Farming Times</Text>
                <View style={styles.recsContainer}>
                    {BEST_TIMES.map((rec) => (
                        <View key={rec.id} style={styles.recCard}>
                            <View style={[styles.recIconContainer, { backgroundColor: `${rec.color}15` }]}>
                                <MaterialCommunityIcons name={rec.icon as any} size={26} color={rec.color} />
                            </View>
                            <View style={styles.recContent}>
                                <Text style={styles.recTitle}>{rec.title}</Text>
                                <Text style={styles.recDesc}>{rec.desc}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* 5. Rainfall Prediction Graph */}
                <Text style={styles.sectionTitle}>Rainfall Probability (Upcoming)</Text>
                <View style={styles.graphContainer}>
                    {FORECAST_7_DAYS.slice(0, 5).map((forecast) => {
                        const prob = parseInt(forecast.rain.replace('%', ''));
                        return (
                            <View key={forecast.id} style={styles.graphRow}>
                                <Text style={styles.graphDay}>{forecast.day}</Text>
                                <View style={styles.graphBarBg}>
                                    <View style={[styles.graphBarFill, { width: `${prob}%` }]} />
                                </View>
                                <Text style={styles.graphValue}>{forecast.rain}</Text>
                            </View>
                        );
                    })}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

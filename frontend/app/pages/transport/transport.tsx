import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import MapView, { Marker, Callout } from 'react-native-maps';
import styles from './transport.styles';

// --- Mock Data ---

// 10.8505° N, 76.2711° E (Approx Central TN/Kerala border area for demo, or Madurai 9.9252 N, 78.1198 E)
const INITIAL_REGION = {
    latitude: 10.8505,
    longitude: 76.2711,
    latitudeDelta: 1.5,
    longitudeDelta: 1.5,
};

const MAP_MARKERS = [
    { id: 'm1', type: 'market', title: 'Koyambedu Market', lat: 13.0674, lng: 80.1918, distance: '12 km', icon: 'storefront' },
    { id: 'm2', type: 'market', title: 'Salem Veg Market', lat: 11.6643, lng: 78.1460, distance: '55 km', icon: 'storefront' },
    { id: 'm3', type: 'export', title: 'Chennai Export Hub', lat: 13.0827, lng: 80.2707, distance: '18 km', icon: 'warehouse' },
    { id: 'm4', type: 'transport', title: 'Agri Logistics', lat: 11.0168, lng: 76.9558, distance: '8 km', icon: 'truck' },
];

const NEARBY_MARKETS = [
    { id: '1', name: 'Koyambedu Vegetable Market', distance: '12 km', crops: 'All Vegetables, Fruits', price: '₹45/kg Avg' },
    { id: '2', name: 'Madurai Central Market', distance: '34 km', crops: 'Paddy, Banana, Flowers', price: '₹30/kg Avg' },
    { id: '3', name: 'Salem Agri Hub', distance: '55 km', crops: 'Mango, Groundnut', price: '₹60/kg Avg' },
];

const TRANSPORT_OPTIONS = [
    { id: 't1', type: 'Mini Truck', capacity: '1.5 Tons', cost: '₹15 / km', icon: 'truck-fast' },
    { id: 't2', type: 'Tractor Trailer', capacity: '3.0 Tons', cost: '₹22 / km', icon: 'tractor' },
    { id: 't3', type: 'Pickup Vehicle', capacity: '800 Kg', cost: '₹12 / km', icon: 'truck-delivery' },
];

const EXPORT_OPPORTUNITIES = [
    { id: 'e1', crop: 'Mango (Alphonso)', demand: 'High Demand', target: 'Middle East', color: '#4CAF50' },
    { id: 'e2', crop: 'Onion (Red)', demand: 'Stable', target: 'Southeast Asia', color: '#FF9800' },
    { id: 'e3', crop: 'Banana (Cavendish)', demand: 'Rising', target: 'Europe', color: '#2196F3' },
];

const PRICE_INDICATORS = [
    { id: 'p1', crop: 'Tomato', trend: 'up', color: '#4CAF50', text: 'High Price' },
    { id: 'p2', crop: 'Onion', trend: 'down', color: '#F44336', text: 'Low Price' },
    { id: 'p3', crop: 'Rice / Paddy', trend: 'right', color: '#FFC107', text: 'Stable' },
];

export default function TransportExportScreen() {
    const router = useRouter();

    const handleAction = (actionName: string) => {
        Alert.alert(actionName, 'This feature will connect to the live service.');
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <LinearGradient
                colors={['#4CAF50', '#8BC34A']}
                style={styles.headerContainer}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={styles.headerTop}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <View style={styles.headerIconContainer}>
                        <MaterialCommunityIcons name="truck-outline" size={28} color="#fff" />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.headerTitle}>Transport & Export</Text>
                        <Text style={styles.headerSubtitle}>Find markets and transport</Text>
                    </View>
                </View>
            </LinearGradient>

            <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>

                {/* 1. Interactive Map Section */}
                <Text style={styles.sectionTitle}>Nearby Hubs</Text>
                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        initialRegion={INITIAL_REGION}
                        showsUserLocation={true}
                    >
                        {/* Farmer Mock Location (Center) */}
                        <Marker coordinate={{ latitude: 10.8505, longitude: 76.2711 }} pinColor="green">
                            <Callout>
                                <Text style={{ fontWeight: 'bold' }}>Your Farm</Text>
                            </Callout>
                        </Marker>

                        {/* Other Hubs */}
                        {MAP_MARKERS.map(marker => (
                            <Marker
                                key={marker.id}
                                coordinate={{ latitude: marker.lat, longitude: marker.lng }}
                                pinColor={marker.type === 'market' ? 'red' : marker.type === 'export' ? 'blue' : 'orange'}
                            >
                                <Callout>
                                    <View style={{ padding: 5 }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{marker.title}</Text>
                                        <Text style={{ color: '#666', marginTop: 2 }}>{marker.distance} away</Text>
                                    </View>
                                </Callout>
                            </Marker>
                        ))}
                    </MapView>
                </View>

                {/* 2. Nearby Markets List */}
                <Text style={styles.sectionTitle}>Wholesale Markets</Text>
                {NEARBY_MARKETS.map(market => (
                    <View key={market.id} style={styles.card}>
                        <View style={styles.cardHeader}>
                            <View style={styles.marketIconContainer}>
                                <Ionicons name="storefront" size={24} color="#388E3C" />
                            </View>
                            <View style={[styles.cardInfoRow, { marginLeft: 16 }]}>
                                <Text style={styles.cardTitle}>{market.name}</Text>
                                <View style={styles.iconsRow}>
                                    <Ionicons name="location" size={14} color="#757575" />
                                    <Text style={styles.cardSubtitle}>{market.distance}</Text>
                                </View>
                                <Text style={styles.cropsAccepted}>Accepts: {market.crops}</Text>
                            </View>
                        </View>
                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={styles.outlineButton} onPress={() => handleAction('View Map')}>
                                <Text style={styles.outlineButtonText}>View Map</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.primaryButton} onPress={() => handleAction('Call Market')}>
                                <View style={styles.iconsRow}>
                                    <Ionicons name="call" size={16} color="#fff" />
                                    <Text style={[styles.primaryButtonText, { marginLeft: 4 }]}>Call</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}

                {/* 3. Transport Booking */}
                <Text style={styles.sectionTitle}>Book Transport</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
                    {TRANSPORT_OPTIONS.map(transport => (
                        <View key={transport.id} style={styles.horizontalCard}>
                            <View style={styles.transportIconContainer}>
                                <MaterialCommunityIcons name={transport.icon as any} size={28} color="#FF9800" />
                            </View>
                            <Text style={[styles.cardTitle, { marginTop: 12, fontSize: 16 }]}>{transport.type}</Text>
                            <Text style={styles.loadCapacity}>Capacity: {transport.capacity}</Text>
                            <Text style={styles.transportCost}>{transport.cost}</Text>

                            <TouchableOpacity
                                style={[styles.accentButton, { marginTop: 16 }]}
                                onPress={() => handleAction('Book Transport')}
                            >
                                <Text style={styles.primaryButtonText}>Book</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>

                {/* 4. Export Opportunities */}
                <Text style={styles.sectionTitle}>Export Opportunities</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
                    {EXPORT_OPPORTUNITIES.map(exp => (
                        <View key={exp.id} style={styles.horizontalCard}>
                            <View style={styles.exportIconContainer}>
                                <FontAwesome5 name="ship" size={20} color="#2196F3" />
                            </View>
                            <Text style={styles.exportTitle}>{exp.crop}</Text>
                            <Text style={[styles.exportDemand, { backgroundColor: exp.color }]}>
                                {exp.demand}
                            </Text>
                            <Text style={styles.exportTarget}>Target: {exp.target}</Text>
                        </View>
                    ))}
                </ScrollView>

                {/* 5. Market Price Indicators */}
                <Text style={styles.sectionTitle}>Today's Market Trends</Text>
                <View style={styles.card}>
                    {PRICE_INDICATORS.map((indicator, index) => (
                        <View
                            key={indicator.id}
                            style={[
                                styles.priceCard,
                                index === PRICE_INDICATORS.length - 1 && { borderBottomWidth: 0 }
                            ]}
                        >
                            <View style={styles.iconsRow}>
                                <MaterialCommunityIcons name="sprout" size={20} color="#757575" />
                                <Text style={[styles.priceCropName, { marginLeft: 12 }]}>{indicator.crop}</Text>
                            </View>
                            <View style={styles.priceTrendContainer}>
                                <Ionicons name={`trending-${indicator.trend}` as any} size={20} color={indicator.color} />
                                <Text style={[styles.priceTrendText, { color: indicator.color }]}>{indicator.text}</Text>
                            </View>
                        </View>
                    ))}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

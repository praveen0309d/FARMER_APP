import React, { useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Modal,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5, Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import styles from './fertilizer.styles';

// Dummy Data
const CROPS = [
    { id: '1', name: 'Paddy', icon: 'rice', type: 'MaterialCommunityIcons' },
    { id: '2', name: 'Wheat', icon: 'grass', type: 'MaterialCommunityIcons' },
    { id: '3', name: 'Maize', icon: 'corn', type: 'MaterialCommunityIcons' },
    { id: '4', name: 'Sugarcane', icon: 'leaf', type: 'Ionicons' },
    { id: '5', name: 'Cotton', icon: 'flower', type: 'MaterialCommunityIcons' },
    { id: '6', name: 'Vegetables', icon: 'carrot', type: 'MaterialCommunityIcons' },
];

const FERTILIZERS = {
    '1': [
        { id: 'f1', name: 'Urea', nutrient: 'Nitrogen (N) 46%', qty: '45-50 kg/acre', timing: 'Top dressing (tillering)', type: 'N' },
        { id: 'f2', name: 'DAP', nutrient: 'P (46%) & N (18%)', qty: '50 kg/acre', timing: 'Basal application', type: 'NP' },
        { id: 'f3', name: 'MOP', nutrient: 'Potassium (K) 60%', qty: '20 kg/acre', timing: 'Basal & top dressing', type: 'K' },
    ],
    '2': [
        { id: 'f4', name: 'Urea', nutrient: 'Nitrogen (N) 46%', qty: '50-60 kg/acre', timing: 'Split application', type: 'N' },
        { id: 'f5', name: 'NPK 12:32:16', nutrient: 'Balanced NPK', qty: '60 kg/acre', timing: 'Basal application', type: 'NPK' },
    ],
    // Default fallback
    'default': [
        { id: 'df1', name: 'Urea', nutrient: 'Nitrogen (N) 46%', qty: 'Consult expert', timing: 'Varies', type: 'N' },
        { id: 'df2', name: 'DAP', nutrient: 'P & N', qty: 'Consult expert', timing: 'Basal application', type: 'NP' },
    ]
};

const ORGANIC_FERTILIZERS = [
    { id: 'o1', name: 'Compost', desc: 'Improves soil health and water retention.', icon: 'leaf' },
    { id: 'o2', name: 'Vermicompost', desc: 'Rich in nutrients and beneficial microbes.', icon: 'globe' },
    { id: 'o3', name: 'Cow Dung Fertilizer', desc: 'Traditional and effective organic matter.', icon: 'water' },
    { id: 'o4', name: 'Green Manure', desc: 'Grown and plowed back to enrich soil.', icon: 'plant' },
];

const SHOP_DATA = [
    { id: 's1', name: 'Kisan Agro Center', distance: '2.5 km', types: 'Urea, DAP, Organic' },
    { id: 's2', name: 'Greenery Fertilizers', distance: '4.0 km', types: 'All NPK, Pesticides' },
    { id: 's3', name: 'Farm Care Shop', distance: '5.2 km', types: 'Organic Compost, Seeds' },
];

const SAFETY_TIPS = [
    "Do not overuse fertilizers as it harms the soil.",
    "Apply fertilizers during cool morning or evening hours.",
    "Store fertilizers in a cool, dry place away from children.",
    "Wear gloves and a mask when handling chemical fertilizers."
];

const APPLICATION_STEPS = [
    { id: 1, title: 'Prepare the Soil', desc: 'Ensure soil is moist and weed-free.' },
    { id: 2, title: 'Measure Quantity', desc: 'Use exact recommended quantity per acre.' },
    { id: 3, title: 'Apply Evenly', desc: 'Broadcast or place near roots uniformly.' },
    { id: 4, title: 'Water the Crop', desc: 'Irrigate immediately to help absorption.' },
];

export default function FertilizerGuideScreen() {
    const router = useRouter();
    const [selectedCrop, setSelectedCrop] = useState(CROPS[0].id);
    const [selectedFertilizer, setSelectedFertilizer] = useState<any>(null);

    const activeFertilizers = FERTILIZERS[selectedCrop as keyof typeof FERTILIZERS] || FERTILIZERS['default'];

    const renderCropIcon = (iconName: string, type: string, color: string) => {
        if (type === 'MaterialCommunityIcons') {
            return <MaterialCommunityIcons name={iconName as any} size={30} color={color} />;
        }
        return <Ionicons name={iconName as any} size={30} color={color} />;
    };

    const getNutrientColor = (type: string) => {
        switch (type) {
            case 'N': return '#2196F3'; // Blue
            case 'P': return '#FF9800'; // Orange
            case 'K': return '#E91E63'; // Pink
            case 'NP': return '#9C27B0'; // Purple
            case 'NPK': return '#4CAF50'; // Green
            default: return '#757575';
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header with gradient */}
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
                        <Ionicons name="leaf" size={28} color="#fff" />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.headerTitle}>Fertilizer Guide</Text>
                        <Text style={styles.headerSubtitle}>Choose the right fertilizer</Text>
                    </View>
                </View>
            </LinearGradient>

            <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>

                {/* Crop Selection */}
                <Text style={styles.sectionTitle}>Select Crop</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.cropsContainer}
                >
                    {CROPS.map((crop) => (
                        <TouchableOpacity
                            key={crop.id}
                            style={[
                                styles.cropCard,
                                selectedCrop === crop.id && styles.cropCardSelected
                            ]}
                            onPress={() => setSelectedCrop(crop.id)}
                        >
                            <View style={styles.cropIconContainer}>
                                {renderCropIcon(
                                    crop.icon,
                                    crop.type,
                                    selectedCrop === crop.id ? '#4CAF50' : '#757575'
                                )}
                            </View>
                            <Text style={[
                                styles.cropTitle,
                                selectedCrop === crop.id && styles.cropTitleSelected
                            ]}>
                                {crop.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Fertilizer Recommendations */}
                <Text style={styles.sectionTitle}>Recommendations</Text>
                {activeFertilizers.map((fertilizer) => (
                    <View key={fertilizer.id} style={styles.fertilizerCard}>
                        <View style={styles.fertilizerHeader}>
                            <Text style={styles.fertilizerTitle}>{fertilizer.name}</Text>
                            <View style={[styles.nutrientBadge, { backgroundColor: getNutrientColor(fertilizer.type) }]}>
                                <Text style={styles.nutrientBadgeText}>{fertilizer.type}</Text>
                            </View>
                        </View>

                        <View style={styles.nutrientRow}>
                            <Ionicons name="flask" size={18} color="#757575" />
                            <Text style={styles.detailValue}>{fertilizer.nutrient}</Text>
                        </View>

                        <View style={styles.fertilizerDetailsRow}>
                            <View style={styles.detailColumn}>
                                <Text style={styles.detailLabel}>Quantity</Text>
                                <Text style={[styles.detailValue, { color: '#4CAF50' }]}>{fertilizer.qty}</Text>
                            </View>
                            <View style={styles.detailColumn}>
                                <Text style={styles.detailLabel}>Best Time</Text>
                                <Text style={styles.detailValue}>{fertilizer.timing}</Text>
                            </View>
                        </View>

                        <View style={styles.cardActions}>
                            <TouchableOpacity
                                style={styles.outlineButton}
                                onPress={() => setSelectedFertilizer(fertilizer)}
                            >
                                <Text style={styles.outlineButtonText}>View Details</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.primaryButton}>
                                <Text style={styles.primaryButtonText}>Application Guide</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}

                {/* Organic Fertilizers */}
                <Text style={styles.sectionTitle}>Organic Alternatives</Text>
                <View style={styles.organicContainer}>
                    {ORGANIC_FERTILIZERS.map((organic) => (
                        <View key={organic.id} style={styles.organicCard}>
                            <View style={styles.organicIconContainer}>
                                <Ionicons name={organic.icon as any} size={28} color="#fff" />
                            </View>
                            <View style={styles.organicInfo}>
                                <Text style={styles.organicName}>{organic.name}</Text>
                                <Text style={styles.organicDesc}>{organic.desc}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Application Guide Steps */}
                <Text style={styles.sectionTitle}>Application Guide</Text>
                <View style={styles.stepsContainer}>
                    {APPLICATION_STEPS.map((step, index, array) => (
                        <View key={step.id} style={styles.stepItem}>
                            <View style={styles.stepNumberContainer}>
                                <Text style={styles.stepNumber}>{step.id}</Text>
                            </View>
                            {index !== array.length - 1 && <View style={styles.stepLine} />}
                            <View style={styles.stepContent}>
                                <Text style={styles.stepTitle}>{step.title}</Text>
                                <Text style={styles.detailLabel}>{step.desc}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Safety Tips */}
                <Text style={styles.sectionTitle}>Safety Tips</Text>
                {SAFETY_TIPS.map((tip, index) => (
                    <View key={index} style={styles.safetyCard}>
                        <View style={styles.safetyIconContainer}>
                            <Ionicons name="warning-outline" size={28} color="#FF9800" />
                        </View>
                        <Text style={styles.safetyText}>{tip}</Text>
                    </View>
                ))}

                {/* Nearby Shops */}
                <Text style={styles.sectionTitle}>Nearby Fertilizer Shops</Text>
                <View style={styles.shopsContainer}>
                    {SHOP_DATA.map((shop) => (
                        <TouchableOpacity key={shop.id} style={styles.shopCard}>
                            <View style={styles.shopIconContainer}>
                                <Entypo name="shop" size={24} color="#3F51B5" />
                            </View>
                            <View style={styles.shopInfo}>
                                <Text style={styles.shopName}>{shop.name}</Text>
                                <Text style={styles.shopDistance}>
                                    <Ionicons name="location-outline" size={14} color="#757575" /> {shop.distance}
                                </Text>
                                <Text style={styles.shopTypes}>{shop.types}</Text>
                            </View>
                            <TouchableOpacity style={styles.callButton}>
                                <Ionicons name="call" size={20} color="#4CAF50" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.mapButton}>
                                <Ionicons name="map" size={20} color="#3F51B5" />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))}
                </View>

            </ScrollView>

            {/* View Details Modal */}
            <Modal
                visible={!!selectedFertilizer}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setSelectedFertilizer(null)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={[styles.detailSectionTitle, { color: '#212121', fontSize: 22, flex: 1, marginBottom: 0 }]}>
                                {selectedFertilizer?.name} Details
                            </Text>
                            <TouchableOpacity onPress={() => setSelectedFertilizer(null)}>
                                <Ionicons name="close-circle" size={32} color="#757575" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView contentContainerStyle={styles.modalScroll}>
                            <View style={styles.benefitHighlight}>
                                <Ionicons name="leaf" size={24} color="#F57F17" />
                                <Text style={[styles.benefitText, { fontSize: 18, marginLeft: 8 }]}>Crop: {CROPS.find(c => c.id === selectedCrop)?.name}</Text>
                            </View>

                            <View style={styles.detailSection}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                                    <Ionicons name="flask" size={24} color="#4CAF50" style={{ marginRight: 8 }} />
                                    <Text style={[styles.detailSectionTitle, { marginBottom: 0 }]}>Nutrient Content</Text>
                                </View>
                                <Text style={styles.detailText}>{selectedFertilizer?.nutrient}</Text>
                            </View>

                            <View style={styles.detailSection}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                                    <MaterialCommunityIcons name="scale" size={24} color="#4CAF50" style={{ marginRight: 8 }} />
                                    <Text style={[styles.detailSectionTitle, { marginBottom: 0 }]}>Recommended Quantity</Text>
                                </View>
                                <Text style={styles.detailText}>{selectedFertilizer?.qty}</Text>
                            </View>

                            <View style={styles.detailSection}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                                    <Ionicons name="time" size={24} color="#4CAF50" style={{ marginRight: 8 }} />
                                    <Text style={[styles.detailSectionTitle, { marginBottom: 0 }]}>Best Application Time</Text>
                                </View>
                                <Text style={styles.detailText}>{selectedFertilizer?.timing}</Text>
                            </View>

                        </ScrollView>

                        <View style={styles.modalFooter}>
                            <TouchableOpacity
                                style={[styles.primaryButton, { width: '100%' }]}
                                onPress={() => setSelectedFertilizer(null)}
                            >
                                <Text style={styles.primaryButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    );
}

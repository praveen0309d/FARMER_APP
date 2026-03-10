import React, { useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Animated,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5, Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import styles from './soilWater.styles';

// Constants for Input Selections
const SOIL_TYPES = [
    { id: 'sandy', label: 'Sandy' },
    { id: 'clay', label: 'Clay' },
    { id: 'loamy', label: 'Loamy' },
    { id: 'red', label: 'Red Soil' },
    { id: 'black', label: 'Black Soil' },
];

const PH_LEVELS = [
    { id: 'acidic', label: 'Acidic (< 6)' },
    { id: 'neutral', label: 'Neutral (6-7)' },
    { id: 'alkaline', label: 'Alkaline (> 7)' },
];

const ORGANIC_MATTER = [
    { id: 'low', label: 'Low' },
    { id: 'medium', label: 'Medium' },
    { id: 'high', label: 'High' },
];

const IRRIGATION_TYPES = [
    { id: 'rainfed', label: 'Rainfed' },
    { id: 'borewell', label: 'Borewell' },
    { id: 'canal', label: 'Canal' },
    { id: 'tank', label: 'Tank' },
];

const WATER_AVAILABILITY = [
    { id: 'low', label: 'Low (Scarcity)' },
    { id: 'medium', label: 'Medium' },
    { id: 'high', label: 'High (Abundant)' },
];

// Content for Tips
const SOIL_TIPS = [
    { id: 1, text: 'Add organic compost like Vermicompost to improve soil fertility and moisture retention.', icon: 'leaf' },
    { id: 2, text: 'Use drip or sprinkler irrigation systems to save water and improve yield.', icon: 'water' },
    { id: 3, text: 'Practice crop rotation with legumes to naturally replenish soil nutrients.', icon: 'sync' },
];

export default function SoilWaterPredictionScreen() {
    const router = useRouter();

    // State for Inputs
    const [soilType, setSoilType] = useState(SOIL_TYPES[0].id);
    const [phLevel, setPhLevel] = useState(PH_LEVELS[1].id);
    const [organicMatter, setOrganicMatter] = useState(ORGANIC_MATTER[1].id);

    const [irrigation, setIrrigation] = useState(IRRIGATION_TYPES[1].id);
    const [waterAvail, setWaterAvail] = useState(WATER_AVAILABILITY[1].id);

    // State for Result Visibility
    const [showResult, setShowResult] = useState(false);

    // Logic for generating a simple prediction result based on active state
    const generatePrediction = () => {
        let conditionColor = styles.resultCard.borderColor; // Use base color from style, overridden below
        let severity = '#4CAF50';
        let conditionIcon = 'checkmark-circle';
        let title = 'Good for Cultivation';
        let subtitle = 'Soil and water conditions are favorable.';
        let recommendedCrops = [];

        // Simple heuristic rules
        if (waterAvail === 'low' && soilType === 'sandy') {
            severity = '#F44336'; // Red
            conditionIcon = 'close-circle';
            title = 'Unfavorable Conditions';
            subtitle = 'High water scarcity and poor water retention in sandy soil.';
            recommendedCrops = [
                { name: 'Millets', icon: 'grass', water: 'Very Low' },
                { name: 'Sorghum', icon: 'spa', water: 'Low' }
            ];
        } else if (soilType === 'black' && waterAvail !== 'low') {
            severity = '#4CAF50'; // Green
            conditionIcon = 'checkmark-circle';
            title = 'Excellent Conditions';
            subtitle = 'Black soil holds moisture well. Highly suitable for cash crops.';
            recommendedCrops = [
                { name: 'Cotton', icon: 'flower', water: 'Medium' },
                { name: 'Sugarcane', icon: 'leaf', water: 'High' }
            ];
        } else if (soilType === 'clay' || waterAvail === 'medium') {
            severity = '#FFC107'; // Yellow
            conditionIcon = 'alert-circle';
            title = 'Moderate Conditions';
            subtitle = 'Adequate for most crops, but monitor water logging in clay soil.';
            recommendedCrops = [
                { name: 'Paddy', icon: 'rice', water: 'High' },
                { name: 'Wheat', icon: 'grass', water: 'Medium' }
            ];
        } else {
            // Default Good
            severity = '#4CAF50';
            recommendedCrops = [
                { name: 'Vegetables', icon: 'carrot', water: 'Medium' },
                { name: 'Groundnut', icon: 'nutrition', water: 'Low' }
            ];
        }

        return { severity, conditionIcon, title, subtitle, recommendedCrops };
    };

    const handlePredict = () => {
        setShowResult(true);
        // Optional: Add scroll to bottom or animation logic here
    };

    const prediction = showResult ? generatePrediction() : null;

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <LinearGradient
                colors={['#03A9F4', '#4CAF50']}
                style={styles.headerContainer}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={styles.headerTop}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <View style={styles.headerIconContainer}>
                        <View style={[styles.iconCircle, { borderColor: '#8D6E63', zIndex: 2, marginRight: -8 }]}>
                            <MaterialCommunityIcons name="layers" size={20} color="#8D6E63" />
                        </View>
                        <View style={[styles.iconCircle, { borderColor: '#BBDEFB', zIndex: 1 }]}>
                            <Ionicons name="water" size={20} color="#BBDEFB" />
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.headerTitle}>Soil & Water</Text>
                        <Text style={styles.headerSubtitle}>Prediction & recommendations</Text>
                    </View>
                </View>
            </LinearGradient>

            <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>

                {/* 1. Soil Information Input */}
                <View style={styles.inputSection}>
                    <View style={styles.inputSectionTitleContainer}>
                        <MaterialCommunityIcons name="layers" size={24} color="#8D6E63" />
                        <Text style={styles.inputSectionTitle}>Soil Information</Text>
                    </View>

                    <View style={styles.selectorGroup}>
                        <Text style={styles.selectorLabel}>Soil Type</Text>
                        <View style={styles.optionsContainer}>
                            {SOIL_TYPES.map(type => (
                                <TouchableOpacity
                                    key={type.id}
                                    style={[styles.optionButton, soilType === type.id && styles.optionButtonSelected]}
                                    onPress={() => { setSoilType(type.id); setShowResult(false); }}
                                >
                                    <Text style={[styles.optionText, soilType === type.id && styles.optionTextSelected]}>
                                        {type.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View style={styles.selectorGroup}>
                        <Text style={styles.selectorLabel}>pH Level</Text>
                        <View style={styles.levelContainer}>
                            {PH_LEVELS.map(level => (
                                <TouchableOpacity
                                    key={level.id}
                                    style={[styles.levelButton, phLevel === level.id && styles.levelButtonSelected]}
                                    onPress={() => { setPhLevel(level.id); setShowResult(false); }}
                                >
                                    <Text style={[styles.levelText, phLevel === level.id && styles.levelTextSelected]}>
                                        {level.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View style={styles.selectorGroup}>
                        <Text style={styles.selectorLabel}>Organic Matter</Text>
                        <View style={styles.levelContainer}>
                            {ORGANIC_MATTER.map(level => (
                                <TouchableOpacity
                                    key={level.id}
                                    style={[styles.levelButton, organicMatter === level.id && styles.levelButtonSelected]}
                                    onPress={() => { setOrganicMatter(level.id); setShowResult(false); }}
                                >
                                    <Text style={[styles.levelText, organicMatter === level.id && styles.levelTextSelected]}>
                                        {level.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>

                {/* 2. Water Availability Input */}
                <View style={styles.inputSection}>
                    <View style={styles.inputSectionTitleContainer}>
                        <Ionicons name="water" size={24} color="#03A9F4" />
                        <Text style={styles.inputSectionTitle}>Irrigation & Water</Text>
                    </View>

                    <View style={styles.selectorGroup}>
                        <Text style={styles.selectorLabel}>Irrigation Source</Text>
                        <View style={styles.optionsContainer}>
                            {IRRIGATION_TYPES.map(type => (
                                <TouchableOpacity
                                    key={type.id}
                                    style={[styles.optionButton, irrigation === type.id && styles.optionButtonSelected]}
                                    onPress={() => { setIrrigation(type.id); setShowResult(false); }}
                                >
                                    <Text style={[styles.optionText, irrigation === type.id && styles.optionTextSelected]}>
                                        {type.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View style={styles.selectorGroup}>
                        <Text style={styles.selectorLabel}>Water Availability</Text>
                        <View style={styles.levelContainer}>
                            {WATER_AVAILABILITY.map(level => (
                                <TouchableOpacity
                                    key={level.id}
                                    style={[styles.levelButton, waterAvail === level.id && styles.levelButtonSelected]}
                                    onPress={() => { setWaterAvail(level.id); setShowResult(false); }}
                                >
                                    <Text style={[styles.levelText, waterAvail === level.id && styles.levelTextSelected]}>
                                        {level.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>

                {/* Predict Button */}
                <TouchableOpacity style={styles.predictButton} onPress={handlePredict}>
                    <MaterialCommunityIcons name="magic-staff" size={24} color="#fff" />
                    <Text style={styles.predictButtonText}>Get Prediction</Text>
                </TouchableOpacity>

                {/* 3. Prediction Result Area */}
                {showResult && prediction && (
                    <View style={[styles.resultCard, { borderTopColor: prediction.severity }]}>
                        <View style={styles.resultHeader}>
                            <View style={[styles.resultIconContainer, { backgroundColor: `${prediction.severity}20` }]}>
                                <Ionicons name={prediction.conditionIcon as any} size={40} color={prediction.severity} />
                            </View>
                            <Text style={styles.resultTitle}>{prediction.title}</Text>
                            <Text style={styles.resultSubtitle}>{prediction.subtitle}</Text>
                        </View>

                        <View style={styles.resultDivider} />

                        <Text style={[styles.sectionTitle, { marginLeft: 0, fontSize: 18 }]}>Recommended Crops</Text>
                        <View style={styles.cropsGrid}>
                            {prediction.recommendedCrops.map((crop, index) => (
                                <View key={index} style={styles.cropRecCard}>
                                    <View style={styles.cropRecIcon}>
                                        <MaterialCommunityIcons name={crop.icon as any} size={28} color="#4CAF50" />
                                    </View>
                                    <Text style={styles.cropRecName}>{crop.name}</Text>
                                    <Text style={styles.cropRecWater}>Water Req: {crop.water}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {/* 4. Soil Health Tips */}
                <Text style={styles.sectionTitle}>Soil & Water Tips</Text>
                {SOIL_TIPS.map((tip) => (
                    <View key={tip.id} style={styles.tipCard}>
                        <View style={styles.tipIconContainer}>
                            <Ionicons name={tip.icon as any} size={24} color="#4CAF50" />
                        </View>
                        <Text style={styles.tipText}>{tip.text}</Text>
                    </View>
                ))}

            </ScrollView>
        </SafeAreaView>
    );
}

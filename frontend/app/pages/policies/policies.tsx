import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Modal,
    SafeAreaView
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import styles from './policies.styles';

const categories = [
    { id: 'all', title: 'All Schemes', icon: 'apps' },
    { id: 'subsidy', title: 'Subsidies', icon: 'cash-outline' },
    { id: 'insurance', title: 'Crop Insurance', icon: 'shield-checkmark-outline' },
    { id: 'equipment', title: 'Farm Equipment', icon: 'construct-outline' },
    { id: 'loan', title: 'Loans', icon: 'card-outline' },
];

const mockSchemes = [
    {
        id: 1,
        title: 'PM-Kisan Scheme',
        category: 'subsidy',
        description: 'Income support scheme for farmers, directly transferred to bank accounts in three equal installments.',
        benefit: '₹6,000 yearly support',
        icon: 'leaf-outline',
        badge: 'Popular',
        badgeColor: '#4CAF50',
        eligibility: [
            'Must own cultivable land',
            'Must have Aadhaar card linked to bank',
            'Marginal and small farmers preferred'
        ],
        documents: ['Aadhaar Card', 'Land holding papers', 'Bank passbook'],
        deadline: 'Ongoing'
    },
    {
        id: 2,
        title: 'Pradhan Mantri Fasal Bima',
        category: 'insurance',
        description: 'Comprehensive crop insurance from pre-sowing to post-harvest to protect against natural calamities.',
        benefit: 'Full crop protection',
        icon: 'shield-half-outline',
        badge: 'New',
        badgeColor: '#FF9800',
        eligibility: [
            'All farmers growing notified crops',
            'Tenant farmers and sharecroppers are eligible'
        ],
        documents: ['Aadhaar', 'Sowing certificate', 'Bank details'],
        deadline: 'Before Season Starts'
    },
    {
        id: 3,
        title: 'Drip Irrigation Subsidy',
        category: 'subsidy',
        description: 'State government subsidy for installing micro-irrigation systems to save water.',
        benefit: 'Up to 75-100% Subsidy',
        icon: 'water-outline',
        eligibility: [
            'Small and marginal farmers',
            'Must have electricity or diesel pump connection',
            'Minimum of 0.2 hectares of land'
        ],
        documents: ['Chitta/Patta', 'Aadhaar', 'Field Map', 'Quotation'],
        deadline: 'Subject to fund availability'
    },
    {
        id: 4,
        title: 'Tractor Procurement Loan',
        category: 'equipment',
        description: 'Special low-interest bank loans for purchasing tractors and heavy farm machineries.',
        benefit: '3.5% Low Interest Rate',
        icon: 'car-sport-outline',
        eligibility: [
            'Minimum 2 acres irrigated land',
            'Good CIBIL score',
            'Must provide land as collateral'
        ],
        documents: ['Aadhaar', 'PAN Card', 'Land Records', 'Quotation'],
        deadline: 'Ongoing'
    }
];

export default function PoliciesScreen() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedScheme, setSelectedScheme] = useState<any>(null);

    // Eligibility states
    const [showEligibility, setShowEligibility] = useState(false);
    const [eligibilityStep, setEligibilityStep] = useState(0);
    const [isEligible, setIsEligible] = useState<boolean | null>(null);

    const filterSchemes = () => {
        return mockSchemes.filter(scheme => {
            const matchesSearch = scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || scheme.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    };

    const checkEligibilityQuestions = [
        "Do you own farmland registered in your name?",
        "Do you have a valid Aadhaar card linked to your phone number?",
        "Do you have an active bank account?"
    ];

    const handleEligibilityAnswer = (answer: boolean) => {
        if (!answer) {
            setIsEligible(false);
            return;
        }

        if (eligibilityStep < checkEligibilityQuestions.length - 1) {
            setEligibilityStep(prev => prev + 1);
        } else {
            setIsEligible(true);
        }
    };

    const resetEligibility = () => {
        setEligibilityStep(0);
        setIsEligible(null);
        setShowEligibility(true);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <View style={styles.headerTop}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                <Text style={styles.headerTitle}>Government Schemes</Text>
                </View>
                <Text style={styles.headerSubtitle}>Support programs available for farmers</Text>

                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={24} color="#757575" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search schemes (crop insurance, subsidy...)"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholderTextColor="#9E9E9E"
                    />
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>

                {/* Categories */}
                <Text style={styles.sectionTitle}>Categories</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.categoriesContainer}
                >
                    {categories.map((cat) => (
                        <TouchableOpacity
                            key={cat.id}
                            style={[
                                styles.categoryPill,
                                selectedCategory === cat.id && styles.categoryPillSelected
                            ]}
                            onPress={() => setSelectedCategory(cat.id)}
                        >
                            <Ionicons
                                name={cat.icon as any}
                                size={20}
                                color={selectedCategory === cat.id ? '#1B5E20' : '#757575'}
                            />
                            <Text style={[
                                styles.categoryText,
                                selectedCategory === cat.id && styles.categoryTextSelected
                            ]}>
                                {cat.title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Scheme Cards */}
                <Text style={styles.sectionTitle}>Available Schemes</Text>
                {filterSchemes().map((scheme) => (
                    <TouchableOpacity
                        key={scheme.id}
                        style={styles.schemeCard}
                        onPress={() => {
                            setSelectedScheme(scheme);
                            setEligibilityStep(0);
                            setIsEligible(null);
                            setShowEligibility(false);
                        }}
                    >
                        <View style={styles.schemeHeader}>
                            <View style={styles.schemeIconContainer}>
                                <Ionicons name={scheme.icon as any} size={30} color="#4CAF50" />
                            </View>
                            <View style={styles.schemeTitleContainer}>
                                <Text style={styles.schemeTitle}>{scheme.title}</Text>
                                {scheme.badge && (
                                    <View style={[styles.badge, { backgroundColor: scheme.badgeColor }]}>
                                        <Text style={styles.badgeText}>{scheme.badge}</Text>
                                    </View>
                                )}
                            </View>
                        </View>

                        <Text style={styles.schemeDescription} numberOfLines={2}>
                            {scheme.description}
                        </Text>

                        <View style={styles.benefitHighlight}>
                            <Ionicons name="gift" size={20} color="#F57F17" />
                            <Text style={styles.benefitText}>{scheme.benefit}</Text>
                        </View>

                        <View style={styles.cardActions}>
                            <TouchableOpacity
                                style={styles.outlineButton}
                                onPress={() => {
                                    setSelectedScheme(scheme);
                                    resetEligibility();
                                }}
                            >
                                <Text style={styles.outlineButtonText}>Check Eligibility</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.primaryButton} onPress={() => setSelectedScheme(scheme)}>
                                <Text style={styles.primaryButtonText}>View Details</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Scheme Details Modal */}
            <Modal
                visible={!!selectedScheme}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setSelectedScheme(null)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.headerTitle} style={{ color: '#212121', fontSize: 22, flex: 1 }}>
                                {selectedScheme?.title}
                            </Text>
                            <TouchableOpacity onPress={() => setSelectedScheme(null)}>
                                <Ionicons name="close-circle" size={32} color="#757575" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView contentContainerStyle={styles.modalScroll}>

                            {!showEligibility ? (
                                <>
                                    <View style={styles.benefitHighlight}>
                                        <Ionicons name="gift" size={24} color="#F57F17" />
                                        <Text style={[styles.benefitText, { fontSize: 18 }]}>{selectedScheme?.benefit}</Text>
                                    </View>

                                    <View style={styles.detailSection}>
                                        <Text style={styles.detailSectionTitle}>
                                            <Ionicons name="information-circle" size={24} color="#4CAF50" style={{ marginRight: 8 }} /> Description
                                        </Text>
                                        <Text style={styles.detailText}>{selectedScheme?.description}</Text>
                                    </View>

                                    <View style={styles.detailSection}>
                                        <Text style={styles.detailSectionTitle}>
                                            <Ionicons name="checkmark-done-circle" size={24} color="#4CAF50" style={{ marginRight: 8 }} /> Eligibility
                                        </Text>
                                        {selectedScheme?.eligibility.map((item: string, idx: number) => (
                                            <View key={idx} style={styles.bulletPoint}>
                                                <Ionicons name="ellipse" size={8} color="#4CAF50" style={{ marginTop: 6 }} />
                                                <Text style={styles.bulletText}>{item}</Text>
                                            </View>
                                        ))}
                                    </View>

                                    <View style={styles.detailSection}>
                                        <Text style={styles.detailSectionTitle}>
                                            <Ionicons name="document-text" size={24} color="#4CAF50" style={{ marginRight: 8 }} /> Required Documents
                                        </Text>
                                        {selectedScheme?.documents.map((item: string, idx: number) => (
                                            <View key={idx} style={styles.bulletPoint}>
                                                <Ionicons name="ellipse" size={8} color="#4CAF50" style={{ marginTop: 6 }} />
                                                <Text style={styles.bulletText}>{item}</Text>
                                            </View>
                                        ))}
                                    </View>

                                    <View style={styles.detailSection}>
                                        <Text style={styles.detailSectionTitle}>
                                            <Ionicons name="calendar" size={24} color="#4CAF50" style={{ marginRight: 8 }} /> Deadline
                                        </Text>
                                        <Text style={[styles.detailText, { fontWeight: 'bold' }]}>{selectedScheme?.deadline}</Text>
                                    </View>
                                </>
                            ) : (
                                /* Eligibility Checker View */
                                <View style={styles.eligibilityContainer}>
                                    {isEligible === null ? (
                                        <>
                                            <Ionicons name="help-circle" size={80} color="#2196F3" />
                                            <Text style={[styles.detailSectionTitle, { marginTop: 20 }]}>Eligibility Check</Text>
                                            <Text style={styles.questionText}>
                                                {checkEligibilityQuestions[eligibilityStep]}
                                            </Text>

                                            <View style={styles.answerButtons}>
                                                <TouchableOpacity
                                                    style={[styles.answerButton, styles.noButton]}
                                                    onPress={() => handleEligibilityAnswer(false)}
                                                >
                                                    <Text style={styles.noText}>No</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={[styles.answerButton, styles.yesButton]}
                                                    onPress={() => handleEligibilityAnswer(true)}
                                                >
                                                    <Text style={styles.yesText}>Yes</Text>
                                                </TouchableOpacity>
                                            </View>

                                            <Text style={{ marginTop: 20, color: '#757575' }}>
                                                Question {eligibilityStep + 1} of {checkEligibilityQuestions.length}
                                            </Text>
                                        </>
                                    ) : (
                                        <View style={styles.resultContainer}>
                                            {isEligible ? (
                                                <>
                                                    <Ionicons name="checkmark-circle" size={100} color="#4CAF50" />
                                                    <Text style={[styles.resultText, { color: '#2E7D32' }]}>
                                                        Great! You are likely eligible for this scheme.
                                                    </Text>
                                                </>
                                            ) : (
                                                <>
                                                    <Ionicons name="close-circle" size={100} color="#D32F2F" />
                                                    <Text style={[styles.resultText, { color: '#B71C1C' }]}>
                                                        Based on your answers, you may not qualify for this specific scheme.
                                                    </Text>
                                                </>
                                            )}

                                            <TouchableOpacity
                                                style={[styles.outlineButton, { marginTop: 30, width: '100%' }]}
                                                onPress={() => setShowEligibility(false)}
                                            >
                                                <Text style={styles.outlineButtonText}>Back to Scheme Details</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </View>
                            )}

                        </ScrollView>

                        <View style={styles.modalFooter}>
                            {!showEligibility ? (
                                <View style={styles.cardActions}>
                                    <TouchableOpacity style={styles.outlineButton} onPress={resetEligibility}>
                                        <Text style={styles.outlineButtonText}>Check Eligibility</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.primaryButton}>
                                        <Text style={styles.primaryButtonText}>Apply Now</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : null}
                        </View>
                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    );
}

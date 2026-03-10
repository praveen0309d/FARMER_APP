import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Modal
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './loan.styles';

const loanCategories = [
    { id: '1', title: 'Crop Loan', desc: 'Short-term credit for seeds and fertilizers', icon: 'leaf' },
    { id: '2', title: 'Equipment Loan', desc: 'Finance for heavy machinery', icon: 'cogs' },
    { id: '3', title: 'Tractor Loan', desc: 'Special rates for tractors', icon: 'tractor' },
    { id: '4', title: 'Irrigation Loan', desc: 'Drip & sprinkler systems', icon: 'water' },
    { id: '5', title: 'Kisan Credit Card', desc: 'Revolving cash credit (KCC)', icon: 'credit-card' },
];

const loanOptions = [
    {
        id: 1,
        title: 'Kisan Credit Card (KCC)',
        provider: 'Govt. scheme via Banks',
        interest: '4-7% p.a.',
        maxAmount: '₹3,000,000',
        description: 'A flexible loan facility helping farmers meet their working capital requirements for farming.'
    },
    {
        id: 2,
        title: 'NABARD Agricultural Loan',
        provider: 'NABARD',
        interest: 'Subsidized',
        maxAmount: 'Varies by project',
        description: 'Long-term financial assistance for agriculture and allied activities.'
    },
    {
        id: 3,
        title: 'Tractor Finance Loan',
        provider: 'Major Local Banks',
        interest: '8-11% p.a.',
        maxAmount: 'Up to 90% of cost',
        description: 'Quick processing loans for purchasing new or second-hand tractors and accessories.'
    },
    {
        id: 4,
        title: 'Micro Irrigation Loan',
        provider: 'State Banks',
        interest: 'From 7% p.a.',
        maxAmount: '₹5,000,000',
        description: 'Loans tailored for installing advanced drip and sprinkler irrigation systems.'
    }
];

const nearbyBanks = [
    { id: 1, name: 'State Bank of India (SBI)', distance: '2.5 km', types: 'KCC, Tractor, Crop Loans' },
    { id: 2, name: 'Indian Bank', distance: '3.8 km', types: 'KCC, Equipment Loans' },
    { id: 3, name: 'HDFC Bank Agri Branch', distance: '5.1 km', types: 'Irrigation, Tractor Loans' },
];

const requiredDocs = [
    { id: 1, text: 'Aadhaar Card', icon: 'card-account-details-outline' },
    { id: 2, text: 'Land Ownership Document (Patta/Chitta)', icon: 'file-document-outline' },
    { id: 3, text: 'Bank Passbook (Updated)', icon: 'book-open-page-variant-outline' },
    { id: 4, text: 'Passport Size Photos (3)', icon: 'camera-outline' },
];

export default function LoanGuideScreen() {
    const router = useRouter();

    // Calculator State
    const [loanAmount, setLoanAmount] = useState('100000');
    const [interestRate, setInterestRate] = useState('7');
    const [months, setMonths] = useState('12');

    // Modal State
    const [selectedLoan, setSelectedLoan] = useState<any>(null);
    const [showEligibility, setShowEligibility] = useState(false);
    const [eligibilityStep, setEligibilityStep] = useState(0);
    const [isEligible, setIsEligible] = useState<boolean | null>(null);

    const checkEligibilityQuestions = [
        "Do you own cultivable land?",
        "Do you have a valid Aadhaar card and Bank Account?",
        "Have you cleared previous loan dues?"
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

    // Simple EMI Calculator formula
    const calculateEMI = () => {
        const p = parseFloat(loanAmount);
        const r = parseFloat(interestRate) / (12 * 100);
        const n = parseFloat(months);

        if (!p || !r || !n || isNaN(p) || isNaN(r) || isNaN(n)) {
            return { emi: 0, total: 0 };
        }

        const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        const total = emi * n;

        return {
            emi: Math.round(emi),
            total: Math.round(total)
        };
    };

    const results = calculateEMI();

    return (
        <SafeAreaView style={styles.container}>

            {/* Header with Gradient */}
            <LinearGradient
                colors={['#4CAF50', '#8BC34A']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.headerContainer}
            >
                <View style={styles.headerTop}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Loan Guide</Text>
                </View>
                <Text style={styles.headerSubtitle}>Financial support for your farming needs</Text>
            </LinearGradient>

            <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>

                {/* Quick Loan Categories */}
                <Text style={styles.sectionTitle}>Loan Categories</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.categoriesContainer}
                >
                    {loanCategories.map((category) => (
                        <TouchableOpacity key={category.id} style={styles.categoryCard}>
                            <View style={styles.categoryIconContainer}>
                                <MaterialCommunityIcons name={category.icon as any} size={32} color="#4CAF50" />
                            </View>
                            <Text style={styles.categoryTitle}>{category.title}</Text>
                            <Text style={styles.categoryDesc} numberOfLines={2}>{category.desc}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Loan Calculator Widget */}
                <Text style={styles.sectionTitle}>EMI Calculator</Text>
                <View style={styles.calculatorContainer}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Loan Amount (₹)</Text>
                        <View style={styles.inputWrapper}>
                            <FontAwesome5 name="rupee-sign" size={16} color="#757575" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                keyboardType="numeric"
                                value={loanAmount}
                                onChangeText={setLoanAmount}
                                placeholder="100000"
                            />
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', gap: 12 }}>
                        <View style={[styles.inputGroup, { flex: 1 }]}>
                            <Text style={styles.inputLabel}>Interest (%)</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="pie-chart-outline" size={18} color="#757575" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    keyboardType="numeric"
                                    value={interestRate}
                                    onChangeText={setInterestRate}
                                    placeholder="7"
                                />
                            </View>
                        </View>
                        <View style={[styles.inputGroup, { flex: 1 }]}>
                            <Text style={styles.inputLabel}>Duration (Mo)</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="calendar-outline" size={18} color="#757575" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    keyboardType="numeric"
                                    value={months}
                                    onChangeText={setMonths}
                                    placeholder="12"
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.calcResults}>
                        <View style={styles.resultRow}>
                            <Text style={styles.resultLabel}>Monthly EMI:</Text>
                            <Text style={styles.resultValue}>₹{results.emi.toLocaleString('en-IN')}</Text>
                        </View>
                        <View style={styles.resultRow}>
                            <Text style={styles.resultLabel}>Total Repayment:</Text>
                            <Text style={styles.resultValue}>₹{results.total.toLocaleString('en-IN')}</Text>
                        </View>
                    </View>
                </View>

                {/* Loan Information Cards */}
                <Text style={styles.sectionTitle}>Available Loans</Text>
                {loanOptions.map((loan) => (
                    <View key={loan.id} style={styles.loanCard}>
                        <View style={styles.loanHeader}>
                            <Text style={styles.loanTitle}>{loan.title}</Text>
                            <Text style={styles.loanProvider}>{loan.provider}</Text>
                        </View>

                        <Text style={styles.loanDescription}>{loan.description}</Text>

                        <View style={styles.loanDetailsRow}>
                            <View style={styles.detailColumn}>
                                <Text style={styles.detailLabel}>Interest</Text>
                                <Text style={[styles.detailValue, { color: '#4CAF50' }]}>{loan.interest}</Text>
                            </View>
                            <View style={styles.detailColumn}>
                                <Text style={styles.detailLabel}>Max Amount</Text>
                                <Text style={styles.detailValue}>{loan.maxAmount}</Text>
                            </View>
                        </View>

                        <View style={styles.cardActions}>
                            <TouchableOpacity
                                style={styles.outlineButton}
                                onPress={() => {
                                    setSelectedLoan(loan);
                                    resetEligibility();
                                }}
                            >
                                <Text style={styles.outlineButtonText}>Eligibility Check</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.primaryButton}
                                onPress={() => {
                                    setSelectedLoan(loan);
                                    setShowEligibility(false);
                                    setIsEligible(null);
                                    setEligibilityStep(0);
                                }}
                            >
                                <Text style={styles.primaryButtonText}>View Details</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}

                {/* Application Guide Steps */}
                <Text style={styles.sectionTitle}>How to Apply step-by-step</Text>
                <View style={styles.stepsContainer}>
                    {[
                        { id: 1, title: 'Choose Loan Type', desc: 'Find the loan that suits your farming need.' },
                        { id: 2, title: 'Check Eligibility', desc: 'Ensure you meet the basic conditions.' },
                        { id: 3, title: 'Prepare Documents', desc: 'Gather ID and land records.' },
                        { id: 4, title: 'Apply at Bank', desc: 'Visit your nearest bank branch to submit.' }
                    ].map((step, index, array) => (
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

                {/* Required Documents */}
                <Text style={styles.sectionTitle}>Required Documents</Text>
                <View style={styles.docsContainer}>
                    {requiredDocs.map((doc, index) => (
                        <View key={doc.id} style={[styles.docItem, index === requiredDocs.length - 1 && { borderBottomWidth: 0 }]}>
                            <View style={styles.docIconContainer}>
                                <MaterialCommunityIcons name={doc.icon as any} size={24} color="#FF9800" />
                            </View>
                            <Text style={styles.docText}>{doc.text}</Text>
                        </View>
                    ))}
                </View>

                {/* Nearby Banks */}
                <Text style={styles.sectionTitle}>Nearby Banks</Text>
                <View style={styles.banksContainer}>
                    {nearbyBanks.map((bank) => (
                        <TouchableOpacity key={bank.id} style={styles.bankCard}>
                            <View style={styles.bankIconContainer}>
                                <MaterialCommunityIcons name="bank" size={28} color="#4CAF50" />
                            </View>
                            <View style={styles.bankInfo}>
                                <Text style={styles.bankName}>{bank.name}</Text>
                                <Text style={styles.bankDistance}>
                                    <Ionicons name="location-outline" size={14} color="#757575" /> {bank.distance}
                                </Text>
                                <Text style={styles.bankTypes}>{bank.types}</Text>
                            </View>
                            <TouchableOpacity style={styles.callButton}>
                                <Ionicons name="call" size={20} color="#4CAF50" />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))}
                </View>

            </ScrollView>

            {/* Loan Details Modal */}
            <Modal
                visible={!!selectedLoan}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setSelectedLoan(null)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={[styles.headerTitle, { color: '#212121', fontSize: 22, flex: 1 }]}>
                                {selectedLoan?.title}
                            </Text>
                            <TouchableOpacity onPress={() => setSelectedLoan(null)}>
                                <Ionicons name="close-circle" size={32} color="#757575" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView contentContainerStyle={styles.modalScroll}>

                            {!showEligibility ? (
                                <>
                                    <View style={styles.benefitHighlight}>
                                        <Ionicons name="cash" size={24} color="#F57F17" />
                                        <Text style={[styles.benefitText, { fontSize: 18, marginLeft: 8 }]}>Max: {selectedLoan?.maxAmount}</Text>
                                    </View>

                                    <View style={styles.detailSection}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                                            <Ionicons name="information-circle" size={24} color="#4CAF50" style={{ marginRight: 8 }} />
                                            <Text style={[styles.detailSectionTitle, { marginBottom: 0 }]}>Description</Text>
                                        </View>
                                        <Text style={styles.detailText}>{selectedLoan?.description}</Text>
                                    </View>

                                    <View style={styles.detailSection}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                                            <Ionicons name="bar-chart" size={24} color="#4CAF50" style={{ marginRight: 8 }} />
                                            <Text style={[styles.detailSectionTitle, { marginBottom: 0 }]}>Interest Rate</Text>
                                        </View>
                                        <Text style={styles.detailText}>{selectedLoan?.interest}</Text>
                                    </View>

                                    <View style={styles.detailSection}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                                            <Ionicons name="business" size={24} color="#4CAF50" style={{ marginRight: 8 }} />
                                            <Text style={[styles.detailSectionTitle, { marginBottom: 0 }]}>Provider</Text>
                                        </View>
                                        <Text style={styles.detailText}>{selectedLoan?.provider}</Text>
                                    </View>

                                </>
                            ) : (
                                /* Eligibility Checker View */
                                <View style={styles.eligibilityContainer}>
                                    {isEligible === null ? (
                                        <>
                                            <Ionicons name="help-circle" size={80} color="#4CAF50" />
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
                                                        Great! You are likely eligible for this loan.
                                                    </Text>
                                                </>
                                            ) : (
                                                <>
                                                    <Ionicons name="close-circle" size={100} color="#D32F2F" />
                                                    <Text style={[styles.resultText, { color: '#B71C1C' }]}>
                                                        Based on your answers, you may not qualify for this specific loan.
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

        </SafeAreaView >
    );
}

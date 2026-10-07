import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, Modal } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useDemo } from '../../context/DemoContext';
import { 
  Bell, 
  PlusCircle, 
  ChevronLeft, 
  ChevronRight, 
  Bus, 
  Utensils, 
  Printer, 
  ShoppingBag,
  Megaphone,
  Zap,
  Award,
  ChevronDown,
  QrCode
} from 'lucide-react-native';

export default function CampusHub() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const {
    studentName,
    studentId,
    balance,
    activeCampus,
    setActiveCampus,
    activePass,
    canteenOrder
  } = useDemo();

  const activeTrackers = [];
  if (activePass) activeTrackers.push({ type: 'shuttle', data: activePass });
  if (canteenOrder) activeTrackers.push({ type: 'canteen', data: canteenOrder });

  const [trackerIndex, setTrackerIndex] = useState(0);
  const [showCampusDropdown, setShowCampusDropdown] = useState(false);
  const currentTracker = activeTrackers.length > 0 ? activeTrackers[trackerIndex % activeTrackers.length] : null;

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {/* Header (Top App Bar - Dynamic Padding) */}
      <View style={[styles.appBar, { paddingTop: insets.top || 8, height: 56 + (insets.top || 8) }]}>
        <View style={styles.headerLeft}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>TSU</Text>
          </View>
          <Text style={styles.headerTitle}>Campus Hub</Text>
        </View>
        <View style={styles.headerRight}>
          <Pressable style={styles.iconButton}>
            <Bell size={22} color="#444651" />
            <View style={styles.notificationDot} />
          </Pressable>
          <Pressable style={styles.profileButton}>
            <Image 
              source={{ uri: 'https://i.pravatar.cc/100' }} 
              style={styles.profileImage} 
            />
          </Pressable>
        </View>
      </View>

      <ScrollView style={styles.mainScroll} contentContainerStyle={[styles.scrollContent, { flexGrow: 1, paddingBottom: (insets.bottom || 0) + 32 }]}>
        
        {/* Top Greeting & Identity Section */}
        <View style={styles.greetingSection}>
          <View style={styles.greetingRow}>
            <View style={styles.greetingTextContainer}>
              <Text style={styles.greetingText}>Good morning, {studentName.split(' ')[0]} 👋</Text>
              <View style={styles.studentInfoRow}>
                <View style={styles.idBadge}>
                  <Text style={styles.idBadgeText}>{studentId}</Text>
                </View>
                <Text style={styles.courseText}>BS Computer Science</Text>
              </View>
            </View>
            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Semester Active</Text>
            </View>
          </View>

          {/* Explicit Campus Selector (as requested by Business Logic Hooks) */}
          <Pressable 
            style={styles.campusSelector}
            onPress={() => setShowCampusDropdown(true)}
          >
            <Text style={styles.campusSelectorText}>{activeCampus}</Text>
            <ChevronDown size={16} color="#800000" />
          </Pressable>
          
          {/* Campus Selector Dropdown Modal */}
          <Modal visible={showCampusDropdown} transparent animationType="fade">
            <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }} onPress={() => setShowCampusDropdown(false)}>
              <View style={{ backgroundColor: '#FFF', position: 'absolute', top: 180, left: 32, right: 32, borderRadius: 12, overflow: 'hidden', elevation: 10 }}>
                <View style={{ padding: 16, backgroundColor: '#800000' }}>
                  <Text style={{ fontFamily: 'Manrope_700Bold', color: '#FFF', fontSize: 16 }}>Select Campus</Text>
                </View>
                <Pressable 
                  style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' }} 
                  onPress={() => { setActiveCampus('TSU Main Campus'); setShowCampusDropdown(false); }}
                >
                  <Text style={{ fontFamily: 'Manrope_600SemiBold', fontSize: 15, color: activeCampus === 'TSU Main Campus' ? '#800000' : '#1B2336' }}>TSU Main Campus</Text>
                </Pressable>
                <Pressable 
                  style={{ padding: 16 }} 
                  onPress={() => { setActiveCampus('TSU Lucinda Campus'); setShowCampusDropdown(false); }}
                >
                  <Text style={{ fontFamily: 'Manrope_600SemiBold', fontSize: 15, color: activeCampus === 'TSU Lucinda Campus' ? '#800000' : '#1B2336' }}>TSU Lucinda Campus</Text>
                </Pressable>
              </View>
            </Pressable>
          </Modal>
        </View>

        {/* Quick E-Wallet & Billing Balance Card */}
        <View style={styles.ledgerCard}>
          <View style={styles.ledgerHeader}>
            <View>
              <Text style={styles.ledgerSubtitle}>Student Account Ledger</Text>
              <View style={styles.ledgerAmountRow}>
                <Text style={styles.ledgerAmount}>₱{balance.toFixed(2)}</Text>
                <Text style={styles.ledgerPeriod}>(Billed per sem)</Text>
              </View>
            </View>
            <Pressable style={styles.addFundsBtn}>
              <PlusCircle size={18} color="#FFFFFF" />
              <Text style={styles.addFundsText}>Add Funds</Text>
            </Pressable>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.walletScroll}>
            <View style={styles.walletPill}>
              <View style={[styles.walletDot, {backgroundColor: '#005CEE'}]} />
              <Text style={styles.walletLabel}>GCash</Text>
              <Text style={styles.walletBalance}>₱820.50</Text>
            </View>
            <View style={styles.walletPill}>
              <View style={[styles.walletDot, {backgroundColor: '#20B259'}]} />
              <Text style={styles.walletLabel}>Maya</Text>
              <Text style={styles.walletBalance}>₱350.00</Text>
            </View>
            <View style={[styles.walletPill, styles.idTapPill]}>
              <Text style={styles.idTapText}>TSU ID Tap Ready</Text>
            </View>
          </ScrollView>
        </View>

        {/* Interactive Active Live Status Tracker Carousel */}
        {activeTrackers.length > 0 && (
        <View style={styles.trackerSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Zap size={18} color="#800000" />
              <Text style={styles.sectionTitle}>Live Service Tracking</Text>
            </View>
            {activeTrackers.length > 1 && (
            <View style={styles.carouselControls}>
              <Pressable style={styles.carouselBtn} onPress={() => setTrackerIndex((prev) => (prev === 0 ? activeTrackers.length - 1 : prev - 1))}>
                <ChevronLeft size={14} color="#1B2336" />
              </Pressable>
              <Text style={styles.carouselIndex}>{(trackerIndex % activeTrackers.length) + 1}/{activeTrackers.length}</Text>
              <Pressable style={styles.carouselBtn} onPress={() => setTrackerIndex((prev) => (prev + 1) % activeTrackers.length)}>
                <ChevronRight size={14} color="#1B2336" />
              </Pressable>
            </View>
            )}
          </View>

          <View style={styles.carouselContainer}>
            {currentTracker?.type === 'shuttle' && (
              <View style={styles.trackerCardActive}>
                <View style={styles.trackerCardHeader}>
                  <View style={styles.trackerLiveBadge}>
                    <View style={styles.trackerLiveDot} />
                    <Text style={styles.trackerLiveText}>Live Shuttle Pass</Text>
                  </View>
                  <Text style={styles.trackerUnit}>{activePass?.unit.split(' ')[0]}</Text>
                </View>
                <View style={styles.trackerCardBody}>
                  <View style={styles.trackerCardInfo}>
                    <Text style={styles.trackerCardTitle}>{activePass?.origin.replace('TSU ', '')} → {activePass?.destination.replace('TSU ', '')}</Text>
                    <Text style={styles.trackerCardSubtitle}>{activePass?.seat} • {activePass?.lane}</Text>
                  </View>
                  <View style={styles.trackerCardTime}>
                    <Text style={styles.trackerCardTimeVal}>8m</Text>
                    <Text style={styles.trackerCardTimeLbl}>Departure</Text>
                  </View>
                </View>
                <Pressable style={styles.trackerCardFooter} onPress={() => router.push('/shuttle/ticket')}>
                  <View style={styles.trackerCardFooterRow}>
                    <QrCode size={16} color="#FFC632" />
                    <Text style={styles.trackerCardFooterText}>Tap to view boarding pass & QR</Text>
                  </View>
                  <ChevronRight size={18} color="#FFC632" />
                </Pressable>
              </View>
            )}
            
            {currentTracker?.type === 'canteen' && (
              <View style={styles.trackerCardSecondary}>
                <View style={styles.trackerCardHeader}>
                  <View style={[styles.trackerPrepBadge, canteenOrder?.status === 'Ready for Pickup' && { backgroundColor: '#ECFDF5', borderColor: '#A7F3D0' }]}>
                    <View style={[styles.trackerPrepDot, canteenOrder?.status === 'Ready for Pickup' && { backgroundColor: '#10B981' }]} />
                    <Text style={[styles.trackerPrepText, canteenOrder?.status === 'Ready for Pickup' && { color: '#065F46' }]}>{canteenOrder?.status}</Text>
                  </View>
                  <Text style={styles.trackerOrder}>Order {canteenOrder?.orderId}</Text>
                </View>
                <View style={styles.trackerCardBody}>
                  <View style={styles.trackerCardInfo}>
                    <Text style={styles.trackerCardTitleDark} numberOfLines={1}>{canteenOrder?.stall}</Text>
                    <Text style={styles.trackerCardSubtitleDark} numberOfLines={1}>{canteenOrder?.items.map(i => i.name).join(', ')}</Text>
                  </View>
                  <View style={styles.trackerCardTime}>
                    <Text style={styles.trackerCardTimeValDark}>{canteenOrder?.status === 'Ready for Pickup' ? '0m' : '12m'}</Text>
                    <Text style={styles.trackerCardTimeLblDark}>Est. Pickup</Text>
                  </View>
                </View>
                <Pressable style={styles.trackerCardFooterSecondary} onPress={() => router.push('/canteen/tracker')}>
                  <View style={styles.trackerCardFooterRow}>
                    <Utensils size={16} color="#800000" />
                    <Text style={styles.trackerCardFooterTextDark}>Present token at window counter</Text>
                  </View>
                  <ChevronRight size={18} color="#7A7A7A" />
                </Pressable>
              </View>
            )}
          </View>
        </View>
        )}

        {/* 4 Core Service Action Cards Grid (2x2 Tactile Cards) */}
        <View style={styles.servicesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Express Campus Services</Text>
            <Text style={styles.tapToBook}>Tap to Book</Text>
          </View>

          <View style={styles.grid}>
            <Pressable style={styles.gridCard} onPress={() => router.push('/shuttle')}>
              <View style={styles.gridCardInner}>
                <View style={styles.gridCardHeader}>
                  <View style={[styles.gridIconBox, { backgroundColor: '#fce8e6' }]}>
                    <Bus size={20} color="#800000" />
                  </View>
                </View>
                <View style={styles.gridCardText}>
                  <Text style={styles.gridCardTitle}>Campus Shuttle</Text>
                  <Text style={styles.gridCardDesc} numberOfLines={2}>Main Campus ↔ Lucinda Campus corridor & seats.</Text>
                </View>
              </View>
              <View style={styles.gridCardFooter}>
                <Text style={styles.gridCardFooterText}>₱25 Fixed</Text>
                <ChevronRight size={16} color="#7A7A7A" />
              </View>
            </Pressable>

            <Pressable style={styles.gridCard} onPress={() => router.push('/canteen')}>
              <View style={styles.gridCardInner}>
                <View style={styles.gridCardHeader}>
                  <View style={[styles.gridIconBox, { backgroundColor: '#fef3c7' }]}>
                    <Utensils size={20} color="#92400e" />
                  </View>
                  <View style={[styles.gridLiveBadge, { backgroundColor: '#fffbeb', borderColor: '#fde68a' }]}>
                    <Text style={[styles.gridLiveBadgeText, { color: '#92400e' }]}>14 Stalls</Text>
                  </View>
                </View>
                <View style={styles.gridCardText}>
                  <Text style={styles.gridCardTitle}>Canteen Pre-Order</Text>
                  <Text style={styles.gridCardDesc} numberOfLines={2}>TSU Main & Lucinda meals with express claim.</Text>
                </View>
              </View>
              <View style={styles.gridCardFooter}>
                <Text style={styles.gridCardFooterTextDark}>Express Claim</Text>
                <ChevronRight size={16} color="#7A7A7A" />
              </View>
            </Pressable>

            <Pressable style={styles.gridCard} onPress={() => router.push('/print')}>
              <View style={styles.gridCardInner}>
                <View style={styles.gridCardHeader}>
                  <View style={[styles.gridIconBox, { backgroundColor: '#fce8e6' }]}>
                    <Printer size={20} color="#800000" />
                  </View>
                  <View style={[styles.gridLiveBadge, { backgroundColor: '#fce8e6', borderColor: 'transparent' }]}>
                    <Text style={[styles.gridLiveBadgeText, { color: '#800000' }]}>3 Hubs</Text>
                  </View>
                </View>
                <View style={styles.gridCardText}>
                  <Text style={styles.gridCardTitle}>Print Hub</Text>
                  <Text style={styles.gridCardDesc} numberOfLines={2}>Verified partner print shops around campuses.</Text>
                </View>
              </View>
              <View style={styles.gridCardFooter}>
                <Text style={styles.gridCardFooterTextDark}>No Walk-in Wait</Text>
                <ChevronRight size={16} color="#7A7A7A" />
              </View>
            </Pressable>

            <Pressable style={styles.gridCard} onPress={() => router.push('/merch')}>
              <View style={styles.gridCardInner}>
                <View style={styles.gridCardHeader}>
                  <View style={[styles.gridIconBox, { backgroundColor: '#fef3c7' }]}>
                    <ShoppingBag size={20} color="#800000" />
                  </View>
                  <View style={[styles.gridLiveBadge, { backgroundColor: '#fff1f2', borderColor: '#fecdd3' }]}>
                    <Text style={[styles.gridLiveBadgeText, { color: '#be123c' }]}>Batch 2</Text>
                  </View>
                </View>
                <View style={styles.gridCardText}>
                  <Text style={styles.gridCardTitle}>Dept Merch</Text>
                  <Text style={styles.gridCardDesc} numberOfLines={2}>TSU College & Org gear. JPIA, JFINEX, YES.</Text>
                </View>
              </View>
              <View style={styles.gridCardFooter}>
                <Text style={styles.gridCardFooterTextDark}>Campus Pickup</Text>
                <ChevronRight size={16} color="#7A7A7A" />
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F5F7',
  },
  appBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoPlaceholder: {
    width: 36,
    height: 36,
    backgroundColor: '#800000',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#FFFFFF',
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 14,
  },
  headerTitle: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 20,
    color: '#1B2336',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: 'transparent',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DC2626',
  },
  profileButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'rgba(128,0,0,0.2)',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  mainScroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
    gap: 16,
  },
  greetingSection: {
    gap: 8,
  },
  greetingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greetingTextContainer: {
    flex: 1,
  },
  greetingText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 16,
    color: '#1B2336',
  },
  studentInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  idBadge: {
    backgroundColor: '#fce8e6',
    borderWidth: 1,
    borderColor: '#f9c7c2',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  idBadgeText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 12,
    color: '#800000',
    textTransform: 'uppercase',
  },
  courseText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: '#444651',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#a7f3d0',
    paddingHorizontal: 12,
    height: 28,
    borderRadius: 14,
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  statusText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 12,
    color: '#065f46',
  },
  campusSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  campusSelectorText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 13,
    color: '#800000',
  },
  ledgerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  ledgerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ledgerSubtitle: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: '#444651',
  },
  ledgerAmountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    marginTop: 2,
  },
  ledgerAmount: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 22,
    color: '#1B2336',
  },
  ledgerPeriod: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: '#444651',
  },
  addFundsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#800000',
    paddingHorizontal: 16,
    height: 48,
    borderRadius: 12,
    gap: 6,
  },
  addFundsText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  walletScroll: {
    marginTop: 12,
    flexDirection: 'row',
  },
  walletPill: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 28,
    paddingHorizontal: 10,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginRight: 8,
    gap: 6,
  },
  walletDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  walletLabel: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: '#1B2336',
  },
  walletBalance: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 12,
    color: '#444651',
  },
  idTapPill: {
    backgroundColor: '#fffbeb',
    borderColor: '#fde68a',
  },
  idTapText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 12,
    color: '#92400e',
  },
  trackerSection: {
    gap: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionTitle: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 16,
    color: '#1B2336',
  },
  carouselControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  carouselBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#eaedff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselIndex: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 12,
    color: '#757682',
  },
  carouselContainer: {
    width: '100%',
  },
  trackerCardActive: {
    backgroundColor: '#800000',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  trackerCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trackerLiveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFC632',
    paddingHorizontal: 10,
    height: 28,
    borderRadius: 14,
    gap: 6,
  },
  trackerLiveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#800000',
  },
  trackerLiveText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 12,
    color: '#410000',
  },
  trackerUnit: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 12,
    color: '#FFFFFF',
    borderColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  trackerCardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 12,
  },
  trackerCardInfo: {
    flex: 1,
    paddingRight: 8,
  },
  trackerCardTitle: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  trackerCardSubtitle: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 2,
  },
  trackerCardTime: {
    alignItems: 'flex-end',
  },
  trackerCardTimeVal: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 24,
    color: '#FFC632',
  },
  trackerCardTimeLbl: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  trackerCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.25)',
    marginHorizontal: -16,
    marginBottom: -16,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  trackerCardFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  trackerCardFooterText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: '#FFFFFF',
  },
  
  trackerCardSecondary: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  trackerPrepBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    borderWidth: 1,
    borderColor: '#fcd34d',
    paddingHorizontal: 10,
    height: 28,
    borderRadius: 14,
    gap: 6,
  },
  trackerPrepDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#d97706',
  },
  trackerPrepText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 12,
    color: '#78350f',
  },
  trackerOrder: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 12,
    color: '#444651',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  trackerCardTitleDark: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 14,
    color: '#1B2336',
  },
  trackerCardSubtitleDark: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: '#444651',
    marginTop: 2,
  },
  trackerCardTimeValDark: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 24,
    color: '#d97706',
  },
  trackerCardTimeLblDark: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: '#444651',
  },
  trackerCardFooterSecondary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    marginHorizontal: -16,
    marginBottom: -16,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  trackerCardFooterTextDark: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: '#444651',
  },

  servicesSection: {
    gap: 8,
  },
  tapToBook: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 12,
    color: '#800000',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
  gridCard: {
    width: '48%',
    height: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  gridCardInner: {
    padding: 14,
  },
  gridCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  gridIconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridLiveBadge: {
    height: 24,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#a7f3d0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridLiveBadgeText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 12,
    color: '#065f46',
  },
  gridCardText: {
    gap: 2,
    flexShrink: 1,
  },
  gridCardTitle: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 14,
    color: '#1B2336',
  },
  gridCardDesc: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: '#444651',
    flexShrink: 1,
  },
  gridCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: '#F1F5F9',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  gridCardFooterText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 12,
    color: '#800000',
  },
  gridCardFooterTextDark: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 12,
    color: '#444651',
  },
});

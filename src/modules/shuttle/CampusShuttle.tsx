import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useDemo } from '../../context/DemoContext';
import { 
  Bell, 
  Bus, 
  CheckCircle2,
  Clock, 
  CreditCard,
  Info,
  MapPin,
  QrCode,
  ShieldCheck,
  X,
  Zap
} from 'lucide-react-native';

export default function CampusShuttle() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { bookShuttle, balance } = useDemo();
  const [origin, setOrigin] = useState<'TSU Main Campus' | 'TSU Lucinda Campus'>('TSU Main Campus');
  const [paymentMethod, setPaymentMethod] = useState<'student-portal' | 'gcash' | 'maya'>('student-portal');
  const [showQR, setShowQR] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState<string>('Seat #01');

  const handleBook = () => {
    if (balance < 25) {
      Alert.alert('Insufficient Balance', 'Insufficient Ledger Balance');
      return;
    }
    setIsBooking(true);
    setTimeout(() => {
      const destination = origin === 'TSU Main Campus' ? 'TSU Lucinda Campus' : 'TSU Main Campus';
      bookShuttle(origin, destination, 'Unit #04 (Campus Loop Express)', selectedSeat);
      setIsBooking(false);
      router.push('/shuttle/ticket');
    }, 800);
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {/* Header App Bar */}
      <View style={[styles.appBar, { paddingTop: insets.top || 8, height: 56 + (insets.top || 8) }]}>
        <View style={styles.headerLeft}>
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAot_ZOzjMN9c53XW5WOpsYiU-Knn3WpKMyQbhajfY5CQO29V7BSuQ30TYJ5tEjZLa8GuttXHHiQ-VMsSia4K-tTnThZ6Db_C8dDHpI9mtT2pkBdlxlV-lnORkBcoGaeXcQvv1npi2ZmL_pJ6VRBelVJf9RbEyHFItihXOtY4uL_nRVATwMjDj9fQmMtq_LYNGGrRv0jbJPShRcO8bS7j-dDGXzMGDryW4A6Yrc9dx-BLEP4SXYb8vg60iwScPpXmp6MjI' }} 
            style={styles.logoImage} 
          />
          <View style={styles.headerTitles}>
            <Text style={styles.headerSubtitle}>Tarlac State University</Text>
            <Text style={styles.headerTitle}>University Portal</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <Pressable style={styles.iconButton}>
            <Bell size={22} color="#5a413d" />
            <View style={styles.notificationDot} />
          </Pressable>
          <Pressable style={styles.profileButton}>
            <Image 
              source={{ uri: 'https://i.pravatar.cc/100?img=1' }} 
              style={styles.profileImage} 
            />
          </Pressable>
        </View>
      </View>

      <ScrollView style={styles.mainScroll} contentContainerStyle={[styles.scrollContent, { flexGrow: 1, paddingBottom: (insets.bottom || 0) + 32 }]}>
        
        {/* Page Title Section */}
        <View style={styles.pageTitleSection}>
          <View style={styles.pageTitleRow}>
            <View style={styles.pageTitleLeft}>
              <Bus size={26} color="#800000" />
              <Text style={styles.pageTitleText}>Campus Shuttle</Text>
            </View>
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveBadgeText}>GPS TRACKING LIVE</Text>
            </View>
          </View>
          <Text style={styles.pageDesc}>Priority express boarding & real-time loop manifests</Text>
        </View>

        {/* Info Box */}
        <View style={styles.infoCard}>
          <ShieldCheck size={20} color="#800000" style={{ marginTop: 2 }} />
          <View style={styles.infoCardContent}>
            <View style={styles.infoTagsRow}>
              <Text style={styles.infoFareText}>Fixed Fare: ₱25.00 PHP per ride</Text>
              <View style={styles.cashlessBadge}>
                <Text style={styles.cashlessText}>Cashless Only</Text>
              </View>
            </View>
            <Text style={styles.infoDescText}>
              Cashless reservations prevent no-shows. Non-Refundable confirmed pass valid exclusively for assigned shuttle time slot.
            </Text>
          </View>
        </View>

        {/* Express Boarding Pass */}
        <View style={styles.passCard}>
          <View style={styles.passCardHeader}>
            <View style={styles.passCardHeaderLeft}>
              <View style={styles.ticketIconBox}>
                <QrCode size={20} color="#FFC632" />
              </View>
              <View>
                <View style={styles.passTitleRow}>
                  <Text style={styles.passTitleText}>Express Boarding Pass</Text>
                  <View style={styles.priorityBadge}>
                    <Text style={styles.priorityText}>Priority Boarding</Text>
                  </View>
                </View>
                <Text style={styles.passSubtitleText}>Unit #04 • Campus Loop Express</Text>
              </View>
            </View>
            <View style={styles.passCardHeaderRight}>
              <Text style={styles.farePaidLbl}>Fare Paid</Text>
              <Text style={styles.farePaidVal}>₱25.00</Text>
            </View>
          </View>

          <View style={styles.dualLaneBox}>
            <View style={styles.dualLaneLeft}>
              <CheckCircle2 size={18} color="#FFC632" />
              <Text style={styles.dualLaneLbl}>Dual-Lane Processing:</Text>
            </View>
            <View style={styles.dualLaneRight}>
              <View style={styles.laneABadge}>
                <Text style={styles.laneAText}>Lane A (Online Pass)</Text>
              </View>
              <Text style={styles.laneVsText}>vs</Text>
              <Text style={styles.laneBText}>Lane B (Walk-ins)</Text>
            </View>
          </View>

          <View style={styles.passFooter}>
            <View style={styles.passFooterLeft}>
              <View style={styles.passTimeRow}>
                <Clock size={18} color="#FFC632" />
                <Text style={styles.passTimeText}>Departs in 06m 40s</Text>
              </View>
              <Text style={styles.passSeatText}>
                Seat: <Text style={{fontWeight: '600', color: '#FFFFFF'}}>Seat #12 (Window)</Text> • Gate 3 Bay A
              </Text>
            </View>
            <Pressable style={styles.showQrBtn} onPress={() => setShowQR(true)}>
              <QrCode size={20} color="#800000" />
              <Text style={styles.showQrText}>Show QR</Text>
            </Pressable>
          </View>

          {/* Hidden QR Sheet */}
          {showQR && (
            <View style={styles.qrSheet}>
              <View style={styles.qrSheetHeader}>
                <View style={styles.qrSheetTitleRow}>
                  <CheckCircle2 size={18} color="#10B981" />
                  <Text style={styles.qrSheetTitle}>Valid for Turnstile Tap</Text>
                </View>
                <Pressable onPress={() => setShowQR(false)}>
                  <X size={18} color="#8e706c" />
                </Pressable>
              </View>
              <View style={styles.qrCodeBox}>
                <QrCode size={120} color="#800000" />
                <Text style={styles.qrCodeId}>TSU-SHUTTLE-04-A12</Text>
              </View>
              <Text style={styles.qrCodeDesc}>Scan at the Lane A turnstile optical scanner before boarding</Text>
            </View>
          )}
        </View>

        {/* Live Shuttle Scheduler */}
        <View style={styles.schedulerSection}>
          <View style={styles.schedulerHeader}>
            <Text style={styles.schedulerTitle}>Live Shuttle Scheduler</Text>
            <View style={styles.syncBox}>
              <Zap size={16} color="#800000" />
              <Text style={styles.syncText}>Auto-sync 15s</Text>
            </View>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.routeTabsScroll}>
            <Pressable 
              style={[styles.routeTab, origin === 'TSU Main Campus' && styles.routeTabActive]}
              onPress={() => setOrigin('TSU Main Campus')}
            >
              <Text style={[styles.routeTabText, origin === 'TSU Main Campus' && styles.routeTabTextActive]}>Main ↔ Lucinda</Text>
            </Pressable>
            <Pressable 
              style={[styles.routeTab, origin === 'TSU Lucinda Campus' && styles.routeTabActive]}
              onPress={() => setOrigin('TSU Lucinda Campus')}
            >
              <Text style={[styles.routeTabText, origin === 'TSU Lucinda Campus' && styles.routeTabTextActive]}>Lucinda ↔ Main</Text>
            </Pressable>
          </ScrollView>
        </View>

        {/* Live Units List */}
        <View style={styles.unitsList}>
          {/* Unit 07 */}
          <View style={styles.unitCard}>
            <View style={styles.unitHeader}>
              <View style={styles.unitHeaderLeft}>
                <View style={styles.unitIconBox1}>
                  <Zap size={24} color="#800000" />
                </View>
                <View>
                  <View style={styles.unitTitleRow}>
                    <Text style={styles.unitTitle}>Unit #07</Text>
                    <View style={styles.unitSeatsLive}>
                      <View style={styles.unitLiveDot} />
                      <Text style={styles.unitSeatsLiveText}>6 / 24 seats left</Text>
                    </View>
                  </View>
                  <Text style={styles.unitDesc}>Electric Campus Tram</Text>
                </View>
              </View>
              <View style={styles.unitHeaderRight}>
                <Text style={styles.unitEtaVal}>4 mins</Text>
                <Text style={styles.unitEtaLbl}>ETA Arrival</Text>
              </View>
            </View>
            <View style={styles.unitLocBox}>
              <View style={styles.unitLocLeft}>
                <MapPin size={16} color="#800000" />
                <Text style={styles.unitLocText}>Main Student Center</Text>
              </View>
              <Text style={styles.unitEtdText}>ETD: <Text style={{fontWeight: '700', color: '#222222'}}>10:15 AM</Text></Text>
            </View>
            <View style={styles.unitProgressRow}>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: '75%', backgroundColor: '#800000' }]} />
              </View>
              <Text style={styles.progressText}>75% Full</Text>
            </View>
          </View>

          {/* Unit 12 */}
          <View style={styles.unitCard}>
            <View style={styles.unitHeader}>
              <View style={styles.unitHeaderLeft}>
                <View style={styles.unitIconBox2}>
                  <Bus size={24} color="#800000" />
                </View>
                <View>
                  <View style={styles.unitTitleRow}>
                    <Text style={styles.unitTitle}>Unit #12</Text>
                    <View style={styles.unitSeatsWarn}>
                      <Text style={styles.unitSeatsWarnText}>18 / 30 seats left</Text>
                    </View>
                  </View>
                  <Text style={styles.unitDesc}>Coaster Bus</Text>
                </View>
              </View>
              <View style={styles.unitHeaderRight}>
                <Text style={styles.unitEtaVal}>12 mins</Text>
                <Text style={styles.unitEtaLbl}>ETA Arrival</Text>
              </View>
            </View>
            <View style={styles.unitLocBox}>
              <View style={styles.unitLocLeft}>
                <MapPin size={16} color="#800000" />
                <Text style={styles.unitLocText}>Science & Tech Complex</Text>
              </View>
              <Text style={styles.unitEtdText}>ETD: <Text style={{fontWeight: '700', color: '#222222'}}>10:25 AM</Text></Text>
            </View>
            <View style={styles.unitProgressRow}>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: '40%', backgroundColor: '#FFC632' }]} />
              </View>
              <Text style={styles.progressText}>40% Full</Text>
            </View>
          </View>
        </View>

        {/* Booking Section */}
        <View style={styles.bookingCard}>
          <View style={styles.bookingHeader}>
            <View style={styles.bookingHeaderLeft}>
              <View style={styles.bookingIconBox}>
                <CreditCard size={18} color="#800000" />
              </View>
              <Text style={styles.bookingTitle}>Book Next Ride</Text>
            </View>
            <View style={styles.bookingFareBox}>
              <Text style={styles.bookingFareLbl}>Selected Fare:</Text>
              <Text style={styles.bookingFareVal}>₱25.00</Text>
            </View>
          </View>
          
          <View style={styles.bookingWarningBox}>
            <Info size={18} color="#92400e" />
            <Text style={styles.bookingWarningText}>
              Cash payment disabled for online reservations to eliminate no-show hold rates.
            </Text>
          </View>

          <Text style={styles.methodTitle}>SELECT SEAT</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
            {Array.from({ length: 24 }).map((_, i) => {
              const seatNum = `Seat #${String(i + 1).padStart(2, '0')}`;
              const isSelected = selectedSeat === seatNum;
              return (
                <Pressable
                  key={seatNum}
                  style={[
                    {
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderWidth: 1,
                      borderColor: '#E2E5EB',
                      borderRadius: 8,
                      marginRight: 8,
                      backgroundColor: '#FFFFFF',
                    },
                    isSelected && { backgroundColor: '#FFFBEB', borderColor: '#FFC632' }
                  ]}
                  onPress={() => setSelectedSeat(seatNum)}
                >
                  <Text style={[
                    { fontFamily: 'Manrope_600SemiBold', fontSize: 12, color: '#1B2336' },
                    isSelected && { color: '#785a00', fontFamily: 'Manrope_700Bold' }
                  ]}>
                    {seatNum}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          <Text style={styles.methodTitle}>SELECT CASHLESS METHOD</Text>

          <View style={styles.methodsList}>
            <Pressable 
              style={[styles.methodCard, paymentMethod === 'student-portal' && styles.methodCardActive]}
              onPress={() => setPaymentMethod('student-portal')}
            >
              <View style={styles.methodCardLeft}>
                <View style={[styles.radioOuter, paymentMethod === 'student-portal' && styles.radioOuterActive]}>
                  {paymentMethod === 'student-portal' && <View style={styles.radioInner} />}
                </View>
                <View>
                  <Text style={styles.methodCardTitle}>Student Account / Portal</Text>
                  <Text style={styles.methodCardDesc}>End-of-Semester Billing ledger</Text>
                </View>
              </View>
              <View style={styles.instantBadge}>
                <Text style={styles.instantText}>Instant</Text>
              </View>
            </Pressable>

            <Pressable 
              style={[styles.methodCard, paymentMethod === 'gcash' && styles.methodCardActive]}
              onPress={() => setPaymentMethod('gcash')}
            >
              <View style={styles.methodCardLeft}>
                <View style={[styles.radioOuter, paymentMethod === 'gcash' && styles.radioOuterActive]}>
                  {paymentMethod === 'gcash' && <View style={styles.radioInner} />}
                </View>
                <View style={styles.ewalletRow}>
                  <View style={[styles.ewalletDot, {backgroundColor: '#005CEE'}]} />
                  <Text style={styles.methodCardTitle}>GCash E-Wallet</Text>
                </View>
              </View>
              <Text style={styles.linkedText}>Linked</Text>
            </Pressable>

            <Pressable 
              style={[styles.methodCard, paymentMethod === 'maya' && styles.methodCardActive]}
              onPress={() => setPaymentMethod('maya')}
            >
              <View style={styles.methodCardLeft}>
                <View style={[styles.radioOuter, paymentMethod === 'maya' && styles.radioOuterActive]}>
                  {paymentMethod === 'maya' && <View style={styles.radioInner} />}
                </View>
                <View style={styles.ewalletRow}>
                  <View style={[styles.ewalletDot, {backgroundColor: '#20B259'}]} />
                  <Text style={styles.methodCardTitle}>Maya E-Wallet</Text>
                </View>
              </View>
              <Text style={styles.linkedText}>Linked</Text>
            </Pressable>
          </View>

          <Pressable style={styles.confirmBtn} onPress={handleBook}>
            <Zap size={20} color="#FFC632" />
            <Text style={styles.confirmBtnText}>
              {isBooking ? 'Securing Seat Allocation...' : 'Confirm & Generate Instant Boarding Pass (₱25)'}
            </Text>
          </Pressable>
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
    borderBottomColor: '#E2E5EB',
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
  logoImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerTitles: {
    flexDirection: 'column',
  },
  headerSubtitle: {
    color: '#800000',
    fontFamily: 'Manrope_700Bold',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 16,
    color: '#1B2336',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    backgroundColor: 'transparent',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ba1a1a',
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#FFC632',
  },
  mainScroll: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 16,
    paddingBottom: 40,
  },
  pageTitleSection: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  pageTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pageTitleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pageTitleText: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 26,
    color: '#1B2336',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: 'rgba(255, 198, 50, 0.4)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    gap: 6,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFC632',
  },
  liveBadgeText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 11,
    color: '#785a00',
  },
  pageDesc: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 13,
    color: '#5a413d',
    marginTop: 2,
  },
  infoCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E5EB',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    gap: 10,
  },
  infoCardContent: {
    flex: 1,
  },
  infoTagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  infoFareText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 13,
    color: '#800000',
  },
  cashlessBadge: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 198, 50, 0.3)',
  },
  cashlessText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 11,
    color: '#451a03',
  },
  infoDescText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: '#5a413d',
    marginTop: 4,
    lineHeight: 18,
  },
  passCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#800000',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  passCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    paddingBottom: 12,
  },
  passCardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ticketIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  passTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  passTitleText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 17,
    color: '#FFFFFF',
  },
  priorityBadge: {
    backgroundColor: '#FFC632',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  priorityText: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 11,
    color: '#451a03',
  },
  passSubtitleText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: '#ffdad4',
  },
  passCardHeaderRight: {
    alignItems: 'flex-end',
  },
  farePaidLbl: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 10,
    color: '#ffb4a8',
    textTransform: 'uppercase',
  },
  farePaidVal: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  dualLaneBox: {
    marginTop: 12,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  dualLaneLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dualLaneLbl: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 11,
    color: '#ffdad4',
    textTransform: 'uppercase',
  },
  dualLaneRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  laneABadge: {
    backgroundColor: '#FFC632',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  laneAText: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 11,
    color: '#451a03',
  },
  laneVsText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 11,
    color: '#ffb4a8',
  },
  laneBText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
  },
  passFooter: {
    marginTop: 12,
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  passFooterLeft: {
    gap: 2,
  },
  passTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  passTimeText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 15,
    color: '#FFC632',
  },
  passSeatText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: '#ffb4a8',
  },
  showQrBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  showQrText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 12,
    color: '#800000',
  },
  qrSheet: {
    marginTop: 16,
    paddingTop: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  qrSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  qrSheetTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  qrSheetTitle: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 15,
    color: '#1B2336',
  },
  qrCodeBox: {
    backgroundColor: '#F4F5F7',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E5EB',
  },
  qrCodeId: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 11,
    color: '#5a413d',
    marginTop: 8,
    letterSpacing: 1,
  },
  qrCodeDesc: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: '#5a413d',
    textAlign: 'center',
    marginTop: 8,
  },
  schedulerSection: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  schedulerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  schedulerTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 20,
    color: '#1B2336',
  },
  syncBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  syncText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: '#5a413d',
  },
  routeTabsScroll: {
    flexDirection: 'row',
  },
  routeTab: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E5EB',
    marginRight: 8,
  },
  routeTabActive: {
    backgroundColor: '#800000',
    borderColor: '#800000',
  },
  routeTabText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 12,
    color: '#5a413d',
  },
  routeTabTextActive: {
    color: '#FFFFFF',
    fontFamily: 'Manrope_700Bold',
  },
  unitsList: {
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 24,
  },
  unitCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E5EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  unitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  unitHeaderLeft: {
    flexDirection: 'row',
    gap: 10,
  },
  unitIconBox1: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#fffbeb',
    borderWidth: 1,
    borderColor: 'rgba(255, 198, 50, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unitIconBox2: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#f0eded',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unitTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  unitTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 18,
    color: '#1B2336',
  },
  unitSeatsLive: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#a7f3d0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    gap: 4,
  },
  unitLiveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  unitSeatsLiveText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 11,
    color: '#065f46',
  },
  unitSeatsWarn: {
    backgroundColor: '#fffbeb',
    borderWidth: 1,
    borderColor: 'rgba(255, 198, 50, 0.4)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  unitSeatsWarnText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 11,
    color: '#785a00',
  },
  unitDesc: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: '#5a413d',
  },
  unitHeaderRight: {
    alignItems: 'flex-end',
  },
  unitEtaVal: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 17,
    color: '#800000',
  },
  unitEtaLbl: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 11,
    color: '#8e706c',
  },
  unitLocBox: {
    marginTop: 12,
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F4F5F7',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(226, 229, 235, 0.8)',
  },
  unitLocLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  unitLocText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 12,
    color: '#222222',
  },
  unitEtdText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: '#5a413d',
  },
  unitProgressRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressBarBg: {
    flex: 1,
    height: 6,
    backgroundColor: '#f0eded',
    borderRadius: 3,
    marginRight: 12,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 11,
    color: '#5a413d',
  },
  bookingCard: {
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E5EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  bookingHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bookingIconBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#fffbeb',
    borderWidth: 1,
    borderColor: 'rgba(255, 198, 50, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookingTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 18,
    color: '#1B2336',
  },
  bookingFareBox: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  bookingFareLbl: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: '#8e706c',
  },
  bookingFareVal: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 18,
    color: '#800000',
  },
  bookingWarningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 198, 50, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 198, 50, 0.4)',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  bookingWarningText: {
    flex: 1,
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: '#785a00',
    lineHeight: 16,
  },
  methodTitle: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 11,
    color: '#8e706c',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  methodsList: {
    gap: 8,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#F4F5F7',
    borderWidth: 1,
    borderColor: '#E2E5EB',
  },
  methodCardActive: {
    backgroundColor: 'rgba(255, 198, 50, 0.15)',
    borderColor: 'rgba(255, 198, 50, 0.6)',
  },
  methodCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  radioOuter: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#8e706c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterActive: {
    borderColor: '#800000',
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#800000',
  },
  methodCardTitle: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 14,
    color: '#1B2336',
  },
  methodCardDesc: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: '#5a413d',
  },
  ewalletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ewalletDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  instantBadge: {
    backgroundColor: '#FFC632',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  instantText: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 11,
    color: '#451a03',
  },
  linkedText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 12,
    color: '#8e706c',
  },
  confirmBtn: {
    marginTop: 16,
    backgroundColor: '#800000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  confirmBtnText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 16,
    color: '#FFFFFF',
  }
});

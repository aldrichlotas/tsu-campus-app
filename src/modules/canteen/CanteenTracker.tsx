import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useDemo } from '../../context/DemoContext';
import { 
  ArrowLeft, 
  Check, 
  RefreshCw,
  ShoppingBag,
  QrCode,
  ChevronDown,
  ChevronUp,
  Receipt,
  PhoneCall,
  Clock,
  Store,
  MapPin
} from 'lucide-react-native';

export default function CanteenTracker() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { canteenOrder } = useDemo();
  const [summaryOpen, setSummaryOpen] = useState(true);

  if (!canteenOrder) {
    return (
      <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
        <Text style={{ fontFamily: 'Manrope_600SemiBold', color: '#1B2336' }}>No active canteen order found.</Text>
        <Pressable style={[styles.homeBtn, { marginTop: 16, paddingHorizontal: 24 }]} onPress={() => router.push('/')}>
          <Text style={styles.homeBtnText}>Back to Hub</Text>
        </Pressable>
      </View>
    );
  }

  const { status, orderId, stall, campus, items, total, paymentMode } = canteenOrder;
  
  const isOrderSent = status === 'Order Sent' || status === 'Preparing' || status === 'Ready for Pickup';
  const isPreparing = status === 'Preparing' || status === 'Ready for Pickup';
  const isReady = status === 'Ready for Pickup';

  return (
    <View style={styles.container}>
      {/* Top App Bar (Dynamic Padding) */}
      <View style={[styles.appBar, { paddingTop: insets.top || 8, height: 56 + (insets.top || 8) }]}>
        <View style={styles.appBarLeft}>
          <Pressable style={styles.backBtn} onPress={() => router.push('/canteen')}>
            <ArrowLeft size={24} color="#1B2336" />
          </Pressable>
          <Text style={styles.appBarTitle}>Live Order Tracker</Text>
        </View>
        <View style={styles.statusPill}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>{status.toUpperCase()}</Text>
        </View>
      </View>

      <ScrollView style={styles.mainScroll} contentContainerStyle={[styles.scrollContent, { flexGrow: 1, paddingBottom: (insets.bottom || 0) + 32 }]}>
        
        {/* Order Queue & Pickup QR Card */}
        <View style={styles.qrCard}>
          <View style={styles.qrHeader}>
            <View style={styles.qrHeaderLeft}>
              <Text style={styles.queueLbl}>Order Queue Number</Text>
              <Text style={styles.queueVal}>{orderId}</Text>
            </View>
            <View style={styles.expressBadge}>
              <Text style={styles.expressText}>Express Lane Pickup</Text>
            </View>
          </View>

          <View style={styles.qrBox}>
            <QrCode size={160} color="#1B2336" />
            <Text style={styles.scanText}>Present this QR code at the stall counter</Text>
            <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 10, color: '#7A7A7A', marginTop: 8, letterSpacing: 1 }}>{orderId}</Text>
          </View>

          <View style={styles.locCard}>
            <View style={styles.locRow}>
              <MapPin size={16} color="#800000" />
              <Text style={styles.locText}>{campus}</Text>
            </View>
            <View style={styles.locRow}>
              <Store size={16} color="#7A7A7A" />
              <Text style={styles.locTextMuted}>Stall: {stall}</Text>
            </View>
          </View>
        </View>

        {/* Real-Time Status Pipeline */}
        <View style={styles.pipelineCard}>
          <View style={styles.pipelineHeader}>
            <Clock size={20} color="#FFC632" />
            <Text style={styles.etaText}>{isReady ? 'Ready for Pickup!' : 'Est. ready in 8-12 mins'}</Text>
          </View>

          <View style={styles.stepperContainer}>
            {/* Step 1: Order Sent */}
            <View style={styles.stepBox}>
              <View style={[styles.stepIcon, isPreparing ? styles.stepCompleted : styles.stepActive]}>
                {isPreparing ? <Check size={16} color="#FFFFFF" /> : <RefreshCw size={16} color="#800000" />}
              </View>
              <Text style={isPreparing ? styles.stepLabelCompleted : styles.stepLabelActive}>Order Sent</Text>
            </View>
            <View style={[styles.stepLine, isPreparing ? styles.lineCompleted : styles.linePending]} />

            {/* Step 2: Preparing */}
            <View style={styles.stepBox}>
              <View style={[styles.stepIcon, !isPreparing ? styles.stepPending : isReady ? styles.stepCompleted : styles.stepActive]}>
                {isReady ? <Check size={16} color="#FFFFFF" /> : isPreparing ? <RefreshCw size={16} color="#800000" /> : <ShoppingBag size={16} color="#7A7A7A" />}
              </View>
              <Text style={!isPreparing ? styles.stepLabelPending : isReady ? styles.stepLabelCompleted : styles.stepLabelActive}>Preparing</Text>
            </View>
            <View style={[styles.stepLine, isReady ? styles.lineCompleted : styles.linePending]} />

            {/* Step 3: Ready for Pickup */}
            <View style={styles.stepBox}>
              <View style={[styles.stepIcon, isReady ? styles.stepActive : styles.stepPending]}>
                {isReady ? <Check size={16} color="#800000" /> : <ShoppingBag size={16} color="#7A7A7A" />}
              </View>
              <Text style={isReady ? styles.stepLabelActive : styles.stepLabelPending}>Ready for Pickup</Text>
            </View>
          </View>
        </View>

        {/* Order Summary & Payment Mode */}
        <View style={styles.summaryCard}>
          <Pressable style={styles.summaryHeader} onPress={() => setSummaryOpen(!summaryOpen)}>
            <View style={styles.summaryHeaderLeft}>
              <Receipt size={18} color="#800000" />
              <Text style={styles.summaryTitle}>Order Summary</Text>
            </View>
            {summaryOpen ? <ChevronUp size={20} color="#7A7A7A" /> : <ChevronDown size={20} color="#7A7A7A" />}
          </Pressable>

          {summaryOpen && (
            <View style={styles.summaryList}>
              {items.map((item, i) => (
                <View key={i} style={styles.summaryItem}>
                  <Text style={styles.itemQty}>{item.quantity}x</Text>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>₱{(item.price * item.quantity).toFixed(2)}</Text>
                </View>
              ))}
              <View style={styles.summaryDivider} />
              <View style={styles.summaryTotalRow}>
                <Text style={styles.totalLbl}>Total</Text>
                <Text style={styles.totalVal}>₱{total.toFixed(2)}</Text>
              </View>
            </View>
          )}

          <View style={styles.paymentBox}>
            <View style={styles.paymentDot} />
            <Text style={styles.paymentText}>Paid via {paymentMode}</Text>
          </View>
        </View>

      </ScrollView>

      {/* Bottom Navigation Actions */}
      <View style={[styles.bottomActions, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <Pressable style={styles.homeBtn} onPress={() => router.push('/')}>
          <Text style={styles.homeBtnText}>Back to Campus Hub</Text>
        </Pressable>
        <Pressable style={styles.helpBtn}>
          <PhoneCall size={14} color="#7A7A7A" />
          <Text style={styles.helpBtnText}>Need Help? Contact Concessionaire</Text>
        </Pressable>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F5F7',
  },
  appBar: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E5EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  appBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appBarTitle: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 18,
    color: '#1B2336',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FFC632',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D97706',
  },
  statusText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 10,
    color: '#785a00',
    letterSpacing: 0.5,
  },
  mainScroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
    gap: 16,
  },
  qrCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E5EB',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  qrHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E5EB',
    paddingBottom: 12,
  },
  qrHeaderLeft: {
    flexDirection: 'column',
  },
  queueLbl: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: '#7A7A7A',
    textTransform: 'uppercase',
  },
  queueVal: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 28,
    color: '#800000',
    marginTop: 2,
    lineHeight: 32,
  },
  expressBadge: {
    backgroundColor: '#FFC632',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  expressText: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 10,
    color: '#451a03',
    textTransform: 'uppercase',
  },
  qrBox: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  scanText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 12,
    color: '#5a413d',
    marginTop: 12,
  },
  locCard: {
    backgroundColor: '#F4F5F7',
    borderRadius: 8,
    padding: 12,
    gap: 6,
  },
  locRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  locText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 13,
    color: '#1B2336',
  },
  locTextMuted: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 12,
    color: '#7A7A7A',
  },
  pipelineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E5EB',
    padding: 16,
  },
  pipelineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 20,
  },
  etaText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 15,
    color: '#1B2336',
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  stepBox: {
    alignItems: 'center',
    zIndex: 10,
  },
  stepIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  stepCompleted: {
    backgroundColor: '#800000',
    borderColor: '#800000',
  },
  stepActive: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FFC632',
  },
  stepPending: {
    backgroundColor: '#F4F5F7',
    borderColor: '#E2E5EB',
  },
  stepLabelCompleted: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 11,
    color: '#222222',
    marginTop: 8,
    textAlign: 'center',
    width: 70,
  },
  stepLabelActive: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 11,
    color: '#800000',
    marginTop: 8,
    textAlign: 'center',
    width: 70,
  },
  stepLabelPending: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 11,
    color: '#7A7A7A',
    marginTop: 8,
    textAlign: 'center',
    width: 70,
  },
  stepLine: {
    flex: 1,
    height: 2,
    marginTop: 15,
    marginHorizontal: -15,
    zIndex: 5,
  },
  lineCompleted: {
    backgroundColor: '#800000',
  },
  linePending: {
    backgroundColor: '#E2E5EB',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E5EB',
    padding: 16,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  summaryTitle: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 15,
    color: '#1B2336',
  },
  summaryList: {
    marginTop: 16,
    gap: 10,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemQty: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 13,
    color: '#7A7A7A',
    width: 24,
  },
  itemName: {
    flex: 1,
    fontFamily: 'Manrope_500Medium',
    fontSize: 13,
    color: '#222222',
  },
  itemPrice: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 13,
    color: '#222222',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#E2E5EB',
    marginVertical: 4,
  },
  summaryTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  totalLbl: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 14,
    color: '#222222',
  },
  totalVal: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 18,
    color: '#800000',
  },
  paymentBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  paymentDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  paymentText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 12,
    color: '#065F46',
  },
  bottomActions: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E5EB',
    gap: 12,
  },
  homeBtn: {
    backgroundColor: '#800000',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#800000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  homeBtnText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 15,
    color: '#FFFFFF',
  },
  helpBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
  },
  helpBtnText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 12,
    color: '#7A7A7A',
  }
});

import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useDemo } from '../../context/DemoContext';
import { 
  ArrowLeft, 
  Download, 
  QrCode, 
  AlertTriangle,
  Bus,
  CheckCircle2
} from 'lucide-react-native';

export default function ShuttleTicket() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { activePass, studentName } = useDemo();
  
  if (!activePass) {
    return (
      <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
        <Text style={{ fontFamily: 'Manrope_600SemiBold', color: '#1B2336' }}>No active ticket found.</Text>
        <Pressable style={styles.homeBtn} onPress={() => router.push('/')}>
          <Text style={styles.homeText}>Back to Hub</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={[styles.scrollContent, { flexGrow: 1, paddingTop: Math.max(insets.top, 16), paddingBottom: (insets.bottom || 0) + 32 }]}>
        
        {/* Pass Card with Institutional Maroon Gradient */}
        <LinearGradient
          colors={['#800000', '#570000']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.passCard}
        >
          {/* Header */}
          <View style={styles.passHeader}>
            <View style={styles.passHeaderLeft}>
              <Text style={styles.ticketId}>{activePass.ticketId}</Text>
              <Text style={styles.routeText}>{activePass.origin.replace('TSU ', '')} → {activePass.destination.replace('TSU ', '')}</Text>
            </View>
            <View style={styles.unitBadge}>
              <Bus size={12} color="#451a03" />
              <Text style={styles.unitText}>{activePass.unit.split(' ')[0]}</Text>
            </View>
          </View>

          {/* Details Grid */}
          <View style={styles.detailsGrid}>
            <View style={styles.detailBox}>
              <Text style={styles.detailLbl}>Passenger Name</Text>
              <Text style={styles.detailVal}>{studentName}</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={styles.detailLbl}>Scheduled</Text>
              <Text style={styles.detailVal}>{activePass.departureTime}</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={styles.detailLbl}>Seat</Text>
              <Text style={styles.detailVal}>{activePass.seat}</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={styles.detailLbl}>Boarding Lane</Text>
              <View style={styles.laneBadge}>
                <CheckCircle2 size={12} color="#451a03" />
                <Text style={styles.laneText}>{activePass.lane}</Text>
              </View>
            </View>
          </View>

          {/* Scannable Dynamic QR Code */}
          <View style={styles.qrSection}>
            <View style={styles.qrWrapper}>
              <QrCode size={160} color="#1B2336" strokeWidth={1.5} />
              <View style={styles.qrCorners}>
                <View style={[styles.qrCorner, styles.qrTopLeft]} />
                <View style={[styles.qrCorner, styles.qrTopRight]} />
                <View style={[styles.qrCorner, styles.qrBottomLeft]} />
                <View style={[styles.qrCorner, styles.qrBottomRight]} />
              </View>
            </View>
            <Text style={styles.scanText}>Scan at terminal turnstile</Text>
            <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 10, color: '#ffdad4', marginTop: 8, letterSpacing: 1 }}>{activePass.ticketId}</Text>
          </View>

          {/* Non-Refundable Legal Warning */}
          <View style={styles.warningBox}>
            <AlertTriangle size={14} color="#FFC632" />
            <Text style={styles.warningText}>NON-REFUNDABLE • VALID FOR SCHEDULED TRIP ONLY</Text>
          </View>
          
        </LinearGradient>

        {/* Actions */}
        <View style={styles.actionsBox}>
          <Pressable style={styles.downloadBtn}>
            <Download size={18} color="#1B2336" />
            <Text style={styles.downloadText}>Download Pass / Save to Photos</Text>
          </Pressable>
          
          <Pressable 
            style={styles.homeBtn}
            onPress={() => router.push('/')}
          >
            <ArrowLeft size={18} color="#FFFFFF" />
            <Text style={styles.homeText}>Back to Campus Hub</Text>
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
  scrollContent: {
    padding: 16,
  },
  passCard: {
    borderRadius: 20,
    padding: 24,
    shadowColor: '#800000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  passHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.15)',
    paddingBottom: 16,
    marginBottom: 16,
  },
  passHeaderLeft: {
    flex: 1,
    paddingRight: 12,
  },
  ticketId: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 20,
    color: '#FFC632',
    letterSpacing: 0.5,
  },
  routeText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 13,
    color: '#FFFFFF',
    marginTop: 4,
  },
  unitBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFC632',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  unitText: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 11,
    color: '#451a03',
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  detailBox: {
    width: '45%',
  },
  detailLbl: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 11,
    color: '#ffdad4',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailVal: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 15,
    color: '#FFFFFF',
    marginTop: 4,
  },
  laneBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFC632',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 4,
    gap: 4,
  },
  laneText: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 11,
    color: '#451a03',
  },
  qrSection: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
  },
  qrWrapper: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    position: 'relative',
  },
  qrCorners: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
  },
  qrCorner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: '#800000',
  },
  qrTopLeft: {
    top: 6, left: 6,
    borderTopWidth: 3,
    borderLeftWidth: 3,
  },
  qrTopRight: {
    top: 6, right: 6,
    borderTopWidth: 3,
    borderRightWidth: 3,
  },
  qrBottomLeft: {
    bottom: 6, left: 6,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
  },
  qrBottomRight: {
    bottom: 6, right: 6,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  scanText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: '#ffdad4',
    marginTop: 12,
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.25)',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 198, 50, 0.2)',
  },
  warningText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 11,
    color: '#FFC632',
    letterSpacing: 0.5,
  },
  actionsBox: {
    marginTop: 24,
    gap: 12,
  },
  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E5EB',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  downloadText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 15,
    color: '#1B2336',
  },
  homeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#800000',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#800000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  homeText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 15,
    color: '#FFFFFF',
  }
});

import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { QrCode, Clock } from 'lucide-react-native';

export default function PrintTicketScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Queue Ticket</Text>
      
      <View style={styles.ticketCard}>
        <View style={styles.ticketHeader}>
          <Text style={styles.shopName}>CopyCat Printing (Main)</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>IN QUEUE</Text>
          </View>
        </View>

        <View style={styles.ticketBody}>
          <Text style={styles.label}>QUEUE NUMBER</Text>
          <Text style={styles.queueNumber}>#42</Text>

          <View style={styles.infoRow}>
            <Clock size={16} color="#7A7A7A" />
            <Text style={styles.infoText}>Est. Wait: 15 mins (5 people ahead)</Text>
          </View>

          <View style={styles.divider}>
            <View style={styles.dashLine} />
          </View>

          <View style={styles.qrContainer}>
            <QrCode size={120} color="#1B2336" />
            <Text style={styles.qrDesc}>Show at counter to claim prints</Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomBar}>
        <Pressable style={styles.secondaryButton} onPress={() => router.navigate('/')}>
          <Text style={styles.secondaryText}>RETURN TO HUB</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F4F5F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 26,
    color: '#1B2336',
    marginBottom: 24,
  },
  ticketCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E5EB',
    shadowColor: '#1B2336',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    marginBottom: 80,
  },
  ticketHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E5EB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F4F5F7',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  shopName: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 16,
    color: '#1B2336',
  },
  badge: {
    backgroundColor: 'rgba(255, 198, 50, 0.18)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  badgeText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 11,
    color: '#1B2336',
    letterSpacing: 0.8,
  },
  ticketBody: {
    padding: 24,
    alignItems: 'center',
  },
  label: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 12,
    color: '#7A7A7A',
    letterSpacing: 0.5,
  },
  queueNumber: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 48,
    color: '#800000',
    marginTop: 8,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    color: '#7A7A7A',
  },
  divider: {
    height: 1,
    width: '100%',
    marginVertical: 24,
    overflow: 'hidden',
  },
  dashLine: {
    height: 2,
    borderWidth: 1,
    borderColor: '#E2E5EB',
    borderStyle: 'dashed',
    marginTop: -1,
  },
  qrContainer: {
    alignItems: 'center',
  },
  qrDesc: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    color: '#7A7A7A',
    marginTop: 16,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E5EB',
    paddingHorizontal: 16,
    paddingVertical: 16,
    justifyContent: 'center',
  },
  secondaryButton: {
    backgroundColor: '#F4F5F7',
    height: 48,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E5EB',
  },
  secondaryText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 14,
    color: '#222222',
    letterSpacing: 0.5,
  }
});

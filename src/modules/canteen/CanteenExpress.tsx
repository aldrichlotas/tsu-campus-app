import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, TextInput, Dimensions, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useDemo } from '../../context/DemoContext';
import { 
  Bell, 
  ChevronDown, 
  Search, 
  Mic, 
  Check, 
  RefreshCw,
  ShoppingBag,
  QrCode,
  ArrowRight,
  Star,
  Clock,
  Plus,
  Zap,
  CreditCard,
  Banknote,
  Send
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function CanteenExpress() {
  const router = useRouter();
  const { activeCampus, setActiveCampus, foodCart, addFoodItem, removeFoodItem, submitCanteenOrder, balance } = useDemo();
  const [filter, setFilter] = useState('All');
  const [paymentMode, setPaymentMode] = useState<'online' | 'cash'>('online');
  const [showCartModal, setShowCartModal] = useState(false);

  const subtotal = foodCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = foodCart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    if (foodCart.length === 0) return;
    const fee = 5.0;
    if (paymentMode === 'online' && balance < subtotal + fee) {
      Alert.alert('Insufficient Balance', 'Insufficient Ledger Balance');
      return;
    }
    const success = submitCanteenOrder(
      "Mang Ben's Sizzling & Rice Bowls", 
      paymentMode === 'online' ? 'Student Account Ledger' : 'Cash on Pickup'
    );
    if (success) {
      router.push('/canteen/tracker');
    }
  };

  const CartControls = ({ item }: { item: { id: string; name: string; price: number } }) => {
    const cartItem = foodCart.find(i => i.id === item.id);
    const qty = cartItem ? cartItem.quantity : 0;
    if (qty === 0) {
      return (
        <Pressable style={styles.addBtnPrimary} onPress={() => addFoodItem(item)}>
          <Plus size={14} color="#FFFFFF" />
          <Text style={styles.addBtnTextPrimary}>Pre-Order</Text>
        </Pressable>
      );
    }
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#f0eded', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>
        <Pressable onPress={() => removeFoodItem(item.id)}>
          <Text style={{ fontSize: 16, fontFamily: 'Manrope_700Bold', color: '#800000', paddingHorizontal: 4 }}>-</Text>
        </Pressable>
        <Text style={{ fontSize: 14, fontFamily: 'Manrope_700Bold', color: '#222222' }}>{qty}</Text>
        <Pressable onPress={() => addFoodItem(item)}>
          <Text style={{ fontSize: 16, fontFamily: 'Manrope_700Bold', color: '#800000', paddingHorizontal: 4 }}>+</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header App Bar */}
      <View style={styles.appBar}>
        <View style={styles.headerLeft}>
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOuP8IJspmOAfG6VDlImwW7ajlmtocMxG18LvdanqwCOf3WK7B1B6WfcGE9ib4mL44wzU5oe5S0UAXXo5znXXQxXJy90p2EGgeoQu6vRj0innB_R6EOIJtx855eSDYDxvjhgiAgy1VHPEOonYBONHh-D0W-9DkUtygzya7eIbx37jvfgbDwIgO3rLmmROYuiQ-WQ-qGv-y_J_qX7NbjvcU1d3TYwwtwW3ypzsfemFYwgO-M5_vdClhrB7NniMxtjfo0rE' }} 
            style={styles.logoImage} 
          />
          <Pressable style={styles.headerTitles}>
            <Text style={styles.headerSubtitle}>TSU Campus</Text>
            <View style={styles.campusDropdownRow}>
              <Text style={styles.headerTitle} numberOfLines={1}>Main Quad / Univ</Text>
              <ChevronDown size={18} color="#800000" />
            </View>
          </Pressable>
        </View>
        <View style={styles.headerRight}>
          <Pressable style={styles.iconButton}>
            <Bell size={22} color="#4A4A4A" />
            <View style={styles.notificationDot} />
          </Pressable>
          <Pressable style={styles.profileButton}>
            <Image 
              source={{ uri: 'https://i.pravatar.cc/100?img=3' }} 
              style={styles.profileImage} 
            />
          </Pressable>
        </View>
      </View>

      <ScrollView style={styles.mainScroll} contentContainerStyle={styles.scrollContent}>
        {/* Live Order Tracking Header Module */}
        <View style={styles.trackerModule}>
          <View style={styles.trackerTopBorder} />
          <View style={styles.trackerHeader}>
            <View style={styles.trackerHeaderLeft}>
              <View style={styles.stallIconBox}>
                <ShoppingBag size={18} color="#800000" />
              </View>
              <View>
                <View style={styles.orderIdRow}>
                  <Text style={styles.orderIdText}>Order #C-104</Text>
                  <View style={styles.liveBadge}>
                    <View style={styles.liveDot} />
                    <Text style={styles.liveBadgeText}>LIVE</Text>
                  </View>
                </View>
                <Text style={styles.stallName}>Ate Joy's Kitchen</Text>
              </View>
            </View>
            <View style={styles.tokenBox}>
              <Text style={styles.tokenLbl}>Pickup Token</Text>
              <Text style={styles.tokenVal}>#8921</Text>
            </View>
          </View>

          {/* 3-Stage Progress Stepper */}
          <View style={styles.stepperContainer}>
            {/* Step 1: Placed */}
            <View style={styles.stepBox}>
              <View style={[styles.stepIcon, styles.stepIconCompleted]}>
                <Check size={16} color="#FFFFFF" />
              </View>
              <Text style={styles.stepTitleCompleted}>Placed</Text>
              <Text style={styles.stepTime}>11:42 AM</Text>
            </View>
            <View style={[styles.stepLine, styles.stepLineCompleted]} />
            
            {/* Step 2: Preparing */}
            <View style={styles.stepBox}>
              <View style={[styles.stepIcon, styles.stepIconActive]}>
                <RefreshCw size={16} color="#800000" />
              </View>
              <Text style={styles.stepTitleActive}>Preparing</Text>
              <Text style={styles.stepTimeDark}>~8 mins left</Text>
            </View>
            <View style={[styles.stepLine, styles.stepLinePending]} />

            {/* Step 3: Express Pick-up */}
            <View style={styles.stepBox}>
              <View style={[styles.stepIcon, styles.stepIconPending]}>
                <ShoppingBag size={16} color="#7A7A7A" />
              </View>
              <Text style={styles.stepTitlePending}>Express Pick-up</Text>
              <Text style={styles.stepTime}>Counter #2</Text>
            </View>
          </View>

          {/* Express Lane Reminder Banner */}
          <View style={styles.expressReminder}>
            <View style={styles.expressReminderLeft}>
              <QrCode size={18} color="#800000" />
              <Text style={styles.expressReminderText}>
                Show Code <Text style={styles.expressCodeHighight}>#8921</Text> at Express Lane
              </Text>
            </View>
            <Pressable style={styles.qrPassBtn}>
              <Text style={styles.qrPassBtnText}>QR PASS</Text>
              <ArrowRight size={14} color="#800000" />
            </Pressable>
          </View>
        </View>

        {/* Search & Campus Location Selector */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Search size={20} color="#7A7A7A" style={styles.searchIcon} />
            <TextInput 
              style={styles.searchInput}
              placeholder="Search meals, stalls, drinks..."
              placeholderTextColor="#7A7A7A"
            />
            <Mic size={20} color="#7A7A7A" style={styles.micIcon} />
          </View>

          {/* PRD Campus Tabs */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.campusTabs}>
            <Pressable 
              style={[styles.campusTab, activeCampus === 'TSU Main Campus' && styles.campusTabActive]}
              onPress={() => setActiveCampus('TSU Main Campus')}
            >
              <Text style={[styles.campusTabText, activeCampus === 'TSU Main Campus' && styles.campusTabTextActive]}>
                TSU Main Campus Canteen
              </Text>
            </Pressable>
            <Pressable 
              style={[styles.campusTab, activeCampus === 'TSU Lucinda Campus' && styles.campusTabActive]}
              onPress={() => setActiveCampus('TSU Lucinda Campus')}
            >
              <Text style={[styles.campusTabText, activeCampus === 'TSU Lucinda Campus' && styles.campusTabTextActive]}>
                TSU Lucinda Campus Canteen
              </Text>
            </Pressable>
          </ScrollView>

          {/* Dietary Filters */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterTabs}>
            {['All', 'Meals', 'Snacks', 'Drinks', 'Rice Bowls', 'Halal'].map((item) => (
              <Pressable 
                key={item}
                style={[styles.filterTab, filter === item && styles.filterTabActive]}
                onPress={() => setFilter(item)}
              >
                <Text style={[styles.filterTabText, filter === item && styles.filterTabTextActive]}>{item}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Stall Directory & Menu Offerings */}
        <View style={styles.stallDirectory}>
          
          {/* Stall 1: Mang Ben's */}
          <View style={styles.stallSection}>
            <View style={styles.stallHeader}>
              <View style={styles.stallHeaderLeft}>
                <View style={styles.stallIconBoxLg}>
                  <ShoppingBag size={22} color="#800000" />
                </View>
                <View>
                  <Text style={styles.stallTitle}>Mang Ben's Sizzling & Rice Bowls</Text>
                  <View style={styles.stallMetaRow}>
                    <View style={styles.ratingBadge}>
                      <Star size={12} color="#FFC632" fill="#FFC632" />
                      <Text style={styles.ratingText}>4.8</Text>
                    </View>
                    <Text style={styles.metaDot}>•</Text>
                    <View style={styles.metaIconRow}>
                      <Clock size={12} color="#7A7A7A" />
                      <Text style={styles.metaText}>~10 mins</Text>
                    </View>
                    <Text style={styles.metaDot}>•</Text>
                    <Text style={styles.aheadText}>3 orders ahead</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.viewStallText}>View Stall</Text>
            </View>

            {/* Menu Item: Sisig */}
            <View style={styles.menuItemCard}>
              <View style={styles.itemImageContainer}>
                <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlwMRWDeutlTyLbi49dhnGKGAc7vudJ2PMKPxkwv9BwojMSKx6IhF3jm_ZZZPytXvcjs_sPy8Wb5a2zQ7NKSIdf6MNF-wR1yE7My0ZA2FLkXeVEruFtzAvXWhyzhgMdezWw_sl3yZbVOvHwBIW0O-nzcDZ1PMs8SDrrZhmInRM-eNwB5wcHpL0OjHTgrg90fcMNMa0LXPJbOTHDc_tS5IgjZX-_G_HeSFgJiMXJMHSriOLGW_bz82IvA' }} style={styles.itemImage} />
                <View style={styles.itemValueBadge}>
                  <Text style={styles.itemValueText}>VALUE</Text>
                </View>
              </View>
              <View style={styles.itemContent}>
                <Text style={styles.itemName} numberOfLines={1}>Crispy Sisig Rice Bowl w/ Egg</Text>
                <Text style={styles.itemDesc} numberOfLines={2}>Minced crispy pork, fresh calamansi juice, creamy mayo dressing & fried egg</Text>
                <View style={styles.itemFooter}>
                  <Text style={styles.itemPrice}>₱95.00</Text>
                  <CartControls item={{ id: 'f-1', name: 'Crispy Sisig Rice Bowl w/ Egg', price: 95.0 }} />
                </View>
              </View>
            </View>

            {/* Menu Item: Beef Tapa */}
            <View style={styles.menuItemCard}>
              <View style={styles.itemImageContainer}>
                <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsTS4eMsJpaSFdnwMzU1MFuvHfvA2pjSJrRzz8hoZE_I0y8UxjRtxmfi922pgLCY7NHFf9njhJg1G3WWB9sRNXT0CG8Eck8LAgWh8wggVOsYgPQD0jbsnSmSsWj5UYNlb5b9rYsYekTEkRvBk_UphAl3o7nyOw90GAT-0emRpVWfLwtgbImCFfLwGUwA4C25dRoHdDnWd95zGhYx_U8VFSyUZ08J-bsqJLsT3JdNTP3I6gAeUpnT6qhA' }} style={styles.itemImage} />
              </View>
              <View style={styles.itemContent}>
                <Text style={styles.itemName} numberOfLines={1}>Beef Tapa Special with Atchara</Text>
                <Text style={styles.itemDesc} numberOfLines={2}>Marinated savory beef sirloin cuts, garlic sinangag rice, homemade atchara</Text>
                <View style={styles.itemFooter}>
                  <Text style={styles.itemPrice}>₱90.00</Text>
                  <CartControls item={{ id: 'f-2', name: 'Beef Tapa Special with Atchara', price: 90.0 }} />
                </View>
              </View>
            </View>
          </View>

          {/* Stall 2: Campus Greens */}
          <View style={styles.stallSection}>
            <View style={styles.stallHeader}>
              <View style={styles.stallHeaderLeft}>
                <View style={[styles.stallIconBoxLg, { backgroundColor: '#FFF7DB', borderColor: '#FFC632' }]}>
                  <ShoppingBag size={22} color="#800000" />
                </View>
                <View>
                  <Text style={styles.stallTitle}>Campus Greens & Juice Bar</Text>
                  <View style={styles.stallMetaRow}>
                    <View style={styles.expressLineBadge}>
                      <Zap size={12} color="#FFC632" fill="#FFC632" />
                      <Text style={styles.expressLineText}>Express Line</Text>
                    </View>
                    <Text style={styles.metaDot}>•</Text>
                    <View style={styles.metaIconRow}>
                      <Clock size={12} color="#7A7A7A" />
                      <Text style={styles.metaText}>~5 mins</Text>
                    </View>
                  </View>
                </View>
              </View>
              <Text style={styles.viewStallText}>View Stall</Text>
            </View>

            {/* Menu Item: Pesto Wrap */}
            <View style={styles.menuItemCard}>
              <View style={styles.itemImageContainer}>
                <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQ1CN5au9ylKpjBjNwWxTtRgf0BJoWFjw_0OGS-2U8z-BvCpy4-XK4mIfd_UBtrp8qT5D3NsYFXGv95_nLtNH8HlHwcJFT9lStcMmwDRC8ihRuK2VvgMJqEtkS7QDirJnoBzqQmXE-EG5Avl2dffJcChc3nWfWL3nT8sNKxXFLHt5-6jXoi1zzUrcXoguIWuIl3CoPuUqPvPXLsoi5QqSlYu-33mOjau8lORAbNSrDJ7IzZrt6w05KHQ' }} style={styles.itemImage} />
                <View style={[styles.itemValueBadge, {backgroundColor: '#15803d'}]}>
                  <Text style={[styles.itemValueText, {color: '#FFFFFF'}]}>FRESH</Text>
                </View>
              </View>
              <View style={styles.itemContent}>
                <Text style={styles.itemName} numberOfLines={1}>Chicken Pesto Wrap</Text>
                <Text style={styles.itemDesc} numberOfLines={2}>Herb roasted chicken breast, homemade basil pesto, crisp greens in spinach tortilla</Text>
                <View style={styles.itemFooter}>
                  <Text style={styles.itemPrice}>₱85.00</Text>
                  <CartControls item={{ id: 'f-3', name: 'Chicken Pesto Wrap', price: 85.0 }} />
                </View>
              </View>
            </View>

          </View>
        </View>

        {/* Spacer for bottom bar */}
        <View style={{height: 140}} />
      </ScrollView>

      {/* Sticky Bottom Express Cart */}
      <View style={styles.bottomCart}>
        <View style={styles.cartInner}>
          <View style={styles.cartSummaryRow}>
            <Pressable style={styles.cartSummaryLeft} onPress={() => setShowCartModal(true)}>
              <View style={styles.cartCountBadge}>
                <Text style={styles.cartCountText}>{cartCount}</Text>
              </View>
              <View>
                <Text style={styles.cartItemsText}>{cartCount} items in cart (View)</Text>
                <Text style={styles.cartFeeText}>+₱5.00 Campus Service Fee</Text>
              </View>
            </Pressable>
            <View style={styles.cartTotalBox}>
              <Text style={styles.subtotalLbl}>SUBTOTAL</Text>
              <Text style={styles.subtotalVal}>₱{subtotal.toFixed(2)}</Text>
            </View>
          </View>

          <View style={styles.paymentSection}>
            <Text style={styles.paymentLbl}>FULFILLMENT & PAYMENT MODE</Text>
            <View style={styles.paymentModesGrid}>
              <Pressable 
                style={[styles.paymentModeBtn, paymentMode === 'online' && styles.paymentModeBtnActive]}
                onPress={() => setPaymentMode('online')}
              >
                <Zap size={14} color={paymentMode === 'online' ? '#800000' : '#7A7A7A'} fill={paymentMode === 'online' ? '#800000' : 'transparent'} />
                <Text style={[styles.paymentModeText, paymentMode === 'online' && styles.paymentModeTextActive]}>Online E-Wallet / Portal</Text>
              </Pressable>
              <Pressable 
                style={[styles.paymentModeBtn, paymentMode === 'cash' && styles.paymentModeBtnActive]}
                onPress={() => setPaymentMode('cash')}
              >
                <Banknote size={14} color={paymentMode === 'cash' ? '#800000' : '#7A7A7A'} />
                <Text style={[styles.paymentModeText, paymentMode === 'cash' && styles.paymentModeTextActive]}>Cash upon Pickup</Text>
              </Pressable>
            </View>
          </View>

          <Pressable 
            style={styles.checkoutBtn}
            onPress={handleCheckout}
          >
            <View style={styles.checkoutBtnLeft}>
              <Send size={20} color="#FFC632" />
              <Text style={styles.checkoutBtnText}>Proceed to Pre-Order</Text>
            </View>
            <View style={styles.pickupTimeBadge}>
              <Text style={styles.pickupTimeText}>Pickup at 12:15 PM</Text>
            </View>
          </Pressable>
        </View>
      </View>

      {/* Cart Expandable Drawer / Modal */}
      {showCartModal && (
        <View style={{ position: 'absolute', bottom: 180, left: 16, right: 16, backgroundColor: '#FFF', borderRadius: 12, padding: 16, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5, zIndex: 100 }}>
          <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 16, marginBottom: 12 }}>Your Cart</Text>
          {foodCart.map(item => (
            <View key={item.id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <Text style={{ fontFamily: 'Manrope_600SemiBold', fontSize: 14 }}>{item.name}</Text>
              <CartControls item={item} />
            </View>
          ))}
          <Pressable onPress={() => setShowCartModal(false)} style={{ alignSelf: 'flex-end', marginTop: 12, backgroundColor: '#E2E5EB', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 }}>
            <Text style={{ fontFamily: 'Manrope_700Bold' }}>Close Cart</Text>
          </Pressable>
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F5F7',
  },
  appBar: {
    height: 64,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E5EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8, 
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  logoImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerTitles: {
    flexDirection: 'column',
    flex: 1,
  },
  headerSubtitle: {
    color: '#800000',
    fontFamily: 'Manrope_700Bold',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  campusDropdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  headerTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 15,
    color: '#222222',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#800000',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
    paddingBottom: 20,
  },
  trackerModule: {
    margin: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E5EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
    position: 'relative',
    overflow: 'hidden',
  },
  trackerTopBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#800000',
  },
  trackerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 4,
  },
  trackerHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  stallIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(128, 0, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  orderIdText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 13,
    color: '#222222',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#800000',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    gap: 4,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFC632',
  },
  liveBadgeText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 10,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  stallName: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontStyle: 'italic',
    fontSize: 12,
    color: '#7A7A7A',
  },
  tokenBox: {
    backgroundColor: '#FFF7DB',
    borderWidth: 1,
    borderColor: 'rgba(255, 198, 50, 0.6)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignItems: 'flex-end',
  },
  tokenLbl: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 10,
    color: '#785a00',
    textTransform: 'uppercase',
  },
  tokenVal: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 17,
    color: '#800000',
    lineHeight: 20,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingHorizontal: 8,
  },
  stepBox: {
    alignItems: 'center',
    zIndex: 10,
  },
  stepIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepIconCompleted: {
    backgroundColor: '#800000',
  },
  stepIconActive: {
    backgroundColor: '#FFC632',
  },
  stepIconPending: {
    backgroundColor: '#f0eded',
  },
  stepTitleCompleted: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 11,
    color: '#222222',
    marginTop: 6,
  },
  stepTitleActive: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 11,
    color: '#800000',
    marginTop: 6,
  },
  stepTitlePending: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 11,
    color: '#7A7A7A',
    marginTop: 6,
  },
  stepTime: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 10,
    color: '#7A7A7A',
  },
  stepTimeDark: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 10,
    color: '#7A7A7A',
  },
  stepLine: {
    flex: 1,
    height: 2,
    marginTop: 13,
    marginHorizontal: 4,
  },
  stepLineCompleted: {
    backgroundColor: '#800000',
  },
  stepLinePending: {
    backgroundColor: '#E2E5EB',
  },
  expressReminder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF7DB',
    borderWidth: 1,
    borderColor: 'rgba(255, 198, 50, 0.5)',
    padding: 8,
    borderRadius: 8,
    marginTop: 16,
  },
  expressReminderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  expressReminderText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 12,
    color: '#222222',
  },
  expressCodeHighight: {
    fontFamily: 'Manrope_800ExtraBold',
    color: '#800000',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  qrPassBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  qrPassBtnText: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 11,
    color: '#800000',
  },
  searchSection: {
    paddingHorizontal: 16,
    gap: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E5EB',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    color: '#222222',
  },
  micIcon: {
    marginLeft: 8,
  },
  campusTabs: {
    flexDirection: 'row',
  },
  campusTab: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E5EB',
    marginRight: 8,
  },
  campusTabActive: {
    backgroundColor: '#800000',
    borderColor: '#800000',
  },
  campusTabText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 12,
    color: '#4A4A4A',
  },
  campusTabTextActive: {
    color: '#FFFFFF',
    fontFamily: 'Manrope_700Bold',
  },
  filterTabs: {
    flexDirection: 'row',
  },
  filterTab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E5EB',
    marginRight: 6,
  },
  filterTabActive: {
    backgroundColor: '#800000',
    borderColor: '#800000',
  },
  filterTabText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 12,
    color: '#4A4A4A',
  },
  filterTabTextActive: {
    fontFamily: 'Manrope_700Bold',
    color: '#FFFFFF',
  },
  stallDirectory: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 20,
  },
  stallSection: {
    gap: 10,
  },
  stallHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stallHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  stallIconBoxLg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(128, 0, 0, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(128, 0, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stallTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 16,
    color: '#222222',
  },
  stallMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#800000',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 2,
  },
  ratingText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 11,
    color: '#FFFFFF',
  },
  metaDot: {
    color: '#7A7A7A',
    fontSize: 12,
  },
  metaIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  metaText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: '#7A7A7A',
  },
  aheadText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 12,
    color: '#800000',
  },
  viewStallText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 12,
    color: '#800000',
  },
  menuItemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 10,
    flexDirection: 'row',
    gap: 12,
    borderWidth: 1,
    borderColor: '#E2E5EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  itemImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f0eded',
    overflow: 'hidden',
    position: 'relative',
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  itemValueBadge: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    backgroundColor: '#FFC632',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  itemValueText: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 9,
    color: '#800000',
  },
  itemContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemName: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 14,
    color: '#222222',
  },
  itemDesc: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: '#7A7A7A',
    marginTop: 2,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  itemPrice: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 18,
    color: '#800000',
  },
  addBtnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#800000',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  addBtnTextPrimary: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  addBtnSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0eded',
    borderWidth: 1,
    borderColor: '#E2E5EB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  addBtnTextSecondary: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 12,
    color: '#222222',
  },
  expressLineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#800000',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 2,
  },
  expressLineText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 11,
    color: '#FFFFFF',
  },
  bottomCart: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'transparent',
  },
  cartInner: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E5EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
  },
  cartSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E5EB',
    paddingBottom: 12,
    marginBottom: 12,
  },
  cartSummaryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cartCountBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#800000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartCountText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  cartItemsText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 13,
    color: '#222222',
  },
  cartFeeText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 11,
    color: '#7A7A7A',
  },
  cartTotalBox: {
    alignItems: 'flex-end',
  },
  subtotalLbl: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 10,
    color: '#7A7A7A',
    textTransform: 'uppercase',
  },
  subtotalVal: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 22,
    color: '#800000',
  },
  paymentSection: {
    marginBottom: 12,
  },
  paymentLbl: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 10,
    color: '#7A7A7A',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  paymentModesGrid: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: '#f0eded',
    padding: 4,
    borderRadius: 8,
  },
  paymentModeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 6,
    gap: 4,
  },
  paymentModeBtnActive: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E5EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  paymentModeText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 11,
    color: '#7A7A7A',
  },
  paymentModeTextActive: {
    color: '#222222',
    fontFamily: 'Manrope_700Bold',
  },
  checkoutBtn: {
    backgroundColor: '#800000',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkoutBtnLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkoutBtnText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  pickupTimeBadge: {
    backgroundColor: '#FFC632',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pickupTimeText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 12,
    color: '#800000',
  }
});

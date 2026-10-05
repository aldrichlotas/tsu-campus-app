import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, Modal, Dimensions, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useDemo } from '../../context/DemoContext';
import { 
  ArrowLeft,
  ShoppingBag,
  Store,
  MapPin,
  Clock,
  Star,
  CheckCircle2,
  X,
  CreditCard,
  Banknote,
  Heart,
  SlidersHorizontal,
  ArrowUpDown,
  ShoppingCart,
  BadgeCheck,
  ShieldCheck,
  ArrowRight,
  Receipt
} from 'lucide-react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 44) / 2; // 2 columns with 16px padding on sides and 12px gap

const ORGS = [
  { id: 'all', name: 'All Merch' },
  { id: 'jpia', name: 'JPIA' },
  { id: 'jfinex', name: 'JFINEX' },
  { id: 'yes', name: 'YES' },
  { id: 'jma', name: 'JMA' },
  { id: 'htm', name: 'HTM' },
  { id: 'jpes', name: 'JPES' },
  { id: 'more', name: '+ More Orgs' }
];

const PRODUCTS = [
  {
    id: 1,
    org: 'JPIA',
    orgBg: '#800000',
    name: 'JPIA Official Polo Shirt',
    price: '₱499.00',
    rating: '5.0',
    reviews: '188',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhxwKEp2EXJCL7pEZxWGY2yM4zNN5k6sILVj_DMC4vqGR66Eaui0TlEZkJEAqjnqOqRKVrhOHtaMwxEfYJTMzXE8A1XIbIDLrOke1CNkpa7-naC1jkCiNeJZ7ce1fpij_MxvkZrMrz_V4ZOtmZoygHANJZBEQBXpnSnVm-TDGljkN_IyAsMiiqCATKldsJOcrVp-CHLy6tNcOlzWS2sDcq81CQAGpYxg5TYJiw0-O8GBjDtR_lNt0Xrj-SZRtncstedec',
    tag: { label: 'HONEYCOMB FABRIC', type: 'emerald' },
    desc: 'Sizes: XS – 3XL'
  },
  {
    id: 2,
    org: '3 COLORS',
    orgBg: '#4A4A4A',
    name: 'Illyrthion Shirt',
    price: '₱299.00',
    rating: '4.9',
    reviews: '230',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqRgEkLmVo2O2sVHp1rmjt6D77JuvejcIOMhnzIKDYfEeOvQWDG05fp_w47rivW1f3957y7ze_-OkXOYUxESIFmmC8KNj2PCbRvwsBzVwB5WJRAvLkCvcuoj2qJkT3E8a4BGPPuoC7kaHbbqaNMSvqYU6gB54_2ezX-haxTioX4eLxP3IXJf7WsBotieGNQkNVB_Wtp544Og4jej7buLb8T9ell-xajwA3THqI6STHw3naQEkzaiQv1S-DVEu8Ey4xiN8',
    tag: { label: 'NAVY • WHITE • BLACK', type: 'amber' },
    desc: '100% Cotton (XS–3XL)'
  },
  {
    id: 3,
    org: 'ESSENTIAL',
    orgBg: '#800000',
    name: 'JPIA Official Lanyard',
    price: '₱119.00',
    rating: '5.0',
    reviews: '312',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsUEDMcG7UKNkL5GaSeHVXc9wwRe-xLsqZxe6m12d2i7sNKGnPhOn04VSK2oPcX6RGE39slYhTxSQ-GYP60kGl8ja3x87qSfHEE4sckkEehoCjWkYyR1_kZwWENHV9D5m1rvny7CgOApRJkoMAM4NpaCjsOP0diEyCbGBnGgwA4TVmgzOwoQANaEyjV4i1EPY6R5qXHJSr12T3MEzbc-YsPEtOl3zGW67IEmNq5l7fHfsb6dQFqa2kt85a47Zmv0dQRBE',
    tag: { label: 'DOUBLE-SIDED', type: 'emerald' },
    desc: 'Quick-release buckle clip'
  },
  {
    id: 4,
    org: 'CUSTOM',
    orgBg: '#4A4A4A',
    name: 'Official Engraved Nameplate',
    price: '₱129.00',
    rating: '4.9',
    reviews: '156',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmOK9yWJAL1lM6FN9IHavqX-yjeX-5EIKlSS6lz7M8TSgJkX8ptwDtXgLj2T8X7vpvGieYXpEeP6wXjUXBJEJIoxTpC_PoEwQACLC4jUNSnnuCrd1vyNRTuMig4NQTFBPIFbXGrL1F5xzJHHUvGhfJeDs6UF79I9by6iteArv3gLR0h_c56RIM8at-6Tkua8F7hIoZWrObnieT02_APT4PI1zqsPTDNlxmwz6dSd2JfAHUFT55Rkdv2c4p6wHNFhsy5DI',
    tag: { label: 'ACRYLIC ENGRAVED', type: 'emerald' },
    desc: 'Personalized student name'
  },
  {
    id: 5,
    org: 'BUNDLE 1',
    orgBg: '#800000',
    name: 'Bundle 1: Polo + Shirt',
    price: '₱889.00',
    rating: '5.0',
    reviews: '142',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCW71fsIId-nEgOyVurF5P1ARyyaGZ4y1K1rCpexbE5CHMA4EKHzinn6JyGAhwCt63MVtsu98tTMDhWowP5KLfILOtTgm1EGe83ZH3-UYDBXm1dWYY24kz5iv8W9tM-TQNZBi52ysXBEJF8CJ2WuLUFwUMnN-NbqHo8AXFxYNuxbXUzTd1mdAc9GXP8SwNP_HywiazNVf1bgYzHT_4BkuH8ZIcFsIdlDwhqpyHWHI3Nlt6USEyWL-E646PDvewmnq3VhVM',
    tag: { label: 'SAVE ₱218 VALUE', type: 'rose' },
    desc: 'Polo + Shirt + Lanyard'
  },
  {
    id: 6,
    org: 'BUNDLE 2',
    orgBg: '#800000',
    name: 'Bundle 2: Shirt + Lanyard',
    price: '₱409.00',
    rating: '4.9',
    reviews: '98',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwIa326lpLusAaVaxJnfw-Z4Ih_3ycQAWTXMFWn5C4ize2Mta6LGrvVY3u5IoCro6q9XF_tc5VJZHGa8Q_T4JqTcmn2Yh8njbDHDGuJDItiGLL44BwPr5Tkw9UpQr6X8uNUzjPVZ9mroTfbx6ARZ0eh5YuShgrbbbpDpnrqjfb5SXHw1m_DGi0Jo6fKTB2AGwbVN3aBjFDJF32m-6juYzsKfycxz3QEBw9V9xZswx9J4PMalcoGuR0OgvLIia0WtTcd4I',
    tag: { label: 'TOP SELLER', type: 'emerald' },
    desc: 'Illyrthion + Lanyard'
  }
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL'];

export default function MerchCatalog() {
  const router = useRouter();
  const { merchCart, addMerchItem, checkoutMerch, balance } = useDemo();
  const [activeCollege, setActiveCollege] = useState('cba');
  const [activeOrg, setActiveOrg] = useState('all');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showCart, setShowCart] = useState(false);
  
  const cartSubtotal = merchCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = merchCart.reduce((sum, item) => sum + item.quantity, 0);
  const fee = 15.0;
  const cartTotal = cartSubtotal > 0 ? cartSubtotal + fee : 0;
  
  const filteredProducts = activeOrg === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(prod => prod.org.toLowerCase().includes(activeOrg.toLowerCase()) || (activeOrg === 'jpia' && (prod.org === 'ESSENTIAL' || prod.org.includes('BUNDLE') || prod.org === 'CUSTOM' || prod.org === '3 COLORS')));

  const handleCheckout = () => {
    if (merchCart.length === 0) return;
    if (balance < cartTotal) {
      Alert.alert('Insufficient Balance', 'Insufficient Ledger Balance');
      return;
    }
    const success = checkoutMerch('Student Account Ledger');
    if (success) {
      setShowCart(false);
      Alert.alert('Order Confirmed', 'Your merchandise pre-order has been placed.');
    }
  };

  // Bottom Sheet State
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [paymentMode, setPaymentMode] = useState<'online' | 'cash'>('online');

  return (
    <View style={styles.container}>
      {/* 64px Top App Bar */}
      <View style={styles.appBar}>
        <View style={styles.appBarLeft}>
          <Pressable style={styles.iconBtn} onPress={() => router.push('/')}>
            <ArrowLeft size={24} color="#1B2336" />
          </Pressable>
          <Text style={styles.appBarTitle}>Collegiate Merch</Text>
        </View>
        <Pressable style={styles.cartBtn}>
          <ShoppingBag size={22} color="#1B2336" />
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
          )}
        </Pressable>
      </View>

      <ScrollView style={styles.mainScroll} contentContainerStyle={styles.scrollContent}>
        
        {/* Sub-Header */}
        <View style={styles.subHeader}>
          <View style={styles.subHeaderLeft}>
            <BadgeCheck size={20} color="#800000" />
            <Text style={styles.subHeaderText}>Official CBA Student Portal</Text>
          </View>
          <View style={styles.semesterBadge}>
            <Text style={styles.semesterText}>SEMESTER 1</Text>
          </View>
        </View>

        {/* College Selector Bar */}
        <View style={styles.collegeSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.collegeScroll}>
            <Pressable 
              style={[styles.collegeChip, activeCollege === 'cba' && styles.collegeChipActive]}
              onPress={() => setActiveCollege('cba')}
            >
              <View style={[styles.collegeIconBg, {backgroundColor: '#222222'}]}>
                <Text style={[styles.collegeIconText, {color: '#FFC632'}]}>BA</Text>
              </View>
              <Text style={[styles.collegeText, activeCollege === 'cba' && styles.collegeTextActive]}>CBA Main</Text>
              {activeCollege === 'cba' && <View style={styles.collegeActiveDot} />}
            </Pressable>
            <Pressable 
              style={[styles.collegeChip, activeCollege === 'coe' && styles.collegeChipActive]}
              onPress={() => setActiveCollege('coe')}
            >
              <View style={[styles.collegeIconBg, {backgroundColor: '#FFEDD5'}]}>
                <Text style={[styles.collegeIconText, {color: '#B45309'}]}>COE</Text>
              </View>
              <Text style={[styles.collegeText, activeCollege === 'coe' && styles.collegeTextActive]}>Engineering (COE)</Text>
            </Pressable>
            <Pressable 
              style={[styles.collegeChip, activeCollege === 'ccs' && styles.collegeChipActive]}
              onPress={() => setActiveCollege('ccs')}
            >
              <View style={[styles.collegeIconBg, {backgroundColor: '#DBEAFE'}]}>
                <Text style={[styles.collegeIconText, {color: '#800000'}]}>CCS</Text>
              </View>
              <Text style={[styles.collegeText, activeCollege === 'ccs' && styles.collegeTextActive]}>Computer (CCS)</Text>
            </Pressable>
            <Pressable 
              style={[styles.collegeChip, activeCollege === 'cass' && styles.collegeChipActive]}
              onPress={() => setActiveCollege('cass')}
            >
              <View style={[styles.collegeIconBg, {backgroundColor: '#FCE7F3'}]}>
                <Text style={[styles.collegeIconText, {color: '#BE185D'}]}>AS</Text>
              </View>
              <Text style={[styles.collegeText, activeCollege === 'cass' && styles.collegeTextActive]}>CASS</Text>
            </Pressable>
          </ScrollView>
        </View>

        {/* Org Horizontal Filter Chips */}
        <View style={styles.orgSection}>
          <Text style={styles.orgSectionLabel}>ORGS:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.orgScroll}>
            {ORGS.map((org) => {
              const isActive = activeOrg === org.id;
              return (
                <Pressable
                  key={org.id}
                  style={[styles.orgChip, isActive && styles.orgChipActive]}
                  onPress={() => setActiveOrg(org.id)}
                >
                  {isActive && <View style={styles.orgChipActiveDot} />}
                  <Text style={[styles.orgChipText, isActive && styles.orgChipTextActive]}>{org.name}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Drop Notification Banner Card */}
        <View style={styles.dropBannerContainer}>
          <View style={styles.dropBanner}>
            <View style={styles.dropBannerBgDeco} />
            <View style={styles.dropBannerContent}>
              <View style={styles.dropHeaderRow}>
                <View style={styles.dropBadge}>
                  <View style={styles.dropBadgeDot} />
                  <Text style={styles.dropBadgeText}>DROP #2 PRE-ORDER</Text>
                </View>
                <Text style={styles.dropSubtitle}>TSU Main Gym Booth B</Text>
              </View>
              <Text style={styles.dropTitle}>TSU Main Campus Student Center Distribution</Text>
              <Text style={styles.dropDesc}>
                Claim Schedule: <Text style={styles.dropDescHighlight}>Nov 24 – 28</Text>. Bring digital QR pass.
              </Text>
              <View style={styles.dropFooterRow}>
                <Text style={styles.dropTimeLimit}>Closes Nov 20, 11:59 PM</Text>
                <Pressable style={styles.dropCta}>
                  <Text style={styles.dropCtaText}>Claim Slot</Text>
                  <ArrowRight size={14} color="#FFC632" />
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        {/* Catalog Section Header */}
        <View style={styles.catalogHeader}>
          <View style={styles.catalogHeaderLeft}>
            <Text style={styles.catalogTitle}>CBA Student Organization Catalog</Text>
            <View style={styles.catalogCountBadge}>
              <Text style={styles.catalogCountText}>{filteredProducts.length} items</Text>
            </View>
          </View>
          <View style={styles.catalogHeaderRight}>
            <Pressable style={styles.filterBtn}>
              <SlidersHorizontal size={15} color="#444651" />
              <Text style={styles.filterBtnText}>Filter</Text>
            </Pressable>
            <Pressable style={styles.filterBtn}>
              <ArrowUpDown size={15} color="#444651" />
              <Text style={styles.filterBtnText}>Sort</Text>
            </Pressable>
          </View>
        </View>

        {/* Catalog Grid */}
        <View style={styles.catalogGrid}>
          {filteredProducts.map((prod) => (
            <Pressable key={prod.id} style={styles.productCard} onPress={() => setSelectedProduct(prod)}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: prod.image }} style={styles.productImage} />
                <View style={styles.orgTagWrapper}>
                  <View style={[styles.orgTagBadge, { backgroundColor: prod.orgBg }]}>
                    <View style={styles.orgTagDot} />
                    <Text style={styles.orgTagText}>{prod.org}</Text>
                  </View>
                </View>
                <Pressable 
                  style={styles.favBtn}
                  onPress={() => {
                    if (favorites.includes(prod.id)) {
                      setFavorites(favorites.filter(id => id !== prod.id));
                    } else {
                      setFavorites([...favorites, prod.id]);
                    }
                  }}
                >
                  <Heart size={14} color={favorites.includes(prod.id) ? "#800000" : "#444651"} fill={favorites.includes(prod.id) ? "#800000" : "transparent"} />
                </Pressable>
              </View>
              
              <View style={styles.productInfo}>
                <View style={styles.ratingRow}>
                  <Star size={13} color="#FFC632" fill="#FFC632" />
                  <Text style={styles.ratingText}>{prod.rating}</Text>
                  <Text style={styles.reviewsText}>({prod.reviews})</Text>
                </View>
                
                <Text style={styles.productTitle} numberOfLines={1}>{prod.name}</Text>
                
                <View style={styles.priceRow}>
                  <Text style={styles.productPrice}>{prod.price}</Text>
                </View>
                
                <View style={[
                  styles.featureTag, 
                  prod.tag.type === 'emerald' ? styles.featureTagEmerald : 
                  prod.tag.type === 'amber' ? styles.featureTagAmber : 
                  styles.featureTagRose
                ]}>
                  <BadgeCheck 
                    size={11} 
                    color={
                      prod.tag.type === 'emerald' ? '#047857' : 
                      prod.tag.type === 'amber' ? '#B45309' : 
                      '#800000'
                    } 
                  />
                  <Text style={[
                    styles.featureTagText,
                    prod.tag.type === 'emerald' ? styles.featureTagTextEmerald : 
                    prod.tag.type === 'amber' ? styles.featureTagTextAmber : 
                    styles.featureTagTextRose
                  ]} numberOfLines={1}>{prod.tag.label}</Text>
                </View>
                
                <View style={styles.descRow}>
                  <Text style={styles.descText} numberOfLines={1}>{prod.desc}</Text>
                </View>
              </View>
              
              <Pressable style={styles.addCartBtn} onPress={() => setSelectedProduct(prod)}>
                <ShoppingCart size={15} color="#FFC632" />
                <Text style={styles.addCartText}>Add to Cart</Text>
              </Pressable>
            </Pressable>
          ))}
        </View>

        {/* Campus Fulfillment Policy Card */}
        <View style={styles.policyContainer}>
          <View style={styles.policyCard}>
            <View style={styles.policyHeader}>
              <View style={styles.policyIconBox}>
                <ShieldCheck size={18} color="#800000" />
              </View>
              <View style={styles.policyHeaderTexts}>
                <Text style={styles.policyTitle}>Campus Fulfillment Policy</Text>
                <Text style={styles.policySubtitle}>UniPass Campus Store Service Rules</Text>
              </View>
            </View>
            
            <View style={styles.policyList}>
              <View style={styles.policyItemRow}>
                <Banknote size={18} color="#059669" />
                <Text style={styles.policyItemText}>
                  Supports <Text style={styles.policyItemHighlight}>Cash on Pickup</Text> or <Text style={styles.policyItemHighlight}>Direct Student Account</Text>.
                </Text>
              </View>
              <View style={styles.policyItemRow}>
                <Receipt size={18} color="#800000" />
                <Text style={styles.policyItemText}>
                  Standard <Text style={styles.policyItemHighlightRed}>+₱15.00</Text> digital campus service markup fee.
                </Text>
              </View>
              <View style={styles.policyItemRow}>
                <MapPin size={18} color="#D97706" />
                <Text style={styles.policyItemText}>
                  Pickups at <Text style={styles.policyItemHighlight}>Gym Booth B</Text> or <Text style={styles.policyItemHighlight}>Lucinda Campus</Text>.
                </Text>
              </View>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Fixed Bottom Cart Nav */}
      <View style={styles.bottomCartNav}>
        <View style={styles.bottomCartNavContent}>
          <View style={styles.bottomCartTotalBox}>
            <Text style={styles.bottomCartTotalLbl}>Subtotal (inc. ₱15 fee)</Text>
            <Text style={styles.bottomCartTotalVal}>₱{cartTotal.toFixed(2)}</Text>
          </View>
          <Pressable style={styles.viewCartBtn} onPress={() => setShowCart(true)}>
            <Text style={styles.viewCartBtnText}>View Cart • ₱{cartTotal.toFixed(2)}</Text>
            <ArrowRight size={18} color="#FFC632" />
          </Pressable>
        </View>
      </View>

      {/* Product Detail Bottom Sheet Modal */}
      {selectedProduct && (
        <Modal visible transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <Pressable style={styles.modalBackdrop} onPress={() => setSelectedProduct(null)} />
            <View style={styles.bottomSheet}>
              
              {/* Sheet Header */}
              <View style={styles.sheetHeader}>
                <Text style={styles.sheetTitle}>Product Details</Text>
                <Pressable onPress={() => setSelectedProduct(null)} style={styles.closeBtn}>
                  <X size={20} color="#1B2336" />
                </Pressable>
              </View>

              <ScrollView style={styles.sheetScroll}>
                <View style={styles.sheetProductInfo}>
                  <Text style={styles.sheetOrgBadge}>{selectedProduct.org}</Text>
                  <Text style={styles.sheetProductName}>{selectedProduct.name}</Text>
                  <Text style={styles.sheetProductPrice}>{selectedProduct.price}</Text>
                </View>

                {/* Size Selector */}
                <View style={styles.sheetSection}>
                  <Text style={styles.sheetSectionLabel}>SELECT SIZE (UNISEX)</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sizeScroll}>
                    {SIZES.map(size => (
                      <Pressable 
                        key={size}
                        style={[styles.sizeChip, selectedSize === size && styles.sizeChipActive]}
                        onPress={() => setSelectedSize(size)}
                      >
                        <Text style={[styles.sizeText, selectedSize === size && styles.sizeTextActive]}>{size}</Text>
                      </Pressable>
                    ))}
                  </ScrollView>
                </View>

                {/* Claim Point Confirmation */}
                <View style={styles.sheetSection}>
                  <Text style={styles.sheetSectionLabel}>CLAIM POINT</Text>
                  <View style={styles.claimBox}>
                    <MapPin size={18} color="#800000" />
                    <View style={styles.claimTexts}>
                      <Text style={styles.claimCampus}>TSU Main Campus</Text>
                      <Text style={styles.claimRoom}>CBA Dean's Office / Org Room</Text>
                    </View>
                  </View>
                </View>

                {/* Payment Toggle */}
                <View style={styles.sheetSection}>
                  <Text style={styles.sheetSectionLabel}>PAYMENT MODE</Text>
                  <View style={styles.paymentGrid}>
                    <Pressable 
                      style={[styles.paymentBtn, paymentMode === 'online' && styles.paymentBtnActive]}
                      onPress={() => setPaymentMode('online')}
                    >
                      <CreditCard size={18} color={paymentMode === 'online' ? '#800000' : '#7A7A7A'} />
                      <Text style={[styles.paymentText, paymentMode === 'online' && styles.paymentTextActive]}>Online</Text>
                    </Pressable>
                    <Pressable 
                      style={[styles.paymentBtn, paymentMode === 'cash' && styles.paymentBtnActive]}
                      onPress={() => setPaymentMode('cash')}
                    >
                      <Banknote size={18} color={paymentMode === 'cash' ? '#800000' : '#7A7A7A'} />
                      <Text style={[styles.paymentText, paymentMode === 'cash' && styles.paymentTextActive]}>Cash on Claim</Text>
                    </Pressable>
                  </View>
                </View>

                <View style={styles.sheetSpacer} />
              </ScrollView>

              <View style={styles.sheetFooter}>
                <Pressable 
                  style={styles.primaryCta} 
                  onPress={() => {
                    addMerchItem({
                      id: selectedProduct.id.toString(),
                      name: selectedProduct.name,
                      price: parseFloat(selectedProduct.price.replace('₱', '')),
                      size: selectedSize,
                      org: selectedProduct.org
                    });
                    setSelectedProduct(null);
                  }}
                >
                  <Text style={styles.primaryCtaText}>Pre-Order Merchandise</Text>
                </Pressable>
              </View>

            </View>
          </View>
        </Modal>
      )}

      {/* Sliding Cart Modal */}
      <Modal visible={showCart} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <Pressable style={styles.modalBackdrop} onPress={() => setShowCart(false)} />
          <View style={styles.bottomSheet}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Your Cart</Text>
              <Pressable onPress={() => setShowCart(false)} style={styles.closeBtn}>
                <X size={20} color="#1B2336" />
              </Pressable>
            </View>
            <ScrollView style={styles.sheetScroll}>
              {merchCart.map((item, index) => (
                <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                  <View>
                    <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 14 }}>{item.quantity}x {item.name}</Text>
                    <Text style={{ fontFamily: 'Manrope_500Medium', fontSize: 12, color: '#7A7A7A' }}>Size: {item.size}</Text>
                  </View>
                  <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 14 }}>₱{(item.price * item.quantity).toFixed(2)}</Text>
                </View>
              ))}
              <View style={{ height: 1, backgroundColor: '#E2E5EB', marginVertical: 12 }} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                <Text style={{ fontFamily: 'Manrope_600SemiBold', fontSize: 14 }}>Subtotal</Text>
                <Text style={{ fontFamily: 'Manrope_600SemiBold', fontSize: 14 }}>₱{cartSubtotal.toFixed(2)}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                <Text style={{ fontFamily: 'Manrope_600SemiBold', fontSize: 14 }}>Service Fee</Text>
                <Text style={{ fontFamily: 'Manrope_600SemiBold', fontSize: 14 }}>₱{cartSubtotal > 0 ? fee.toFixed(2) : '0.00'}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 }}>
                <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 16 }}>Total</Text>
                <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontSize: 18, color: '#800000' }}>₱{cartTotal.toFixed(2)}</Text>
              </View>
            </ScrollView>
            <View style={styles.sheetFooter}>
              <Pressable style={styles.primaryCta} onPress={handleCheckout}>
                <Text style={styles.primaryCtaText}>Confirm & Pay ₱{cartTotal.toFixed(2)}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

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
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E5EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  appBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBtn: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appBarTitle: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 20,
    color: '#1B2336',
  },
  cartBtn: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -2,
    right: -4,
    backgroundColor: '#800000',
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 10,
    color: '#FFFFFF',
  },
  mainScroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120, // space for bottom cart nav
  },
  subHeader: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  subHeaderText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 12,
    color: '#7A7A7A',
  },
  semesterBadge: {
    backgroundColor: '#F4F5F7',
    borderWidth: 1,
    borderColor: '#E2E5EB',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 16,
  },
  semesterText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 11,
    color: '#444651',
    letterSpacing: 0.5,
  },
  collegeSection: {
    paddingVertical: 4,
  },
  collegeScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  collegeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E5EB',
    gap: 6,
  },
  collegeChipActive: {
    backgroundColor: '#4A4A4A',
    borderColor: '#222222',
  },
  collegeIconBg: {
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  collegeIconText: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 9,
  },
  collegeText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 12,
    color: '#444651',
  },
  collegeTextActive: {
    color: '#FFFFFF',
  },
  collegeActiveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFC632',
  },
  orgSection: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  orgSectionLabel: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 11,
    color: '#7A7A7A',
    letterSpacing: 0.5,
    marginRight: 4,
  },
  orgScroll: {
    gap: 6,
  },
  orgChip: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E5EB',
    gap: 4,
  },
  orgChipActive: {
    backgroundColor: '#800000',
    borderColor: '#800000',
  },
  orgChipActiveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ffb4a8',
  },
  orgChipText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 12,
    color: '#444651',
  },
  orgChipTextActive: {
    color: '#FFFFFF',
  },
  dropBannerContainer: {
    paddingHorizontal: 16,
    marginTop: 4,
  },
  dropBanner: {
    backgroundColor: '#4A4A4A',
    borderRadius: 12,
    padding: 14,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#222222',
  },
  dropBannerBgDeco: {
    position: 'absolute',
    right: -24,
    bottom: -24,
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  dropBannerContent: {
    position: 'relative',
    zIndex: 1,
    flexDirection: 'column',
    gap: 6,
  },
  dropHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dropBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFC632',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    gap: 4,
  },
  dropBadgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#800000',
  },
  dropBadgeText: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 11,
    color: '#222222',
    letterSpacing: 0.5,
  },
  dropSubtitle: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: '#fde68a',
  },
  dropTitle: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 2,
  },
  dropDesc: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: '#E5E7EB',
  },
  dropDescHighlight: {
    fontFamily: 'Manrope_600SemiBold',
    color: '#FFC632',
  },
  dropFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  dropTimeLimit: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: '#D1D5DB',
  },
  dropCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  dropCtaText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 12,
    color: '#FFC632',
  },
  catalogHeader: {
    paddingHorizontal: 16,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  catalogHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  catalogTitle: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 16,
    color: '#1B2336',
  },
  catalogCountBadge: {
    backgroundColor: '#F4F5F7',
    borderWidth: 1,
    borderColor: '#E2E5EB',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  catalogCountText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 11,
    color: '#7A7A7A',
  },
  catalogHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    height: 28,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E5EB',
  },
  filterBtnText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 12,
    color: '#444651',
  },
  catalogGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    marginTop: 12,
    gap: 12,
  },
  productCard: {
    width: CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E5EB',
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    overflow: 'hidden',
    marginBottom: 8,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  orgTagWrapper: {
    position: 'absolute',
    top: 6,
    left: 6,
  },
  orgTagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
    gap: 4,
  },
  orgTagDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFC632',
  },
  orgTagText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 11,
    color: '#FFC632',
    letterSpacing: 0.5,
  },
  favBtn: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productInfo: {
    flex: 1,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  ratingText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 12,
    color: '#1B2336',
  },
  reviewsText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: '#7A7A7A',
  },
  productTitle: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 14,
    color: '#1B2336',
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    marginBottom: 4,
  },
  productPrice: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 15,
    color: '#800000',
  },
  featureTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  featureTagEmerald: {
    backgroundColor: '#ECFDF5',
    borderColor: 'rgba(167, 243, 208, 0.6)',
  },
  featureTagAmber: {
    backgroundColor: '#FFFBEB',
    borderColor: 'rgba(253, 230, 138, 0.6)',
  },
  featureTagRose: {
    backgroundColor: '#FFF1F2',
    borderColor: '#FFE4E6',
  },
  featureTagText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 11,
    letterSpacing: 0.5,
  },
  featureTagTextEmerald: {
    color: '#065F46',
  },
  featureTagTextAmber: {
    color: '#92400E',
  },
  featureTagTextRose: {
    color: '#9F1239',
  },
  descRow: {
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: 'rgba(226, 229, 235, 0.5)',
  },
  descText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: '#7A7A7A',
  },
  addCartBtn: {
    marginTop: 8,
    width: '100%',
    height: 36,
    borderRadius: 8,
    backgroundColor: '#800000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  addCartText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  policyContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  policyCard: {
    backgroundColor: '#F4F5F7',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E5EB',
    padding: 14,
    flexDirection: 'column',
    gap: 10,
  },
  policyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  policyIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#FFF1F2',
    borderWidth: 1,
    borderColor: '#FFE4E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  policyHeaderTexts: {
    flex: 1,
  },
  policyTitle: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 16,
    color: '#1B2336',
  },
  policySubtitle: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: '#7A7A7A',
  },
  policyList: {
    paddingTop: 2,
    gap: 6,
  },
  policyItemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  policyItemText: {
    flex: 1,
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    color: '#444651',
    lineHeight: 20,
  },
  policyItemHighlight: {
    fontFamily: 'Manrope_600SemiBold',
    color: '#1B2336',
  },
  policyItemHighlightRed: {
    fontFamily: 'Manrope_600SemiBold',
    color: '#800000',
  },
  bottomCartNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E5EB',
  },
  bottomCartNavContent: {
    height: 80,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  bottomCartTotalBox: {
    flexDirection: 'column',
  },
  bottomCartTotalLbl: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: '#7A7A7A',
  },
  bottomCartTotalVal: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 18,
    color: '#1B2336',
  },
  viewCartBtn: {
    flex: 1,
    height: 48,
    backgroundColor: '#800000',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  viewCartBtnText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(27, 35, 54, 0.6)',
  },
  bottomSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E5EB',
  },
  sheetTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 20,
    color: '#1B2336',
  },
  closeBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4F5F7',
    borderRadius: 16,
  },
  sheetScroll: {
    padding: 20,
  },
  sheetProductInfo: {
    marginBottom: 24,
  },
  sheetOrgBadge: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 11,
    color: '#7A7A7A',
    letterSpacing: 1,
    marginBottom: 4,
  },
  sheetProductName: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 18,
    color: '#222222',
    marginBottom: 8,
  },
  sheetProductPrice: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 24,
    color: '#800000',
  },
  sheetSection: {
    marginBottom: 24,
  },
  sheetSectionLabel: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 11,
    color: '#7A7A7A',
    letterSpacing: 1,
    marginBottom: 12,
  },
  sizeScroll: {
    gap: 8,
  },
  sizeChip: {
    height: 48,
    minWidth: 48,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#F4F5F7',
    borderWidth: 1,
    borderColor: '#E2E5EB',
  },
  sizeChipActive: {
    backgroundColor: '#1B2336',
    borderColor: '#1B2336',
  },
  sizeText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 14,
    color: '#4A4A4A',
  },
  sizeTextActive: {
    color: '#FFFFFF',
  },
  claimBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F5F7',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E5EB',
    gap: 12,
  },
  claimTexts: {
    flex: 1,
  },
  claimCampus: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 14,
    color: '#222222',
  },
  claimRoom: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 13,
    color: '#7A7A7A',
    marginTop: 2,
  },
  paymentGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  paymentBtn: {
    flex: 1,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4F5F7',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E5EB',
    gap: 8,
  },
  paymentBtnActive: {
    backgroundColor: '#FFF7F5',
    borderColor: '#800000',
  },
  paymentText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 13,
    color: '#4A4A4A',
  },
  paymentTextActive: {
    color: '#800000',
    fontFamily: 'Manrope_700Bold',
  },
  sheetSpacer: {
    height: 40,
  },
  sheetFooter: {
    padding: 20,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: '#E2E5EB',
    backgroundColor: '#FFFFFF',
  },
  primaryCta: {
    height: 48,
    backgroundColor: '#800000',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryCtaText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 15,
    color: '#FFFFFF',
  }
});

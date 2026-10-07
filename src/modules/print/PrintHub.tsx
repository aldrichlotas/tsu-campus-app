import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Modal, SafeAreaView, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useDemo } from '../../context/DemoContext';
import { 
  ArrowLeft,
  FileText,
  UploadCloud,
  CheckCircle2,
  Check,
  MapPin,
  Clock,
  Printer,
  Settings2,
  ChevronDown,
  Trash2,
  Eye,
  CreditCard,
  Banknote,
  Send
} from 'lucide-react-native';

export default function PrintHub() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { studentName, studentId, submitPrintOrder, activePrintJob, balance } = useDemo();
  const [activeHub, setActiveHub] = useState('hub-1');
  const [colorMode, setColorMode] = useState('bw');
  const [sidedness, setSidedness] = useState('duplex');
  const [showModal, setShowModal] = useState(false);
  const [pages, setPages] = useState('14');

  const numericPages = parseInt(pages, 10) || 0;
  const cost = (colorMode === 'bw' ? 2.0 : 8.0) * numericPages;

  const handleSubmit = () => {
    if (balance < cost) {
      Alert.alert('Insufficient Balance', 'Insufficient Ledger Balance');
      return;
    }
    const success = submitPrintOrder({
      shopName: activeHub === 'hub-1' ? 'TSU Main: Library Fleet' : 'TSU Lucinda: Tech Center',
      fileName: 'CS301_Final_Project.pdf',
      colorMode: colorMode === 'bw' ? 'Grayscale' : 'Full Color',
      pages: numericPages,
      duplex: sidedness === 'duplex'
    });
    if (success) {
      setShowModal(true);
    }
  };

  return (
    <View style={styles.container}>
      {/* Dynamic Top App Bar */}
      <View style={[styles.appBar, { paddingTop: insets.top || 8, height: 56 + (insets.top || 8) }]}>
        <View style={styles.appBarLeft}>
          <Pressable style={styles.iconBtn} onPress={() => router.push('/')}>
            <ArrowLeft size={24} color="#1B2336" />
          </Pressable>
          <Text style={styles.appBarTitle}>Campus Print Hub</Text>
        </View>
        <Pressable style={styles.iconBtn}>
          <FileText size={22} color="#800000" />
        </Pressable>
      </View>

      <ScrollView style={styles.mainScroll} contentContainerStyle={[styles.scrollContent, { flexGrow: 1, paddingBottom: (insets.bottom || 0) + 32 }]}>
        
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.headerLeft}>
            <View style={styles.liveBadgeRow}>
              <View style={styles.liveBadge}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>QUEUE ONLINE</Text>
              </View>
            </View>
            <Text style={styles.pageTitle}>University Print Hub</Text>
            <Text style={styles.pageSubtitle}>Advance file processing & express pickup desk</Text>
          </View>
        </View>

        {/* Hub Selector */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <MapPin size={22} color="#800000" />
              <Text style={styles.cardTitle}>Verified Partner Print Shops</Text>
            </View>
          </View>

          <View style={styles.hubList}>
            {/* Hub 1: TSU Main */}
            <Pressable 
              style={[styles.hubItem, activeHub === 'hub-1' && styles.hubItemActive]}
              onPress={() => setActiveHub('hub-1')}
            >
              <View style={styles.hubItemLeft}>
                <View style={styles.hubIconBg}>
                  <Printer size={18} color="#FFFFFF" />
                </View>
                <View style={styles.hubItemInfo}>
                  <View style={styles.hubItemTitleRow}>
                    <Text style={styles.hubItemTitle} numberOfLines={1}>TSU Main: Library Fleet</Text>
                    <View style={styles.verifiedBadge}>
                      <Text style={styles.verifiedText}>VERIFIED</Text>
                    </View>
                  </View>
                  <Text style={styles.hubItemSub}>Ground Floor East Wing • 50m away</Text>
                  <Text style={styles.servicesText}>Laser • Colored • Ring Binding</Text>
                </View>
              </View>
              <View style={[styles.radioDot, activeHub === 'hub-1' && styles.radioDotActive]}>
                {activeHub === 'hub-1' && <Check size={12} color="#FFFFFF" />}
              </View>
            </Pressable>

            {/* Hub 2: Lucinda */}
            <Pressable 
              style={[styles.hubItem, activeHub === 'hub-2' && styles.hubItemActive]}
              onPress={() => setActiveHub('hub-2')}
            >
              <View style={styles.hubItemLeft}>
                <View style={[styles.hubIconBg, {backgroundColor: '#F4F5F7'}]}>
                  <Printer size={18} color="#1B2336" />
                </View>
                <View style={styles.hubItemInfo}>
                  <View style={styles.hubItemTitleRow}>
                    <Text style={styles.hubItemTitle} numberOfLines={1}>TSU Lucinda: Tech Center</Text>
                    <View style={styles.verifiedBadge}>
                      <Text style={styles.verifiedText}>VERIFIED</Text>
                    </View>
                  </View>
                  <Text style={styles.hubItemSub}>Open 8:00 AM - 5:00 PM • 1.2km away</Text>
                  <Text style={styles.servicesText}>Laser • Hardbound • Large Format</Text>
                </View>
              </View>
              <View style={[styles.radioDot, activeHub === 'hub-2' && styles.radioDotActive]}>
                {activeHub === 'hub-2' && <Check size={12} color="#FFFFFF" />}
              </View>
            </Pressable>
          </View>
        </View>

        {/* File Upload Area */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <UploadCloud size={22} color="#800000" />
              <Text style={styles.cardTitle}>Document Upload</Text>
            </View>
          </View>
          
          <View style={styles.dropzone}>
            <View style={styles.dropIconBox}>
              <UploadCloud size={24} color="#800000" />
            </View>
            <Text style={styles.dropzoneTitle}>Upload research paper or reviewer</Text>
            <Text style={styles.dropzoneSub}>Supports PDF, DOCX, PPTX</Text>
            <View style={styles.browseBtn}>
              <Text style={styles.browseBtnText}>Browse Device Storage</Text>
            </View>
          </View>

          {/* Uploaded File */}
          <View style={styles.fileRow}>
            <View style={styles.fileRowLeft}>
              <View style={styles.fileExtBadge}>
                <Text style={styles.fileExtText}>PDF</Text>
              </View>
              <View>
                <Text style={styles.fileName}>CS301_Final_Project.pdf</Text>
                <Text style={styles.fileMeta}>3.4 MB • {numericPages} pages indexed</Text>
              </View>
            </View>
            <View style={styles.fileActions}>
              <Pressable style={styles.fileActionBtn}>
                <Eye size={16} color="#1B2336" />
              </Pressable>
              <Pressable style={styles.fileActionBtn}>
                <Trash2 size={16} color="#DC2626" />
              </Pressable>
            </View>
          </View>
        </View>

        {/* Print Specifications */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <Settings2 size={22} color="#800000" />
              <Text style={styles.cardTitle}>Print Job Specifications</Text>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>SENDER NAME / STUDENT ID</Text>
            <View style={styles.inputBox}>
              <Text style={styles.inputText}>{studentName} ({studentId})</Text>
              <View style={styles.verifiedPill}>
                <Text style={styles.verifiedPillText}>SSO VERIFIED</Text>
              </View>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>SUBJECT / JOB TITLE</Text>
            <TextInput 
              style={styles.textInput}
              placeholder="e.g. ENG101 Final Output"
              placeholderTextColor="#7A7A7A"
              defaultValue="CS301 - Operating Systems"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>PAGE COUNT</Text>
            <TextInput 
              style={styles.textInput}
              keyboardType="number-pad"
              value={pages}
              onChangeText={setPages}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>COLOR MODE</Text>
            <View style={styles.rowGrid}>
              <Pressable 
                style={[styles.gridBtn, colorMode === 'bw' && styles.gridBtnActive]}
                onPress={() => setColorMode('bw')}
              >
                <Text style={[styles.gridBtnTitle, colorMode === 'bw' && styles.gridBtnTitleActive]}>B&W Monochrome</Text>
                <Text style={[styles.gridBtnSub, colorMode === 'bw' && styles.gridBtnSubActive]}>₱2.00 / page</Text>
              </Pressable>
              <Pressable 
                style={[styles.gridBtn, colorMode === 'color' && styles.gridBtnActive]}
                onPress={() => setColorMode('color')}
              >
                <Text style={[styles.gridBtnTitle, colorMode === 'color' && styles.gridBtnTitleActive]}>Full Color</Text>
                <Text style={[styles.gridBtnSub, colorMode === 'color' && styles.gridBtnSubActive]}>₱8.00 / page</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>PAGE SIDEDNESS</Text>
            <View style={styles.rowGrid}>
              <Pressable 
                style={[styles.gridBtn, sidedness === 'duplex' && styles.gridBtnActive]}
                onPress={() => setSidedness('duplex')}
              >
                <Text style={[styles.gridBtnTitle, sidedness === 'duplex' && styles.gridBtnTitleActive]}>Duplex (Back-to-Back)</Text>
              </Pressable>
              <Pressable 
                style={[styles.gridBtn, sidedness === 'single' && styles.gridBtnActive]}
                onPress={() => setSidedness('single')}
              >
                <Text style={[styles.gridBtnTitle, sidedness === 'single' && styles.gridBtnTitleActive]}>Single-Sided</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>SPECIAL INSTRUCTIONS</Text>
            <TextInput 
              style={[styles.textInput, styles.textArea]}
              placeholder="e.g. Ring bind, staple top left..."
              placeholderTextColor="#7A7A7A"
              multiline
            />
          </View>
        </View>

      </ScrollView>

      {/* Bottom Sticky Action */}
      <View style={[styles.bottomTray, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <View style={styles.estimateRow}>
          <Text style={styles.estimateLabel}>Est. ₱{cost.toFixed(2)}</Text>
          <Text style={styles.estimateSub}>• Online or Cash at Counter</Text>
        </View>
        <Pressable style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitBtnText}>Submit & Queue Print Job</Text>
        </Pressable>
      </View>

      {/* Ticket Modal */}
      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalIconBox}>
              <CheckCircle2 size={36} color="#800000" />
            </View>
            <Text style={styles.modalStatus}>PRINT JOB DISPATCHED</Text>
            <Text style={styles.modalTitle}>Queue PIN Ready</Text>
            <Text style={styles.modalDesc}>Present this code at the terminal</Text>
            
            <View style={styles.pinBox}>
              <Text style={styles.pinText}>{activePrintJob?.pin || 'PR-492'}</Text>
              <Text style={styles.pinSub}>Est. Ready: 10:18 AM</Text>
            </View>

            <Pressable style={styles.modalCloseBtn} onPress={() => setShowModal(false)}>
              <Text style={styles.modalCloseText}>Dismiss to Dashboard</Text>
            </Pressable>
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
  iconBtn: {
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
  mainScroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
    gap: 16,
  },
  headerSection: {
    marginBottom: 8,
  },
  headerLeft: {
    flexDirection: 'column',
  },
  liveBadgeRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  liveText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 10,
    color: '#065F46',
    letterSpacing: 0.5,
  },
  pageTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 24,
    color: '#222222',
  },
  pageSubtitle: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    color: '#4A4A4A',
    marginTop: 2,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E5EB',
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 16,
    color: '#222222',
  },
  hubList: {
    gap: 12,
  },
  hubItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E5EB',
  },
  hubItemActive: {
    backgroundColor: '#FFF7F5',
    borderColor: '#800000',
    borderWidth: 2,
  },
  hubItemLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    flex: 1,
  },
  hubIconBg: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#800000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hubItemInfo: {
    flex: 1,
  },
  hubItemTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  hubItemTitle: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 14,
    color: '#222222',
    flex: 1,
  },
  verifiedBadge: {
    backgroundColor: '#FFC632',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  verifiedText: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 9,
    color: '#222222',
  },
  hubItemSub: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: '#4A4A4A',
    marginTop: 2,
  },

  servicesText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 11,
    color: '#7A7A7A',
    marginTop: 4,
  },
  radioDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E5EB',
    backgroundColor: '#F4F5F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  radioDotActive: {
    backgroundColor: '#800000',
    borderColor: '#800000',
  },
  dropzone: {
    backgroundColor: '#F4F5F7',
    borderWidth: 2,
    borderColor: '#E2E5EB',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ffdad4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  dropzoneTitle: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 14,
    color: '#222222',
    textAlign: 'center',
  },
  dropzoneSub: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: '#4A4A4A',
    textAlign: 'center',
    marginTop: 4,
  },
  browseBtn: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E5EB',
  },
  browseBtnText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 12,
    color: '#222222',
  },
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F4F5F7',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#E2E5EB',
  },
  fileRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  fileExtBadge: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: 'rgba(220, 38, 38, 0.2)',
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileExtText: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 12,
    color: '#DC2626',
  },
  fileName: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 14,
    color: '#222222',
  },
  fileMeta: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 12,
    color: '#4A4A4A',
  },
  fileActions: {
    flexDirection: 'row',
    gap: 8,
  },
  fileActionBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E5EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 10,
    color: '#7A7A7A',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F4F5F7',
    borderWidth: 1,
    borderColor: '#E2E5EB',
    borderRadius: 4,
    height: 40,
    paddingHorizontal: 12,
  },
  inputText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 14,
    color: '#222222',
  },
  textInput: {
    backgroundColor: '#F4F5F7',
    borderWidth: 1,
    borderColor: '#E2E5EB',
    borderRadius: 4,
    height: 40,
    paddingHorizontal: 12,
    fontFamily: 'Manrope_500Medium',
    fontSize: 14,
    color: '#222222',
  },
  textArea: {
    height: 80,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
  verifiedPill: {
    backgroundColor: '#FFC632',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  verifiedPillText: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 9,
    color: '#222222',
  },
  rowGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  gridBtn: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#F4F5F7',
    borderWidth: 1,
    borderColor: '#E2E5EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridBtnActive: {
    backgroundColor: '#800000',
    borderColor: '#800000',
  },
  gridBtnTitle: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 13,
    color: '#222222',
  },
  gridBtnTitleActive: {
    color: '#FFFFFF',
  },
  gridBtnSub: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 11,
    color: '#7A7A7A',
    marginTop: 2,
  },
  gridBtnSubActive: {
    color: '#FFC632',
  },
  bottomTray: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E5EB',
    padding: 16,
  },
  estimateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginBottom: 12,
  },
  estimateLabel: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 14,
    color: '#800000',
  },
  estimateSub: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 12,
    color: '#7A7A7A',
  },
  submitBtn: {
    backgroundColor: '#800000',
    borderRadius: 8,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 15,
    color: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(27, 35, 54, 0.65)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  modalCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  modalIconBox: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFF3D6',
    borderWidth: 2,
    borderColor: '#FFC632',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  modalStatus: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 11,
    color: '#800000',
    letterSpacing: 1,
  },
  modalTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 24,
    color: '#222222',
    marginTop: 4,
  },
  modalDesc: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 14,
    color: '#4A4A4A',
    marginTop: 4,
    textAlign: 'center',
  },
  pinBox: {
    width: '100%',
    backgroundColor: '#F4F5F7',
    borderWidth: 1,
    borderColor: '#E2E5EB',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  pinText: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 32,
    color: '#800000',
    letterSpacing: 2,
  },
  pinSub: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 12,
    color: '#4A4A4A',
    marginTop: 4,
  },
  modalCloseBtn: {
    width: '100%',
    backgroundColor: '#800000',
    borderRadius: 8,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCloseText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 14,
    color: '#FFFFFF',
  }
});

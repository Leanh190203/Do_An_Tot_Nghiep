import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Linking, Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type ContactCardProps = {
  icon: string;
  label: string;
  value: string;
  onPress?: () => void; // Dấu hỏi thể hiện rằng onPress là không bắt buộc
};

const ContactCard: React.FC<ContactCardProps> = ({ icon, label, value, onPress }) => (
  <Pressable style={styles.infoCard} onPress={onPress}>
    <MaterialCommunityIcons name={icon} size={28} color="#1976D2" />
    <View style={styles.textWrapper}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.infoText, onPress && styles.linkText]}>{value}</Text>
    </View>
  </Pressable>
);

export default function ContactScreen() {
  const handleLinkPress = (url: string) => Linking.openURL(url);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📞 Liên hệ phòng khám</Text>
      <Image source={require("@/assets/images/anh4.jpg")} style={styles.banner} resizeMode="cover" />
      
      <ContactCard icon="phone" label="Hotline" value="0962 122 407" onPress={() => handleLinkPress('tel:0962122407')} />
      <ContactCard icon="email" label="Email" value="lehonganh1902@gmail.com" onPress={() => handleLinkPress('mailto:lehonganh1902@gmail.com')} />
      <ContactCard icon="web" label="App" value="chamsocthucung" onPress={() => handleLinkPress('https://lehonganh1902.com')} />

      <View style={styles.mapContainer}>
        <Text style={styles.mapTitle}>📍 Địa chỉ phòng khám</Text>
        <Text style={styles.mapText}>Số nhà 19 Làng Quang Hiền xã Hiền Giang huyện Thường Tín tp Hà Nội</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#F8FAFC', padding: 20 },
  title: { fontSize: 25, fontWeight: 'bold', color: '#1976D2', textAlign: 'center', marginVertical: 20 },
  banner: { width: '100%', height: 180, borderRadius: 15, marginBottom: 20 },
  infoCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E3F2FD', borderRadius: 10, padding: 12, marginBottom: 12 },
  textWrapper: { marginLeft: 10 },
  label: { fontSize: 16, fontWeight: 'bold', color: '#1976D2' },
  infoText: { fontSize: 16, color: '#1976D2' },
  linkText: { textDecorationLine: 'underline' },
  mapContainer: { backgroundColor: '#FFF', padding: 15, borderRadius: 10, elevation: 3, alignItems: 'center', marginTop: 20 },
  mapTitle: { fontSize: 18, fontWeight: 'bold', color: '#1976D2', marginBottom: 8 },
  mapText: { fontSize: 16, color: '#555' }
});
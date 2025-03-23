import React, { useState } from 'react';
import { Image, StyleSheet, View, Text, Pressable, SafeAreaView, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomButton = ({ title, onPress }: { title: string; onPress: () => void }) => (
  <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </Pressable>
);

export default function HomeScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require("../assets/images/Logo_DAI_NAM.png")} style={styles.logo} resizeMode="contain" />
        <TextInput style={styles.searchBar} placeholder="🔍 Tìm kiếm..." value={searchQuery} onChangeText={setSearchQuery} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {activeTab === 'home' && (
          <View style={styles.innerContent}>
            <Text style={styles.title}>🐾 Trang Chủ</Text>
          </View>
        )}
        {activeTab === 'medicalRecords' && (
          <View style={styles.innerContent}>
            <Text style={styles.title}>📑 Bệnh Án</Text>
            <CustomButton title="🐾 Bệnh Án Thú Y" onPress={() => router.push("/home/benh_an")} />
            <CustomButton title="📅 Đặt Lịch Hẹn" onPress={() => router.push("/home/lich_hen")} />
          </View>
        )}
        {activeTab === 'account' && (
          <View style={styles.innerContent}>
            <Text style={styles.title}>👨‍💼 Tài Khoản</Text>
            <CustomButton title="🔑 Đăng Nhập" onPress={() => router.push("/home/dang_nhap")} />
            <CustomButton title="📝 Đăng Ký" onPress={() => router.push("/home/dang_ki")} />
          </View>
        )}
      </ScrollView>

      {/* Navbar */}
      <View style={styles.navbar}>
        {[
          { icon: 'home', label: 'Trang Chủ', key: 'home' },
          { icon: 'file-document', label: 'Bệnh Án', key: 'medicalRecords' },
          { icon: 'message-alert', label: 'Liên Hệ', key: 'notifications', route: '/home/lien_he' },
          { icon: 'account-circle', label: 'Tài Khoản', key: 'account' }
        ].map(({ icon, label, key, route }) => (
          <Pressable
            key={key}
            style={[styles.navButton, activeTab === key && styles.activeTab]}
            onPress={() => {
              if (key === 'notifications') {
                router.push('/home/lien_he');
              } else {
                setActiveTab(key);
              }
            }}
          >
            <MaterialCommunityIcons name={icon} size={28} color={activeTab === key ? "#1976D2" : "#666"} />
            <Text style={[styles.navText, activeTab === key && { color: "#1976D2" }]}>{label}</Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#FFF', height: 90, borderBottomWidth: 1, borderColor: '#E0E0E0' },
  logo: { width: 90, height: 50 },
  searchBar: { flex: 1, backgroundColor: '#F1F1F1', borderRadius: 10, padding: 10, fontSize: 16, marginLeft: 12 },
  content: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15 },
  innerContent: { width: '90%', alignItems: 'center', marginBottom: 20, padding: 15, borderRadius: 10, backgroundColor: '#FFF', elevation: 3 },
  title: { fontSize: 30, fontWeight: 'bold', color: '#1976D2', textAlign: 'center' },
  text: { fontSize: 16, color: '#555', textAlign: 'center' },
  button: { backgroundColor: '#42A5F5', padding: 12, borderRadius: 10, marginVertical: 8, width: '100%', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  buttonPressed: { backgroundColor: '#1E88E5' },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  navbar: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', backgroundColor: '#FFF', paddingVertical: 12, position: 'absolute', bottom: 0, left: 0, right: 0, borderTopLeftRadius: 20, borderTopRightRadius: 20, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  navButton: { flex: 1, alignItems: 'center', paddingVertical: 8 },
  navText: { fontSize: 12, fontWeight: 'bold', color: '#666', marginTop: 4 },
  activeTab: { backgroundColor: '#BBDEFB', borderRadius: 10, paddingVertical: 6 },
});
import React, { useState } from 'react';
import { Image, View, Text, Pressable, SafeAreaView, ScrollView, TextInput, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles/index';

// Định nghĩa kiểu dữ liệu cho props của CustomButton
interface CustomButtonProps {
  title: string;
  onPress: () => void;
  iconName?: string;
}

// Định nghĩa kiểu dữ liệu cho bệnh án
interface MedicalRecord {
  id: string;
  petName: string;
  petType: string;
  symptoms: string;
  appointmentDate: string;
}

const CustomButton = ({ title, onPress, iconName }: CustomButtonProps) => (
  <Pressable
    style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
    onPress={onPress}
  >
    {iconName && <MaterialCommunityIcons name={iconName} size={20} color="#FFF" style={styles.buttonIcon} />}
    <Text style={styles.buttonText}>{title}</Text>
  </Pressable>
);

export default function HomeScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [medicalForm, setMedicalForm] = useState({
    petName: '',
    petType: '',
    symptoms: '',
    appointmentDate: '',
  });
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [showForm, setShowForm] = useState(true);

  const handleMedicalFormSubmit = () => {
    if (!medicalForm.petName || !medicalForm.petType || !medicalForm.symptoms || !medicalForm.appointmentDate) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    const newRecord: MedicalRecord = {
      id: Date.now().toString(),
      ...medicalForm,
    };

    setMedicalRecords([...medicalRecords, newRecord]);
    alert(`Đã gửi thông tin: \nTên thú cưng: ${medicalForm.petName}\nLoại thú: ${medicalForm.petType}\nTriệu chứng: ${medicalForm.symptoms}\nNgày hẹn: ${medicalForm.appointmentDate}`);
    setMedicalForm({ petName: '', petType: '', symptoms: '', appointmentDate: '' });
    setShowForm(false);
  };

  const renderMedicalRecord = ({ item }: { item: MedicalRecord }) => (
    <View style={styles.recordItem}>
      <Text style={styles.recordText}>Tên thú cưng: {item.petName}</Text>
      <Text style={styles.recordText}>Loại thú: {item.petType}</Text>
      <Text style={styles.recordText}>Triệu chứng: {item.symptoms}</Text>
      <Text style={styles.recordText}>Ngày hẹn: {item.appointmentDate}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#1976D2', '#42A5F5']} style={styles.header}>
        <Image source={require("../assets/images/Logo_DAI_NAM.png")} style={styles.logo} resizeMode="contain" />
        <View style={styles.searchContainer}>
          <MaterialCommunityIcons name="magnify" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchBar}
            placeholder="Tìm kiếm..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content}>
        {activeTab === 'home' && (
          <View style={styles.innerContent}>
            <View style={styles.titleContainer}>
              <MaterialCommunityIcons name="paw" size={32} color="#1976D2" style={styles.titleIcon} />
              <Text style={styles.title}>Trang Chủ</Text>
            </View>
          </View>
        )}
        {activeTab === 'medicalRecords' && (
          <View style={styles.innerContent}>
            <View style={styles.titleContainer}>
              <MaterialCommunityIcons name="file-document" size={32} color="#1976D2" style={styles.titleIcon} />
              <Text style={styles.title}>Bệnh Án</Text>
            </View>

            <View style={styles.toggleButtonContainer}>
              <CustomButton
                title={showForm ? "Xem Bệnh Án" : "Thêm Bệnh Án"}
                iconName={showForm ? "view-list" : "plus"}
                onPress={() => setShowForm(!showForm)}
              />
            </View>

            {showForm ? (
              <>
                <TextInput
                  style={styles.formInput}
                  placeholder="Tên thú cưng"
                  value={medicalForm.petName}
                  onChangeText={(text) => setMedicalForm({ ...medicalForm, petName: text })}
                />
                <TextInput
                  style={styles.formInput}
                  placeholder="Loại thú (VD: Chó, Mèo)"
                  value={medicalForm.petType}
                  onChangeText={(text) => setMedicalForm({ ...medicalForm, petType: text })}
                />
                <TextInput
                  style={styles.formInput}
                  placeholder="Triệu chứng"
                  value={medicalForm.symptoms}
                  onChangeText={(text) => setMedicalForm({ ...medicalForm, symptoms: text })}
                />
                <TextInput
                  style={styles.formInput}
                  placeholder="Ngày hẹn (VD: 03/04/2025)"
                  value={medicalForm.appointmentDate}
                  onChangeText={(text) => setMedicalForm({ ...medicalForm, appointmentDate: text })}
                />
                <CustomButton
                  title="Gửi Thông Tin"
                  iconName="send"
                  onPress={handleMedicalFormSubmit}
                />
              </>
            ) : (
              <View>
                {medicalRecords.length === 0 ? (
                  <Text style={styles.noRecordsText}>Chưa có bệnh án nào.</Text>
                ) : (
                  <FlatList
                    data={medicalRecords}
                    renderItem={renderMedicalRecord}
                    keyExtractor={(item) => item.id}
                    style={styles.recordsList}
                  />
                )}
              </View>
            )}
          </View>
        )}
        {activeTab === 'account' && (
          <View style={styles.innerContent}>
            <View style={styles.titleContainer}>
              <MaterialCommunityIcons name="account" size={32} color="#1976D2" style={styles.titleIcon} />
              <Text style={styles.title}>Tài Khoản</Text>
            </View>
            <CustomButton
              title="Đăng Nhập"
              iconName="login"
              onPress={() => router.push("/home/dang_nhap")}
            />
            <CustomButton
              title="Đăng Ký"
              iconName="account-plus"
              onPress={() => router.push("/home/dang_ki")}
            />
          </View>
        )}
      </ScrollView>

      <LinearGradient colors={['#FFF', '#E3F2FD']} style={styles.navbar}>
        {[
          { icon: 'home', label: 'Trang Chủ', key: 'home' },
          { icon: 'file-document', label: 'Bệnh Án', key: 'medicalRecords' },
          { icon: 'message-alert', label: 'Liên Hệ', key: 'notifications', route: '/home/lien_he' },
          { icon: 'account-circle', label: 'Tài Khoản', key: 'account' },
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
            <MaterialCommunityIcons
              name={icon}
              size={28}
              color={activeTab === key ? "#1976D2" : "#888"}
            />
            <Text style={[styles.navText, activeTab === key && { color: "#1976D2" }]}>{label}</Text>
          </Pressable>
        ))}
      </LinearGradient>
    </SafeAreaView>
  );
}
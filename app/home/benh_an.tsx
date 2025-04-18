import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function MedicalRecordsScreen() {
  const router = useRouter();
  const [medicalRecords, setMedicalRecords] = useState([
    { id: '1', petName: 'Milu', owner: 'Trần Khánh Linh', date: '2025-02-17', diagnosis: 'Cảm nhẹ', phone: '0987654321', service: 'Khám tổng quát', clinic: 'Phòng khám A', notes: 'Cần theo dõi thêm' },
    { id: '2', petName: 'Mèo Mun', owner: 'Lò Văn Bảo', date: '2025-02-15', diagnosis: 'Viêm da', phone: '0912345678', service: 'Điều trị da liễu', clinic: 'Phòng khám B', notes: 'Dùng thuốc theo đơn' },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Danh Sách Bệnh Án</Text>
      <FlatList
        data={medicalRecords}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.petName}>{item.petName}</Text>
              <Ionicons name="paw" size={24} color="#1976D2" />
            </View>
            <Text style={styles.cardText}>👤 Chủ: {item.owner} ({item.phone})</Text>
            <Text style={styles.cardText}>📅 Ngày khám: {item.date}</Text>
            <Text style={styles.cardText}>🩺 Chẩn đoán: {item.diagnosis}</Text>
            <Text style={styles.cardText}>🛠️ Dịch vụ: {item.service}</Text>
            <Text style={styles.cardText}>🏥 Phòng khám: {item.clinic}</Text>
            <Text style={styles.cardText}>📝 Ghi chú: {item.notes}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => router.push('/home/add_benh_an' as never)}
      >
        <Ionicons name="add-circle" size={28} color="#fff" />
        <Text style={styles.addButtonText}>Thêm Bệnh Án</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E3F2FD',
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#0D47A1',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  petName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  cardText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 2,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1976D2',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 12,
    textTransform: 'uppercase',
  },
});

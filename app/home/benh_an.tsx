import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import medicalRecordService from '../services/medicalRecordService';

interface MedicalRecordItem {
  id: number;
  petName: string;
  owner: string;
  date: string;
  diagnosis: string;
  phone?: string;
  service: string;
  clinic: string;
  notes: string;
}

export default function MedicalRecordsScreen() {
  const router = useRouter();
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecordItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadMedicalRecords = async () => {
    try {
      const records = await medicalRecordService.getAllMedicalRecords();
      setMedicalRecords(records);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      Alert.alert('Lỗi', 'Không thể tải danh sách bệnh án: ' + errorMessage);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadMedicalRecords();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadMedicalRecords();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1976D2" />
        <Text style={styles.loadingText}>Đang tải danh sách bệnh án...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Danh Sách Bệnh Án</Text>
      
      {medicalRecords.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="medical" size={60} color="#BBDEFB" />
          <Text style={styles.emptyText}>Chưa có bệnh án nào</Text>
        </View>
      ) : (
        <FlatList
          data={medicalRecords}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.card}
              onPress={() => router.push(`/home/benh_an/${item.id}` as any)}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.petName}>{item.petName}</Text>
                <Ionicons name="paw" size={24} color="#1976D2" />
              </View>
              <Text style={styles.cardText}>👤 Chủ: {item.owner} {item.phone ? `(${item.phone})` : ''}</Text>
              <Text style={styles.cardText}>📅 Ngày khám: {formatDate(item.date)}</Text>
              <Text style={styles.cardText}>🩺 Chẩn đoán: {item.diagnosis}</Text>
              <Text style={styles.cardText}>🛠️ Dịch vụ: {item.service}</Text>
              <Text style={styles.cardText}>🏥 Phòng khám: {item.clinic}</Text>
              {item.notes && <Text style={styles.cardText} numberOfLines={2}>📝 Ghi chú: {item.notes}</Text>}
            </TouchableOpacity>
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#1976D2"]}
            />
          }
        />
      )}
      
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => router.push('/home/add_benh_an' as any)}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#1976D2',
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 10,
    fontSize: 18,
    color: '#90A4AE',
    textAlign: 'center',
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

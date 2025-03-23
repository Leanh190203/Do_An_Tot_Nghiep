import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';

export default function AppointmentScreen() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [petName, setPetName] = useState('');

  const showDatePickerDialog = () => setShowDatePicker(true);

  const handleDateChange = (event:any, date:any) => {
    if (date) setSelectedDate(date);
    setShowDatePicker(Platform.OS === 'ios');
  };

  const handleSelectTime = (time:any) => setSelectedTime(time);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🐾 Đặt Lịch Hẹn</Text>

      <TextInput
        style={styles.input}
        placeholder="🐶 Nhập tên thú cưng"
        value={petName}
        onChangeText={setPetName}
        placeholderTextColor="#90caf9"
      />

      <TouchableOpacity style={styles.dateButton} onPress={showDatePickerDialog}>
        <Text style={styles.dateButtonText}>
          {selectedDate ? `📆 Ngày: ${selectedDate.toLocaleDateString()}` : '📅 Chọn ngày'}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedDate}
          mode="date"
          is24Hour={true}
          display="calendar"
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.label}>🕒 Chọn giờ:</Text>
      <View style={styles.timeSelection}>
        {['08:00', '09:00', '10:00'].map((time) => (
          <TouchableOpacity
            key={time}
            style={[
              styles.timeButton,
              selectedTime === time && styles.selectedTimeButton,
            ]}
            onPress={() => handleSelectTime(time)}
          >
            <Text style={styles.timeText}>{time}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.confirmButton}>
        <Text style={styles.confirmButtonText}>✅ Xác Nhận Đặt Lịch</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push("/")}
      >
        <Text style={styles.backButtonText}>🏠 Về Trang Chủ</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e3f2fd',
    padding: 20,
  },
  title: {
    color: "#1565c0",
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#64b5f6',
  },
  dateButton: {
    backgroundColor: '#42a5f5',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    marginVertical: 10,
    width: '100%',
  },
  dateButtonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 20,
    color: "#1565c0",
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  timeSelection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  timeButton: {
    backgroundColor: '#1976d2',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  selectedTimeButton: {
    backgroundColor: '#64b5f6',
  },
  timeText: {
    color: 'white',
    fontSize: 18,
  },
  confirmButton: {
    backgroundColor: '#43a047',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    marginVertical: 10,
    width: '100%',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  backButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: '#d32f2f',
    borderRadius: 15,
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});
  
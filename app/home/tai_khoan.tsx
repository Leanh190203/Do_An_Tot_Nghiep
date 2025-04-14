import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function UserProfileScreen() {
  const router = useRouter();
  const { user, logout, isSignedIn } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn muốn đăng xuất?',
      [
        {
          text: 'Hủy',
          style: 'cancel'
        },
        {
          text: 'Đăng xuất',
          onPress: () => {
            logout();
            Alert.alert('Thành công', 'Bạn đã đăng xuất thành công');
            router.push('/');
          },
          style: 'destructive'
        }
      ]
    );
  };

  // Nếu chưa đăng nhập, hiển thị màn hình gợi ý đăng nhập
  if (!isSignedIn || !user) {
    return (
      <View style={styles.container}>
        <View style={styles.notLoggedInContainer}>
          <MaterialCommunityIcons name="account-alert" size={80} color="#1976D2" />
          <Text style={styles.notLoggedInText}>Bạn chưa đăng nhập</Text>
          <Text style={styles.notLoggedInSubText}>
            Vui lòng đăng nhập để xem thông tin tài khoản
          </Text>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push('/home/dang_nhap')}
          >
            <Text style={styles.loginButtonText}>Đăng nhập</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.loginButton, { backgroundColor: '#64B5F6' }]}
            onPress={() => router.push('/home/dang_ki')}
          >
            <Text style={styles.loginButtonText}>Đăng ký tài khoản mới</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image 
            source={require('@/assets/images/avatar.png')} 
            style={styles.avatar}
            defaultSource={require('@/assets/images/avatar.png')}
          />
        </View>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
        {user.role === 'admin' && (
          <View style={styles.adminBadge}>
            <Text style={styles.adminBadgeText}>Quản trị viên</Text>
          </View>
        )}
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Thông tin tài khoản</Text>
        
        <View style={styles.infoItem}>
          <MaterialCommunityIcons name="account" size={24} color="#1976D2" />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Họ tên</Text>
            <Text style={styles.infoValue}>{user.name}</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <MaterialCommunityIcons name="email" size={24} color="#1976D2" />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{user.email}</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <MaterialCommunityIcons name="shield-account" size={24} color="#1976D2" />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Vai trò</Text>
            <Text style={styles.infoValue}>{user.role === 'admin' ? 'Quản trị viên' : 'Người dùng'}</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <MaterialCommunityIcons name="identifier" size={24} color="#1976D2" />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>ID</Text>
            <Text style={styles.infoValue}>{user.id}</Text>
          </View>
        </View>
      </View>

      <View style={styles.actionsSection}>
        <TouchableOpacity style={styles.actionButton} onPress={() => Alert.alert('Thông báo', 'Tính năng đang phát triển')}>
          <MaterialCommunityIcons name="account-edit" size={20} color="#FFF" />
          <Text style={styles.actionButtonText}>Chỉnh sửa thông tin</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={() => Alert.alert('Thông báo', 'Tính năng đang phát triển')}>
          <MaterialCommunityIcons name="lock-reset" size={20} color="#FFF" />
          <Text style={styles.actionButtonText}>Đổi mật khẩu</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, styles.logoutButton]} 
          onPress={handleLogout}
        >
          <MaterialCommunityIcons name="logout" size={20} color="#FFF" />
          <Text style={styles.actionButtonText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  notLoggedInContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  notLoggedInText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0D47A1',
    marginTop: 20,
  },
  notLoggedInSubText: {
    fontSize: 16,
    color: '#546E7A',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  loginButton: {
    backgroundColor: '#1976D2',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: '#1976D2',
    paddingTop: 40,
    paddingBottom: 25,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  avatarContainer: {
    backgroundColor: '#FFF',
    padding: 5,
    borderRadius: 75,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 15,
  },
  userEmail: {
    fontSize: 16,
    color: '#E1F5FE',
    marginTop: 5,
  },
  adminBadge: {
    backgroundColor: '#FFC107',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    marginTop: 10,
  },
  adminBadgeText: {
    fontWeight: 'bold',
    color: '#212121',
  },
  infoSection: {
    backgroundColor: '#FFF',
    margin: 15,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0D47A1',
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  infoContent: {
    marginLeft: 15,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#757575',
  },
  infoValue: {
    fontSize: 16,
    color: '#212121',
    fontWeight: '500',
  },
  actionsSection: {
    padding: 15,
  },
  actionButton: {
    backgroundColor: '#1976D2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
  },
  actionButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  logoutButton: {
    backgroundColor: '#F44336',
    marginTop: 15,
  },
}); 
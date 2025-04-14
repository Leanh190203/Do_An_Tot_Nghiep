import axios from 'axios';

// Cấu hình Axios instance
const api = axios.create({
  // Đối với máy ảo Android, sử dụng 10.0.2.2 để truy cập localhost của máy host
  // Đối với thiết bị thật, cần sử dụng IP thực của máy chủ
  // Vui lòng điều chỉnh dựa trên môi trường phát triển
  baseURL: ' http://192.168.100.169:5000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// API auth service
export const authService = {
  // Đăng ký tài khoản
  register: async (userData: { name: string; email: string; password: string }) => {
    try {
      const response = await api.post('/user/register', userData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Lỗi được trả về từ server
          const errorMessage = error.response.data.message || 'Đăng ký thất bại';
          throw new Error(errorMessage);
        } else if (error.request) {
          // Yêu cầu được gửi nhưng không nhận được phản hồi
          throw new Error('Không nhận được phản hồi từ server. Vui lòng kiểm tra kết nối mạng.');
        }
      }
      // Lỗi không xác định
      throw new Error('Đã xảy ra lỗi không xác định khi đăng ký tài khoản.');
    }
  },
  
  // Đăng nhập
  login: async (credentials: { email: string; password: string }) => {
    try {
      const response = await api.post('/user/login', credentials);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Lỗi được trả về từ server
          const errorMessage = error.response.data.message || 'Đăng nhập thất bại';
          throw new Error(errorMessage);
        } else if (error.request) {
          // Yêu cầu được gửi nhưng không nhận được phản hồi
          throw new Error('Không nhận được phản hồi từ server. Vui lòng kiểm tra kết nối mạng.');
        }
      }
      // Lỗi không xác định
      throw new Error('Đã xảy ra lỗi không xác định khi đăng nhập.');
    }
  },
};

export default api; 
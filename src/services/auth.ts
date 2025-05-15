import CryptoJS from 'crypto-js';

// Autentifikatsiya uchun kerak bo'lgan ma'lumotlar interfeysi
interface AuthData {
  name: string;
  email: string;
  key: string;
  secret: string;
}

// Ro'yxatdan o'tish javobining interfeysi
interface SignupResponse {
  success: boolean;
  message?: string;
  token?: string;
  data?: any;
}

// API xatolik interfeysi
interface ApiError {
  message: string;
  status?: number;
}

// Foydalanuvchini ro'yxatdan o'tkazish funktsiyasi
// userData: Foydalanuvchi ma'lumotlari
export const signup = async (userData: AuthData): Promise<SignupResponse> => {
  // So'rov uchun sarlavhalarni shakllantirish
  const headers = new Headers({
    'Key': userData.key,
    'Sign': generateSign(userData),
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  try {
    // API ga so'rov yuborish
    const response = await fetch('https://no23.lavina.tech/signup', {
      method: 'POST',
      headers,
      mode: 'cors',
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    // Xatolikni qayta ishlash
    const apiError: ApiError = {
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    };
    console.error('Ro\'yxatdan o\'tishda xatolik:', apiError);
    throw apiError;
  }
};

// Xavfsizlik belgisini yaratish funktsiyasi
// data: Shifrlash uchun ma'lumotlar
const generateSign = (data: AuthData): string => {
  const message = `${data.secret}${JSON.stringify(data)}`;
  return CryptoJS.MD5(message).toString();
};

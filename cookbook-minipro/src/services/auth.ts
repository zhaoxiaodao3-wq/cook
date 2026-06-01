import Taro from '@tarojs/taro';
import { login } from './api';

export async function ensureLogin(): Promise<boolean> {
  const token = Taro.getStorageSync('access_token');
  if (token) return true;

  try {
    const wxRes = await Taro.login();
    const res = await login(wxRes.code);
    if (res.code === 200) {
      Taro.setStorageSync('access_token', res.data.access_token);
      Taro.setStorageSync('user', JSON.stringify(res.data.user));
      return true;
    }
    return false;
  } catch {
    Taro.showToast({ title: '登录失败，请重试', icon: 'none' });
    return false;
  }
}

export function logout() {
  Taro.removeStorageSync('access_token');
  Taro.removeStorageSync('user');
}

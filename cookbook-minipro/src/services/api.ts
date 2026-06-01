import Taro from '@tarojs/taro';
import {
  ApiResponse,
  PaginatedData,
  LoginOut,
  UserOut,
  CategoryOut,
  DishListOut,
  DishDetailOut,
  DishCreateData,
} from '../types';

const BASE = 'http://127.0.0.1:8000/api/v1';

function getToken(): string {
  return Taro.getStorageSync('access_token') || '';
}

function authHeader(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(
  path: string,
  opts: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    data?: unknown;
    skipAuth?: boolean;
  } = {}
): Promise<ApiResponse<T>> {
  const { method = 'GET', data, skipAuth } = opts;
  try {
    const res = await Taro.request({
      url: BASE + path,
      method,
      data,
      header: skipAuth ? {} : authHeader(),
    });
    return res.data as ApiResponse<T>;
  } catch (err) {
    Taro.showToast({ title: '网络请求失败', icon: 'none' });
    throw err;
  }
}

// === Auth ===
export function login(code: string) {
  return request<LoginOut>('/auth/wechat-login', {
    method: 'POST',
    data: { code },
    skipAuth: true,
  });
}

// === Users ===
export function getMyProfile() {
  return request<UserOut>('/users/me');
}

export function updateProfile(data: { nickname?: string; avatar_url?: string }) {
  return request<UserOut>('/users/me', { method: 'PUT', data });
}

export function getMyStats() {
  return request<{ dish_count: number; rated_count: number; suggestion_count: number }>(
    '/users/me/stats'
  );
}

// === Categories ===
export function getCategories() {
  return request<CategoryOut[]>('/categories');
}

// === Dishes ===
export function getDishes(params: {
  page?: number;
  page_size?: number;
  category_id?: number;
  difficulty?: number;
  keyword?: string;
  sort?: string;
} = {}) {
  return request<PaginatedData<DishListOut>>('/dishes', { method: 'GET', data: params });
}

export function getDishDetail(id: string) {
  return request<DishDetailOut>(`/dishes/${id}`);
}

export function createDish(data: DishCreateData) {
  return request<DishDetailOut>('/dishes', { method: 'POST', data });
}

export function updateDish(id: string, data: Partial<DishCreateData>) {
  return request<DishDetailOut>(`/dishes/${id}`, { method: 'PUT', data });
}

export function deleteDish(id: string) {
  return request<null>(`/dishes/${id}`, { method: 'DELETE' });
}

// === Upload ===
export function uploadImage(filePath: string) {
  return Taro.uploadFile({
    url: BASE + '/upload/image',
    filePath,
    name: 'file',
    header: authHeader(),
  });
}

// === Ratings ===
export function rateDish(dishId: string, stars: number) {
  return request<null>(`/dishes/${dishId}/ratings`, {
    method: 'POST',
    data: { stars },
  });
}

export function getDishRatings(dishId: string, page = 1) {
  return request<
    PaginatedData<{
      id: string;
      user: UserOut;
      stars: number;
      created_at: string;
    }>
  >(`/dishes/${dishId}/ratings`, { method: 'GET', data: { page } });
}

// === Suggestions ===
export function suggestDish(dishId: string, content: string) {
  return request<null>(`/dishes/${dishId}/suggestions`, {
    method: 'POST',
    data: { content },
  });
}

export function getDishSuggestions(dishId: string, page = 1) {
  return request<
    PaginatedData<{
      id: string;
      user: UserOut;
      content: string;
      created_at: string;
    }>
  >(`/dishes/${dishId}/suggestions`, { method: 'GET', data: { page } });
}

// === User content lists ===
export function getMyDishes(page = 1) {
  return request<PaginatedData<DishListOut>>('/users/me/dishes', {
    method: 'GET',
    data: { page },
  });
}

export function getMyRatings(page = 1) {
  return request<
    PaginatedData<{
      id: string;
      dish_id: string;
      dish_name: string;
      dish_cover: string;
      stars: number;
      created_at: string;
    }>
  >('/users/me/ratings', { method: 'GET', data: { page } });
}

export function getMySuggestions(page = 1) {
  return request<
    PaginatedData<{
      id: string;
      dish_id: string;
      dish_name: string;
      dish_cover: string;
      content: string;
      created_at: string;
    }>
  >('/users/me/suggestions', { method: 'GET', data: { page } });
}

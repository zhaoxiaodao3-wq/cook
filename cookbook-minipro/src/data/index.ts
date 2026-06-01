import { Recipe } from '../types';

export const PLACEHOLDER_IMAGE =
  'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22400%22%20height%3D%22400%22%20viewBox%3D%220%200%20400%20400%22%20fill%3D%22none%22%3E%3Crect%20width%3D%22400%22%20height%3D%22400%22%20fill%3D%22%23F0F5F0%22%2F%3E%3Ctext%20x%3D%22200%22%20y%3D%22210%22%20font-family%3D%22system-ui%22%20font-size%3D%2214%22%20fill%3D%22%238EAA8E%22%20text-anchor%3D%22middle%22%3E%E6%9A%82%E6%97%A0%E5%9B%BE%E7%89%87%3C%2Ftext%3E%3C%2Fsvg%3E';

export const mockRecipes: Recipe[] = [
  { id: '1', title: '牛油果鲜虾轻食沙拉', author: '健康小厨', authorAvatar: '', image: '', rating: 4.9, likes: 1200, tags: ['精选'] },
  { id: '2', title: '日式抹茶千层蛋糕', author: '甜品控', authorAvatar: '', image: '', rating: 4.8, likes: 856 },
  { id: '3', title: '奶油蘑菇培根意面', author: '老张的深夜食堂', authorAvatar: '', image: '', rating: 4.7, likes: 340, isNew: true },
  { id: '4', title: '正宗麻婆豆腐', author: '辣妹子', authorAvatar: '', image: '', rating: 4.9, likes: 2100, tags: ['川菜'] },
  { id: '5', title: '经典宫保鸡丁', author: '川味大师', authorAvatar: '', image: '', rating: 4.9, likes: 1800, tags: ['川菜'] },
  { id: '6', title: '提拉米苏杯', author: '烘焙小天使', authorAvatar: '', image: '', rating: 4.8, likes: 920, tags: ['甜点'] },
];

export const trendingRecipes: Recipe[] = [
  { id: 't1', title: '牛油果能量碗', author: 'FitLife', image: '', rating: 4.9, likes: 3500 },
  { id: 't2', title: '经典玛格丽特披萨', author: 'Casa Mama', image: '', rating: 4.8, likes: 2800 },
  { id: 't3', title: '蓝莓舒芙蕾', author: 'Morning Sunshine', image: '', rating: 4.7, likes: 2100 },
];

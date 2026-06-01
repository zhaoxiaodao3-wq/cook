import { Recipe } from './types';

export const PLACEHOLDER_IMAGE = "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22400%22%20height%3D%22400%22%20viewBox%3D%220%200%20400%20400%22%20fill%3D%22none%22%3E%3Crect%20width%3D%22400%22%20height%3D%22400%22%20fill%3D%22%23F0F5F0%22%2F%3E%3Csvg%20x%3D%22168%22%20y%3D%22150%22%20width%3D%2264%22%20height%3D%2264%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23A7C1A7%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Crect%20x%3D%223%22%20y%3D%223%22%20width%3D%2218%22%20height%3D%2218%22%20rx%3D%222%22%20ry%3D%222%22%3E%3C%2Frect%3E%3Ccircle%20cx%3D%228.5%22%20cy%3D%228.5%22%20r%3D%221.5%22%3E%3C%2Fcircle%3E%3Cpolyline%20points%3D%2221%2015%2016%2010%205%2021%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E%3Ctext%20x%3D%22200%22%20y%3D%22240%22%20font-family%3D%22system-ui%2C%20sans-serif%22%20font-size%3D%2214%22%20fill%3D%22%238EAA8E%22%20text-anchor%3D%22middle%22%20font-weight%3D%22600%22%3E%E6%9A%82%E6%9C%AA%E5%B0%81%E9%9D%A2%3C%2Ftext%3E%3C%2Fsvg%3E";

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: '牛油果鲜虾轻食沙拉',
    author: '健康小厨',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop',
    rating: 4.9,
    likes: 1200,
    tags: ['精选'],
  },
  {
    id: '2',
    title: '日式抹茶千层蛋糕',
    author: '甜品控',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1578335032549-c1240abe7915?q=80&w=600&auto=format&fit=crop',
    rating: 4.8,
    likes: 856,
  },
  {
    id: '3',
    title: '奶油蘑菇培根意面',
    author: '老张的深夜食堂',
    authorAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=600&auto=format&fit=crop',
    rating: 4.7,
    likes: 340,
    isNew: true,
  },
  {
    id: '4',
    title: '正宗麻婆豆腐',
    author: '辣妹子',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93cb0?q=80&w=600&auto=format&fit=crop',
    rating: 4.9,
    likes: 2100,
    tags: ['川菜'],
  },
  {
    id: '5',
    title: '经典宫保鸡丁',
    author: '川味大师',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=600&auto=format&fit=crop',
    rating: 4.9,
    likes: 1800,
    tags: ['川菜'],
  },
  {
    id: '6',
    title: '提拉米苏杯',
    author: '烘焙小天使',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=100&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?q=80&w=600&auto=format&fit=crop',
    rating: 4.8,
    likes: 920,
    tags: ['甜点'],
  },
];

export const trendingRecipes: Recipe[] = [
  {
    id: 't1',
    title: '牛油果能量碗',
    author: 'FitLife',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop',
    rating: 4.9,
    likes: 3500,
  },
  {
    id: 't2',
    title: '经典玛格丽特披萨',
    author: 'Casa Mama',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=600&auto=format&fit=crop',
    rating: 4.8,
    likes: 2800,
  },
  {
    id: 't3',
    title: '蓝莓舒芙蕾',
    author: 'Morning Sunshine',
    image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?q=80&w=600&auto=format&fit=crop',
    rating: 4.7,
    likes: 2100,
  }
];

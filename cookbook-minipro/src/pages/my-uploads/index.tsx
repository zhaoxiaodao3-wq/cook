import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { PLACEHOLDER_IMAGE } from '../../data';
import styles from './index.module.scss';

const demoUploads = [
  { id: '1', title: '牛油果鲜虾轻食沙拉', cover: '', status: 'published' as const, likes: 452, time: '昨天' },
  { id: '2', title: '夏日清爽藜麦沙拉', cover: '', status: 'reviewing' as const, likes: 0, time: '2小时前' },
  { id: '3', title: '莓果抗氧化思慕雪碗', cover: '', status: 'published' as const, likes: 890, time: '上周' },
  { id: '4', title: '未命名菜谱', cover: '', status: 'draft' as const, likes: 0, time: '3天前' },
];
const statusLabel: Record<string, string> = { published: '已发布', reviewing: '审核中', draft: '草稿' };

export default function MyUploadsPage() {
  return (
    <View className={styles.page}>
      <View className={styles.header}>
        <View className={styles.backBtn} onClick={() => Taro.navigateBack()}>
          <Text>‹</Text>
        </View>
        <Text className={styles.headerTitle}>我的上传</Text>
      </View>
      <View className={styles.main}>
        <View className={styles.meta}>
          <Text className={styles.metaCount}>共 {demoUploads.length} 个菜谱</Text>
          <View className={styles.metaLikes}>
            <Text style={{ color: '#d78a1e' }}>♥</Text>
            <Text>总获赞 1.2k</Text>
          </View>
        </View>
        <View className={styles.grid}>
          {demoUploads.map((item) => (
            <View key={item.id} className={styles.card}>
              <View className={styles.cardImageWrap}>
                <Image
                  className={styles.cardImg}
                  src={item.cover || PLACEHOLDER_IMAGE}
                  mode='aspectFill'
                />
                <View
                  className={`${styles.cardStatus} ${
                    item.status === 'published'
                      ? styles.statusPublished
                      : item.status === 'reviewing'
                        ? styles.statusReviewing
                        : styles.statusDraft
                  }`}
                >
                  <Text>{statusLabel[item.status]}</Text>
                </View>
              </View>
              <View className={styles.cardBody}>
                <Text className={styles.cardTitle}>{item.title}</Text>
                <View className={styles.cardFooter}>
                  <View className={styles.cardLikes}>
                    <Text style={{ color: item.likes > 0 ? '#45464e' : '#c6c6cf' }}>♥</Text>
                    <Text>{item.likes > 0 ? item.likes : '-'}</Text>
                  </View>
                  <Text className={styles.cardTime}>{item.time}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

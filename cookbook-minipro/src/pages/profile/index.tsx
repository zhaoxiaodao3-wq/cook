import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { BottomNav } from '../../components/BottomNav';
import styles from './index.module.scss';

export default function ProfilePage() {
  const stats = { dish_count: 24, rated_count: 128, suggestion_count: 15 };
  const favorites = 56;

  const navTo = (path: string) => Taro.navigateTo({ url: path });

  return (
    <View className={styles.page}>
      {/* Profile Header */}
      <View className={styles.profile}>
        <View className={styles.avatar}>
          <Image className={styles.avatarImg} src='' mode='aspectFill' />
        </View>
        <Text className={styles.nickname}>美食家小王</Text>
        <Text className={styles.bio}>热爱生活，享受每一餐的烟火气。</Text>
        <View className={styles.followCounts}>
          <View className={styles.countItem}>
            <Text className={styles.countNum}>284</Text>
            <Text className={styles.countLabel}>关注</Text>
          </View>
          <View className={styles.countItem}>
            <Text className={styles.countNum}>1.2k</Text>
            <Text className={styles.countLabel}>粉丝</Text>
          </View>
        </View>
      </View>

      <View className={styles.body}>
        {/* Stats Grid */}
        <View className={styles.statsGrid}>
          <View className={styles.statCard} onClick={() => navTo('/pages/my-uploads/index')}>
            <Text className={styles.statValue}>{stats.dish_count}</Text>
            <Text className={styles.statLabel}>我的上传</Text>
          </View>
          <View className={styles.statCard}>
            <Text className={styles.statValue}>{stats.rated_count}</Text>
            <Text className={styles.statLabel}>评价菜谱</Text>
          </View>
          <View className={styles.statCard} onClick={() => navTo('/pages/my-suggestions/index')}>
            <Text className={styles.statValue}>{stats.suggestion_count}</Text>
            <Text className={styles.statLabel}>我的建议</Text>
          </View>
          <View className={styles.statCard} onClick={() => navTo('/pages/my-favorites/index')}>
            <Text className={styles.statValue}>{favorites}</Text>
            <Text className={styles.statLabel}>我的收藏</Text>
          </View>
        </View>

        {/* Settings Menu */}
        <View className={styles.menu}>
          <View className={styles.menuItem}>
            <View className={styles.menuLeft}>
              <Text className={styles.menuIcon}>📝</Text>
              <Text className={styles.menuText}>我的草稿</Text>
            </View>
            <Text className={styles.menuArrow}>›</Text>
          </View>
          <View className={styles.menuItem}>
            <View className={styles.menuLeft}>
              <Text className={styles.menuIcon}>⚙️</Text>
              <Text className={styles.menuText}>设置</Text>
            </View>
            <Text className={styles.menuArrow}>›</Text>
          </View>
          <View className={styles.menuItem}>
            <View className={styles.menuLeft}>
              <Text className={styles.menuIcon}>ℹ️</Text>
              <Text className={styles.menuText}>关于我们</Text>
            </View>
            <Text className={styles.menuArrow}>›</Text>
          </View>
          <View className={styles.menuItem}>
            <View className={styles.menuLeft}>
              <Text className={styles.menuIcon}>🚪</Text>
              <Text className={styles.menuTextDanger}>退出登录</Text>
            </View>
            <Text className={styles.menuArrow}>›</Text>
          </View>
        </View>
      </View>

      <BottomNav currentTab='profile' />
    </View>
  );
}

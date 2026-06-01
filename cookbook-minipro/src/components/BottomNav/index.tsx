import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';

type Tab = 'home' | 'all-recipes' | 'upload' | 'profile';

interface Props {
  currentTab: Tab;
}

export function BottomNav({ currentTab }: Props) {
  const handleTab = (key: Tab) => {
    if (key === currentTab) return;
    Taro.switchTab({ url: `/pages/${key}/index` });
  };

  const isActive = (key: Tab) => currentTab === key;

  return (
    <View className={styles.nav}>
      {/* 首页 */}
      <View className={`${styles.tab} ${isActive('home') ? styles.tabActive : ''}`} onClick={() => handleTab('home')}>
        <View className={styles.iconSvg}>
          <View className={`${styles.homeIcon} ${isActive('home') ? styles.iconActive : ''}`} />
        </View>
        <Text className={`${styles.label} ${isActive('home') ? styles.labelActive : ''}`}>首页</Text>
      </View>

      {/* 全部菜品 */}
      <View className={`${styles.tab} ${isActive('all-recipes') ? styles.tabActive : ''}`} onClick={() => handleTab('all-recipes')}>
        <View className={styles.iconSvg}>
          <View className={`${styles.recipeIcon} ${isActive('all-recipes') ? styles.iconActive : ''}`} />
        </View>
        <Text className={`${styles.label} ${isActive('all-recipes') ? styles.labelActive : ''}`}>全部菜品</Text>
      </View>

      {/* 上传 — center prominent */}
      <View className={styles.uploadBtn} onClick={() => handleTab('upload')}>
        <View className={styles.uploadCircle}>
          <Text className={styles.uploadPlus}>+</Text>
        </View>
        <Text className={`${styles.label} ${isActive('upload') ? styles.labelActive : ''}`} style={{ marginTop: 26 }}>上传</Text>
      </View>

      {/* 个人中心 */}
      <View className={`${styles.tab} ${isActive('profile') ? styles.tabActive : ''}`} onClick={() => handleTab('profile')}>
        <View className={styles.iconSvg}>
          <View className={`${styles.profileIcon} ${isActive('profile') ? styles.iconActive : ''}`} />
        </View>
        <Text className={`${styles.label} ${isActive('profile') ? styles.labelActive : ''}`}>个人中心</Text>
      </View>
    </View>
  );
}

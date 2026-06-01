import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';

type Tab = 'home' | 'all-recipes' | 'upload' | 'profile';

interface Props {
  currentTab: Tab;
}

const tabs: { key: Tab; label: string; icon: string }[] = [
  { key: 'home', label: '首页', icon: '🏠' },
  { key: 'all-recipes', label: '全部菜品', icon: '🍳' },
  { key: 'upload', label: '上传', icon: '' },
  { key: 'profile', label: '个人中心', icon: '👤' },
];

export function BottomNav({ currentTab }: Props) {
  const handleTab = (key: Tab) => {
    if (key === currentTab) return;
    Taro.switchTab({ url: `/pages/${key}/index` });
  };

  return (
    <View className={styles.nav}>
      {tabs.map((tab) => {
        if (tab.key === 'upload') {
          return (
            <View
              key={tab.key}
              className={styles.uploadBtn}
              onClick={() => handleTab(tab.key)}
            >
              <View className={styles.uploadCircle}>
                <Text style={{ color: 'white', fontSize: 24, lineHeight: 1 }}>+</Text>
              </View>
              <Text className={styles.uploadLabel}>上传</Text>
            </View>
          );
        }
        const active = currentTab === tab.key;
        return (
          <View
            key={tab.key}
            className={`${styles.tab} ${active ? styles.tabActive : ''}`}
            onClick={() => handleTab(tab.key)}
          >
            <Text style={{ fontSize: 20 }}>{tab.icon}</Text>
            <Text className={`${styles.tabLabel} ${active ? styles.tabLabelActive : styles.tabLabelInactive}`}>
              {tab.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

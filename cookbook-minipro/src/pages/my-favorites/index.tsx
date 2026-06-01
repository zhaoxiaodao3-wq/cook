import { useState } from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { mockRecipes } from '../../data';
import styles from './index.module.scss';

export default function MyFavoritesPage() {
  const [activeTab, setActiveTab] = useState('全部');
  const tabs = ['全部', '早餐', '硬菜', '健康轻食', '甜点'];

  return (
    <View className={styles.page}>
      <View className={styles.header}>
        <View className={styles.backBtn} onClick={() => Taro.navigateBack()}>
          <Text>‹</Text>
        </View>
        <Text className={styles.headerTitle}>Small Circle</Text>
      </View>
      <View className={styles.main}>
        <View className={styles.titleSection}>
          <Text className={styles.pageTitle}>我的收藏</Text>
          <Text className={styles.pageSubtitle}>探索你保存的美食灵感</Text>
        </View>
        <View className={styles.tabs}>
          {tabs.map((tab) => (
            <View
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              <Text>{tab}</Text>
            </View>
          ))}
        </View>
        <View className={styles.masonry}>
          {mockRecipes.slice(0, 4).map((recipe) => (
            <View key={recipe.id} className={styles.masonryItem}>
              <View className={styles.favCard}>
                <View className={styles.favImageWrap}>
                  <Image
                    className={styles.favImg}
                    src={recipe.image}
                    mode='aspectFill'
                  />
                  <View className={styles.unfavoriteBtn}>
                    <Text style={{ fontSize: 14, color: '#52c41a' }}>♥</Text>
                  </View>
                </View>
                <View className={styles.favBody}>
                  <Text className={styles.favTitle}>{recipe.title}</Text>
                  <View className={styles.favAuthor}>
                    <Text className={styles.favAuthorName}>{recipe.author}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

import { useState } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import { RecipeCard } from '../../components/RecipeCard';
import { SearchBar } from '../../components/SearchBar';
import { BottomNav } from '../../components/BottomNav';
import { mockRecipes, trendingRecipes } from '../../data';
import styles from './index.module.scss';

const USER_AVATAR = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('全部');
  const [search, setSearch] = useState('');
  const [subtab, setSubtab] = useState<'week' | 'month'>('week');
  const tabs = ['全部', '早餐', '午餐', '晚餐', '甜点'];

  useDidShow(() => {});

  const goToDetail = () => {
    Taro.navigateTo({ url: '/pages/recipe-detail/index' });
  };

  const goToAllRecipes = () => {
    Taro.switchTab({ url: '/pages/all-recipes/index' });
  };

  return (
    <View className={styles.page}>
      <View className={styles.header}>
        <View className={styles.headerTop}>
          <View className={styles.avatarBtn}>
            <Image className={styles.avatarImg} src={USER_AVATAR} mode='aspectFill' />
          </View>
          <Text className={styles.brandName}>Small Circle</Text>
          <View className={styles.searchIconBtn} onClick={goToAllRecipes}>
            <Text style={{ fontSize: 22 }}>&#128269;</Text>
          </View>
        </View>
        <View className={styles.separator} />
        <SearchBar value={search} onChange={setSearch} onConfirm={goToAllRecipes} />
        <ScrollView scrollX enhanced showScrollbar={false} className={styles.tabs}>
          {tabs.map((tab) => (
            <View
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              <Text>{tab}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View className={styles.main}>
        {/* Trending */}
        <View>
          <View className={styles.sectionHeader}>
            <Text className={styles.sectionTitle}>热门排行</Text>
            <View className={styles.subtabs}>
              <Text
                className={`${styles.subtab} ${subtab === 'week' ? styles.subtabActive : ''}`}
                onClick={() => setSubtab('week')}
              >
                周榜
              </Text>
              <Text
                className={`${styles.subtab} ${subtab === 'month' ? styles.subtabActive : ''}`}
                onClick={() => setSubtab('month')}
              >
                月榜
              </Text>
            </View>
          </View>
          <View className={styles.trendingCard}>
            {trendingRecipes.map((recipe, index) => (
              <View key={recipe.id} className={styles.trendingItem} onClick={goToDetail}>
                <Text
                  className={styles.trendingRank}
                  style={{ color: index === 0 ? '#d78a1e' : index === 1 ? '#76767f' : '#8b6914' }}
                >
                  {index + 1}
                </Text>
                <View className={styles.trendingThumb}>
                  <Image className={styles.trendingThumbImg} src={recipe.image} mode='aspectFill' />
                </View>
                <View className={styles.trendingInfo}>
                  <Text className={styles.trendingTitle}>{recipe.title}</Text>
                  <View style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Text style={{ color: '#d78a1e', fontSize: 14 }}>&#9733;</Text>
                    <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#d78a1e' }}>{recipe.rating}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Latest */}
        <View>
          <Text className={styles.sectionTitle} style={{ marginBottom: 16 }}>最新上传</Text>
          <View className={styles.grid}>
            {mockRecipes.slice(0, 4).map((recipe) => (
              <View key={recipe.id} className={styles.gridItem}>
                <RecipeCard recipe={recipe} onClick={goToDetail} layout='grid' />
              </View>
            ))}
          </View>
        </View>
      </View>

      <BottomNav currentTab='home' />
    </View>
  );
}

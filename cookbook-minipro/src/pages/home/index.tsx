import { useState } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import { RecipeCard } from '../../components/RecipeCard';
import { SearchBar } from '../../components/SearchBar';
import { BottomNav } from '../../components/BottomNav';
import { mockRecipes, trendingRecipes } from '../../data';
import styles from './index.module.scss';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('全部');
  const [search, setSearch] = useState('');
  const tabs = ['全部', '早餐', '午餐', '晚餐', '甜点'];

  useDidShow(() => {
    // Refresh data when tab becomes visible
  });

  const goToDetail = () => {
    Taro.navigateTo({ url: '/pages/recipe-detail/index' });
  };

  const goToAllRecipes = () => {
    Taro.switchTab({ url: '/pages/all-recipes/index' });
  };

  return (
    <View className={styles.page}>
      {/* Header */}
      <View className={styles.header}>
        <View className={styles.headerTop}>
          <View className={styles.avatar}>
            <Image className={styles.avatarImg} src='' mode='aspectFill' />
          </View>
          <Text className={styles.brandName}>Small Circle</Text>
          <View style={{ width: 32 }} />
        </View>
        <SearchBar value={search} onChange={setSearch} onConfirm={goToAllRecipes} />
        <ScrollView scrollX className={styles.tabs} enhanced showScrollbar={false} style={{ marginTop: 12 }}>
          {tabs.map((tab) => (
            <View
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Main Content */}
      <View className={styles.main}>
        {/* Trending */}
        <View>
          <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16 }}>
            <Text className={styles.sectionTitle} style={{ marginBottom: 0 }}>热门排行</Text>
            <View style={{ display: 'flex', gap: 12, fontSize: 12 }}>
              <Text style={{ color: '#52c41a', fontWeight: 'bold', borderBottom: '2px solid #52c41a', paddingBottom: 2 }}>周榜</Text>
              <Text style={{ color: '#45464e', paddingBottom: 2 }}>月榜</Text>
            </View>
          </View>
          <View className={styles.trendingCard}>
            {trendingRecipes.map((recipe, index) => (
              <View key={recipe.id} className={styles.trendingItem} onClick={goToDetail}>
                <Text className={styles.trendingRank} style={{ color: index === 0 ? '#d78a1e' : index === 1 ? '#76767f' : '#8b6914' }}>
                  {index + 1}
                </Text>
                <View className={styles.trendingThumb}>
                  <Image className={styles.trendingThumbImg} src={recipe.image} mode='aspectFill' />
                </View>
                <View className={styles.trendingInfo}>
                  <Text className={styles.trendingTitle}>{recipe.title}</Text>
                  <View style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Text style={{ color: '#d78a1e', fontSize: 14 }}>★</Text>
                    <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#d78a1e' }}>{recipe.rating}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Latest */}
        <View>
          <Text className={styles.sectionTitle}>最新上传</Text>
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

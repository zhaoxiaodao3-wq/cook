import { useState } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { RecipeCard } from '../../components/RecipeCard';
import { SearchBar } from '../../components/SearchBar';
import { BottomNav } from '../../components/BottomNav';
import { mockRecipes } from '../../data';
import styles from './index.module.scss';

export default function AllRecipesPage() {
  const [activeTab, setActiveTab] = useState('全部');
  const [search, setSearch] = useState('');
  const tabs = ['全部', '川菜', '甜点', '素食', '家常菜'];

  const goToDetail = () => {
    Taro.navigateTo({ url: '/pages/recipe-detail/index' });
  };

  return (
    <View className={styles.page}>
      <View className={styles.header}>
        <View className={styles.headerTop}>
          <Text className={styles.brandName}>Small Circle</Text>
          <View style={{ width: 32 }} />
        </View>
        <SearchBar value={search} onChange={setSearch} />
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

      <View className={styles.main}>
        <View className={styles.masonry}>
          {mockRecipes.map((recipe) => (
            <View key={recipe.id} className={styles.masonryItem}>
              <RecipeCard recipe={recipe} onClick={goToDetail} layout='masonry' />
            </View>
          ))}
        </View>
      </View>

      <BottomNav currentTab='all-recipes' />
    </View>
  );
}

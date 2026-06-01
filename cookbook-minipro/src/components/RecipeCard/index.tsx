import { View, Text, Image } from '@tarojs/components';
import { Recipe } from '../../types';
import { PLACEHOLDER_IMAGE } from '../../data';
import styles from './index.module.scss';

interface Props {
  recipe: Recipe;
  onClick: () => void;
  layout?: 'masonry' | 'grid';
  showRanking?: number;
}

export function RecipeCard({ recipe, onClick, layout = 'masonry', showRanking }: Props) {
  return (
    <View className={styles.card} onClick={onClick}>
      <View className={`${styles.imageWrap} ${layout === 'grid' ? styles.imageWrapSquare : styles.imageWrapTall}`}>
        <Image
          className={styles.image}
          src={recipe.image || PLACEHOLDER_IMAGE}
          mode='aspectFill'
          lazyLoad
        />
        {recipe.tags && recipe.tags.length > 0 && (
          <View className={styles.tag}>{recipe.tags[0]}</View>
        )}
        {recipe.isNew && (
          <View className={styles.tag}>新品</View>
        )}
      </View>
      <View className={styles.body}>
        {showRanking ? (
          <View style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Text className={styles.rankingNumber}>{showRanking}</Text>
            <Text className={styles.title}>{recipe.title}</Text>
          </View>
        ) : (
          <Text className={styles.title}>{recipe.title}</Text>
        )}
        <View className={styles.meta}>
          <View className={styles.author}>
            <View className={styles.avatar}>
              {recipe.authorAvatar ? (
                <Image className={styles.avatarImg} src={recipe.authorAvatar} mode='aspectFill' />
              ) : (
                <View style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#d9f7be' }}>
                  <Text style={{ fontSize: 10, color: '#135200', fontWeight: 'bold' }}>{recipe.author.charAt(0)}</Text>
                </View>
              )}
            </View>
            <Text className={styles.authorName}>{recipe.author}</Text>
          </View>
          <View className={styles.rating}>
            <Text style={{ fontSize: 12, color: '#d78a1e' }}>★</Text>
            <Text className={styles.ratingText}>{recipe.rating}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

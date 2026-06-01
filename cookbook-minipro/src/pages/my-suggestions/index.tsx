import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';

export default function MySuggestionsPage() {
  return (
    <View className={styles.page}>
      <View className={styles.header}>
        <View className={styles.backBtn} onClick={() => Taro.navigateBack()}>
          <Text>‹</Text>
        </View>
        <Text className={styles.headerTitle}>我的建议</Text>
      </View>
      <View className={styles.main}>
        {/* Card 1 */}
        <View className={styles.suggestionCard}>
          <View className={styles.cardTop}>
            <View className={styles.cardThumb}>
              <Image className={styles.cardThumbImg} src='' mode='aspectFill' />
              <View className={`${styles.statusBadge} ${styles.statusRead}`}>
                <Text style={{ fontSize: 10, color: 'white' }}>作者已读</Text>
              </View>
            </View>
            <View className={styles.cardContent}>
              <View>
                <Text className={styles.cardDishName}>牛油果藜麦沙拉</Text>
                <Text className={styles.cardText}>
                  建议在拌沙拉汁的时候加入少许青柠汁，可以更好地中和牛油果的丰富口感，让整体风味更加清爽解腻。另外如果能稍微烤一下松子撒在上面就完美了。
                </Text>
              </View>
            </View>
          </View>
          <View className={styles.cardFooter}>
            <Text className={styles.cardTime}>2天前</Text>
            <View className={styles.cardLink}>
              <Text>查看原菜谱 ›</Text>
            </View>
          </View>
        </View>

        {/* Card 2 */}
        <View className={styles.suggestionCard}>
          <View className={styles.cardTop}>
            <View className={styles.cardThumb}>
              <Image className={styles.cardThumbImg} src='' mode='aspectFill' />
              <View className={`${styles.statusBadge} ${styles.statusUnread}`}>
                <Text style={{ fontSize: 10, color: 'white' }}>未读</Text>
              </View>
            </View>
            <View className={styles.cardContent}>
              <View>
                <Text className={styles.cardDishName}>轻食减脂波克碗</Text>
                <Text className={styles.cardText}>
                  按照步骤做了，味道很不错。不过建议把鹰嘴豆提前用少量橄榄油和孜然粉烤一下，口感会更加酥脆，层次感更好。
                </Text>
              </View>
            </View>
          </View>
          <View className={styles.cardFooter}>
            <Text className={styles.cardTime}>1周前</Text>
            <View className={styles.cardLink}>
              <Text>查看原菜谱 ›</Text>
            </View>
          </View>
        </View>

        {/* Card 3 with reply */}
        <View className={styles.suggestionCard}>
          <View className={styles.cardTop}>
            <View className={styles.cardThumb}>
              <Image className={styles.cardThumbImg} src='' mode='aspectFill' />
              <View className={`${styles.statusBadge} ${styles.statusReplied}`}>
                <Text style={{ fontSize: 10, color: '#135200', fontWeight: 'bold' }}>
                  已回复
                </Text>
              </View>
            </View>
            <View className={styles.cardContent}>
              <View>
                <Text className={styles.cardDishName}>意式青酱面</Text>
                <Text className={styles.cardText}>
                  非常棒的食谱！青酱的比例很完美。个人建议在煮面的时候可以在水里多加一点盐...
                </Text>
              </View>
            </View>
          </View>
          <View className={styles.replyBox}>
            <Text className={styles.replyText}>
              <Text className={styles.replyAuthor}>作者回复:</Text>
              谢谢你的建议！下次我会在菜谱里补充关于煮面水加盐的小贴士，确实很重要。
            </Text>
          </View>
          <View className={styles.cardFooter}>
            <Text className={styles.cardTime}>2周前</Text>
            <View className={styles.cardLink}>
              <Text>查看原菜谱 ›</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

import { useState } from 'react';
import { View, Text, Image, Textarea } from '@tarojs/components';
import Taro, { useLoad } from '@tarojs/taro';
import { StarRating } from '../../components/StarRating';
import styles from './index.module.scss';

const ratingTexts = ['糟糕', '还需改进', '还行', '不错', '太棒了！'];

const ingredients = [
  { name: '低筋面粉', amount: '240g' },
  { name: '抹茶粉', amount: '20g' },
  { name: '细砂糖', amount: '90g' },
  { name: '鸡蛋', amount: '4个' },
  { name: '牛奶', amount: '650ml' },
  { name: '无盐黄油', amount: '50g' },
  { name: '淡奶油', amount: '600ml' },
];

const steps = [
  {
    num: 1,
    desc: '将低筋面粉和抹茶粉一起筛入大碗中，确保没有面粉结块。',
    img: true,
  },
  {
    num: 2,
    desc: '鸡蛋加入砂糖搅拌均匀，分次加入牛奶和融化的黄油拌匀，最后加入粉类混合成面糊。',
  },
  {
    num: 3,
    desc: '面糊过筛至少两次，放入冰箱冷藏静置30分钟，以消除气泡并增加面糊韧性。',
  },
];

export default function RecipeDetailPage() {
  const [reviewOpen, setReviewOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useLoad(({ id }) => {
    // Load dish detail — use static demo data matching React prototype
    if (id) {
      // API integration in Task 18
    }
  });

  const goBack = () => Taro.navigateBack();

  const submitReview = () => {
    setSubmitting(true);
    // API integration in Task 18
    setTimeout(() => {
      Taro.showToast({ title: '评价提交成功', icon: 'success' });
      setReviewOpen(false);
      setSubmitting(false);
    }, 500);
  };

  return (
    <View className={styles.page}>
      {/* Hero Image */}
      <View className={styles.hero}>
        <Image
          className={styles.heroImg}
          src='https://images.unsplash.com/photo-1578335032549-c1240abe7915?q=80&w=800&auto=format&fit=crop'
          mode='aspectFill'
        />
        <View className={styles.headerBar}>
          <View className={styles.backBtn} onClick={goBack}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>&#8249;</Text>
          </View>
          <Text style={{ color: 'white', fontSize: 14, fontWeight: 500 }}>Small Circle</Text>
          <View className={styles.backBtn}>
            <Text style={{ fontSize: 16 }}>&#128269;</Text>
          </View>
        </View>
      </View>

      {/* Content Body */}
      <View className={styles.body}>
        {/* Title & Author */}
        <View className={styles.titleRow}>
          <View>
            <Text className={styles.title}>恋茶千层蛋糕</Text>
            <View className={styles.authorRow}>
              <View className={styles.authorAvatar}>
                <Image
                  src=''
                  mode='aspectFill'
                  style={{ width: '100%', height: '100%' }}
                />
              </View>
              <View>
                <Text className={styles.authorName}>李大厨</Text>
                <Text className={styles.authorTime}>2天前发布</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Rating & Actions */}
        <View>
          <View className={styles.ratingRow}>
            <Text style={{ color: '#d78a1e', fontSize: 16 }}>&#9733;</Text>
            <Text className={styles.ratingNum}>4.8</Text>
            <Text className={styles.ratingCount}>(124 评价)</Text>
          </View>
          <View className={styles.actions} style={{ marginTop: 16 }}>
            <View
              className={`${styles.actionBtn} ${styles.actionPrimary}`}
              onClick={() => setReviewOpen(true)}
            >
              <Text>&#11088; 我要评分</Text>
            </View>
            <View
              className={`${styles.actionBtn} ${styles.actionOutline}`}
              onClick={() => setReviewOpen(true)}
            >
              <Text>&#128172; 我要写建议</Text>
            </View>
          </View>
        </View>

        {/* Stats Grid */}
        <View className={styles.statsGrid}>
          <View className={styles.statCard}>
            <Text className={styles.statName}>时长</Text>
            <Text className={styles.statVal}>45 分钟</Text>
          </View>
          <View className={styles.statCard}>
            <Text className={styles.statName}>难度</Text>
            <Text className={styles.statVal}>中等</Text>
          </View>
          <View className={styles.statCard}>
            <Text className={styles.statName}>分类</Text>
            <Text className={styles.statVal}>甜点</Text>
          </View>
          <View className={styles.statCard}>
            <Text className={styles.statName}>适合人群</Text>
            <Text className={styles.statVal}>聚会</Text>
          </View>
        </View>

        {/* Ingredients */}
        <View>
          <Text className={styles.sectionH2}>食材清单</Text>
          <View
            style={{
              border: '1px solid rgba(198,198,207,0.5)',
              borderRadius: 12,
              overflow: 'hidden',
            }}
          >
            {ingredients.map((item, i) => (
              <View key={i} className={styles.ingItem}>
                <View className={styles.ingName}>
                  <View className={styles.ingDot} />
                  <Text>{item.name}</Text>
                </View>
                <Text className={styles.ingAmount}>{item.amount}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Steps */}
        <View>
          <Text className={styles.sectionH2}>制作步骤</Text>
          <View>
            {steps.map((step) => (
              <View key={step.num} className={styles.stepRow}>
                <View className={styles.stepNum}>
                  <Text>{step.num}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text className={styles.stepDesc}>{step.desc}</Text>
                  {step.img && (
                    <View className={styles.stepImg}>
                      <Image
                        src='https://images.unsplash.com/photo-1596541223910-c081e64627d3?q=80&w=400&auto=format&fit=crop'
                        mode='aspectFill'
                        style={{ width: '100%', height: '100%' }}
                      />
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Tips */}
        <View className={styles.tipsBox}>
          <Text className={styles.tipsTitle}>&#128161; 厨神贴士</Text>
          <Text className={styles.tipsItem}>
            &bull; 摊饼皮时火候一定要小，避免边缘焦黑影响卖相。
          </Text>
          <Text className={styles.tipsItem}>
            &bull; 奶油不要抹得太厚，否则切开后容易塌陷。
          </Text>
          <Text className={styles.tipsItem}>
            &bull; 面糊静置是关键，这能让做出来的饼皮更加细腻无孔。
          </Text>
        </View>
      </View>

      {/* Review Modal */}
      {reviewOpen && (
        <View className={styles.overlay}>
          <View className={styles.overlayBg} onClick={() => setReviewOpen(false)} />
          <View className={styles.modal}>
            <View className={styles.modalHeader}>
              <Text className={styles.modalTitle}>评价</Text>
              <View
                className={styles.modalClose}
                onClick={() => setReviewOpen(false)}
              >
                <Text>&#10005;</Text>
              </View>
            </View>

            <View className={styles.modalContext}>
              <View className={styles.modalThumb}>
                <Image
                  src='https://images.unsplash.com/photo-1578335032549-c1240abe7915?q=80&w=150&auto=format&fit=crop'
                  mode='aspectFill'
                  style={{ width: '100%', height: '100%' }}
                />
              </View>
              <View>
                <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#1b1b1f' }}>
                  恋茶千层蛋糕
                </Text>
                <Text style={{ fontSize: 11, color: '#76767f' }}>
                  Fresh Harvest Originals
                </Text>
              </View>
            </View>

            <View className={styles.modalStars}>
              <Text style={{ fontSize: 12, color: '#45464e' }}>你的烹饪体验如何？</Text>
              <StarRating value={rating} onChange={setRating} />
              <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#52c41a' }}>
                &ldquo;{ratingTexts[rating - 1]}&rdquo;
              </Text>
            </View>

            <Textarea
              className={styles.modalTextarea}
              placeholder='写下你的烹饪心得或建议...'
              value={reviewText}
              onInput={(e) => setReviewText(e.detail.value)}
              maxlength={200}
              autoHeight
            />

            <View className={styles.toggleRow}>
              <View className={styles.toggleLabel}>
                <Text>&#128065;&#65039;&#8205;&#128172; 匿名发布</Text>
              </View>
              <View
                className={`${styles.toggle} ${isAnonymous ? styles.toggleOn : styles.toggleOff}`}
                onClick={() => setIsAnonymous(!isAnonymous)}
              >
                <View
                  className={`${styles.toggleKnob} ${isAnonymous ? styles.toggleKnobOn : styles.toggleKnobOff}`}
                />
              </View>
            </View>

            <View className={styles.modalSend} onClick={submitReview}>
              <Text>{submitting ? '提交中...' : '提交评价'}</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

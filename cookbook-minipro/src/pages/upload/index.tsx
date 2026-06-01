import { useState } from 'react';
import { View, Text, Input, Textarea, Picker } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { BottomNav } from '../../components/BottomNav';
import styles from './index.module.scss';

// Local draft types
interface IngredientDraft {
  name: string;
  amount: string;
  unit: string;
}

interface StepDraft {
  description: string;
  image?: string;
}

export default function UploadPage() {
  const [name, setName] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [difficulty, setDifficulty] = useState('中等');
  const [servings, setServings] = useState('');
  const [tips, setTips] = useState('');
  const [ingredients, setIngredients] = useState<IngredientDraft[]>([
    { name: '', amount: '', unit: '' },
    { name: '', amount: '', unit: '' },
  ]);
  const [steps, setSteps] = useState<StepDraft[]>([{ description: '' }]);
  const [submitting, setSubmitting] = useState(false);

  // add/remove/update helpers for ingredients
  const addIngredient = () =>
    setIngredients((prev) => [...prev, { name: '', amount: '', unit: '' }]);
  const removeIngredient = (i: number) =>
    setIngredients((prev) => prev.filter((_, idx) => idx !== i));
  const updateIngredient = (i: number, field: keyof IngredientDraft, value: string) => {
    setIngredients((prev) =>
      prev.map((ing, idx) => (idx === i ? { ...ing, [field]: value } : ing)),
    );
  };

  // add/remove/update helpers for steps
  const addStep = () => setSteps((prev) => [...prev, { description: '' }]);
  const removeStep = (i: number) =>
    setSteps((prev) => prev.filter((_, idx) => idx !== i));
  const updateStep = (i: number, value: string) => {
    setSteps((prev) =>
      prev.map((s, idx) => (idx === i ? { ...s, description: value } : s)),
    );
  };

  // Cover image upload
  const handleUploadCover = async () => {
    const res = await Taro.chooseImage({ count: 1, sizeType: ['compressed'] });
    // TODO: upload via API in Task 18
  };

  // Submit: validate name required, then call API
  const submit = async (status: 'published' | 'draft') => {
    if (!name.trim()) {
      Taro.showToast({ title: '请输入菜谱名称', icon: 'none' });
      return;
    }
    setSubmitting(true);
    // TODO: API call in Task 18
    Taro.showToast({
      title: status === 'published' ? '发布成功' : '草稿已保存',
      icon: 'success',
    });
    setSubmitting(false);
  };

  return (
    <View className={styles.page}>
      <View className={styles.header}>
        <Text className={styles.headerTitle}>创建新菜谱</Text>
      </View>

      <View className={styles.form}>
        {/* Cover upload button */}
        <View className={styles.coverBtn} onClick={handleUploadCover}>
          <Text className={styles.coverIcon}>📷</Text>
          <Text className={styles.coverText}>上传封面图</Text>
          <Text className={styles.coverHint}>展示你最拿手的美味佳肴</Text>
        </View>

        {/* Recipe name */}
        <Input
          className={styles.field}
          placeholder='菜谱名称 (如：红烧肉)'
          placeholderClass={styles.fieldPlaceholder}
          value={name}
          onInput={(e) => setName(e.detail.value)}
        />

        {/* Stats grid */}
        <View className={styles.statsGrid}>
          <View className={styles.statItem}>
            <View className={styles.statIcon} style={{ background: '#f6ffed' }}>
              <Text>⏱️</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text className={styles.statLabel}>烹饪时长</Text>
              <Input
                className={styles.statValue}
                placeholder='如：30 分钟'
                value={cookingTime}
                onInput={(e) => setCookingTime(e.detail.value)}
              />
            </View>
          </View>
          <View className={styles.statItem}>
            <View className={styles.statIcon} style={{ background: '#f6ffed' }}>
              <Text>📊</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text className={styles.statLabel}>难度</Text>
              <Picker
                mode='selector'
                range={['简单', '中等', '困难']}
                value={['简单', '中等', '困难'].indexOf(difficulty)}
                onChange={(e) =>
                  setDifficulty(['简单', '中等', '困难'][e.detail.value])
                }
              >
                <Text className={styles.statValue}>{difficulty}</Text>
              </Picker>
            </View>
          </View>
          <View className={styles.statItem}>
            <View className={styles.statIcon} style={{ background: '#f6ffed' }}>
              <Text>👥</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text className={styles.statLabel}>适用人数</Text>
              <Input
                className={styles.statValue}
                placeholder='如：2-3 人'
                value={servings}
                onInput={(e) => setServings(e.detail.value)}
              />
            </View>
          </View>
          <View className={styles.statItem}>
            <View className={styles.statIcon} style={{ background: '#f6ffed' }}>
              <Text>💡</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text className={styles.statLabel}>小贴士</Text>
              <Input
                className={styles.statValue}
                placeholder='烹饪技巧'
                value={tips}
                onInput={(e) => setTips(e.detail.value)}
              />
            </View>
          </View>
        </View>

        {/* Ingredients */}
        <View className={styles.sectionCard}>
          <View className={styles.sectionHeader}>
            <Text className={styles.sectionTitle}>食材清单</Text>
            <Text className={styles.required}>必填</Text>
          </View>
          {ingredients.map((ing, i) => (
            <View key={i} className={styles.ingRow}>
              <Input
                className={styles.ingName}
                placeholder='食材 (如: 面粉)'
                value={ing.name}
                onInput={(e) => updateIngredient(i, 'name', e.detail.value)}
              />
              <Input
                className={styles.ingAmount}
                placeholder='用量'
                value={ing.amount}
                onInput={(e) => updateIngredient(i, 'amount', e.detail.value)}
              />
              <View
                className={styles.ingDelete}
                onClick={() => removeIngredient(i)}
              >
                <Text>✕</Text>
              </View>
            </View>
          ))}
          <View className={styles.addBtn} onClick={addIngredient}>
            <Text>＋ 添加食材</Text>
          </View>
        </View>

        {/* Steps */}
        <View className={styles.sectionCard}>
          <View className={styles.sectionHeader}>
            <Text className={styles.sectionTitle}>制作步骤</Text>
          </View>
          {steps.map((step, i) => (
            <View key={i} className={styles.stepBlock}>
              <View className={styles.stepNumber}>
                <Text>{i + 1}</Text>
              </View>
              <View className={styles.stepContent}>
                <Textarea
                  className={styles.stepTextarea}
                  placeholder='详细描述这个步骤...'
                  value={step.description}
                  onInput={(e) => updateStep(i, e.detail.value)}
                  autoHeight
                />
                <View className={styles.stepImageBtn}>
                  <Text>📷 添加步骤图 (选填)</Text>
                </View>
              </View>
              <View
                className={styles.stepDelete}
                onClick={() => removeStep(i)}
              >
                <Text>✕</Text>
              </View>
            </View>
          ))}
          <View className={styles.addBtn} onClick={addStep}>
            <Text>＋ 添加步骤</Text>
          </View>
        </View>

        {/* Footer buttons */}
        <View className={styles.footer}>
          <View className={styles.draftBtn} onClick={() => submit('draft')}>
            <Text>{submitting ? '保存中...' : '存为草稿'}</Text>
          </View>
          <View
            className={styles.submitBtn}
            onClick={() => submit('published')}
          >
            <Text>{submitting ? '发布中...' : '发布菜谱'}</Text>
          </View>
        </View>
      </View>

      <BottomNav currentTab='upload' />
    </View>
  );
}

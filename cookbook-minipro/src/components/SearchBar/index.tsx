import { View, Input } from '@tarojs/components';
import styles from './index.module.scss';

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onConfirm?: () => void;
}

export function SearchBar({ value, onChange, placeholder = '搜索食谱、食材或厨师...', onConfirm }: Props) {
  return (
    <View className={styles.wrap}>
      <View className={styles.iconWrap}>
        <View className={styles.icon}>
          <View className={styles.iconCircle} />
          <View className={styles.iconLine} />
        </View>
      </View>
      <Input
        className={styles.input}
        value={value}
        placeholder={placeholder}
        placeholderClass={styles.placeholder}
        onInput={(e) => onChange(e.detail.value)}
        onConfirm={onConfirm}
        confirmType='search'
      />
    </View>
  );
}

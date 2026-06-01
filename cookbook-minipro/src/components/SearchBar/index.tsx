import { View, Input, Text } from '@tarojs/components';
import styles from './index.module.scss';

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onConfirm?: () => void;
}

export function SearchBar({ value, onChange, placeholder = '搜索食谱、食材...', onConfirm }: Props) {
  return (
    <View className={styles.wrap}>
      <Text className={styles.icon}>{'🔍'}</Text>
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

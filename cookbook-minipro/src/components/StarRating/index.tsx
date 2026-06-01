import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';

interface Props {
  value: number;
  onChange?: (stars: number) => void;
  maxStars?: number;
  size?: 'small' | 'normal';
}

export function StarRating({ value, onChange, maxStars = 5, size = 'normal' }: Props) {
  const interactive = !!onChange;
  const isSmall = size === 'small';

  return (
    <View className={`${styles.container} ${!interactive ? styles.readonly : ''}`}>
      {Array.from({ length: maxStars }, (_, i) => {
        const filled = i < value;
        return (
          <View
            key={i}
            className={styles.star}
            onClick={() => onChange?.(i + 1)}
            style={isSmall ? { minWidth: 20, minHeight: 20 } : undefined}
          >
            <Text
              className={`${styles.starText} ${filled ? styles.starFilled : styles.starEmpty}`}
              style={isSmall ? { fontSize: 14 } : undefined}
            >
              {filled ? '★' : '☆'}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

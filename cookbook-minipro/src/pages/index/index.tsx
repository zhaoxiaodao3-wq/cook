import { View, Text } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import './index.scss';

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.');
  });

  return (
    <View className='index'>
      <View className='index__header'>
        <Text className='index__title'>Cookbook</Text>
        <Text className='index__subtitle'>Your personal recipe collection</Text>
      </View>
      <View className='index__content'>
        <Text>Welcome to Cookbook Mini Program</Text>
      </View>
    </View>
  );
}

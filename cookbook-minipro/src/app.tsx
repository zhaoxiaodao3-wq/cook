import { PropsWithChildren } from 'react';
import { useLaunch } from '@tarojs/taro';
import { ensureLogin } from './services/auth';
import './app.scss';

function App({ children }: PropsWithChildren<object>) {
  useLaunch(async () => {
    await ensureLogin();
  });

  return children;
}

export default App;

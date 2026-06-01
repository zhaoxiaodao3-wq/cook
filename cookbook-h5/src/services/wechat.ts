// WeChat JSSDK bridge for mini-program WebView communication
// When this H5 runs inside a mini-program's <web-view>, the SDK is auto-injected

declare global {
  interface Window {
    wx?: {
      miniProgram: {
        navigateBack: (delta?: number) => void;
        navigateTo: (opts: { url: string }) => void;
        redirectTo: (opts: { url: string }) => void;
        switchTab: (opts: { url: string }) => void;
        postMessage: (opts: { data: unknown }) => void;
        getEnv: (cb: (res: { miniprogram: boolean }) => void) => void;
      };
      config: (opts: Record<string, unknown>) => void;
      ready: (cb: () => void) => void;
    };
  }
}

export function isInMiniProgram(): Promise<boolean> {
  return new Promise((resolve) => {
    if (!window.wx?.miniProgram) {
      resolve(false);
      return;
    }
    window.wx.miniProgram.getEnv((res) => {
      resolve(res.miniprogram);
    });
  });
}

export function postMessageToMiniProgram(data: unknown) {
  window.wx?.miniProgram?.postMessage({ data });
}

export function navigateBackInMiniProgram(delta = 1) {
  window.wx?.miniProgram?.navigateBack(delta);
}

export function navigateToInMiniProgram(url: string) {
  window.wx?.miniProgram?.navigateTo({ url });
}

// WeChat login bridge: H5 sends request, mini-program handles wx.login() and returns token
export function requestWechatLogin(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!window.wx?.miniProgram) {
      reject(new Error('Not in mini-program environment'));
      return;
    }
    // Post message to mini-program to trigger wx.login
    postMessageToMiniProgram({ action: 'login' });

    // Mini-program will post back the token via URL or postMessage
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'LOGIN_TOKEN') {
        window.removeEventListener('message', handler);
        resolve(e.data.token as string);
      }
    };
    window.addEventListener('message', handler);

    // Timeout after 30 seconds
    setTimeout(() => {
      window.removeEventListener('message', handler);
      reject(new Error('Login timeout'));
    }, 30000);
  });
}

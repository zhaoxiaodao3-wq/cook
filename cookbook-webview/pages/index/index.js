const app = getApp();

Page({
  data: {
    h5Url: ''
  },

  onLoad() {
    const baseUrl = app.globalData.h5BaseUrl;
    this.setData({ h5Url: baseUrl });
    console.log('WebView loading:', baseUrl);
  },

  onMessage(e) {
    const msgs = e.detail.data;
    if (!msgs || !msgs.length) return;
    const lastMsg = msgs[msgs.length - 1];

    // Handle login request from H5
    if (lastMsg.action === 'login') {
      this.doWechatLogin();
    }
  },

  doWechatLogin() {
    wx.login({
      success: (res) => {
        if (res.code) {
          // Reload WebView with wechat code as query param
          // H5 reads ?code=xxx and calls POST /auth/wechat-login
          const separator = app.globalData.h5BaseUrl.includes('?') ? '&' : '?';
          this.setData({
            h5Url: app.globalData.h5BaseUrl + separator + 'wx_code=' + res.code
          });
        }
      },
      fail: () => {
        wx.showToast({ title: '微信登录失败', icon: 'none' });
      }
    });
  },

  onError(e) {
    console.error('WebView error:', e.detail);
    wx.showToast({ title: '页面加载失败，请重试', icon: 'none' });
  }
});

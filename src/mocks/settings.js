export default {
  site: {
    title: '您已离线',
    baseurl: 'https://offline',
    comment: {
      enabled: true,
      commiturl: 'http://127.0.0.1:8787/',
      avatar: {
        type: 'gravatar',
        cacheurl: '//g.chicdn.cn/avatar/',
        d: 'monsterid'
      },
      ghauth: {
        enabled: true,
        client_id: '204a53c84ec3ff5e5a82',
        client_secret: 'f29752d306876dc5d7959f8da8a37386ea3e3adf',
        proxy_url: 'https://ghproxy.moekonnyaku.workers.dev/' // You can deploy this in the cloudflare workers. Code: https://p.atri.tk/j3i
      },
      backend: {
        enabled: true,
        type: 'workers', // The next will be like disqus, valine and so on.(Serverless options) You can deploy the code in the cloudflare workers. Code: https://p.atri.tk/Mm4 Guide: https://chiblog.apps.chihuo2104.dev/comment-service/workers (WIP)
        url: 'http://127.0.0.1:8787/'
      }
    },
    footer: '',
    announcement: '',
    author: {
      name: 'chihuo2104',
      url: 'https://im.chihuo2104.dev/'
    },
    copyright: {
      startyear: 2018
    }
  }
}

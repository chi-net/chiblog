export default {
  site: {
    title: '您已离线', // The title of your blog
    baseurl: 'https://offline', // The site baseurl
    comment: {
      enabled: true,
      commiturl: 'http://127.0.0.1:8080/', // The comment commit url [with data in @/components/Comments.vue ]
      avatar: {
        type: 'gravatar', // no longer supported.
        cacheurl: '//g.chicdn.cn/avatar/', // The gravatar cache cdn url (Default https://secure.gravatar.com/avatar/)
        ghcacheurl: '//ghavatar.chicdn.cn/u/', // The github avatar cdn url (Default https://avatars.githubusercontent.com/ )
        d: 'monsterid' // The d you want to show like GRAVATAR_URL/[ID]?d=[this is D] (valine type is supported)
      },
      ghauth: {
        enabled: false, //temporaity false.
        client_id: '204a53c84ec3ff5e5a82',
        // Due to the sucerty problem, the client secret is not supported on chiblog v1.1.3 and above.
        // proxy_url: 'https://ghproxy.moekonnyaku.workers.dev/' // You can deploy this in the cloudflare workers. Code: https://p.atri.tk/j3i
        // The ghauth authenation url is no longer supported, please use the server get way instead.
      },
      backend: {
        enabled: true, // enable your comment backend system
        type: 'valine', // The next will be like disqus, valine and so on.(Serverless options) You can deploy the code in the cloudflare workers. Code: https://p.atri.tk/Mm4 Guide: https://chiblog.apps.chihuo2104.dev/comment-service/workers (WIP) 

        // Now Supported Valine(type:'valine')
        // Valine Options Start:
        // AppId & Key Thanks to bbg & baiyuanneko!
        appid: 'SykuVs4qcWMkl4RUtKEUlmog-gzGzoHsz', // leancloud Appid
        appkey: '0jowkR4ct0lJbWcvocymEkKw', // leancloud Appkey
        start: 'chiblogtestableapp-', // you can fix it with head of this e.g. start: '223-', path will start with '223-'. If you use one leancloud application, this is necessary.
        // Valine Options End.
        
        // When your type is workers (departed in chiblog v1.1.3). Please use 'simplecomment' instead. chicomment-simple is a go-based comment management system. URL: https://github.com/chi-net/chicomment-simple/
        url: 'http://127.0.0.1:8080/'
      }
    },
    footer: '', // the footer will show below the copyright statement. support html tag
    announcement: '', // the announcement will show in the index page. support html tag
    background: {
      enabled: true, // the background image enable button
      img: 'https://pic.koishi514.ml/down/cf7ec7fc0e43aa961bf637b771e80e7f9a3574a3bf898655ef2328ec', // the background image you want to show
      // img: 'https://ghraw.chicdn.cn/chi-net/chiweb/v3.3/public/gallerys/arknights/bg-2.jpg',
      blur: '10px', // show blurs
      mobile: {
        enabled: false, // enable mobile mode
        img: '' //mobile sepecefic images
      }
    }, //background images
    author: {
      name: 'chihuo2104', // the site's owner's name
      url: 'https://im.chihuo2104.dev/' // the site's owner's personal site
    },
    copyright: {
      startyear: 2018 // when the year your copyright starts
    },
    customjs: { // custom javascript file can be ran in this appliaction
      enabled: false,
      type: 'script', // script or url
      script: 'alert(\'Hi!\')' // if type is script, the script is the script you want to run. else like url, you must fill in this with your url.
    },
    showstats: true, // whether show stats (Rendered at and Render cost)
    showcopyright: false, // show your copyright information
    debug: false, // When the debug mode is on, it will display console.log.
    textcount: {
      global: true, // count global
      article: true, // count articles 
      zhonly: false // it is only count chinese font like ‘你好’. It is strongly recommended in a blog written in chinese
    },
    count: { // powered by busuanzi api [https://busuanzi.ibruce.info/] count pvs
      enabled: true,
      site: true, // enable site visits shown at the footer
      article: true // enable article visits show at the header
    }
  }
}

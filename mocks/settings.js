export default {
  site: {
    title: '先輩の家', // The title of your blog
    baseurl: 'https://yajuusenpai.home/', // The site baseurl
    comment: {
      enabled: true,
      commiturl: 'http://127.0.0.1:8080/', // The comment commit url [with data in @/components/Comments.vue ]
      avatar: {
        type: 'gravatar', // no longer supported.
        cacheurl: '//g.chicdn.cn/avatar/', // The gravatar cache cdn url (Default https://secure.gravatar.com/avatar/)
        ghcacheurl: '//ghavatar.chicdn.cn/u/', // The github avatar cdn url (Default https://avatars.githubusercontent.com/ )
        d: 'monsterid' // The d you want to show like GRAVATAR_URL/[ID]?d=[this is D]
      },
      ghauth: {
        enabled: false, //temporaity false.
        client_id: '204a53c84ec3ff5e5a82',
        // Due to the sucerty problem, the client secret is not supported on chiblog v1.1.3 and above.
        // proxy_url: 'https://ghproxy.moekonnyaku.workers.dev/' // You can deploy this in the cloudflare workers. Code: https://p.atri.tk/j3i
        // The ghauth authenation url is no longer supported, please use the server get way instead.
      },
      backend: {
        enabled: false, // enable your comment backend system
        type: 'workers', // The next will be like disqus, valine and so on.(Serverless options) You can deploy the code in the cloudflare workers. Code: https://p.atri.tk/Mm4 Guide: https://chiblog.apps.chihuo2104.dev/comment-service/workers (WIP) 
        // When your type is workers (departed in chiblog v1.1.3). Please use 'simplecomment' instead. chicomment-simple is a go-based comment management system. URL: https://github.com/chi-net/chicomment-simple/
        url: 'http://127.0.0.1:8080/'
      }
    },
    footer: '', // the footer will show below the copyright statement. support html tag
    announcement: '', // the announcement will show in the index page. support html tag
    background: {
      enabled: true, // the background image enable button
      img: '/yajuusenpai.jpg', // the background image you want to show
      // img: 'https://ghraw.chicdn.cn/chi-net/chiweb/v3.3/public/gallerys/arknights/bg-2.jpg',
      blur: '10px', // show blurs
      mobile: {
        enabled: false, // enable mobile mode
        img: '' //mobile sepecefic images
      }
    }, //background images
    author: {
      name: '野獣先輩', // the site's owner's name
      url: 'https://野獣先輩.inm/' // the site's owner's personal site
    },
    copyright: {
      startyear: 2003 // when the year your copyright starts
    },
    customjs: { // custom javascript file can be ran in this appliaction
      enabled: false,
      type: 'script', // script or url
      script: 'alert(\'Hi!\')' // if type is script, the script is the script you want to run. else like url, you must fill in this with your url.
    },
    showstats: false, // whether show stats (Rendered at and Render cost)
    showcopyright: true, // show your copyright information
    debug: false, // When the debug mode is on, it will display console.log.
    textcount: {
      global: false, // count global
      article: false, // count articles 
      zhonly: false // it is only count chinese font like ‘你好’. It is strongly recommended in a blog written in chinese
    },
    count: { // powered by busuanzi api [https://busuanzi.ibruce.info/] count pvs
      enabled: false,
      site: true, // enable site visits shown at the footer
      article: true // enable article visits show at the header
    }
  }
}

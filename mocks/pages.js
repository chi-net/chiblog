export default [
  {
    id: 1, // the id of page(unique)
    type: 'link', // the type of page. if this is a link, it will jump to another url.
    url: 'https://chihuo2104.dev', // the url you want to jump
    title: '测试', // the title of this page
    // type is link has them
    name: 'about', // the name(path) of this page, url will be shown as /[name] (unique)
    target: '_blank' // <a target="[target]"/>
    // if it is a article
    // content: '123' // the content of this page, markdown supported.
    // comment: 'true' // pages supported comment only article supported.
  },
  {
    id: 2,
    type: 'article',
    title: '测试1234',
    name: 'friends',
    content:
      "# test123......\n# chiblog123\n## chiblog1234\n### test123\n\n*嘿嘿 喵喵*\n\n~~sci:其实我很会assign人的~~\n\n<https://github.com/scientificworld>\n\n**图片测试**\n\n![chiimg](https://ttfou.com/images/2022/09/09/60e9b0235f60e89df07a4c7a801af7c4.png)\n\n[喵～](https://github.com/scientificworld)\n\n> 猫猫：玩mc\n> sci:玩fxtz和mc\n\n```import sci from 'scitools'```\n\n`scientificworld`\n\n| sci | mzw |\n|-----|-----|\n|a |bbb |",
    comment: true
  }
]

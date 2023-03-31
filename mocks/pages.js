export default [
  {
    id: 1, // the id of page
    type: 'link', // the type of page. if this is a link, it will jump to another url.
    url: 'https://yajuusenp.ai', // the url you want to jump
    title: '先辈之家', // the title of this page
    // type is link has them
    name: 'about', // the name(path) of this page, url will be shown as /[name]
    target: '_blank' // <a target="[target]"/>
    // if it is a article
    // content: '123' // the content of this page, markdown supported.
  },
  {
    id: 2,
    type: 'article',
    title: '你是一个一个朋友啊啊啊啊啊',
    name: 'friends',
    content: '# 你是一个一个朋友啊啊啊啊啊啊啊啊啊啊啊啊'
  }
]

export default [
  {
    id: 1, // the post id
    title: '你是一个一个一个测试模式啊啊啊啊啊啊啊啊啊啊啊啊！', // the title of this post
    path: '你是一个一个一个测试模式啊啊啊啊啊啊啊啊啊啊啊啊！', // the path of this post, will be shown at /posts/[path]
    name: 'default', // the name of this post, English alphabets, numbers and - only.
    time: 1145141919810, // the release time of this post, unix time
    updtime: 1145141919810, // the update time of this post, unix time
    author: '野獣先輩', // the author of this post
    content: '# 你是一个一个一个测试模式啊啊啊啊啊啊啊啊啊啊啊啊！', // the content of this post, markdown supported. transfer your markdown file into one-row: https://chicdn.cn/mdw/
    china: true, // china support, if you are in china mainland, you are not allowed to see this article if the china marked false
    comment: true, // comment support.
    desc: '你是一个一个一个测试模式啊啊啊啊啊啊啊啊啊啊啊啊！', // the describe of this article, will be shown in the article list and SEO describtion
    category: '你是一个一个一个测试模式啊啊啊啊啊啊啊啊啊啊啊啊！', // the category of this article, will be shown in the article list
    tags: ['imn', 'senpai', 'yajuu'], // the tags of this article, will be shown in the post.
    pinned: true // whether you want to pin this article
  },
  {
    id: 4,
    title: '你好，世界！',
    path: 'hello-world',
    name: 'hello-world',
    time: 0,
    updtime: 0,
    author: 'chiblog',
    content: '当你看到这一段文字的时候，你的chiblog已经可以正常运行，恭喜！',
    china: true,
    comment: false
  }
]

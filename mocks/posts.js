export default [
  {
    id: 1, // the post id(unique)
    title: '你处于test模式！', // the title of this post
    path: 'default测试', // the path of this post, will be shown at /posts/[path] (unique)
    name: 'default', // the name of this post, English alphabets, numbers and - only.
    time: 1657027436, // the release time of this post, unix time
    updtime: 1657027880, // the update time of this post, unix time
    author: 'admin', // the author of this post
    content: '# 可能是网络问题！', // the content of this post, markdown supported. transfer your markdown file into one-row: https://chicdn.cn/mdw/
    china: true, // china support, if you are in china mainland, you are not allowed to see this article if the china marked false
    comment: true, // comment support.
    desc: '摘要测试qwqwqwqwqw摘要测试qwqwqwqwqw摘要测试qwqwqwqwqw摘要测试qwqwqwqwqw摘要测试qwqwqwqwqw摘要测试qwqwqwqwqw摘要测试qwqwqwqwqw摘要测试qwqwqwqwqw摘要测试qwqwqwqwqw摘要测试qwqwqwqwqw摘要测试qwqwqwqwqw摘要测试qwqwqwqwqw摘要测试qwqwqwqwqwq', // the describe of this article, will be shown in the article list and SEO describtion
    category: 'test', // the category of this article, will be shown in the article list
    tags: ['test', 'html', 'css'], // the tags of this article, will be shown in the post.
    pinned: true, // whether you want to pin this article
    banner: 'https://chicdn.cn/xhz.png' // the banner of this article
  },
  {
    id: 2,
    title: 'Hello World',
    path: 'hello-world2',
    name: 'hello-world2',
    time: 1900000000,
    updtime: 1957027880,
    author: 'admin',
    content: 'Hello World!',
    china: false,
    comment: true
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
  },
  {
    id: 333,
    title: '排版测试qwq',
    path: 'paiban',
    name: 'paiban1',
    time: 122,
    updtime: 1663,
    author: 'mm',
    content:
      '# chiblog123\n## chiblog1234\n### test123\n\n*嘿嘿 喵喵*\n\n~~sci:其实我很会assign人的~~\n\n<https://github.com/scientificworld>\n\n使用`superci`大法。猫猫：群内有个superci，感觉比gh actions好用\n\n**图片测试**\n\n![chiimg](https://ttfou.com/images/2022/09/09/60e9b0235f60e89df07a4c7a801af7c4.png)\n\n[喵～](https://github.com/scientificworld)\n\n> 猫猫：玩mc\n> sci:玩fxtz和mc\n\n```import sci from \'scitools\'```\n\n`scientificworld`\n\n| sci | mzw |\n|-----|-----|\n|a |bbb |# test123\n\n> 如果你是有意的，那么你又蠢又坏；如果你是无意的，那么你就很幼稚。 ——张莉莉@宁波外国语学校\n\n```cpp\nvoid setup () {\n Serial.begin(9600);\n}\nvoid loop () {\n Serial.println("what?");\n}\n```\n\n```python\nfrom superci import ci\nci.init()\nci.run(\'galgame\')\n```\n\n## test2\n### test3\n#### test4\n\n- test1\n - test2\n - test3\n - nishiygygygaaa\n - smdx\n\n1. ya\n2. juu\n3. sen\n4. pai\n\n![](https://pic.koishi514.ml/down/cf7ec7fc0e43aa961bf637b771e80e7f9a3574a3bf898655ef2328ec)![](https://chicdn.cn/xhz.png)![](https://pic.koishi514.ml/down/cf7ec7fc0e43aa961bf637b771e80e7f9a3574a3bf898655ef2328ec)![](https://pic.koishi514.ml/down/cf7ec7fc0e43aa961bf637b771e80e7f9a3574a3bf898655ef2328ec)![](https://pic.koishi514.ml/down/cf7ec7fc0e43aa961bf637b771e80e7f9a3574a3bf898655ef2328ec)![](https://pic.koishi514.ml/down/cf7ec7fc0e43aa961bf637b771e80e7f9a3574a3bf898655ef2328ec)![](https://pic.koishi514.ml/down/cf7ec7fc0e43aa961bf637b771e80e7f9a3574a3bf898655ef2328ec)',
    china: true,
    comment: true,
    desc: '摘要测试qwqwqwqwqwq',
    category: 'test',
    tags: ['test', 'html', 'css']
  }
]

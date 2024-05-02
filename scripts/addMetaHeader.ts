export default function (useHead: Function, title: String, desc: String, img: String, author: String, site: String ) {
  useHead({
    title: title,
    meta: [
      {
        name: 'description',
        content: desc
      },
      {
        name: 'twitter:image:src',
        content: img
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        name: 'twitter:title',
        content: title
      },
      {
        name: 'twitter:description',
        content: desc + '- Engined by chiblog.'
      },
      {
        name: 'twitter:creator',
        content: '@' + author
      },
      {
        name: 'twitter:site',
        content: '@' + author
      },
      {
        name: 'og:site_name',
        content: site
      },
      {
        name: 'og:description',
        content: desc
      },
      {
        name: 'article:author',
        content: author
      }
    ]
  })
}
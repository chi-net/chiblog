function lazyloadListener () {
  if ('IntersectionObserver' in window) {
    const lazyloadImages = document.querySelectorAll('.lazyloadimg')
     const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const img = new Image()
          img.src = entry.target.firstElementChild?.dataset.src || ''
          img.onload = () => {
            const image = entry.target.firstElementChild
            image.style.opacity = 0
            setTimeout(() => {
              image.style.opacity = 1
              entry.target.classList.remove('lazyloadimg')
              image.classList.remove('lazy')
              imageObserver.unobserve(entry.target)
              image.src = image.dataset.src
            }, 400)
          }
        }
      })
    })

    lazyloadImages.forEach(function (image) {
      imageObserver.observe(image)
    })
  }
}

export { lazyloadListener }
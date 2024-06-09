class ShowOnScroll extends HTMLElement {
  constructor() {
    super()
    this.handleIntersection = this.handleIntersection.bind(this)
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('div')

    container.classList.add('intersection')

    const slot = document.createElement('slot')

    const stylesheetLink = document.createElement('link')

    stylesheetLink.href = 'style.css'

    stylesheetLink.rel = 'stylesheet'

    shadow.appendChild(stylesheetLink)
    container.appendChild(slot)
    shadow.appendChild(container)

    const observer = new IntersectionObserver(this.handleIntersection, {
      threshold: 0.1,
    })
    observer.observe(this)
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.shadowRoot
          .querySelector('.intersection')
          .classList.add('intersection--visible')
      } else {
        this.shadowRoot
          .querySelector('.intersection')
          .classList.remove('intersection--visible')
      }
    })
  }
}

class CustomSection extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('div')

    container.classList.add('custom-section')

    const slot = document.createElement('slot')

    const stylesheetLink = document.createElement('link')

    stylesheetLink.href = 'style.css'

    stylesheetLink.rel = 'stylesheet'

    shadow.appendChild(stylesheetLink)
    container.appendChild(slot)
    shadow.appendChild(container)

    shadow.addEventListener('slotchange', () => {
      try {
        const button = this.querySelector('.custom-section__button')
        const activeElements = this.querySelectorAll('.active')
        const hiddenText = this.querySelector('.custom-section__text.hidden')

        button.addEventListener('click', () => {
          button.classList.add('hide')
          activeElements.forEach((element) => {
            element.classList.add('hide')
          })
        })

        button.addEventListener('animationend', () => {
          hiddenText.classList.remove('hidden')
          hiddenText.classList.add('reveal')
        })
      } catch (error) {
        console.error(error)
      }
    })
  }
}

customElements.define('show-on-scroll', ShowOnScroll)
customElements.define('custom-section', CustomSection)

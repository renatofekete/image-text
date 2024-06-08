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

customElements.define('show-on-scroll', ShowOnScroll)

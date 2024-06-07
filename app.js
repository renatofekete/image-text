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

    const style = document.createElement('style')

    style.innerText = `
      .intersection {
        visibility: visible;
      }
      .intersection--hidden {
        visibility: hidden;
      }
    `
    shadow.appendChild(style)
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
          .classList.remove('intersection--hidden')
      } else {
        this.shadowRoot
          .querySelector('.intersection')
          .classList.add('intersection--hidden')
      }
    })
  }
}

customElements.define('show-on-scroll', ShowOnScroll)

class ShowOnScroll extends HTMLElement {
  constructor() {
    super()
    this.handleIntersection = this.handleIntersection.bind(this)
    this.observer = null
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

    this.observer = new IntersectionObserver(this.handleIntersection, {
      threshold: 0.1,
    })
    this.observer.observe(this)
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

  disconnectedCallback() {
    this.observer.disconnect()
  }
}

class CustomSection extends HTMLElement {
  constructor() {
    super()
    this.button = null
    this.activeElements = null
    this.hiddenText = null
    this.handleClick = this.handleClick.bind(this)
    this.handleAnimationEnd = this.handleAnimationEnd.bind(this)
    this.handleSlotChange = this.handleSlotChange.bind(this)
  }

  handleClick() {
    this.button.classList.add('hide')
    this.activeElements.forEach((element) => {
      element.classList.add('hide')
    })
  }

  handleAnimationEnd() {
    this.hiddenText.classList.remove('hidden')
    this.hiddenText.classList.add('reveal')
  }

  handleSlotChange() {
    const button = this.querySelector('.custom-section__button')
    if (!button) {
      throw new Error('Button not found')
    }

    this.button = button
    const activeElements = this.querySelectorAll('.active')
    this.activeElements = activeElements
    const hiddenText = this.querySelector('.custom-section__text.hidden')
    this.hiddenText = hiddenText

    this.button.addEventListener('click', this.handleClick)

    this.button.addEventListener('animationend', this.handleAnimationEnd)
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

    shadow.addEventListener('slotchange', this.handleSlotChange)
  }

  disconnectedCallback() {
    this.button.removeEventListener('click', this.handleClick)
    this.button.removeEventListener('animationend', this.handleAnimationEnd)
    this.shadowRoot.removeEventListener('slotchange', this.handleSlotChange)
  }
}

customElements.define('show-on-scroll', ShowOnScroll)
customElements.define('custom-section', CustomSection)

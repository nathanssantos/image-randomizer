const app = {
    main: document.querySelector('main'),
    aside: {
        element: document.querySelector('aside'),
        btToggle: document.querySelector('aside .bt-toggle'),
        IsOpen: true
    },

    toggleAside(aside) {
        aside.IsOpen
            ? aside.element.style.width = '50px'
            : aside.element.style.width = '200px'
        aside.IsOpen = !aside.IsOpen
    },

    bindEvents() {
        this.aside.btToggle.addEventListener('click', () => app.toggleAside(this.aside))

    },


    init() {
        this.bindEvents()
    }
}

app.init()

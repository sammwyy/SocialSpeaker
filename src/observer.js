class Observer {
    constructor (handler) {
        this.observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                handler(mutation);
            });
        });
    }

    start () {
        this.observer.observe(document.body, {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true
        })
    }
}
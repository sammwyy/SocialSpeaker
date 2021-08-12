class Injector {
    constructor () {
        this.handleMutation = this.handleMutation.bind(this);
        this.initialInjection = this.initialInjection.bind(this);

        this.observer = new Observer(this.handleMutation);
        this.injected = [];
    }

    handleMutation () {}
    initialInjection () {}

    isInjected (elem) {
        return this.injected.includes(elem);
    }

    setInjected (elem) {
        this.injected.push(elem);
    }

    start () {
        this.observer.start();
        this.initialInjection();
    }
}

Injector.createInjector = () => {
    return new TwitterInjector();
}
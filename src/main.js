class SocialSpeaker {
    constructor () {
        this.injector = Injector.createInjector();
    }

    start () {
        this.injector.start();
    }
}

const app = new SocialSpeaker();
app.start();
class SocialSpeaker {
  constructor() {
    this.injector = Injector.createInjector();
  }

  start() {
    if (this.injector) {
      this.injector.start();
    }
  }
}

const app = new SocialSpeaker();
app.start();

class TwitterInjector extends Injector {
  extractTweet(container) {
    const tweetElement = container.parentElement.parentElement.parentElement;
    const spans = tweetElement.querySelectorAll("span");

    let tweetContent = "";
    for (let element of spans) {
      if (element.parentElement.hasAttribute("lang")) {
        tweetContent += element.innerText;
      }
    }

    return tweetContent;
  }

  extractBio(container) {
    const bioElement =
      container.parentElement.parentElement.querySelector("[data-testid]");
    const spans = bioElement.querySelectorAll("span");

    let bioContent = "";
    for (let element of spans) {
      bioContent += element.innerText;
    }

    return bioContent;
  }

  extractWriteTweet(container) {
    const writeTweetElement =
      container.parentElement.parentElement.parentElement.parentElement
        .parentElement;
    const input = writeTweetElement.querySelector("[data-text]");
    return input.innerText;
  }

  injectInTweet(target) {
    if (this.isInjected(target)) {
      return;
    } else {
      this.setInjected(target);
    }

    const container = document.createElement("div");
    container.classList.add("css-1dbjc4n", "r-18u37iz", "r-1h0z5md");
    container.innerHTML = `
            <div aria-label="Read with speaker" role="button" tabindex="0" class="css-18t94o4 css-1dbjc4n r-1777fci r-bt1l66 r-1ny4l3l r-bztko3 r-lrvibr" data-testid="reply">
                <text class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0" style="font-size:18px;">📣</text>
            </div>`;

    container.addEventListener("click", () => {
      TTS.say(this.extractTweet(container));
    });

    target.appendChild(container);
  }

  injectInProfile(target) {
    if (this.isInjected(target)) {
      return;
    } else {
      this.setInjected(target);
    }

    const container = document.createElement("div");
    container.id = "profile-speak-btn";
    container.classList.add("css-1dbjc4n");
    container.style.marginLeft = "15px";
    container.innerHTML = `
        <div aria-label="Read with speaker" role="button" tabindex="0" class="css-18t94o4 css-1dbjc4n r-1777fci r-bt1l66 r-1ny4l3l r-bztko3 r-lrvibr" data-testid="reply">
            <text class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0" style="font-size:18px;">📣</text>
        </div>`;
    container.addEventListener("click", () => {
      TTS.say(this.extractBio(container));
    });

    target.appendChild(container);
  }

  injectInWriteTweet(target) {
    if (this.isInjected(target)) {
      return;
    } else {
      this.setInjected(target);
    }

    const container = document.createElement("div");
    container.id = "write-tweet-speak-btn";
    container.classList.add("css-1dbjc4n");
    container.style.marginLeft = "15px";
    container.innerHTML = `
        <div aria-label="Read with speaker" role="button" tabindex="0" class="css-18t94o4 css-1dbjc4n r-1777fci r-bt1l66 r-1ny4l3l r-bztko3 r-lrvibr" data-testid="reply">
            <text class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0" style="font-size:18px;">📣</text>
        </div>`;
    container.addEventListener("click", () => {
      TTS.say(this.extractWriteTweet(container));
    });

    target.appendChild(container);
  }

  initialInjection() {
    setInterval(() => {
      /* Inject in Profile */
      const profileElement = Utils.findByClasses(
        "css-1dbjc4n r-13awgt0 r-18u37iz r-1w6e6rj"
      );
      if (profileElement) {
        let speakButton = document.getElementById("profile-speak-btn");
        if (!speakButton) {
          this.injectInProfile(profileElement);
        }
      }

      /* Inject in Tweet Write */
      const writeTweetElement = Utils.findByClasses(
        "css-1dbjc4n r-1awozwy r-18u37iz r-1s2bzr4"
      );
      if (writeTweetElement) {
        let speakButton = document.getElementById("write-tweet-speak-btn");
        if (!speakButton) {
          this.injectInWriteTweet(writeTweetElement);
        }
      }
    }, 2000);
  }

  handleMutation(mutation) {
    const { target } = mutation;
    if (
      Utils.compareClasses(target, ["css-1dbjc4n", "r-1ta3fxp", "r-18u37iz"])
    ) {
      this.injectInTweet(target);
    }
  }
}

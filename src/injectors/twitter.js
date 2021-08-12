class TwitterInjector extends Injector {

    extractTweet (container) {
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

    injectInTweet (target) {
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

    injectInProfile (target) {
        if (this.isInjected(target)) {
            return;
        } else {
            this.setInjected(true);
        }

        const container = document.createElement("div");
        container.classList.add("css-1dbjc4n");
        container.innerHTML = '<text class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0" style="font-size:18px;">📣</text>';
        target.appendChild(container)
    }

    handleMutation (mutation) {
        const { target } = mutation;
        if (Utils.compareClasses(target, ["css-1dbjc4n", "r-1ta3fxp", "r-18u37iz"])) {
            this.injectInTweet(target);
        } else if (Utils.compareClasses(target, ["css-1dbjc4n", "r-13awgt0", "r-18u37iz", "r-1w6e6rj"])) {
            console.log("xd");
            this.injectInProfile(target);
        }
    }
}
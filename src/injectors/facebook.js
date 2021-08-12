class FacebookInjector extends Injector {
  extractFeed(container) {
    let spans = container.parentNode.parentNode.querySelectorAll(
      "div[dir=auto] > div.ecm0bbzt > div.j83agx80 > div.qzhwtbm6 > span[dir=auto] > div.cxmmr5t8  > div[dir=auto]"
    );

    let content = "";
    for (let span of [...spans]) {
      content += span.innerText;
    }

    return content;
  }

  extractBio(container) {
    let spans = container.querySelectorAll("span");
    let content = "";
    for (let span of spans) {
      content += span.innerText;
    }
    return content;
  }

  injectInFeed(element) {
    if (element.getAttribute("data-pagelet")) {
      const parentContainer = element.querySelector("[aria-haspopup=menu]");

      if (parentContainer) {
        const container = parentContainer.parentNode.parentNode;
        const button = document.createElement("div");
        button.innerHTML = "📣";

        button.style.fontSize = "24px";
        button.style.cursor = "pointer";
        button.addEventListener("click", () => {
          TTS.say(this.extractFeed(container));
        });

        container.insertBefore(
          button,
          container.children[container.children.length - 1]
        );
      }
    }
  }

  injectInProfile(element) {
    if (this.isInjected(element)) {
      return;
    } else {
      this.setInjected(element);
    }

    const button = document.createElement("div");
    button.innerHTML = "📣";

    button.style.fontSize = "24px";
    button.style.cursor = "pointer";
    button.addEventListener("click", () => {
      TTS.say(this.extractBio(element));
    });
    element.appendChild(button);
  }

  initialInjection() {
    setInterval(() => {
      const profileElement = Utils.findByClasses(
        "d2edcug0 hpfvmrgz qv66sw1b c1et5uql lr9zc1uh a8c37x1j keod5gw0 nxhoafnm aigsh9s9 d3f4x2em fe6kdd0r mau55g9w c8b282yb mdeji52x a5q79mjw g1cxx5fr knj5qynh m9osqain oqcyycmt"
      );
      if (profileElement) {
        this.injectInProfile(profileElement);
      }
    }, 2000);
  }

  handleMutation(mutation) {
    const { target } = mutation;

    /* Feed */
    if (
      target.hasAttribute &&
      target.hasAttribute("role") &&
      target.getAttribute("role") == "feed"
    ) {
      const addedNodes = mutation.addedNodes;
      for (let node of addedNodes) {
        this.injectInFeed(node);
      }
    }
  }
}

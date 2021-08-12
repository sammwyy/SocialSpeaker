const Utils = {};

Utils.compareClasses = (element, classList) => {
    if (typeof(classList) == "string") {
        classList = classList.split(" ");
    }
    
    if (!element.classList) {
        return false;
    }

    for (let className of classList) {
        if (!element.classList.contains(className)) {
            return false;
        }
    }

    return true;
}

Utils.findByClasses = (classList) => {
    if (typeof(classList) == "string") {
        classList = classList.split(" ");
    }
    
    let elements = document.getElementsByClassName(classList.shift());

    for (let element of elements) {
        let match = true;
        for (let className of classList) {
            if (!element.classList.contains(className)) {
                match = false;
                break;
            }
        }

        if (match) {
            return element;
        } else {
            continue;
        }
    }

    return null;
}
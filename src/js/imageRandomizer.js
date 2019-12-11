const imageRandomizer = {
  initialized: false,

  fadeIn(element, transitionTime) {
    element.removeAttribute("hidden");
    element.style.display = "block";
    setTimeout(() => (element.style.opacity = 1), transitionTime);
  },

  fadeOut(element, transitionTime) {
    element.setAttribute("hidden", true);
    element.style.opacity = 0;
    setTimeout(() => (element.style.display = "none"), transitionTime);
  },

  init({ containerClass = "body", imagesToShow = 8, transitionTime = 1000, delay = 4000, devMode = false } = {}) {
    const setImageRandomizerInterval = setInterval(() => {
      if (document.querySelector(containerClass) !== undefined && !this.initialized) {
        clearInterval(setImageRandomizerInterval);
        this.initialized = true;

        const visibleImages = document.querySelectorAll(`${containerClass} img`);
        const hiddenImages = [];

        if (visibleImages.length < 2) return;
        if (visibleImages.length < imagesToShow) imagesToShow = visibleImages.length - 1;
        if (delay < transitionTime) delay = transitionTime;

        visibleImages.forEach((element, index) => {
          element.style.transition = `all ${transitionTime}ms ease-in-out`;
          if (index >= imagesToShow) {
            element.style.display = "none";
            element.setAttribute("hidden", true);
            hiddenImages.push(element);
          } else {
            element.style.display = "block";
          }
        });

        if (devMode) {
          document.querySelector(".hidden-images").style.display = "block";
          hiddenImages.forEach(i => {
            i.style.display = "block";
            document.querySelector(".hidden-images__content").append(i);
          });
        }

        const radomizeImages = () => {
          const randomImagesLength = parseInt(Math.random() * imagesToShow);
          const randomHiddenImagesLength = parseInt(Math.random() * hiddenImages.length);
          const currentImageSrc = visibleImages[randomImagesLength].getAttribute("src");

          this.fadeOut(visibleImages[randomImagesLength], transitionTime);

          setTimeout(() => {
            visibleImages[randomImagesLength].setAttribute("src", hiddenImages[randomHiddenImagesLength].getAttribute("src"));
            this.fadeIn(visibleImages[randomImagesLength], transitionTime);
            hiddenImages[randomHiddenImagesLength].setAttribute("src", currentImageSrc);
          }, transitionTime);
        };

        setInterval(() => {
          radomizeImages();
        }, 3 * transitionTime + delay);
      }
    }, 0);
  }
};

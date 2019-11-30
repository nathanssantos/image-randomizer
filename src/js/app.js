//somente teste\/
$(".hidden-images__content").append($('.col:hidden .ux-logo-image').clone())
//somente teste/\


var randomizeImagesInitialized = false

var randomizeImages = function () {
    var TRANSITION_TIME = 1000

    var fadeIn = function (element) {
        element.style.display = "block"
        setTimeout(function () { element.style.opacity = 1 }, TRANSITION_TIME)
    }

    var fadeOut = function (element) {
        element.style.opacity = 0
        setTimeout(function () { element.style.display = "none" }, TRANSITION_TIME)
    }

    setInterval(function () {
        var images = $('.col:visible .ux-logo-image')
        var hiddenImages = $('.col:hidden .ux-logo-image')
        var randomImagesLength = parseInt(Math.random() * images.length)
        var randomHiddenImagesLength = parseInt(Math.random() * hiddenImages.length)

        var currentImageSrc = images[randomImagesLength].getAttribute("src")

        fadeOut(images[randomImagesLength])

        setTimeout(function () {

            images[randomImagesLength].setAttribute('src', hiddenImages[randomHiddenImagesLength].getAttribute('src'))
            
            setTimeout(function () {
            
                fadeIn(images[randomImagesLength])
                hiddenImages[randomHiddenImagesLength].setAttribute("src", currentImageSrc)
                
                //somente teste\/
                $(".hidden-images__content").html("")
                $(".hidden-images__content").append($('.col:hidden .ux-logo-image').clone())
                //somente teste/\

            }, TRANSITION_TIME / 2)

        }, TRANSITION_TIME)
    
    }, 5 * TRANSITION_TIME)
}

var setRandomizeImagesInterval =  setInterval(function () {
    if (document.querySelector(".clients-wrapper") != undefined && $('.col:hidden .ux-logo-image').length && !randomizeImagesInitialized) {
        randomizeImages()
        randomizeImagesInitialized = true
        clearInterval(setRandomizeImagesInterval)
        console.log("randomizeImages initialized")
    }
}, 1000)

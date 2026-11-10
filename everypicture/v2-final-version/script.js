(function () {
    "use strict";
    console.log("reading js");

 
    const photos = [
        { image: "artwork-1.jpg", title: "Artwork 1", description: "A portrait of my younger brother from my AP Art portfolio. I was exploring how to connect the Chinese and American flags through stars and stripes." },
        { image: "artwork-2.jpg", title: "Artwork 2", description: "A portrait of my younger self from my AP Art portfolio. Experimented with spray paint, gouache, and charcoal." },
        { image: "artwork-3.jpg", title: "Artwork 3", description: "A portrait of an Asian immigrant from my AP Art porfolio. Experimented with spray paint, charcoal, and gouache." },
        { image: "artwork-4.jpg", title: "Artwork 4", description: "A portrait of my grandma from my AP Art portfolio. Placed the flag stars on her face, following the contours." },
        { image: "artwork-5.jpg", title: "Artwork 5", description: "A portrait of my younger self from my AP Art portfolio. Used Chinese stars as the American flag stars. Experimented with spray paint and oil paint." }
    ];

    const stars = document.querySelectorAll(".star");
    const artworks = document.querySelectorAll(".artwork");
    const lines = document.querySelectorAll(".constellation-lines path");
    const overlay = document.querySelector("#overlay");
    const modalImage = document.querySelector("#modal-image");
    const modalTitle = document.querySelector("#art-title");
    const modalDescription = document.querySelector("#art-description");
    const closeButton = document.querySelector("#close");
    let lastStar = null;
    let activeArtwork = -1;
    let revealTimer;
    let fadeTimer;


    const drawTime = 2200;
    const holdTime = 1500;


    for (let i = 0; i < photos.length; i++) {
        const group = document.querySelectorAll(`.star[data-art="${i}"]`);
        let points = "";

        for (let j = 0; j < group.length; j++) {
            const star = group[j];
            const x = (parseFloat(star.style.left) + parseFloat(star.style.width) / 2) * 14.4;
            const y = (parseFloat(star.style.top) + parseFloat(star.style.height) / 2) * 10.24;
            points += `${j === 0 ? "M" : "L"} ${x} ${y} `;
        }
        lines[i].setAttribute("d", points);
    }

   
    function showArtwork(number) {

        if (activeArtwork === number) {
            return;
        }

        hideArtwork();
        activeArtwork = number;
        lines[number].classList.add("drawing");

        for (let i = 0; i < stars.length; i++) {
            if (Number(stars[i].dataset.art) === number) {
                stars[i].classList.add("lit");
            }
        }

        revealTimer = setTimeout(function () {
            artworks[number].classList.add("visible");


            fadeTimer = setTimeout(function () {
                lines[number].classList.add("fading");
            }, holdTime);
        }, drawTime);
    }


    function hideArtwork() {
        clearTimeout(revealTimer);
        clearTimeout(fadeTimer);
        activeArtwork = -1;

        for (let i = 0; i < artworks.length; i++) {
            artworks[i].classList.remove("visible");
            lines[i].classList.remove("drawing", "fading");
        }
        for (let i = 0; i < stars.length; i++) {
            stars[i].classList.remove("lit");
        }
    }


    function openOverlay(number) {
        modalImage.src = `images/${photos[number].image}`;
        modalImage.alt = photos[number].title;
        modalTitle.textContent = photos[number].title;
        modalDescription.textContent = photos[number].description;
        overlay.classList.remove("hidden");
        overlay.setAttribute("aria-hidden", "false");
        closeButton.focus();
    }

    function closeOverlay() {
        overlay.classList.add("hidden");
        overlay.setAttribute("aria-hidden", "true");
        if (lastStar !== null) {
            lastStar.focus();
        }
    }

    for (let i = 0; i < stars.length; i++) {
        const number = Number(stars[i].dataset.art);
        stars[i].addEventListener("mouseenter", function () {
            showArtwork(number);
        });
        stars[i].addEventListener("mouseleave", hideArtwork);
        stars[i].addEventListener("focus", function () {
            showArtwork(number);
        });
        stars[i].addEventListener("blur", hideArtwork);
        stars[i].addEventListener("click", function () {
            lastStar = stars[i];
            openOverlay(number);
        });
    }

    closeButton.addEventListener("click", closeOverlay);
    overlay.addEventListener("click", function (event) {
        if (event.target === overlay) {
            closeOverlay();
        }
    });
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && !overlay.classList.contains("hidden")) {
            closeOverlay();
        }
    });
})();

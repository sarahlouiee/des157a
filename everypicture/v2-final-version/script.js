(function () {
    "use strict";
    console.log("reading js");

    // Artwork information. Replace the titles and descriptions with your own.
    const photos = [
        { image: "artwork-1.jpg", title: "Artwork 1", description: "A portrait from my AP Art portfolio." },
        { image: "artwork-2.jpg", title: "Artwork 2", description: "A portrait from my AP Art portfolio." },
        { image: "artwork-3.jpg", title: "Artwork 3", description: "A portrait from my AP Art portfolio." },
        { image: "artwork-4.jpg", title: "Artwork 4", description: "A portrait from my AP Art portfolio." },
        { image: "artwork-5.jpg", title: "Artwork 5", description: "A portrait from my AP Art portfolio." }
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

    // Connect the centers of the white stars for each artwork.
    // The SVG and the mockup use the same 1440 x 1024 coordinates.
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

    // Show only the artwork associated with the hovered star.
    function showArtwork(number) {
        for (let i = 0; i < artworks.length; i++) {
            if (i === number) {
                artworks[i].classList.add("visible");
            } else {
                artworks[i].classList.remove("visible");
            }
        }
        for (let i = 0; i < lines.length; i++) {
            lines[i].classList.toggle("visible", i === number);
        }
        for (let i = 0; i < stars.length; i++) {
            stars[i].classList.toggle("lit", Number(stars[i].dataset.art) === number);
        }
    }

    // Hide the image after leaving an interactive star.
    function hideArtwork() {
        for (let i = 0; i < artworks.length; i++) {
            artworks[i].classList.remove("visible");
            lines[i].classList.remove("visible");
        }
        for (let i = 0; i < stars.length; i++) {
            stars[i].classList.remove("lit");
        }
    }

    // Show the selected photograph and its description in the overlay.
    function openOverlay(number) {
        modalImage.src = `images/${photos[number].image}`;
        modalImage.alt = photos[number].title;
        modalTitle.textContent = photos[number].title;
        modalDescription.textContent = photos[number].description;
        overlay.classList.remove("hidden");
        overlay.setAttribute("aria-hidden", "false");
        closeButton.focus();
    }

    // Close the overlay and return keyboard focus to the selected star.
    function closeOverlay() {
        overlay.classList.add("hidden");
        overlay.setAttribute("aria-hidden", "true");
        if (lastStar !== null) {
            lastStar.focus();
        }
    }

    // Connect all white stars to a hover, keyboard-focus and click event.
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

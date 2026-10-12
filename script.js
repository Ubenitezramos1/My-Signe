const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("login-button");
const message = document.getElementById("message");
const loginContainer = document.getElementById("login-container");
const websiteContent = document.getElementById("website-content");
const puzzleMessage = document.getElementById("puzzle-message");

const initializedPages = new Set();

// Photos are stored together in one opaque archive to avoid listing each
// image separately in the public repository. This is concealment, not security.
const photoAssets = loadPhotoAssets();

async function loadPhotoAssets() {
    const response = await fetch("memories.assets");
    if (!response.ok) throw new Error("Could not load the photo archive.");

    const buffer = await response.arrayBuffer();
    const view = new DataView(buffer);
    const manifestLength = view.getUint32(0, false);
    const manifestStart = 4;
    const payloadStart = manifestStart + manifestLength;
    const manifest = JSON.parse(
        new TextDecoder().decode(new Uint8Array(buffer, manifestStart, manifestLength))
    );
    const assets = {};

    manifest.forEach(asset => {
        const bytes = buffer.slice(payloadStart + asset.offset, payloadStart + asset.offset + asset.length);
        assets[asset.id] = URL.createObjectURL(new Blob([bytes], { type: asset.type }));
    });

    return assets;
}

const correctPassword = atob("Rmln")

const reunionDate = new Date(
    "2026-11-15T12:00:00"
);

const letterText = `
I've been thinking about what I wanted to say, and I realized my favorite part of us isn't one specific memory. It's watching who we're becoming together.

From our late-night talks at the park and the pier to all the little moments in between, somewhere along the way, you became someone who feels like home.

One of the things I admire most about you is how deeply you think and how willing you are to grow. I don't want a perfect version of you. I just want you. Every part of you, including the parts you're still figuring out. I'll always try to understand you before I judge you.

You've made me want to be a better man. You've challenged me to communicate better, trust more, and choose understanding over assumptions.

I don't know exactly what our future looks like, but I do know I want to keep learning about you, growing with you, and choosing you every day.

Thank you for trusting me, for letting me be a part of your life, and for showing me a love that feels genuine and meaningful. No matter how many miles are between us, I'm grateful that I get to call you mine.

I love you.
`;

const letters = [
    {
        date: "August 1, 2026",
        title: "National GF Day",
        greeting: "To my favorite person,",
        body: letterText,
        signature: "Always,\nUriel"
    }
];

const songs = [

    {
        title: "Car Crash",

        artist: "Jigitz, Charlotte Plank",

        embed:
            "https://open.spotify.com/embed/album/1lP8AhonyWZZKNgnEcjSV0?utm_source=generator&si=0dc0c25a6be84159",

        note:
            "Probably isn't the song you'd expect to find here, but every time I hear it, I picture you. I imagine us out together, dancing, laughing, and completely forgetting about everything else."
    },


    {
        title: "Eres",

        artist: "Café Tacvba",

        embed:
            "https://open.spotify.com/embed/track/6kdCN6gTWLcLxmLXoUcwuI?utm_source=generator&si=cbcbd82b04eb4e1c",

        note:
            "This song brings me back to Oaxaca and the day we got our infinity bracelets. Seeing it on the Jewelry and how we both liked it immediately. It's a small memory, but somehow it holds so much."
    },


    {
        title: "Planet",

        artist: "The Neighborhood",

        embed: "https://open.spotify.com/embed/track/3UFePyU0mSJvGONoLWKTeW?utm_source=generator&si=c0af7a8d1f20402c",

        note:
            "I remember playing this song and how you really liked it. Now it's on your playlists and you're queuing it on the speakers at Isla Verde. I hope we never stop sharing little pieces of ourselves like that."
    }

];

const memories = [

    {
        image: "photo1",

        caption:
            "One of my favorite days with you ♥️"
    },


    {
        image: "photo2",

        caption:
            "I still smile whenever I see this."
    },


    {
        image: "photo3",

        caption:
            "A memory I never want to forget."
    },


    {
        image: "photo4",

        caption:
            "A very special day."
    },

    {
        image: "photo5",

        caption:
            "One of many adventures together."
    }

];

const puzzlePhotoIds = [
    "puzzle-party",
    ...memories.map((_, index) => `puzzle-memory-${index + 1}`)
];

let puzzlePhotoIndex = Math.floor(Math.random() * puzzlePhotoIds.length) - 1;

const adventures = [
    {
        date: "May 28, 2026 🇲🇽",
        title: "Our Mexico adventure",
        images: [
            "mexico-1",
            "mexico-2",
            "mexico-3",
            "mexico-4",
            "mexico-5",
            "mexico-6",
            "mexico-7"
        ]
    },
    {
        date: "August 21, 2026 🇬🇹",
        title: "Our Guatemala adventure",
        images: [
            "guatemala-1",
            "guatemala-2",
            "guatemala-3",
            "guatemala-4",
            "guatemala-5",
            "guatemala-6"
        ]
    }
];

const finalText = `
Signe,

I hope this little corner of the internet
reminded you how much you mean to me.

Even though there are miles between us,
you are still a part of my everyday life.

I cannot wait for all the adventures
we still have ahead.

Until then, keep this as a little reminder
that I am always thinking of you.

`;

loginButton.addEventListener("click", checkPassword);

passwordInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        checkPassword();

    }

});

function checkPassword() {

    const enteredPassword = passwordInput.value;

    if (enteredPassword === correctPassword) {

        loginContainer.classList.add("hidden");

        setTimeout(() => {

            loginContainer.style.display = "none";

            websiteContent.style.display = "block";

            setTimeout(() => {
                websiteContent.classList.add("visible");
            }, 60);

        }, 900);

    } else {

        message.textContent = "That password isn't quite right :(";
        passwordInput.value = "";
        passwordInput.focus();

    }
}

function navigateTo(pageId) {
    const page = document.getElementById(pageId);
    if (!page) return;

    document.querySelectorAll("#website-content .app-page").forEach(section => {
        section.classList.remove("active", "visible", "hidden");
    });

    page.classList.add("active", "visible");
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    if (pageId === "puzzle-page") {
        initializedPages.add(pageId);
        createPuzzle();
        return;
    }

    if (initializedPages.has(pageId)) return;
    initializedPages.add(pageId);

    if (pageId === "letter-page") createLetterCards();
    if (pageId === "music-page") createSongs();
    if (pageId === "memory-page") createGallery();
    if (pageId === "adventures-page") {
        createAdventureList();
    }
    if (pageId === "final-page") {
        typeFinalMessage();
    }
}

document.getElementById("home-button").addEventListener("click", () => {
    navigateTo("home-page");
});

document.querySelectorAll(".home-tile[data-page]").forEach(tile => {
    tile.addEventListener("click", () => navigateTo(tile.dataset.page));
});

function createLetterCards() {
    const letterList = document.getElementById("letter-list");
    const continueButton = document.getElementById("continue-button");

    letters.forEach((letter, index) => {
        const card = document.createElement("article");
        card.classList.add("archive-entry-card");

        const toggle = document.createElement("button");
        toggle.type = "button";
        toggle.classList.add("archive-entry-toggle");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-controls", `letter-content-${index}`);

        const heading = document.createElement("span");
        heading.classList.add("archive-entry-heading");

        const date = document.createElement("span");
        date.classList.add("archive-entry-date");
        date.textContent = letter.date;

        const title = document.createElement("span");
        title.classList.add("archive-entry-title");
        title.textContent = letter.title;

        const chevron = document.createElement("span");
        chevron.classList.add("archive-entry-chevron");
        chevron.setAttribute("aria-hidden", "true");
        chevron.textContent = "⌄";

        heading.append(date, title);
        toggle.append(heading, chevron);

        const content = document.createElement("div");
        content.classList.add("archive-entry-content", "letter-entry-content");
        content.id = `letter-content-${index}`;
        content.hidden = true;

        if (letter.greeting) {
            const greeting = document.createElement("p");
            greeting.classList.add("letter-greeting");
            greeting.textContent = letter.greeting;
            content.appendChild(greeting);
        }

        letter.body.trim().split(/\n\s*\n/).forEach(paragraphText => {
            const paragraph = document.createElement("p");
            paragraph.textContent = paragraphText.trim();
            content.appendChild(paragraph);
        });

        if (letter.signature) {
            const signature = document.createElement("p");
            signature.classList.add("letter-signature");
            signature.textContent = letter.signature;
            content.appendChild(signature);
        }

        toggle.addEventListener("click", () => {
            const isExpanded = toggle.getAttribute("aria-expanded") === "true";
            toggle.setAttribute("aria-expanded", String(!isExpanded));
            content.hidden = isExpanded;
            card.classList.toggle("expanded", !isExpanded);
        });

        card.append(toggle, content);
        letterList.appendChild(card);
    });

    continueButton.style.opacity = "1";
    continueButton.style.pointerEvents = "auto";
}

document
    .getElementById("continue-button")
    .addEventListener("click", () => navigateTo("puzzle-page"));

const puzzleContainer = document.getElementById("puzzle-container");

puzzleContainer.innerHTML = "";

let selectedPiece = null;

async function createPuzzle() {

    const assets = await photoAssets;

    puzzlePhotoIndex = (puzzlePhotoIndex + 1) % puzzlePhotoIds.length;
    const puzzleImage = assets[puzzlePhotoIds[puzzlePhotoIndex]];

    puzzleContainer.innerHTML = "";
    selectedPiece = null;
    puzzleMessage.classList.remove("visible");
    puzzleMessage.style.display = "none";
    puzzleMessage.textContent = "";
    button.style.opacity = "0";
    button.style.pointerEvents = "none";

    let pieces = [];

    for (let i = 0; i < 9; i++) {

        pieces.push(i);

    }


    shufflePieces(pieces);


    pieces.forEach((pieceNumber) => {

        const piece = document.createElement("div");

        piece.classList.add("piece");

        piece.dataset.correct = pieceNumber;


        puzzleContainer.appendChild(piece);


        setPieceImage(piece, pieceNumber, puzzleImage);


        piece.addEventListener(
            "click",
            selectPiece
        );

    });

}

function setPieceImage(piece, number, imageUrl) {

    const row = Math.floor(number / 3);

    const col = number % 3;


    const width = piece.offsetWidth;
    const height = piece.offsetHeight;

    piece.style.backgroundImage = `url("${imageUrl}")`;


    piece.style.backgroundPosition =
        `-${col * width}px -${row * height}px`;

}

function shufflePieces(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];

    }

}

function selectPiece() {

    // Clicking the selected piece again
    if (this === selectedPiece) {

        this.classList.remove("selected");

        selectedPiece = null;

        return;

    }


    // First piece selected
    if (selectedPiece === null) {

        selectedPiece = this;

        this.classList.add("selected");

        return;

    }


    // Second piece selected
    swapPieces(
        selectedPiece,
        this
    );


    selectedPiece.classList.remove(
        "selected"
    );


    selectedPiece = null;


    checkSolved();

}

function swapPieces(first, second) {

    const firstPlaceholder = document.createElement("div");
    const secondPlaceholder = document.createElement("div");


    puzzleContainer.replaceChild(
        firstPlaceholder,
        first
    );


    puzzleContainer.replaceChild(
        secondPlaceholder,
        second
    );


    puzzleContainer.replaceChild(
        first,
        secondPlaceholder
    );


    puzzleContainer.replaceChild(
        second,
        firstPlaceholder
    );

}

const button = document.getElementById("puzzle-button");
button.style.opacity = "0";

function checkSolved() {

    const currentPieces =
        document.querySelectorAll(".piece");


    let solved = true;


    currentPieces.forEach((piece, index) => {


        if (Number(piece.dataset.correct) !== index) {

            solved = false;

        }


    });


    if (solved) {

        puzzleMessage.textContent = "You found us ♥️";

        puzzleMessage.style.display = "block";


        setTimeout(() => {

            puzzleMessage.classList.add("visible");


            button.style.opacity = "1";

            button.style.pointerEvents = "auto";

        }, 60);

    }

}

document
    .getElementById("puzzle-button")
    .addEventListener("click", () => navigateTo("music-page"));

function createSongs() {

    const songContainer =
        document.getElementById("songs");


    songs.forEach(song => {


        const songCard =
            document.createElement("div");


        songCard.classList.add("song");


        songCard.innerHTML = `

            <h2 class="song-title">
                ${song.title}
            </h2>

            <p class="artist">
                ${song.artist}
            </p>


            <iframe
                src="${song.embed}"
                width="100%"
                height="152"
                frameborder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy">
            </iframe>


            <p id="song-message">
                ${song.note}
            </p>

        `;


        songContainer.appendChild(songCard);




    });

}

document
    .getElementById("music-continue")
    .addEventListener("click", () => navigateTo("memory-page"));

async function createGallery() {

    const assets = await photoAssets;

    const gallery =
        document.getElementById("photo-gallery");


    memories.forEach(memory => {


        const photoCard =
            document.createElement("div");


        photoCard.classList.add("photo-card");


        photoCard.innerHTML = `

            <img src="${assets[memory.image]}" alt="${memory.caption}">


            <p>
                ${memory.caption}
            </p>

        `;


        gallery.appendChild(photoCard);


    });

}

async function createAdventureList() {
    const assets = await photoAssets;
    const adventureList = document.getElementById("adventure-list");

    adventures.forEach((adventure, index) => {
        const card = document.createElement("article");
        card.classList.add("archive-entry-card");

        const toggle = document.createElement("button");
        toggle.type = "button";
        toggle.classList.add("archive-entry-toggle");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-controls", `adventure-photos-${index}`);

        const heading = document.createElement("span");
        heading.classList.add("archive-entry-heading");

        const date = document.createElement("p");
        date.classList.add("archive-entry-date");
        date.textContent = adventure.date;

        const title = document.createElement("span");
        title.classList.add("archive-entry-title");
        title.textContent = adventure.title;

        const chevron = document.createElement("span");
        chevron.classList.add("archive-entry-chevron");
        chevron.setAttribute("aria-hidden", "true");
        chevron.textContent = "⌄";

        heading.append(date, title);
        toggle.append(heading, chevron);
        card.appendChild(toggle);

        const content = document.createElement("div");
        content.classList.add("archive-entry-content");
        content.id = `adventure-photos-${index}`;
        content.hidden = true;

        toggle.addEventListener("click", () => {
            const isExpanded = toggle.getAttribute("aria-expanded") === "true";
            toggle.setAttribute("aria-expanded", String(!isExpanded));
            content.hidden = isExpanded;
            card.classList.toggle("expanded", !isExpanded);
        });

        if (adventure.images?.length) {
            const gallery = document.createElement("div");
            gallery.classList.add("adventure-gallery");

            adventure.images.forEach((imageId, index) => {
                const figure = document.createElement("figure");
                figure.classList.add("adventure-photo");

                const image = document.createElement("img");
                image.src = assets[imageId];
                image.alt = `${adventure.title}, photo ${index + 1}`;
                image.loading = "lazy";

                figure.appendChild(image);
                gallery.appendChild(figure);
            });

            content.appendChild(gallery);
        }

        card.appendChild(content);
        adventureList.appendChild(card);
    });
}

document
    .getElementById("photo-continue")
    .addEventListener("click", () => navigateTo("final-page"));

function typeFinalMessage() {

    let index = 0;

    const speed = 8;


    function type() {

        if (index < finalText.length) {

            document
                .getElementById("final-message")
                .innerHTML += finalText.charAt(index);


            index++;

            setTimeout(type, speed);

        }

    }


    type();

}

function updateCountdown() {

    const now = new Date();

    const difference =
        reunionDate - now;

    if (difference <= 0) {

        document.getElementById(
            "countdown"
        ).innerHTML =
            "<h2>We're together again ♥️</h2>";

        return;

    }

    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );

    const hours =
        Math.floor(
            difference %
            (1000 * 60 * 60 * 24) /
            (1000 * 60 * 60)
        );

    const minutes =
        Math.floor(
            difference %
            (1000 * 60 * 60) /
            (1000 * 60)
        );

    const seconds =
        Math.floor(
            difference %
            (1000 * 60) /
            1000
        );

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;

}

updateCountdown();

setInterval(
    updateCountdown,
    1000
);

document
    .getElementById("restart-button")
    .addEventListener("click", () => {

        location.reload();

    });

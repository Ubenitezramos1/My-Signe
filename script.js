const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("login-button");
const message = document.getElementById("message");
const loginContainer = document.getElementById("login-container");
const websiteContent = document.getElementById("website-content");
const letterPage = document.getElementById("letter-page");
const puzzlePage = document.getElementById("puzzle-page");
const puzzleMessage = document.getElementById("puzzle-message");
const musicPage = document.getElementById("music-page");
const memoryPage = document.getElementById("memory-page");
const finalPage = document.getElementById("final-page");

const correctPassword = "Fig";

const reunionDate = new Date(
    "2026-08-21T12:00:00"
);

const letterText = `
\tI've been thinking about what I wanted to say, and I realized my favorite part of us isn't one specific memory. It's watching who we're becoming together.

\nFrom the day we met, there was something about you that felt different. Our late-night talks at the park and the pier, getting to know each other little by little, are some of my favorite memories. Somewhere along the way, I stopped just liking you and started feeling at home with you.

\nOne of the things I admire most about you is how deeply you think and how willing you are to grow. I don't want some perfect version of you. I just want you. Every part of you, including the parts you're still figuring out. I hope you know I'll always try to understand you before I judge you.

\nYou've made me want to be a better man. You've challenged me to communicate better, trust more, and choose understanding over assumptions. We've both had experiences that shaped us into who we are today, and honestly, I'm grateful for every one of them because they eventually led us to each other.

\nI don't know exactly what our future looks like, but I do know that I want to keep learning about you, growing with you, and choosing you every day. Thank you for making me feel grounded, for trusting me, and for showing me a kind of love that feels peaceful.

\nNo matter how many miles are between us, I'm really grateful that I get to call you mine.

\n\tI love you.

`;

const songs = [

    {
        title: "Car Crash",

        artist: "Jigitz, Charlotte Plank",

        embed:
            "https://open.spotify.com/embed/album/1lP8AhonyWZZKNgnEcjSV0?utm_source=generator&si=0dc0c25a6be84159",

        note:
            "This one just screams you. If this song was a person. It would be you"
    },


    {
        title: "Eres",

        artist: "Café Tacvba",

        embed:
            "https://open.spotify.com/embed/track/6kdCN6gTWLcLxmLXoUcwuI?utm_source=generator&si=cbcbd82b04eb4e1c",

        note:
            "This song we both really liked in Oaxaca. It was the day we got our infinity bracelets. It means so much to me."
    },


    {
        title: "Planet",

        artist: "The Neighborhood",

        embed: "https://open.spotify.com/embed/track/3UFePyU0mSJvGONoLWKTeW?utm_source=generator&si=c0af7a8d1f20402c",

        note:
            "I remember I had played this song and you really liked it. Not just the song, but I hope we can continue showing each other our interests."
    }

];

const memories = [

    {
        image: "images/photo1.jpg",

        caption:
            "One of my favorite days with you ♥️"
    },


    {
        image: "images/photo2.jpg",

        caption:
            "I still smile whenever I see this."
    },


    {
        image: "images/photo3.jpg",

        caption:
            "A memory I never want to forget."
    },


    {
        image: "images/photo4.jpg",

        caption:
            "A very special day"
    },

    {
        image: "images/photo5.jpg",

        caption:
            "One of many adventures together."
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

I love you ♥️
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

            setTimeout(() => {

                typeLetter();

                //Create songs from now
                createSongs();

            }, 500);

        }, 900);

    } else {

        message.textContent = "That password isn't quite right :(";
        passwordInput.value = "";
        passwordInput.focus();

    }
}

function typeLetter() {

    let index = 0;

    const speed = 5;


    function type() {

        if (index < letterText.length) {

            document.getElementById("letter-text")
                .innerHTML += letterText.charAt(index);

            index++;

            setTimeout(type, speed);

        } else {

            document.getElementById("letter-tag").style.display = "block";

            const button =
                document.getElementById("continue-button");


            button.style.opacity = "1";

            button.style.pointerEvents = "auto";

        }

    }


    type();

}

document
    .getElementById("continue-button")
    .addEventListener("click", function () {

        letterPage.classList.add("hidden");

        setTimeout(() => {

            letterPage.style.display = "none";

            puzzlePage.style.display = "flex";

            setTimeout(() => {

                puzzlePage.classList.add("visible");

                createPuzzle();

            }, 60);

        }, 900);

    });

const puzzleContainer = document.getElementById("puzzle-container");

console.log(puzzleContainer);

puzzleContainer.innerHTML = "";

let selectedPiece = null;

function createPuzzle() {

    puzzleContainer.innerHTML = "";

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


        setPieceImage(piece, pieceNumber);


        piece.addEventListener(
            "click",
            selectPiece
        );

    });

}

function setPieceImage(piece, number) {

    const row = Math.floor(number / 3);

    const col = number % 3;


    const size = piece.offsetWidth;


    console.log(
        "Piece:",
        number,
        "Row:",
        row,
        "Col:",
        col,
        "Size:",
        size
    );

    piece.style.backgroundPosition =
        `-${col * size}px -${row * size}px`;

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
    .addEventListener("click", function () {

        puzzlePage.classList.add("hidden");

        setTimeout(() => {

            puzzlePage.style.display = "none";

            musicPage.style.display = "flex";

            setTimeout(() => {

                musicPage.classList.add("visible");

            }, 60);


        }, 900);

    });

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
    .addEventListener("click", function () {


        musicPage.classList.add("hidden");


        setTimeout(() => {


            musicPage.style.display = "none";


            memoryPage.style.display = "flex";


            setTimeout(() => {


                memoryPage.classList.add("visible");


                createGallery();


            }, 60);


        }, 900);


    });

function createGallery() {

    const gallery =
        document.getElementById("photo-gallery");


    memories.forEach(memory => {


        const photoCard =
            document.createElement("div");


        photoCard.classList.add("photo-card");


        photoCard.innerHTML = `

            <img src="${memory.image}">


            <p>
                ${memory.caption}
            </p>

        `;


        gallery.appendChild(photoCard);


    });

}

document
    .getElementById("photo-continue")
    .addEventListener("click", function () {


        memoryPage.classList.add("hidden");


        setTimeout(() => {


            memoryPage.style.display = "none";


            finalPage.style.display = "flex";

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "auto"
            });


            setTimeout(() => {


                finalPage.classList.add("visible");

                typeFinalMessage();

            }, 60);


        }, 900);


    });

function typeFinalMessage() {

    let index = 0;

    const speed = 45;


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
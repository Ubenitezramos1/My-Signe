const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("login-button");
const message = document.getElementById("message");
const loginContainer = document.getElementById("login-container");
const websiteContent = document.getElementById("website-content");
const letterPage = document.getElementById("letter-page");
const puzzlePage = document.getElementById("puzzle-page");
const puzzleMessage = document.getElementById("puzzle-message");
const musicPage = document.getElementById("music-page");

const correctPassword = "Fig";

const letterText = /*`
I've been trying to figure out how to put everything I feel into words, and I realized something. My favorite part of us isn't one specific memory. It's who we're becoming together.

When I think back to when we first met, I remember how drawn I was to you. There was something different about you that I couldn't explain. Then came our late-night conversations, sitting at the park and the pier, learning about each other little by little. Somewhere along the way, admiration turned into something much deeper. I didn't just fall for you—I started feeling at home with you.

One of my favorite things about you is that you let me see who you really are. Your curiosity, your kindness, your sense of adventure, your willingness to be vulnerable, and even the parts of yourself that you're still learning to understand. I don't want a perfect version of you. I just want you. Every chapter of you.

You've taught me a lot without even realizing it. You've challenged me to communicate better, to trust more, and to choose understanding over assumptions. Because of you, I've learned that love isn't about never struggling—it's about continuing to choose each other while we grow through those struggles.

I know we both have histories that shaped us into who we are today. I don't see that as something to hide from. If anything, I'm grateful for every path that eventually led us to each other. I genuinely believe I'm a better man because of the lessons I've learned, and I'm grateful I get to bring that version of myself into this relationship with you.

I don't know what every chapter of our future will look like, but I do know this: I want to keep learning you. I want to keep understanding you. I want to keep cheering for your growth while continuing to grow myself. I want us to always feel like we can talk about anything, laugh about the little things, work through the hard things, and never stop choosing one another.

Thank you for making me feel grounded. Thank you for trusting me with your heart. Thank you for showing me that love can feel peaceful instead of confusing.

No matter how many miles are between us right now, I've never been more certain that you're exactly where I want my heart to be.

I love you.

`*/ 'hello';

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

        puzzleMessage.textContent = "You found us ❤️";

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


        setTimeout(() => {

            songCard.classList.add("show");

        }, 200);


    });

}


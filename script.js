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

const letterText = `
My dearest Signe,

I wanted to make something special for you.

Even though we are far apart right now,
I wanted you to have something that reminds
you how much you mean to me.

Every adventure, every laugh, every moment
we share is something I treasure.

I love you ❤️`;

const songs = [

    {
        title: "Car Crash by Jigitz, Charlotte Plank",

        embed:
        "https://open.spotify.com/embed/album/1lP8AhonyWZZKNgnEcjSV0?utm_source=generator&si=0dc0c25a6be84159",

        note:
        "This one just screams you. If this song was a person. It would be you"
    },


    {
        title: "Eres by Café Tacvba",

        embed:
        "https://open.spotify.com/embed/track/6kdCN6gTWLcLxmLXoUcwuI?utm_source=generator&si=cbcbd82b04eb4e1c",

        note:
        "This song we both really liked in Oaxaca. It was the day we got our infinity bracelets. It means so much to me."
    },


    {
        title: "Planet by The Neighborhood",

        embed:
        "https://open.spotify.com/embed/album/1xsGQbqvVDIq3sCJDUzQZv?utm_source=generator&si=4fcd6028385f48e8",

        note:
        "I remember I had played this song and you really liked it. Not just the song, but I hope we can continue showing each other our interests."
    }

];


loginButton.addEventListener("click", checkPassword);

passwordInput.addEventListener("keydown", function(event) {

    if(event.key === "Enter"){

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

function typeLetter(){

    let index = 0;

    const speed = 5;


    function type(){

        if(index < letterText.length){

            document.getElementById("letter-text")
            .innerHTML += letterText.charAt(index);

            index++;

            setTimeout(type, speed);

        } else {

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
.addEventListener("click", function(){

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

function createPuzzle(){

    puzzleContainer.innerHTML = "";

    let pieces = [];

    for(let i = 0; i < 9; i++){

        pieces.push(i);

    }


    shufflePieces(pieces);


    pieces.forEach((pieceNumber)=>{

        const piece = document.createElement("div");

        piece.classList.add("piece");


        piece.dataset.correct = pieceNumber;


        setPieceImage(piece, pieceNumber);


        piece.addEventListener(
            "click",
            selectPiece
        );


        puzzleContainer.appendChild(piece);

    });

}

function setPieceImage(piece, number){

    const row = Math.floor(number / 3);

    const col = number % 3;


    piece.style.backgroundPosition =
    `-${col * 150}px -${row * 150}px`;

}

function shufflePieces(array){

    for(let i = array.length - 1; i > 0; i--){

        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];

    }

}

function selectPiece(){

    // Clicking the selected piece again
    if(this === selectedPiece){

        this.classList.remove("selected");

        selectedPiece = null;

        return;

    }


    // First piece selected
    if(selectedPiece === null){

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

function swapPieces(first, second){

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

function checkSolved(){

    const currentPieces =
    document.querySelectorAll(".piece");


    let solved = true;


    currentPieces.forEach((piece,index)=>{


        if(Number(piece.dataset.correct) !== index){

            solved = false;

        }


    });


    if(solved){

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
.addEventListener("click", function(){

    puzzlePage.classList.add("hidden");

    setTimeout(() => {

        puzzlePage.style.display = "none";

        musicPage.style.display = "flex";

        setTimeout(() => {

            musicPage.classList.add("visible");

        }, 60); 
        

    }, 900);

});

function createSongs(){

    const songContainer =
    document.getElementById("songs");


    songs.forEach(song => {


        const songCard =
        document.createElement("div");


        songCard.classList.add("song");


        songCard.innerHTML = `

            <h2 id="song-title">
                ${song.title}
            </h2>


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


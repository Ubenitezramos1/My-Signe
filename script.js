const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("login-button");
const message = document.getElementById("message");
const loginContainer = document.getElementById("login-container");
const websiteContent = document.getElementById("website-content");
const letterPage = document.getElementById("letter-page");
const puzzlePage = document.getElementById("puzzle-page");
const puzzleMessage = document.getElementById("puzzle-message");

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

        puzzlePage.style.display = "block";

        setTimeout(() => {

            puzzlePage.classList.add("visible");

            createPuzzle();

        }, 60); 
        
         
            setTimeout(() => {
                puzzlePage.classList.add("visible");
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


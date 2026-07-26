const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("login-button");
const message = document.getElementById("message");
const loginContainer = document.getElementById("login-container");
const websiteContent = document.getElementById("website-content");

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

    const speed = 40;


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


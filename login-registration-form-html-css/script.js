const form = document.querySelector("form"),
    emailField = form.querySelector(".email-field"),
    emailInput = emailField.querySelector(".email"),
    passField = form.querySelector(".create-password"),
    passInput = passField.querySelector(".password"),
    cPassField = form.querySelector(".confirm-password"),
    cPassInput = cPassField.querySelector(".cPassword");
const usernameField = form.querySelector(".username-field");
const usernameInput = usernameField.querySelector(".username");

function showSignUpForm() {
    document.getElementById('signup-form').style.display = 'block';
    document.getElementById('signin-form').style.display = 'none';
}

function showSignInForm() {
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('signin-form').style.display = 'block';
}

const loader = document.createElement("div");
loader.classList.add("loader");
loader.textContent = "Loading...";

const successMessage = document.createElement("div");
successMessage.classList.add("success-message");
successMessage.textContent = "You have been successfully registered!";

const errorMessage = document.createElement("div");
errorMessage.classList.add("error-message");
errorMessage.textContent = "An error occurred. Please try again later.";

function checkEmail() {
    const emaiPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailInput.value.match(emaiPattern)) {
        return emailField.classList.add("invalid");
    }
    emailField.classList.remove("invalid");
}

const eyeIcons = document.querySelectorAll(".show-hide");

eyeIcons.forEach((eyeIcon) => {
    eyeIcon.addEventListener("click", () => {
        const pInput = eyeIcon.parentElement.querySelector("input");
        if (pInput.type === "password") {
            eyeIcon.classList.replace("bx-hide", "bx-show");
            return (pInput.type = "text");
        }
        eyeIcon.classList.replace("bx-show", "bx-hide");
        pInput.type = "password";
    });
});

function createPass() {
    const passPattern = /^[a-zA-Z0-9]{8,}$/;

    if (!passInput.value.match(passPattern)) {
        return passField.classList.add("invalid");
    }
    passField.classList.remove("invalid");
}

function confirmPass() {
    if (passInput.value !== cPassInput.value || cPassInput.value === "") {
        return cPassField.classList.add("invalid");
    }
    cPassField.classList.remove("invalid");
}

emailInput.addEventListener("keyup", checkEmail);
passInput.addEventListener("keyup", createPass);
cPassInput.addEventListener("keyup", confirmPass);

function fakeRequest() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.8) {
                resolve();
            } else {
                reject();
            }
        }, 1500);
    });
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    checkEmail();
    checkUsername();
    createPass();
    confirmPass();

    if (
        !emailField.classList.contains("invalid") &&
        !passField.classList.contains("invalid") &&
        !cPassField.classList.contains("invalid")
    ) {
        // Show loader and hide form
        form.parentNode.insertBefore(loader, form);
        form.style.display = "none";

        try {
            await fakeRequest();

            loader.parentNode.replaceChild(successMessage, loader);

            usernameInput.value = "";
            emailInput.value = "";
            passInput.value = "";
            cPassInput.value = "";

            setTimeout(() => {
                successMessage.parentNode.replaceChild(form, successMessage);
                form.style.display = "block";
            }, 3000);
        } catch {
            loader.parentNode.replaceChild(errorMessage, loader);
        }
    }
});


// sign in форма
const signInForm = document.getElementById('signin-form');

function checkUsername() {
    const usernamePattern = /^.{3,15}$/;

    if (!usernameInput.value.match(usernamePattern)) {
        return usernameField.classList.add("invalid");
    }
    usernameField.classList.remove("invalid");
}
usernameInput.addEventListener("keyup", checkUsername);

function checkSignInEmail() {
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    const emailField = signInForm.querySelector(".email-field");
    const emailInput = emailField.querySelector(".email");

    if (!emailInput.value.match(emailPattern)) {
        return emailField.classList.add("invalid");
    }
    emailField.classList.remove("invalid");
}

function checkSignInPassword() {
    const passPattern = /^[a-zA-Z0-9]{8,}$/;
    const passField = signInForm.querySelector(".create-password");
    const passInput = passField.querySelector(".password");

    if (!passInput.value.match(passPattern)) {
        return passField.classList.add("invalid");
    }
    passField.classList.remove("invalid");
}

signInForm.querySelector(".email").addEventListener("keyup", checkSignInEmail);
signInForm.querySelector(".password").addEventListener("keyup", checkSignInPassword);

signInForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    checkSignInEmail();
    checkSignInPassword();

    const emailField = signInForm.querySelector(".email-field");
    const passField = signInForm.querySelector(".create-password");

    if (
        !emailField.classList.contains("invalid") &&
        !passField.classList.contains("invalid")
    ) {
        const loaderClone = loader.cloneNode(true);
        signInForm.parentNode.insertBefore(loaderClone, signInForm);
        signInForm.style.display = "none";

        try {
            await fakeRequest();

            const successMessageClone = successMessage.cloneNode(true);
            successMessageClone.textContent = "You have been successfully sign in!";
            loaderClone.parentNode.replaceChild(successMessageClone, loaderClone);

            // Reset form fields
            signInForm.querySelector(".email").value = "";
            signInForm.querySelector(".password").value = "";

            setTimeout(() => {
                successMessageClone.parentNode.replaceChild(signInForm, successMessageClone);
                signInForm.style.display = "block";
            }, 3000);
        } catch {
            const errorMessageClone = errorMessage.cloneNode(true);
            loaderClone.parentNode.replaceChild(errorMessageClone, loaderClone);
        }
    }
});




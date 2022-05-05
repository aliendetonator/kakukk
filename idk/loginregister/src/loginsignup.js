document.querySelector("#login-popup").addEventListener("click", function () {
    document.querySelector(".login-popup").classList.add("active");
    document.querySelector(".signup-popup").classList.remove("active");
    clearInputs();

});

document.querySelector("#signup-popup").addEventListener("click", function () {
    document.querySelector(".signup-popup").classList.add("active");
    document.querySelector(".login-popup").classList.remove("active");
    clearInputs();
});

// loginos
document.querySelector("#togglePassword").addEventListener("click", function() {
    var jelszo = document.getElementById("password");
    var jelszomegint = document.getElementById("passwordagain");
    if (jelszo.type == "password")
    {
        document.querySelector("#togglePassword").classList.remove("fa-eye");
        document.querySelector("#togglePassword").classList.add("fa-eye-slash");
        jelszo.type = "text";
        return
    }
    jelszo.type = "password"
    document.querySelector("#togglePassword").classList.add("fa-eye");
    document.querySelector("#togglePassword").classList.remove("fa-eye-slash");
});

// signupos sima
document.querySelector("#togglePasswordAtReg").addEventListener("click", function() {
    var jelszo = document.getElementById("passwordreg");
    if (jelszo.type == "password")
    {
        document.querySelector("#togglePasswordAtReg").classList.remove("fa-eye");
        document.querySelector("#togglePasswordAtReg").classList.add("fa-eye-slash");
        jelszo.type = "text";
        return
    }
    jelszo.type = "password"
    document.querySelector("#togglePasswordAtReg").classList.add("fa-eye");
    document.querySelector("#togglePasswordAtReg").classList.remove("fa-eye-slash");
});

// signupos ismétlős
document.querySelector("#togglePasswordRepeat").addEventListener("click", function() {
    var jelszo = document.getElementById("passwordagain");
    if (jelszo.type == "password")
    {
        document.querySelector("#togglePasswordRepeat").classList.remove("fa-eye");
        document.querySelector("#togglePasswordRepeat").classList.add("fa-eye-slash");
        jelszo.type = "text";
        return
    }
    jelszo.type = "password"
    document.querySelector("#togglePasswordRepeat").classList.add("fa-eye");
    document.querySelector("#togglePasswordRepeat").classList.remove("fa-eye-slash");

});

document.querySelector(".login-popup .close-btn").addEventListener("click", function () {
    document.querySelector(".login-popup").classList.remove("active");
});

document.querySelector("#show-signup").addEventListener("click", function () {
    document.querySelector(".signup-popup").classList.add("active");
    document.querySelector(".login-popup").classList.remove("active");
    clearInputs();

});
document.querySelector(".signup-popup .close-btn").addEventListener("click", function () {
    document.querySelector(".signup-popup").classList.remove("active");
});

document.querySelector("#show-login").addEventListener("click", function () {
    document.querySelector(".signup-popup").classList.remove("active");
    document.querySelector(".login-popup").classList.add("active");
    clearInputs();

});

document.querySelector("#signupbtn").addEventListener("click", function () {
    register();
});

function clearInputs() {
    document.querySelector(".signup-popup #username").value = "";
    document.querySelector(".signup-popup #email").value = "";
    document.querySelector(".signup-popup #passwordreg").value = "";
    document.querySelector(".signup-popup #passwordagain").value = "";

    document.querySelector(".login-popup #username").value = "";
    document.querySelector(".login-popup #password").value = "";
}

function register() {
    const username = document.querySelector(".signup-popup #username").value
    const email = document.querySelector(".signup-popup #email").value
    const password = document.querySelector(".signup-popup #passwordreg").value
    const passwordagain = document.querySelector(".signup-popup #passwordagain").value

    if (password != passwordagain) {
        showAlert("A jelszavak nem egyeznek meg!");
        return
    }   
    if ((username.length)>16) 
    {
        showAlert("A felhasználónév túl hosszú.")
        return
    }
    if ((username.length)<3)
    {
        showAlert("A felhasználónév túl rövid.")
        return
    }
    if ((email.length)>200)
    {
        showAlert("A megadott email cím túl hosszú.")
        return
    }
    if ((password.length)>50)
    {
        showAlert("A megadott jelszó túl hosszú.")
        return
    }
    if ((password.length)<8)
    {
        showAlert("A jelszónak minimum 8 karakterből kell állnia.")
        return
    }
}
function showAlert(text) {
    document.querySelector(".alert-popup").classList.add("active");
    document.querySelector(".alert-popup #alertmsg").text = text;
    var timer = setTimeout(function () {
        document.querySelector(".alert-popup").classList.remove("active");
    }, 4000);}
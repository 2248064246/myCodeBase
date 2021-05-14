const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.onclick = function () {
    container.classList.add('right-panel-active');
}

signInButton.onclick = function () {
    container.classList.remove('right-panel-active');

}
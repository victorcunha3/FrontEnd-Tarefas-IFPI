const form = document.querySelector('form');
const usernameInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

function signUp(event) {
    event.preventDefault();

    const API_URL = 'http://127.0.0.1:8000/api/signup';
    const user = {
        username: usernameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
    };

    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Erro ao criar usuário');
        }
        return response.json();
    })
    .then((data) => {
        const token = data.access_token;
        localStorage.setItem('access_token', token);
        Swal.fire({
            title: 'Conta criada com sucesso',
            icon: 'success',
            confirmButtonText: 'OK',
        });
    
        setTimeout(() => {
            Swal.close();
            window.location.replace('./index.html');
        }, 2000);
    })    
    .catch((error) => {
        console.error(error);
        Swal.fire({
            title: 'Erro',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'OK',
        });
    });
}

form.addEventListener('submit', signUp);

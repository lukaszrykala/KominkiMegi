document.addEventListener('DOMContentLoaded', function () {
    initializeQuestions();
    document.getElementById('question1').classList.add('active');
});

function initializeQuestions() {
    const radios1 = document.getElementsByName('kominekRodzaj');
    const radios2 = document.getElementsByName('kominekTyp');

    radios1.forEach(radio => {
        radio.addEventListener('change', () => nextQuestion(1));
    });

    radios2.forEach(radio => {
        radio.addEventListener('change', () => nextQuestion(2));
    });

    document.getElementById('miejscowosc').addEventListener('input', () => {
        validateAndNext(3);
    });

    document.getElementById('email').addEventListener('input', () => {
        validateAndNext(4);
    });
}

function nextQuestion(currentQuestion) {
    const currentElement = document.getElementById(`question${currentQuestion}`);
    const nextElement = document.getElementById(`question${currentQuestion + 1}`);

    if (validate(currentQuestion)) {
        if (nextElement) {
            nextElement.classList.add('active');
        }
    }
}

function validateAndNext(question) {
    if (validate(question)) {
        nextQuestion(question);
    }

    // Dodatkowe sprawdzenie dla pytania 4, dotyczące adresu e-mail
    if (question === 4) {
        const element = document.getElementById('email');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailPattern.test(element.value.trim())) {
            document.getElementById('submit-container').style.display = 'flex';
        } else {
            document.getElementById('submit-container').style.display = 'none';
        }
    }
}

function validate(question) {
    let valid = true;
    let errorMessage = '';
    let element;

    if (question === 3) {
        element = document.getElementById('miejscowosc');
        if (element.value.trim() === '') {
            valid = false;
            errorMessage = 'Miejscowość jest wymagana.';
            document.getElementById('miejscowoscError').innerText = errorMessage;
            document.getElementById('miejscowoscError').style.display = 'block';
        } else {
            document.getElementById('miejscowoscError').style.display = 'none';
        }
    }

    if (question === 4) {
        element = document.getElementById('email');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(element.value.trim())) {
            valid = false;
            errorMessage = 'Wprowadź poprawny adres e-mail.';
            document.getElementById('emailError').innerText = errorMessage;
            document.getElementById('emailError').style.display = 'block';
        } else {
            document.getElementById('emailError').style.display = 'none';
        }
    }

    if (question === 5) {
        element = document.getElementById('telefon');
        const telefonPattern = /^[0-9]{9}$/;
        if (element.value && !telefonPattern.test(element.value.trim())) {
            valid = false;
            errorMessage = 'Wprowadź poprawny numer telefonu (9 cyfry).';
            document.getElementById('telefonError').innerText = errorMessage;
            document.getElementById('telefonError').style.display = 'block';
        } else {
            document.getElementById('telefonError').style.display = 'none';
        }
    }

    return valid;
}

function validateForm() {
    let formValid = true;

    for (let question = 1; question <= 4; question++) {
        if (!validate(question)) {
            formValid = false;
            break;
        }
    }

    return formValid;
}
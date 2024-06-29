
//client section owl carousel
$(".owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    navText: [
        '<i class="fa fa-long-arrow-left" aria-hidden="true"></i>',
        '<i class="fa fa-long-arrow-right" aria-hidden="true"></i>'
    ],
    autoplay: true,
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        },
        1000: {
            items: 2
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    var inputs = document.getElementsByTagName('input');

    for (var i = 0; i < inputs.length; i++) {
        inputs[i].oninvalid = function (event) {
            event.target.setCustomValidity('K\u00E9rem t\u00F6ltse ki a mez\u0151t!');
        }
        inputs[i].oninput = function (event) {
            event.target.setCustomValidity('');
        }
    }
});

    $(document).ready(function () {
        const form = $('#jelentkezesForm');
        const submitButton = $('#submitButton');
        const buttonText = submitButton.find('.button-text');
        const spinner = submitButton.find('.spinner');

        form.on('submit', async function (e) {
            e.preventDefault();

            if (validateForm()) {
                submitButton.prop('disabled', true);
                buttonText.hide();
                spinner.show();
                var data = {
                    vezetekNev: $('#vezetekNev').val(),
                    keresztNev: $('#keresztNev').val(),
                    varos: $('#varos').val(),
                    iranyitoszam: $('#iranyitoszam').val(),
                    utcaHazszam: $('#utcaHazszam').val(),
                    padlasfodemMeret: $('#padlasfodemMeret').val(),
                    tulajdonosokSzama: $('#tulajdonosokSzama').val(),
                    email: $('#email').val(),
                    telefonszam: $('#telefonszam').val(),
                    uzenet: $('#uzenet').val()
                };

                try {
                    const response = await fetch('https://sendemailroofinsulation.azurewebsites.net/api/SendEmailFunction?code=VnYPSE6crE2hC9ZKstXIrbOL0KLTL_Cvxsve0Uctq5oaAzFuP86znw%3D%3D', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });

                    if (response.ok) {
                        $('#jelentkezesForm')[0].reset();
                        alert('Az \u00FCzenet sikeresen elk\u00FCldve!\u00DCgyint\u00E9z\u0151nk hamarosan keresni fogja.');
                    } else {
                        const errorData = await response.json();
                        console.error('Error response:', errorData);
                        alert(`Hiba t\u00F6rt\u00E9nt az \u00FCzenet k\u00FCld\u00E9se k\u00F6zben: ${errorData.message}`);
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('Hiba t\u00F6rt\u00E9nt az \u00FCzenet k\u00FCld\u00E9se k\u00F6zben.');
                
                } finally {
                    submitButton.prop('disabled', false);
                    spinner.hide();
                    buttonText.show();
                }
            }
        });


    function validateForm() {
        let isValid = true;

        // Vezetéknév and Keresztnév validation
        const nameFields = ['vezetekNev', 'keresztNev'];
        nameFields.forEach(field => {
            const value = document.getElementById(field).value.trim();
            if (value.length < 2 || !/^[a-zA-ZáéíóöõúüûÁÉÍÓÖÕÚÜÛ\s-]+$/.test(value)) {
                showError(field, 'K\u00E9rj\u00FCk, adjon meg egy \u00E9rv\u00E9nyes nevet (minimum 2 karakter, csak bet\u0171k, k\u00F6t\u0151jelek \u00E9s sz\u00F3k\u00F6z\u00F6k).');
                isValid = false;
            }
        });

        // Telefonszám validation
        const phoneNumber = document.getElementById('telefonszam').value.trim();
        if (!/^(\+36|06)?[0-9]{1,2}[0-9]{7}$/.test(phoneNumber.replace(/[\s-]/g, ''))) {
            showError('telefonszam', 'K\u00E9rj\u00FCk, adjon meg egy \u00E9rv\u00E9nyes magyar telefonsz\u00E1mot.');
            isValid = false;
        }

        // Email validation
        const email = document.getElementById('email').value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showError('email', 'K\u00E9rj\u00FCk, adjon meg egy \u00E9rv\u00E9nyes e-mail c\u00EDmet.');
            isValid = false;
        }

        // Város validation
        const varos = document.getElementById('varos').value.trim();
        if (varos.length < 2) {
            showError('varos', 'K\u00E9rj\u00FCk, adjon meg egy \u00E9rv\u00E9nyes v\u00E1rosnevet.');
            isValid = false;
        }

        // Irányítószám validation
        const iranyitoszam = document.getElementById('iranyitoszam').value.trim();
        if (!/^\d{4}$/.test(iranyitoszam)) {
            showError('iranyitoszam', 'K\u00E9rj\u00FCk, adjon meg egy \u00E9rv\u00E9nyes 4 jegy\u0171 ir\u00E1ny\u00EDt\u00F3sz\u00E1mot.');
            isValid = false;
        }

        // Utca, házszám validation
        const utcaHazszam = document.getElementById('utcaHazszam').value.trim();
        if (utcaHazszam.length < 3) {
            showError('utcaHazszam', 'K\u00E9rj\u00FCk, adja meg az utc\u00E1t \u00E9s a h\u00E1zsz\u00E1mot.');
            isValid = false;
        }

        // Padlásfödém mérete validation
        const padlasfodemMeret = document.getElementById('padlasfodemMeret').value;
        if (isNaN(padlasfodemMeret) || parseFloat(padlasfodemMeret) <= 0) {
            showError('padlasfodemMeret', 'K\u00E9rj\u00FCk, adjon meg egy pozit\u00EDv sz\u00E1mot a padl\u00E1sf\u00F6d\u00E9m m\u00E9ret\u00E9nek.');
            isValid = false;
        }

        // Tulajdonosok száma validation
        const tulajdonosokSzama = document.getElementById('tulajdonosokSzama').value;
        if (isNaN(tulajdonosokSzama) || parseInt(tulajdonosokSzama) <= 0 || !Number.isInteger(parseFloat(tulajdonosokSzama))) {
            showError('tulajdonosokSzama', 'K\u00E9rj\u00FCk, adjon meg egy pozit\u00EDv eg\u00E9sz sz\u00E1mot a tulajdonosok sz\u00E1m\u00E1nak.');
            isValid = false;
        }

        // Üzenet validation (optional, max 500 characters)
        const uzenet = document.getElementById('uzenet').value.trim();
        if (uzenet.length > 500) {
            showError('uzenet', 'Az \u00FCzenet nem lehet hosszabb 500 karaktern\u00E9l.');
            isValid = false;
        }

        return isValid;
    }

    function showError(fieldId, errorMessage) {
        const field = document.getElementById(fieldId);
        let errorElement = field.nextElementSibling;

        if (!errorElement || !errorElement.classList.contains('error-message')) {
            const newErrorElement = document.createElement('div');
            newErrorElement.classList.add('error-message');
            newErrorElement.style.color = 'red';
            newErrorElement.style.fontSize = '0.8em';
            field.parentNode.insertBefore(newErrorElement, field.nextSibling);
            errorElement = newErrorElement;
        }

        errorElement.textContent = errorMessage;
        field.classList.add('error');
    }

    function clearError(fieldId) {
        const field = document.getElementById(fieldId);
        const errorElement = field.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = '';
        }
        field.classList.remove('error');
    }

    // Add this to your existing code
    document.querySelectorAll('input, textarea').forEach(element => {
        element.addEventListener('input', function () {
            clearError(this.id);
        });
    });
});
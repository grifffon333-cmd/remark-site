document.addEventListener("DOMContentLoaded", function () {
    // ==========================
    // Fade In / Fade Out
    // ==========================
    const fadeElements = document.querySelectorAll('section, .fade-element');
    fadeElements.forEach(el => el.classList.add('fade-element'));

    function checkVisibility() {
        const windowTop = window.scrollY;
        const windowBottom = window.scrollY + window.innerHeight;

        fadeElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const elTop = rect.top + window.scrollY;
            const elBottom = elTop + rect.height;

            if (elBottom > windowTop + 50 && elTop < windowBottom - 50) {
                el.classList.add('visible');
            } else {
                el.classList.remove('visible');
            }
        });
    }

    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);

    // ==========================
    // Cookie Banner
    // ==========================
    const cookieBanner = document.querySelector('.cookie-consent');
    const acceptButton = document.getElementById('acceptCookies');
    let cookiesAccepted = false;

    if (cookieBanner && acceptButton) {
        if (!cookiesAccepted) {
            cookieBanner.classList.remove('d-none');
        }

        acceptButton.addEventListener('click', function () {
            cookiesAccepted = true;
            cookieBanner.classList.add('d-none');
        });
    }

    // ==========================
    // Form Submissions (static site - show success message)
    // ==========================
    function handleFormSubmit(formId, successId) {
        const form = document.getElementById(formId);
        const success = document.getElementById(successId);
        if (form && success) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                form.classList.add('d-none');
                success.classList.remove('d-none');
            });
        }
    }

    handleFormSubmit('consultForm', 'consultSuccess');
    handleFormSubmit('orderForm', 'orderSuccess');
    handleFormSubmit('contactForm', 'contactSuccess');

    // ==========================
    // Order Modal - pass tariff name
    // ==========================
    const orderModal = document.getElementById('orderModal');
    if (orderModal) {
        orderModal.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget;
            const tariff = button ? button.getAttribute('data-tariff') : '';
            const tariffInput = document.getElementById('orderTariffInput');
            if (tariffInput) {
                tariffInput.value = tariff || '';
            }
        });
    }
});

"use strict";

const showToast = () => {
    const toastElement = document.getElementById('toast-interactive');
    if (toastElement) {
        toastElement.classList.add('md:block');
    }
};

const showVideo = () => {
    const demoButton = document.getElementById('demo');
    if (demoButton) {
        demoButton.addEventListener('click', () => {
            window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
        });
    }
};

(() => {
    showToast();
    showVideo();
})();
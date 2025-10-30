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
            const newWindow = window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
            if (newWindow) {
                newWindow.opener = null;
            }
        });
    }
};

(() => {
    showToast();
    showVideo();
})();
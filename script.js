document.addEventListener('DOMContentLoaded', (event) => {
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading-screen');
        const mainContent = document.getElementById('main-content');
        const header = document.querySelector('header')
        const loadingTextSpans = document.querySelectorAll('#loading-text span');

        loadingTextSpans.forEach((span, index) => {
            span.style.animationDelay = `${index * 0.3}s`;
        });

        setTimeout(() => {
            loadingScreen.classList.add('hidden');

        setTimeout(() => {
            loadingScreen.style.display = 'none';
            mainContent.style.display = 'block';
            header.style.display = 'block';
            mainContent.classList.add('visible');
            header.classList.add('visible');
        }, 1000);
    }, 3000);
}, 2000);
});

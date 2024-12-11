document.addEventListener('DOMContentLoaded', function()  {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingMessage = document.getElementById('loading-message');
    const mainContent = document.getElementById('main-content');

    const messages = [
        "Preparing portfolio...",
        "Adding some creativity...",
        "Fetching data from Servers",
        "Remembering we are in the 20th Century",
        "Almost there..."
    ];

    const displayMessages = (messages, interval) => {
        let index = 0;
        const showMessage = () => {
            if (index < messages.length) {
                loadingMessage.textContent = messages[index];
                index++;
                setTimeout(showMessage, interval);
            } else {
                loadingScreen.style.display = 'none';
                mainContent.style.display = 'block';
            }
        };
        showMessage();
    };

    displayMessages(messages, 4000);
});

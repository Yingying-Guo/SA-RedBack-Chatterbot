document.addEventListener('DOMContentLoaded', () => {
    const chatbox = document.getElementById('chatbox');
    const userInput = document.getElementById('userInput');
    const loadingIndicator = document.getElementById('loadingIndicator');

    // Listen for user input
    userInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const message = userInput.value.trim();
            if (message) {
                appendMessage('user', message);  // Display the user's message in the chatbox
                sendMessageToServer(message);    // Send the user's message to the server
                userInput.value = '';            // Clear the input field
            }
        }
    });

    function appendMessage(role, content) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', role);
        messageElement.textContent = `${role === 'user' ? 'You' : 'Assistant'}: ${content}`;
        chatbox.appendChild(messageElement);
        chatbox.scrollTop = chatbox.scrollHeight; // Auto-scroll to the bottom of the chatbox
    }
});

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

    // function sendMessageToServer(message) {
    //     // Show loading indicator while waiting for server response
    //     loadingIndicator.style.display = 'block';

    //     // Example implementation for sending a message to the server
    //     fetch('/api/send-message', {  // Ensure endpoint matches API specification
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ message }),  // Ensure format matches API expectations
    //     })
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         return response.json();
    //     })
    //     .then(data => {
    //         // Handle the server's reply according to API response structure
    //         if (data.reply) {
    //             appendMessage('assistant', data.reply); // Display the server's reply in the chatbox
    //         } else {
    //             console.error('Unexpected response format:', data);
    //         }
    //         loadingIndicator.style.display = 'none'; // Hide the loading indicator
    //     })
    //     .catch(error => {
    //         console.error('Error:', error);
    //         appendMessage('assistant', 'Sorry, something went wrong.'); // User feedback on error
    //         loadingIndicator.style.display = 'none'; // Hide the loading indicator in case of an error
    //     });
    // }
});

document.addEventListener('DOMContentLoaded', () => {
    // Get necessary elements from the DOM
    const chatbox = document.getElementById('chatbox');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const creativityButtons = document.querySelectorAll('.creativity-button');

    // Set default creativity level to medium
    let selectedCreativityLevel = 'medium'; 

    // Set up event listeners for creativity level buttons
    creativityButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'selected' class from all buttons
            creativityButtons.forEach(btn => btn.classList.remove('selected'));
            // Add 'selected' class to the clicked button
            button.classList.add('selected');
            // Update selected creativity level based on the clicked button's data
            selectedCreativityLevel = button.dataset.level;
        });
    });

    // Automatically select the medium creativity level button when the page loads
    document.querySelector('[data-level="medium"]').classList.add('selected');

    // Create or retrieve a sessionId stored in sessionStorage
    let sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
        // If no sessionId exists, generate a unique one and store it in sessionStorage
        sessionId = Date.now() + '-' + Math.random().toString(36).substring(7);  // Simple unique sessionId generation
        sessionStorage.setItem('sessionId', sessionId);
    }

    // Function to handle sending the user's message
    function sendMessage() {
        // Get and trim the input message
        const message = userInput.value.trim();
        if (message) {
            // Append the message to the chatbox as a user message
            appendMessage('user', message);
            // Send the message, creativity level, and sessionId to the server
            sendMessageToServer(message, selectedCreativityLevel, sessionId);
            // Clear the input field
            userInput.value = '';
        }
    }

    // Event listener to handle pressing the 'Enter' key in the input field
    userInput.addEventListener('keypress', function(event) {
        // If 'Enter' key is pressed, trigger sendMessage
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    // Event listener for the send button to trigger sendMessage when clicked
    sendButton.addEventListener('click', sendMessage);

    // Function to append a message to the chatbox
    function appendMessage(role, content) {
        // Create a new div element for the message
        const messageElement = document.createElement('div');
        // Add 'message' class and user/assistant class based on the role
        messageElement.classList.add('message', role);
        // Set the text content, indicating if the message is from the user or assistant
        messageElement.textContent = `${role === 'user' ? 'You' : 'Assistant'}: ${content}`;
        // Append the message element to the chatbox
        chatbox.appendChild(messageElement);
        // Scroll the chatbox to the bottom to ensure the latest message is visible
        chatbox.scrollTop = chatbox.scrollHeight;
    }

    // Function to send the user's message to the server
    function sendMessageToServer(message, creativityLevel, sessionId) {
        // Make a POST request to the server with the user's message, creativity level, and sessionId
        fetch('/api/conversations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // Pass the message, creativity level, and sessionId as the request body
            body: JSON.stringify({ message, creativityLevel, sessionId }),
        })
        .then(response => response.json())
        .then(data => {
            // Append the assistant's reply to the chatbox
            appendMessage('assistant', data.reply);
        })
        .catch(error => {
            // Handle any errors and inform the user
            console.error('Error:', error);
            appendMessage('assistant', 'Sorry, there was an error processing your request.');
        });
    }
});

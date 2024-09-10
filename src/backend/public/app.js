
document.addEventListener('DOMContentLoaded', () => {
    const chatbox = document.getElementById('chatbox');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const creativityButtons = document.querySelectorAll('.creativity-button');

    let selectedCreativityLevel = 'medium'; // Default to medium

    // Set up creativity level buttons
    creativityButtons.forEach(button => {
        button.addEventListener('click', () => {
            creativityButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            selectedCreativityLevel = button.dataset.level;
        });
    });

    // Select medium by default
    document.querySelector('[data-level="medium"]').classList.add('selected');

    // 创建或获取 sessionId，存储在 sessionStorage 中
    let sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
        sessionId = Date.now() + '-' + Math.random().toString(36).substring(7);  // 简单生成唯一 sessionId
        sessionStorage.setItem('sessionId', sessionId);
    }

    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            appendMessage('user', message);
            sendMessageToServer(message, selectedCreativityLevel, sessionId);
            userInput.value = '';
        }
    }

    userInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    sendButton.addEventListener('click', sendMessage);

    function appendMessage(role, content) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', role);
        messageElement.textContent = `${role === 'user' ? 'You' : 'Assistant'}: ${content}`;
        chatbox.appendChild(messageElement);
        chatbox.scrollTop = chatbox.scrollHeight;
    }

    function sendMessageToServer(message, creativityLevel, sessionId) {
        fetch('/api/conversations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message, creativityLevel, sessionId }),  // 传递 sessionId
        })
        .then(response => response.json())
        .then(data => {
            appendMessage('assistant', data.reply);
        })
        .catch(error => {
            console.error('Error:', error);
            appendMessage('assistant', 'Sorry, there was an error processing your request.');
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const chatbox = document.getElementById('chatbox');
    const userInput = document.getElementById('userInput');

    // 监听用户输入
    userInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const message = userInput.value.trim();
            if (message) {
                appendMessage('user', message);
                sendMessageToServer(message);
                userInput.value = '';
            }
        }
    });

    function appendMessage(role, content) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', role);
        messageElement.textContent = `${role === 'user' ? 'You' : 'Assistant'}: ${content}`;
        chatbox.appendChild(messageElement);
        chatbox.scrollTop = chatbox.scrollHeight; // 自动滚动到底部
    }

    function sendMessageToServer(message) {
        // 使用fetch API来发送请求
        fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message }),
        })
        .then(response => response.json())
        .then(data => {
            appendMessage('assistant', data.reply);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});

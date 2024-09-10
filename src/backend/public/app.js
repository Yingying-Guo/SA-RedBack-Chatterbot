
/* 关于`message`的几个function分别是：

1. **`sendMessage()`**：
   - 作用：处理用户发送消息的逻辑。
   - 功能：获取用户输入的消息，清除空格，确保消息有效，然后将用户的消息显示在聊天框中，并通过调用`sendMessageToServer()`将消息、创意等级、会话ID发送到服务器。最后清空输入框。
   - 使用场景：当用户点击发送按钮或者按下“Enter”键时触发。

2. **`appendMessage(role, content)`**：
   - 作用：将消息追加到聊天框中。
   - 功能：根据消息的发送者（用户或助手），创建一个新的`div`元素，将消息内容添加到该元素中，并将其追加到聊天框。同时，聊天框会自动滚动到底部，确保最新消息可见。
   - 使用场景：无论是用户发送消息还是从服务器接收到助手的回复，都会调用这个函数来更新聊天界面。

3. **`sendMessageToServer(message, creativityLevel, sessionId)`**：
   - 作用：将用户的消息发送到服务器进行处理。
   - 功能：使用`fetch`发送一个POST请求，将用户的消息、选择的创意等级和会话ID作为请求的主体发送到服务器。服务器响应后，调用`appendMessage()`将助手的回复显示在聊天框中。如果发生错误，则会显示一条错误信息。
   - 使用场景：当用户成功发送消息后，会调用此函数将消息发往服务器，并等待服务器的回复。

### 关系：
- **`sendMessage()`**：负责处理用户的输入，并触发消息的发送和显示。
- **`appendMessage()`**：负责将消息内容（无论是用户消息还是服务器回复）显示在聊天框中。
- **`sendMessageToServer()`**：负责将消息发送到服务器，并处理服务器返回的助手回复。

这三个函数共同完成了用户消息的发送、服务器消息的处理，以及在前端界面显示对话的完整流程。 */


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
    // if (!sessionId) {
    //     // If no sessionId exists, generate a unique one and store it in sessionStorage
    //     sessionId = Date.now() + '-' + Math.random().toString(36).substring(7);  // Simple unique sessionId generation
    //     sessionStorage.setItem('sessionId', sessionId);
    // }

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

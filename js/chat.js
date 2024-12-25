document.addEventListener('DOMContentLoaded', () => {
    const messageArea = document.getElementById('messageArea');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const userList = document.getElementById('userList');

    // 模拟在线用户
    const onlineUsers = [
        { id: 1, name: '用户1', status: 'online' },
        { id: 2, name: '用户2', status: 'online' },
        { id: 3, name: '用户3', status: 'away' }
    ];

    // 显示在线用户
    function displayOnlineUsers() {
        userList.innerHTML = onlineUsers.map(user => `
            <li class="user ${user.status}">
                <span class="user-status"></span>
                ${user.name}
            </li>
        `).join('');
    }

    // 发送消息
    function sendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            addMessage(message, 'sent');
            messageInput.value = '';
            
            // 模拟接收回复
            setTimeout(() => {
                addMessage('收到你的消息了���', 'received');
            }, 1000);
        }
    }

    // 添加消息到聊天区域
    function addMessage(text, type) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${type}`;
        messageElement.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
                <span class="message-time">${new Date().toLocaleTimeString()}</span>
            </div>
        `;
        messageArea.appendChild(messageElement);
        messageArea.scrollTop = messageArea.scrollHeight;
    }

    // 事件监听
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // 初始化
    displayOnlineUsers();
}); 
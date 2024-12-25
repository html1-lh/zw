document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // 验证用户名是否已存在
        if (users.some(u => u.username === username)) {
            showError('用户名已存在');
            return;
        }

        // 验证密码
        if (password !== confirmPassword) {
            showError('两次输入的密码不一致');
            return;
        }

        if (password.length < 6) {
            showError('密码长度至少6位');
            return;
        }

        // 创建新用户
        const newUser = {
            username: username,
            password: password,
            role: 'user',
            permissions: ['view_courses', 'take_quiz', 'view_chat']
        };

        // 添加到用户列表
        users.push(newUser);

        // 自动登录
        const userData = {
            username: newUser.username,
            role: newUser.role,
            permissions: newUser.permissions
        };

        localStorage.setItem('currentUser', JSON.stringify(userData));

        // 注册成功，跳转到首页
        alert('注册成功！');
        window.location.href = 'index.html';
    });

    function showError(message) {
        const oldError = document.querySelector('.error-message');
        if (oldError) {
            oldError.remove();
        }

        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        registerForm.appendChild(error);
    }
}); 
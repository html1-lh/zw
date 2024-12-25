document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // 验证用户
        const user = users.find(u => 
            u.username === username && 
            u.password === password
        );

        if (user) {
            // 登录成功
            const userData = {
                username: user.username,
                role: user.role,
                permissions: user.permissions
            };

            // 保存用户信息到 localStorage
            localStorage.setItem('currentUser', JSON.stringify(userData));

            // 跳转到首页
            window.location.href = 'index.html';
        } else {
            // 登录失败
            showError('用户名或密码错误');
        }
    });

    function showError(message) {
        const oldError = document.querySelector('.error-message');
        if (oldError) {
            oldError.remove();
        }

        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        loginForm.appendChild(error);
    }
}); 
// 试题数据
const quizzes = [
    // 第一章 网络安全概述
    {
        id: 1,
        chapter: 1,
        type: 'single',
        difficulty: 'easy',
        question: '下列关于网络安全的说法，正确的是：',
        options: [
            'A. 网络安全只需要安装防火墙',
            'B. 网络安全是一个系统工程',
            'C. 网络安全只与软件有关',
            'D. 普通用户不需要关注网络安全'
        ],
        answer: 'B'
    },
    {
        id: 2,
        chapter: 1,
        type: 'multiple',
        difficulty: 'medium',
        question: '网络安全防护体系包括哪些方面？',
        options: [
            'A. 物理安全',
            'B. 系统安全',
            'C. 网络安全',
            'D. 应用安全'
        ],
        answer: ['A', 'B', 'C', 'D']
    },

    // 第二章 黑客原理与防范措施
    {
        id: 3,
        chapter: 2,
        type: 'single',
        difficulty: 'medium',
        question: '以下哪个工具主要用于端口扫描？',
        options: [
            'A. nmap',
            'B. wireshark',
            'C. metasploit',
            'D. burpsuite'
        ],
        answer: 'A'
    },
    {
        id: 4,
        chapter: 2,
        type: 'judge',
        difficulty: 'easy',
        question: 'DDoS攻击是一种利用大量请求占用服务器资源的攻击方式。',
        options: [
            'A. 正确',
            'B. 错误'
        ],
        answer: 'A'
    },

    // 第三章 网络病毒防治
    {
        id: 5,
        chapter: 3,
        type: 'multiple',
        difficulty: 'hard',
        question: '下列哪些是计算机病毒的特征？',
        options: [
            'A. 传染性',
            'B. 潜伏性',
            'C. 破坏性',
            'D. 可控性'
        ],
        answer: ['A', 'B', 'C']
    },
    {
        id: 6,
        chapter: 3,
        type: 'single',
        difficulty: 'medium',
        question: '以下哪种不是常见的病毒类型？',
        options: [
            'A. 文件型病毒',
            'B. 引导型病毒',
            'C. 宏病毒',
            'D. 显示器病毒'
        ],
        answer: 'D'
    },

    // 第四章 密码技术
    {
        id: 7,
        chapter: 4,
        type: 'single',
        difficulty: 'hard',
        question: '以下哪个不是对称加密算法？',
        options: [
            'A. DES',
            'B. AES',
            'C. RSA',
            'D. 3DES'
        ],
        answer: 'C'
    },
    {
        id: 8,
        chapter: 4,
        type: 'judge',
        difficulty: 'medium',
        question: '非对称加密算法中，公钥和私钥可以互换使用。',
        options: [
            'A. 正确',
            'B. 错误'
        ],
        answer: 'B'
    },

    // 第五章 防火墙技术
    {
        id: 9,
        chapter: 5,
        type: 'multiple',
        difficulty: 'medium',
        question: '防火墙可以提供哪些安全服务？',
        options: [
            'A. 访问控制',
            'B. 数据加密',
            'C. 日志记录',
            'D. 入侵检测'
        ],
        answer: ['A', 'C', 'D']
    },
    {
        id: 10,
        chapter: 5,
        type: 'single',
        difficulty: 'easy',
        question: '防火墙主要部署在：',
        options: [
            'A. 内网与外网的边界',
            'B. 局域网内部',
            'C. 每台终端',
            'D. 服务器内部'
        ],
        answer: 'A'
    },

    // 第六章 Windows的安全与保护机制
    {
        id: 11,
        chapter: 6,
        type: 'multiple',
        difficulty: 'medium',
        question: 'Windows系统安全机制包括：',
        options: [
            'A. 用户账户控制',
            'B. 文件访问控制',
            'C. 注册表安全',
            'D. 系统审计'
        ],
        answer: ['A', 'B', 'C', 'D']
    },
    {
        id: 12,
        chapter: 6,
        type: 'judge',
        difficulty: 'easy',
        question: 'Windows防火墙默认允许所有入站连接。',
        options: [
            'A. 正确',
            'B. 错误'
        ],
        answer: 'B'
    },

    // 第七章 Web应用安全
    {
        id: 13,
        chapter: 7,
        type: 'single',
        difficulty: 'hard',
        question: '以下哪个不是常见的Web攻击方式？',
        options: [
            'A. SQL注入',
            'B. XSS攻击',
            'C. CSRF攻击',
            'D. SMTP攻击'
        ],
        answer: 'D'
    },
    {
        id: 14,
        chapter: 7,
        type: 'multiple',
        difficulty: 'medium',
        question: 'Web应用安全防护措施包括：',
        options: [
            'A. 输入验证',
            'B. 会话管理',
            'C. 访问控制',
            'D. 错误处理'
        ],
        answer: ['A', 'B', 'C', 'D']
    }
];

// 将 checkAnswer 函数移到全局作用域
window.checkAnswer = function(quizId) {
    const quiz = quizzes.find(q => q.id === quizId);
    const quizElement = document.querySelector(`[data-quiz-id="${quizId}"]`);
    const resultElement = quizElement.querySelector('.quiz-result');
    const selectedInputs = quizElement.querySelectorAll('input:checked');
    const submitButton = quizElement.querySelector('.submit-btn');

    if (!selectedInputs.length) {
        resultElement.innerHTML = '<span class="error">请选择答案</span>';
        return;
    }

    const selectedAnswers = Array.from(selectedInputs).map(input => input.value);
    const isCorrect = quiz.type === 'multiple' 
        ? arraysEqual(selectedAnswers.sort(), quiz.answer.sort())
        : selectedAnswers[0] === quiz.answer;

    // 显示正确答案和解释
    resultElement.innerHTML = `
        <div class="${isCorrect ? 'correct' : 'incorrect'}">
            ${isCorrect ? '✓ 回答正确！' : '✗ 回答错误'}
            <div class="answer-explanation">
                正确答案：${Array.isArray(quiz.answer) ? quiz.answer.join('、') : quiz.answer}
            </div>
        </div>
    `;

    // 禁用选项和提交按钮
    quizElement.querySelectorAll('input').forEach(input => input.disabled = true);
    submitButton.disabled = true;

    // 标记选项的正确性
    quizElement.querySelectorAll('.quiz-options li').forEach(li => {
        const input = li.querySelector('input');
        const isSelected = input.checked;
        const value = input.value;
        const isAnswerCorrect = Array.isArray(quiz.answer) 
            ? quiz.answer.includes(value)
            : value === quiz.answer;

        if (isSelected) {
            li.classList.add(isAnswerCorrect ? 'correct-option' : 'incorrect-option');
        }
        if (isAnswerCorrect) {
            li.classList.add('correct-answer');
        }
    });
};

// 将 arraysEqual 函数也移到全局作用域
window.arraysEqual = function(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
};

document.addEventListener('DOMContentLoaded', () => {
    const quizList = document.querySelector('.quiz-list');
    const categories = document.querySelectorAll('.quiz-categories li');
    const difficultyFilter = document.getElementById('difficultyFilter');
    const typeFilter = document.getElementById('typeFilter');

    // 显示试题列表
    function displayQuizzes(chapter = 1, difficulty = 'all', type = 'all') {
        const filteredQuizzes = quizzes.filter(quiz => {
            const matchChapter = quiz.chapter === chapter;
            const matchDifficulty = difficulty === 'all' || quiz.difficulty === difficulty;
            const matchType = type === 'all' || quiz.type === type;
            return matchChapter && matchDifficulty && matchType;
        });

        quizList.innerHTML = filteredQuizzes.map(quiz => `
            <div class="quiz-item" data-quiz-id="${quiz.id}" data-quiz-type="${quiz.type}">
                <div class="quiz-item-header">
                    <span class="quiz-type">${getQuizType(quiz.type)}</span>
                    <span class="quiz-difficulty ${quiz.difficulty}">${getDifficulty(quiz.difficulty)}</span>
                </div>
                <div class="quiz-question">${quiz.question}</div>
                <ul class="quiz-options">
                    ${quiz.options.map((option, index) => `
                        <li>
                            <label>
                                <input type="${quiz.type === 'multiple' ? 'checkbox' : 'radio'}" 
                                       name="quiz_${quiz.id}" 
                                       value="${String.fromCharCode(65 + index)}">
                                ${option}
                            </label>
                        </li>
                    `).join('')}
                </ul>
                <div class="quiz-actions">
                    <button class="submit-btn" onclick="checkAnswer(${quiz.id})">提交答案</button>
                    <div class="quiz-result"></div>
                </div>
            </div>
        `).join('');
    }

    // 切换分类
    categories.forEach((category, index) => {
        category.addEventListener('click', () => {
            categories.forEach(c => c.classList.remove('active'));
            category.classList.add('active');
            displayQuizzes(index + 1, difficultyFilter.value, typeFilter.value);
        });
    });

    // 筛选器事件
    difficultyFilter.addEventListener('change', () => {
        const activeChapter = parseInt(document.querySelector('.quiz-categories li.active').textContent);
        displayQuizzes(activeChapter, difficultyFilter.value, typeFilter.value);
    });

    typeFilter.addEventListener('change', () => {
        const activeChapter = parseInt(document.querySelector('.quiz-categories li.active').textContent);
        displayQuizzes(activeChapter, difficultyFilter.value, typeFilter.value);
    });

    // 工具函数
    function getQuizType(type) {
        const types = {
            'single': '单选题',
            'multiple': '多选题',
            'judge': '判断题'
        };
        return types[type] || type;
    }

    function getDifficulty(difficulty) {
        const difficulties = {
            'easy': '简单',
            'medium': '中等',
            'hard': '困难'
        };
        return difficulties[difficulty] || difficulty;
    }

    // 初始显示第一章的试题
    displayQuizzes(1);
}); 
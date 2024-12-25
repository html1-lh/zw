// 用户数据
const users = [
    {
        username: 'zft',
        password: 'zft123',
        role: 'admin',
        permissions: [
            'view_courses',
            'edit_courses',
            'delete_courses',
            'manage_users',
            'view_quiz',
            'edit_quiz',
            'view_chat',
            'manage_chat'
        ]
    },
    {
        username: 'wyq',
        password: 'wyq123',
        role: 'user',
        permissions: ['view_courses', 'take_quiz', 'view_chat']
    },
    {
        username: 'cx',
        password: 'cx123',
        role: 'user',
        permissions: ['view_courses', 'view_chat']
    }
];

// 添加课程数据
const courses = [
    {
        id: 1,
        title: "一、网络安全概述",
        sections: [
            {
                title: "网络安全概述",
                pdf: "zftpdf/第一章/1.1.pdf",
                video: "video/第一章/1.1.mp4"
            },
            {
                title: "网络安全防护体系",
                pdf: "zftpdf/第一章/1.2.pdf"
            }
        ]
    },
    {
        id: 2,
        title: "二、黑客原理与防范措施",
        sections: [
            {
                title: "黑客概述以及目标系统的检测(nmap)",
                pdf: "zftpdf/第二章/2.1.pdf",
                video: "video/第二章/2.1.mp4"
            },
            {
                title: "目标扫描(xscan)",
                pdf: "zftpdf/第二章/2.2.pdf",
                video: "video/第二章/2.2.mp4"
            },
            {
                title: "口令破解过程(smbcrack2)",
                pdf: "zftpdf/第二章/2.3.pdf",
                video: "video/第二章/2.3.mp4"
            },
            {
                title: "网络监听工具的使用(sniffer)",
                pdf: "zftpdf/第二章/2.4.pdf"
            },
            {
                title: "木马的攻防(冰河木马)",
                pdf: "zftpdf/第二章/2.5.pdf"
            },
            {
                title: "拒绝服务攻击(DDOS)",
                pdf: "zftpdf/第二章/2.6.pdf"
            },
            {
                title: "APR攻击的防范",
                pdf: "zftpdf/第二章/2.7.pdf"
            },
            {
                title: "缓冲区溢出",
                pdf: "zftpdf/第二章/2.8.pdf"
            }
        ]
    },
    {
        id: 3,
        title: "三、网络病毒防治",
        sections: [
            {
                title: "病毒的基本概念，原理和分类",
                pdf: "zftpdf/第三章/3.1.pdf",
                video: "video/第三章/3.1.mp4"
            },
            {
                title: "计算机感染典型病毒的现象",
                pdf: "zftpdf/第三章/3.2.pdf"
            },
            {
                title: "常见的杀毒软件介绍",
                pdf: "zftpdf/第三章/3.3.pdf"
            }
        ]
    },
    {
        id: 4,
        title: "四、密码技术",
        sections: [
            {
                title: "密码学的基本概念及数据加密技术再网络安全中的应用",
                pdf: "zftpdf/第四章/4.1.pdf",
                video: "video/第四章/4.1.mp4"
            },
            {
                title: "数据加密，传输以及解密",
                pdf: "zftpdf/第四章/4.2.pdf"
            }
        ]
    },
    {
        id: 5,
        title: "五、防火墙技术",
        sections: [
            {
                title: "防火墙的基本概念及掌握防火墙的工作基本原理",
                pdf: "zftpdf/第五章/5.1.pdf",
                video: "video/第五章/5.1.mp4"
            },
            {
                title: "第三方防火墙的应用",
                pdf: "zftpdf/第五章/5.2.pdf"
            },
            {
                title: "VPN",
                pdf: "zftpdf/第五章/5.3.pdf"
            }
        ]
    },
    {
        id: 6,
        title: "六、Windows的安全与保护制",
        sections: [
            {
                title: "Windows系统的安全机制，掌握Windows系统的常用安全设置",
                pdf: "zftpdf/第六章/6.1.pdf",
                video: "video/第六章/6.1.mp4"
            },
            {
                title: "Windows Server的帐户管理",
                pdf: "zftpdf/第六章/6.2.pdf"
            },
            {
                title: "Windos Server注册组与策略表",
                pdf: "zftpdf/第六章/6.3.pdf"
            },
            {
                title: "Windows Server常用的系统进程和服务",
                pdf: "zftpdf/第六章/6.4.pdf"
            },
            {
                title: "Windows server的日志管理",
                pdf: "zftpdf/第六章/6.5.pdf"
            }
        ]
    },
    {
        id: 7,
        title: "七、Web应用安全",
        sections: [
            {
                title: "web安全概述",
                pdf: "zftpdf/第七章/7.1.pdf",
                video: "video/第七章/7.1.mp4"
            },
            {
                title: "web应用程序的安全",
                pdf: "zftpdf/第七章/7.2.pdf"
            },
            {
                title: "web服务器软件的安全",
                pdf: "zftpdf/第七章/7.3.pdf"
            },
            {
                title: "web传输安全及ssl安全",
                pdf: "zftpdf/第七章/7.4.pdf"
            }
        ]
    }
];

// 检查登录状态
function checkLoginStatus() {
    const loggedInUser = localStorage.getItem('currentUser');
    const loginBtn = document.getElementById('loginBtn');
    
    if (loggedInUser) {
        loginBtn.textContent = '退出';
        loginBtn.onclick = logout;
        loginBtn.classList.add('logged-in');
    } else {
        loginBtn.textContent = '登录';
        loginBtn.onclick = () => window.location.href = 'login.html';
        loginBtn.classList.remove('logged-in');
    }
}

// 退出登录
function logout() {
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser'); // 同时清除 sessionStorage
    window.location.href = 'index.html';
}

// 显示课程
function displayCourses() {
    const courseGrid = document.querySelector('.course-grid');
    if (!courseGrid) return;

    courseGrid.innerHTML = courses.map(course => `
        <div class="course-card">
            <div class="course-content">
                <h4 class="course-title">${course.title}</h4>
                <div class="course-sections">
                    <h5>课程章节</h5>
                    <ul class="section-list">
                        ${course.sections.map((section, index) => `
                            <li>
                                <div class="section-item">
                                    <a href="${section.pdf}" 
                                       class="section-link" 
                                       target="_blank" 
                                       onclick="return checkLoginBeforeView(event, ${course.id});">
                                        ${index + 1}. ${section.title}
                                    </a>
                                    ${section.video ? `
                                        <button class="video-btn" 
                                                onclick="playVideo('${section.video}', ${course.id})">
                                            <i class="video-icon">▶</i>
                                            视频
                                        </button>
                                    ` : ''}
                                </div>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                ${checkPermission('edit_courses') ? `
                    <div class="admin-actions">
                        <button onclick="editCourse(${course.id})" class="admin-button">编辑</button>
                        <button onclick="deleteCourse(${course.id})" class="admin-button">删除</button>
                    </div>
                ` : ''}
            </div>
        </div>
    `).join('');
}

// 查看课程详情
function viewCourse(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    // 检查用户是否登录
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('请先登录');
        window.location.href = 'login.html';
        return;
    }

    // 检查用户权限
    if (!checkPermission('view_courses')) {
        alert('您没有权限查看此课程');
        return;
    }

    // 存储当前课程信息
    localStorage.setItem('currentCourse', JSON.stringify(course));
    window.location.href = `course-detail.html?id=${courseId}`;
}

// 编辑课程（仅管理员）
function editCourse(courseId) {
    if (!checkPermission('edit_courses')) {
        alert('您没有权限编辑课程');
        return;
    }
    // TODO: 实现课程编辑功能
    alert('编辑课程 ' + courseId);
}

// 删除课程（仅管理员）
function deleteCourse(courseId) {
    if (!checkPermission('delete_courses')) {
        alert('您没有权限删除课程');
        return;
    }
    if (confirm('确定要删除这个课程？')) {
        // TODO: 实现课程删除功能
        alert('删除课程 ' + courseId);
    }
}

// 检查用户权限
function checkPermission(permission) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return false;
    
    // 管理员拥有权限
    if (currentUser.role === 'admin') return true;
    
    // 检查普通用户的具体权限
    return currentUser.permissions && currentUser.permissions.includes(permission);
}

// 显示/隐藏管理员功能
function toggleAdminFeatures() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const adminElements = document.querySelectorAll('.admin-only');
    
    adminElements.forEach(element => {
        if (currentUser && currentUser.role === 'admin') {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    });
}

// 添加检查登录状态的函数
function checkLoginBeforeView(event, courseId) {
    // 检查用户是否登录
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        event.preventDefault();
        alert('请先登录');
        window.location.href = 'login.html';
        return false;
    }

    // 检查用户权限
    if (!checkPermission('view_courses')) {
        event.preventDefault();
        alert('您没有权限查看此课程');
        return false;
    }

    return true;
}

// 添加视频播放功能
function playVideo(videoUrl, courseId) {
    if (!checkLoginBeforeView(event, courseId)) {
        return;
    }
    // 这里可以实现视频播放逻辑，比如打开新窗口或显示视频播放器
    window.open(videoUrl, '_blank');
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();
    displayCourses();
    toggleAdminFeatures();
}); 
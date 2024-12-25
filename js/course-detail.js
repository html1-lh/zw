document.addEventListener('DOMContentLoaded', () => {
    const courseDetail = document.getElementById('courseDetail');
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = parseInt(urlParams.get('id'));

    // 从 localStorage 获取课程信息
    const course = JSON.parse(localStorage.getItem('currentCourse'));

    if (course && course.id === courseId) {
        courseDetail.innerHTML = `
            <div class="course-detail">
                <div class="course-header">
                    <h2>${course.title}</h2>
                </div>
                <img src="${course.image}" alt="${course.title}" class="course-image">
                <div class="course-info">
                    <div class="course-description">
                        <h3>课程介绍</h3>
                        <p>${course.description}</p>
                    </div>
                    <div class="course-sidebar">
                        <a href="#" class="enroll-button">立即报名</a>
                    </div>
                </div>
            </div>
        `;
    } else {
        courseDetail.innerHTML = '<p>课程不存在或已被删除</p>';
    }
}); 
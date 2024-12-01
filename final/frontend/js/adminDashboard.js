async function createCourse(title, description, price, imageUrl) {
    const token = localStorage.getItem('adminAuthToken');
    const response = await fetch('http://localhost:3000/api/v1/admin/course', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        },
        body: JSON.stringify({ title, description, price, imageUrl })
    });

    if (response.ok) {
        alert('Course created successfully');
        window.location.href = 'adminDashboard.html';
    } else {
        alert('Failed to create course.');
    }
}

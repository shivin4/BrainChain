async function purchaseCourse(courseId) {
    const token = localStorage.getItem('authToken');
    const response = await fetch('http://localhost:3000/api/v1/course/purchase', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        },
        body: JSON.stringify({ courseId })
    });

    if (response.ok) {
        alert('Course purchased successfully');
    } else {
        alert('Failed to purchase course.');
    }
}
// Function to fetch and display purchased courses
async function fetchPurchasedCourses() {
    const token = localStorage.getItem('authToken'); // Get the token from localStorage

    if (!token) {
        alert("You are not logged in!");
        window.location.href = "../index.html"; // Redirect to the login page if token is not present
        return;
    }

    // Make a GET request to fetch the purchased courses for the user
    const response = await fetch('http://localhost:3000/api/v1/user/purchases', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': token,  // Send the token to authenticate the user
        }
    });

    if (response.ok) {
        const data = await response.json();
        const purchasedCoursesList = document.getElementById('purchasedCoursesList');

        // Clear the existing list
        purchasedCoursesList.innerHTML = '';

        // Ensure we have data from both purchases and coursesData
        const { purchases, coursesData } = data;

        // Check if there are any purchases
        if (purchases && purchases.length > 0) {
            // Map through each purchase and find the corresponding course data
            purchases.forEach(purchase => {
                const course = coursesData.find(course => course._id === purchase.courseId);
                if (course) {
                    const li = document.createElement('li');
                    li.innerHTML = `${course.title} - $${course.price}`;
                    purchasedCoursesList.appendChild(li);
                }
            });
        } else {
            purchasedCoursesList.innerHTML = '<li>No purchased courses found.</li>';
        }
    } else {
        alert('Failed to fetch purchased courses.');
    }
}

// Call the function to fetch the purchased courses on page load
fetchPurchasedCourses();


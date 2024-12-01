async function adminLogin(email, password) {
    const response = await fetch('http://localhost:3000/api/v1/admin/signin', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });

    if (!response.ok) {
        const errorMessage = await response.text(); // Get the response body in case of error
        alert(`Login failed: ${errorMessage}`);
        return;
    }

    const data = await response.json();  // Ensure the backend returns JSON
    // Store the token (optional, if needed for authentication)
    localStorage.setItem('adminAuthToken', data.token); // Example of storing JWT in localStorage
    
    // Redirect to the admin dashboard after login
    window.location.href = '../pages/adminDashboard.html';  // Change this to your desired admin dashboard page
}

// Admin signup function
async function adminSignup(email, password, firstName, lastName) {
    const response = await fetch('http://localhost:3000/api/v1/admin/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, firstName, lastName })
    });

    if (response.ok) {
        alert('Signup successful. Please login.');
        window.location.href = 'adminLogin.html';  // Redirect to admin login page
    } else {
        alert('Signup failed.');
    }
}

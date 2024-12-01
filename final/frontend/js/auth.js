async function login(email, password) {
    const response = await fetch('http://localhost:3000/api/v1/user/signin', {
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
    localStorage.setItem('authToken', data.token); // Example of storing JWT in localStorage
    
    // Redirect to the user dashboard after login
    window.location.href = '../pages/userDashboard.html';  // Change this to your desired dashboard page
}



async function signup(email, password, firstName, lastName) {
    const response = await fetch('http://localhost:3000/api/v1/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, firstName, lastName })
    });
    if (response.ok) {
        alert('Signup successful. Please login.');
        window.location.href = 'login.html';
    } else {
        alert('Signup failed.');
    }
}

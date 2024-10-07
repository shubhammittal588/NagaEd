const API_URL = 'http://localhost:3000/courses';

// Function to create and display a course card dynamically
function createCourseCard(course) {
    const courseDiv = document.createElement('div');
    courseDiv.classList.add('course-card'); // Add class for styling

    courseDiv.innerHTML = `
        <h3>${course.title}</h3>
        <p>${course.description}</p>
        <p><strong>Duration:</strong> ${course.duration}</p>
        <button onclick="deleteCourse(${course.id})">Delete</button>
    `;
    return courseDiv;
}

// Fetch and display all courses
function fetchCourses() {
    fetch(API_URL)
        .then(response => response.json())
        .then(courses => {
            const coursesContainer = document.getElementById('courses-container');
            coursesContainer.innerHTML = ''; // Clear container

            // Append each course as a card
            courses.forEach(course => {
                const courseCard = createCourseCard(course);
                coursesContainer.appendChild(courseCard);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Add a new course
document.getElementById('add-course-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const duration = document.getElementById('duration').value;

    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, duration }),
    })
        .then(response => response.json())
        .then(newCourse => {
            const coursesContainer = document.getElementById('courses-container');
            const courseCard = createCourseCard(newCourse);  // Create a new card for the added course
            coursesContainer.appendChild(courseCard);  // Add new course to the list
            document.getElementById('add-course-form').reset();  // Clear the form
        })
        .catch(error => console.error('Error:', error));
});

// Delete a course
function deleteCourse(id) {
    fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    })
        .then(() => fetchCourses())  // Refresh the courses list after deletion
        .catch(error => console.error('Error:', error));
}

// Initialize
fetchCourses();

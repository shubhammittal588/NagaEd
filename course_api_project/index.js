const express = require('express');
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Middleware to parse JSON bodies
app.use(express.json());

let courses = [
    { id: 1, title: 'Introduction to Programming', description: 'Learn the basics of programming.', duration: '4 weeks' },
    { id: 2, title: 'Web Development', description: 'Build modern web applications.', duration: '6 weeks' }
];

// Get all courses
app.get('/courses', (req, res) => {
    res.json(courses);
});

// Add a new course
app.post('/courses', (req, res) => {
    const newCourse = {
        id: courses.length + 1,
        title: req.body.title,
        description: req.body.description,
        duration: req.body.duration
    };
    courses.push(newCourse);
    res.status(201).json(newCourse);
});

// Update a course by ID
app.put('/courses/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const course = courses.find(c => c.id === id);
    if (!course) return res.status(404).send('Course not found.');

    course.title = req.body.title;
    course.description = req.body.description;
    course.duration = req.body.duration;
    res.json(course);
});

// Delete a course by ID
app.delete('/courses/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const courseIndex = courses.findIndex(c => c.id === id);
    if (courseIndex === -1) return res.status(404).send('Course not found.');

    const deletedCourse = courses.splice(courseIndex, 1);
    res.json(deletedCourse);
});

// Start the server
app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`);
});

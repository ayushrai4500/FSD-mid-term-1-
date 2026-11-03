const express = require('express');

const app = express();

app.use(express.json());

const PORT = 3000;

// In-memory array
let students = [];

// POST - Add Student
app.post('/api/students', (req, res) => {

    const { id, name, email, course, age } = req.body;

    // Validate mandatory fields
    if (id == null || !name || !email || !course || age == null) {
        return res.status(400).json({
            message: "All fields are mandatory"
        });
    }

    // Check duplicate ID
    const existingStudent = students.find(s => s.id === id);

    if (existingStudent) {
        return res.status(409).json({
            message: "Student ID already exists"
        });
    }

    // Create student
    const student = { id, name, email, course, age };

    students.push(student);

    res.status(201).json({
        message: "Student added successfully",
        student
    });
});


// GET - Retrieve All Students
app.get('/api/students', (req, res) => {

    res.status(200).json(students);

});


// GET - Retrieve Student By ID
app.get('/api/students/:id', (req, res) => {

    const id = Number(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.status(200).json(student);

});


// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
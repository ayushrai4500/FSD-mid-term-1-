const express = require('express');

const app = express();

app.use(express.json());

const PORT = 3000;

// In-memory student records
let students = [];


// TASK 2: POST - Add Student
app.post('/api/students', (req, res) => {

    const { id, name, email, course, age } = req.body;

    if (id == null || !name || !email || !course || age == null) {
        return res.status(400).json({
            message: "All fields are mandatory"
        });
    }

    const existingStudent = students.find(s => s.id === id);

    if (existingStudent) {
        return res.status(409).json({
            message: "Student ID already exists"
        });
    }

    const student = { id, name, email, course, age };

    students.push(student);

    res.status(201).json({
        message: "Student added successfully",
        student
    });
});


// TASK 3: GET - All Students
app.get('/api/students', (req, res) => {

    res.status(200).json(students);

});


// TASK 3: GET - Student By ID
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


// TASK 4: PUT - Update Student
app.put('/api/students/:id', (req, res) => {

    const id = Number(req.params.id);

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const { name, email, course, age } = req.body;

    if (!name || !email || !course || age == null) {
        return res.status(400).json({
            message: "All fields are mandatory"
        });
    }

    students[index] = {
        id,
        name,
        email,
        course,
        age
    };

    res.status(200).json({
        message: "Student updated successfully",
        student: students[index]
    });
});


// START SERVER
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

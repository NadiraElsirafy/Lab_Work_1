const express = require('express');
const app = express();
const PORT = 3000;

// 1. JSON Middleware
app.use(express.json());

// 2. In-memory Data
let students = [
    { id: 1, name: "Nadira", gpa: 3.0 },
    { id: 2, name: "Basant", gpa: 3.0 },
    { id: 3, name: "Rana", gpa: 3.0 }
];

// 3. Logger Middleware
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
    });
    next();
});

// 4. Authentication Middleware (Protects all /api routes)
app.use('/api', (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (apiKey === '123') {
        next();
    } else {
        res.status(401).json({ message: "401 Unauthorized: Invalid or missing API key" });
    }
});

// --- API Routes ---

// GET: All students
app.get('/api/students', (req, res) => {
    res.json(students);
});

// GET: Single student by ID
app.get('/api/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
});

// POST: Add new student
app.post('/api/students', (req, res) => {
    const { name, gpa } = req.body;
    if (!name || gpa === undefined) return res.status(400).json({ message: "Name and GPA are required" });

    const newStudent = {
        id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
        name,
        gpa
    };
    students.push(newStudent);
    res.status(201).json(newStudent);
});

// DELETE: Remove student by ID
app.delete('/api/students/:id', (req, res) => {
    const index = students.findIndex(s => s.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Student not found" });

    students.splice(index, 1);
    res.status(204).send(); // Success, no content
});

// PUT: Replace entire student
app.put('/api/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) return res.status(404).json({ message: "Student not found" });

    const { name, gpa } = req.body;
    if (!name || gpa === undefined) return res.status(400).json({ message: "Name and GPA are required" });

    student.name = name;
    student.gpa = gpa;
    res.json(student);
});

// PATCH: Update specific fields
app.patch('/api/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) return res.status(404).json({ message: "Student not found" });

    if (req.body.name) student.name = req.body.name;
    if (req.body.gpa !== undefined) student.gpa = req.body.gpa;

    res.json(student);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
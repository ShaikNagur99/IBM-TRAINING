// Import Express
const express = require('express');

// Import Mongoose
const mongoose = require('mongoose');

// Create Express application
const app = express();


// Middleware to read form data
app.use(express.urlencoded({ extended: true }));

// Middleware to read JSON data
app.use(express.json());


// Tell Express to use EJS
app.set('view engine', 'ejs');


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/notedb')
    .then(() => {
        console.log('MongoDB connected successfully!');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });


// Create Note Schema
const noteSchema = new mongoose.Schema({
    noteId: {
        type: Number,
        required: true
    },

    noteContent: {
        type: String,
        required: true
    }
});


// Create Note Model
const Note = mongoose.model('Note', noteSchema);


// ----------------------------------------
// GET - Display all notes
// ----------------------------------------

app.get('/', async (req, res) => {

    try {

        // Get all notes from MongoDB
        const notes = await Note.find();

        // Send notes to home.ejs
        res.render('home', {
            data: notes
        });

    } catch (err) {

        console.error(err);
        res.status(500).send('Error fetching notes');

    }
});


// ----------------------------------------
// POST - Add a new note
// ----------------------------------------

app.post('/', async (req, res) => {

    try {

        // Get note content from form
        const noteContent = req.body.noteContent;

        // Find the highest note ID
        const lastNote = await Note.findOne().sort({ noteId: -1 });

        // Create next ID
        const noteId = lastNote ? lastNote.noteId + 1 : 1;

        // Create new note
        const newNote = new Note({
            noteId: noteId,
            noteContent: noteContent
        });

        // Save note to MongoDB
        await newNote.save();

        console.log('Note saved successfully!');

        // Go back to home page
        res.redirect('/');

    } catch (err) {

        console.error(err);
        res.status(500).send('Error adding note');

    }
});


// ----------------------------------------
// POST - Update a note
// ----------------------------------------

app.post('/update', async (req, res) => {

    try {

        // Get note ID
        const noteId = req.body.noteId;

        // Get updated content
        const noteContent = req.body.noteContent;

        // Update note in MongoDB
        await Note.findOneAndUpdate(
            { noteId: noteId },
            { noteContent: noteContent }
        );

        console.log('Note updated successfully!');

        // Go back to home page
        res.redirect('/');

    } catch (err) {

        console.error(err);
        res.status(500).send('Error updating note');

    }
});


// ----------------------------------------
// POST - Delete a note
// ----------------------------------------

app.post('/delete', async (req, res) => {

    try {

        // Get note ID
        const noteId = req.body.noteId;

        // Delete note from MongoDB
        await Note.findOneAndDelete({
            noteId: noteId
        });

        console.log('Note deleted successfully!');

        // Go back to home page
        res.redirect('/');

    } catch (err) {

        console.error(err);
        res.status(500).send('Error deleting note');

    }
});


// ----------------------------------------
// Start Server
// ----------------------------------------

const PORT = 3000;

app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});
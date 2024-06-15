"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchNotebookByIdController = exports.fetchAllNotebooksController = exports.deleteNotebookController = exports.updateNotebookController = exports.createNotebookController = void 0;
const notebook_1 = require("../services/notebook");
// Function to create a notebook
const createNotebookController = async (req, res) => {
    try {
        const { title, body } = req.body;
        const newNotebook = await (0, notebook_1.createNotebook)(title, body);
        res.status(201).json(newNotebook);
    }
    catch (error) {
        console.error('Error creating notebook:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.createNotebookController = createNotebookController;
// Function to update a notebook by its ID
const updateNotebookController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, body } = req.body;
        const updatedNotebook = await (0, notebook_1.updateNotebook)(id, title, body);
        if (updatedNotebook) {
            res.status(200).json(updatedNotebook);
        }
        else {
            res.status(404).json({ message: 'Notebook not found' });
        }
    }
    catch (error) {
        console.error('Error updating notebook:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.updateNotebookController = updateNotebookController;
// Function to delete a notebook by its ID
const deleteNotebookController = async (req, res) => {
    try {
        const { id } = req.params;
        const success = await (0, notebook_1.deleteNotebook)(id);
        if (success) {
            res.status(200).json({ message: 'Notebook deleted successfully' });
        }
        else {
            res.status(404).json({ message: 'Notebook not found' });
        }
    }
    catch (error) {
        console.error('Error deleting notebook:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.deleteNotebookController = deleteNotebookController;
// Function to fetch all notebooks
const fetchAllNotebooksController = async (req, res) => {
    try {
        const notebooks = await (0, notebook_1.fetchAllNotebooks)();
        res.status(200).json(notebooks);
    }
    catch (error) {
        console.error('Error fetching all notebooks:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.fetchAllNotebooksController = fetchAllNotebooksController;
// Function to fetch a notebook by its ID
const fetchNotebookByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const notebook = await (0, notebook_1.fetchNotebookById)(id);
        if (notebook) {
            res.status(200).json(notebook);
        }
        else {
            res.status(404).json({ message: 'Notebook not found' });
        }
    }
    catch (error) {
        console.error('Error fetching notebook by ID:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.fetchNotebookByIdController = fetchNotebookByIdController;

import { Request, Response } from 'express';
import { createNotebook, updateNotebook, deleteNotebook, fetchAllNotebooks, fetchNotebookById } from '../services/notebook';

// Function to create a notebook
export const createNotebookController = async (req: Request, res: Response) => {
    try {
        const { title, body } = req.body;
        const newNotebook = await createNotebook(title, body);
        res.status(201).json(newNotebook);
    } catch (error) {
        console.error('Error creating notebook:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Function to update a notebook by its ID
export const updateNotebookController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, body } = req.body;
        const updatedNotebook = await updateNotebook(id, title, body);
        if (updatedNotebook) {
            res.status(200).json(updatedNotebook);
        } else {
            res.status(404).json({ message: 'Notebook not found' });
        }
    } catch (error) {
        console.error('Error updating notebook:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Function to delete a notebook by its ID
export const deleteNotebookController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const success = await deleteNotebook(id);
        if (success) {
            res.status(200).json({ message: 'Notebook deleted successfully' });
        } else {
            res.status(404).json({ message: 'Notebook not found' });
        }
    } catch (error) {
        console.error('Error deleting notebook:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Function to fetch all notebooks
export const fetchAllNotebooksController = async (req: Request, res: Response) => {
    try {
        const notebooks = await fetchAllNotebooks();
        res.status(200).json(notebooks);
    } catch (error) {
        console.error('Error fetching all notebooks:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Function to fetch a notebook by its ID
export const fetchNotebookByIdController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const notebook = await fetchNotebookById(id);
        if (notebook) {
            res.status(200).json(notebook);
        } else {
            res.status(404).json({ message: 'Notebook not found' });
        }
    } catch (error) {
        console.error('Error fetching notebook by ID:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

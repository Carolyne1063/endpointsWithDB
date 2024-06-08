import { Router } from 'express';
import {
    createNotebookController,
    updateNotebookController,
    deleteNotebookController,
    fetchAllNotebooksController,
    fetchNotebookByIdController
} from '../controller/notebook.contoller';

const router = Router();

router.post('/notebooks', createNotebookController);
router.put('/notebooks/:id', updateNotebookController);
router.delete('/notebooks/:id', deleteNotebookController);
router.get('/notebooks', fetchAllNotebooksController);
router.get('/notebooks/:id', fetchNotebookByIdController);

export default router;

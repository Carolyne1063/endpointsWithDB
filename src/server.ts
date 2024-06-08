
import express from 'express';
import notebookRoutes from './router/notebook.route';

const app = express();
app.use(express.json());
app.use('/api', notebookRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



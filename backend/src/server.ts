
import express from 'express';
import cors from 'cors';
import notebookRoutes from './router/notebook.route';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', notebookRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



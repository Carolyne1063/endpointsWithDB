
import { v4 as uuidv4 } from 'uuid';
import * as sql from 'mssql';
import { notebook } from '../interfaces/notebook';
import { sqlConfig } from '../sqlConfig'; 

// Function to create a notebook
export const createNotebook = async (title: string, body: string): Promise<notebook> => {
    try {
        const pool = await sql.connect(sqlConfig);
        const id = uuidv4();
        const createdAt = new Date().toISOString();

        await pool.request()
            .input('id', sql.NVarChar, id)
            .input('title', sql.NVarChar, title)
            .input('body', sql.NVarChar, body)
            .input('createdAt', sql.NVarChar, createdAt)
            .query(`
                INSERT INTO notebooks (id, title, body, createdAt)
                VALUES (@id, @title, @body, @createdAt)
            `);

        await pool.close();
        return { id, title, body, createdAt };
    } catch (error) {
        console.error('Error creating notebook:', error);
        throw error;
    }
};

// Function to update a notebook by its ID
export const updateNotebook = async (id: string, title: string, body: string): Promise<notebook | null> => {
    try {
        const pool = await sql.connect(sqlConfig);

        const result = await pool.request()
            .input('id', sql.NVarChar, id)
            .input('title', sql.NVarChar, title)
            .input('body', sql.NVarChar, body)
            .query(`
                UPDATE notebooks
                SET title = @title, body = @body
                WHERE id = @id
            `);

        await pool.close();

        if (result.rowsAffected[0] > 0) {
            return { id, title, body, createdAt: new Date().toISOString() };
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error updating notebook:', error);
        throw error;
    }
};

// Function to delete a notebook by its ID
export const deleteNotebook = async (id: string): Promise<boolean> => {
    try {
        const pool = await sql.connect(sqlConfig);

        const result = await pool.request()
            .input('id', sql.NVarChar, id)
            .query(`
                DELETE FROM notebooks
                WHERE id = @id
            `);

        await pool.close();
        return result.rowsAffected[0] > 0;
    } catch (error) {
        console.error('Error deleting notebook:', error);
        throw error;
    }
};

// Function to fetch all notebooks
export const fetchAllNotebooks = async (): Promise<notebook[]> => {
    try {
        const pool = await sql.connect(sqlConfig);

        const result = await pool.request()
            .query(`
                SELECT id, title, body, createdAt
                FROM notebooks
            `);

        await pool.close();
        return result.recordset;
    } catch (error) {
        console.error('Error fetching all notebooks:', error);
        throw error;
    }
};

// Function to fetch a notebook by its ID
export const fetchNotebookById = async (id: string): Promise<notebook | null> => {
    try {
        const pool = await sql.connect(sqlConfig);

        const result = await pool.request()
            .input('id', sql.NVarChar, id)
            .query(`
                SELECT id, title, body, createdAt
                FROM notebooks
                WHERE id = @id
            `);

        await pool.close();
        return result.recordset[0] || null;
    } catch (error) {
        console.error('Error fetching notebook by ID:', error);
        throw error;
    }
};

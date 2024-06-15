"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchNotebookById = exports.fetchAllNotebooks = exports.deleteNotebook = exports.updateNotebook = exports.createNotebook = void 0;
const uuid_1 = require("uuid");
const sql = __importStar(require("mssql"));
const sqlConfig_1 = require("../sqlConfig");
// Function to create a notebook
const createNotebook = async (title, body) => {
    try {
        const pool = await sql.connect(sqlConfig_1.sqlConfig);
        const id = (0, uuid_1.v4)();
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
    }
    catch (error) {
        console.error('Error creating notebook:', error);
        throw error;
    }
};
exports.createNotebook = createNotebook;
// Function to update a notebook by its ID
const updateNotebook = async (id, title, body) => {
    try {
        const pool = await sql.connect(sqlConfig_1.sqlConfig);
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
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.error('Error updating notebook:', error);
        throw error;
    }
};
exports.updateNotebook = updateNotebook;
// Function to delete a notebook by its ID
const deleteNotebook = async (id) => {
    try {
        const pool = await sql.connect(sqlConfig_1.sqlConfig);
        const result = await pool.request()
            .input('id', sql.NVarChar, id)
            .query(`
                DELETE FROM notebooks
                WHERE id = @id
            `);
        await pool.close();
        return result.rowsAffected[0] > 0;
    }
    catch (error) {
        console.error('Error deleting notebook:', error);
        throw error;
    }
};
exports.deleteNotebook = deleteNotebook;
// Function to fetch all notebooks
const fetchAllNotebooks = async () => {
    try {
        const pool = await sql.connect(sqlConfig_1.sqlConfig);
        const result = await pool.request()
            .query(`
                SELECT id, title, body, createdAt
                FROM notebooks
            `);
        await pool.close();
        return result.recordset;
    }
    catch (error) {
        console.error('Error fetching all notebooks:', error);
        throw error;
    }
};
exports.fetchAllNotebooks = fetchAllNotebooks;
// Function to fetch a notebook by its ID
const fetchNotebookById = async (id) => {
    try {
        const pool = await sql.connect(sqlConfig_1.sqlConfig);
        const result = await pool.request()
            .input('id', sql.NVarChar, id)
            .query(`
                SELECT id, title, body, createdAt
                FROM notebooks
                WHERE id = @id
            `);
        await pool.close();
        return result.recordset[0] || null;
    }
    catch (error) {
        console.error('Error fetching notebook by ID:', error);
        throw error;
    }
};
exports.fetchNotebookById = fetchNotebookById;

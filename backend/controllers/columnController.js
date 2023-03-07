const ColumnModel = require('../models/columnModel');

const createColumn = async (req, res) => {
    const { columnName, boardId } = req.body;
    try {
        const Column = await ColumnModel.createColumns(columnName, boardId);
        res.status(200).json(Column);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
  }

  const getColumns = async (req, res) => {
    const { boardId } = req.body;
    try {
        const Column = await ColumnModel.readColumns(boardId);
        res.status(200).json(Column);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
  }

  const updateColumn = async (req, res) => {
    const { columnId, columnName } = req.body;
    try {
        const response = await ColumnModel.updateColumns(columnId, columnName);
        res.status(200).json({ response });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
  }

  const deleteColumn = async (req, res) => {
    const { columnId } = req.body;
    try {
        const response = await ColumnModel.deleteColumns(columnId);
        res.status(200).json({ response });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
  }
  
  module.exports = { createColumn, getColumns, updateColumn, deleteColumn }
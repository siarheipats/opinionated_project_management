const boardModel = require('../models/boardModel');

// createBoard(): create a board and return board info
// Arguments: boardid, workspaceID
// returns: HTTP 2xx on sucess, 
//          HTTP 4xx on failure + json error message
const createBoard = async (req, res) => {
  const { boardId, workspaceId, boardName, caregoryName } = req.body;
  try {
      const Board = await BoardModel.createBoard(boardId, workspaceId, boardName,
                                                                    caregoryName);
      res.status(200).json(Board);
  } catch (error) {
      res.status(400).json({ error: error.message })
  }
}

// getBoard(): given a boardID, return board info
// Arguments: boardId
// returns: HTTP 2xx on sucess, 
//          HTTP 4xx on failure + json error message
const getBoard = async (req, res) => {
  const { boardId } = req.body;
  try {
      const Board = await BoardModel.getCustomerBoard(boardId);
      res.status(200).json(Board);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
}

// updateBoard(): Given boardId, update a board's member items.
// Arguments: BoardId, BoardName, workspaceId, caregoryName
// returns: HTTP 2xx on sucess, 
//          HTTP 4xx on failure + json error message
const updateBoard = async (req, res) => {
  const { boardId, boardName, workspaceId, caregoryName } = req.body;
  try {
      const response = await BoardModel.updateWorkspaceDetails(boardId, boardName,
                                                          workspaceId, caregoryName);
      res.status(200).json({ response });
  } catch (error) {
      res.status(400).json({ error: error.message })
  }
}

// deleteBoard(): Given boardId, delete the board.
// Arguments: boardId
// returns: HTTP 2xx on sucess, 
//          HTTP 4xx on failure + json error message
const deleteBoard = async (req, res) => {
  const { boardId } = req.body;
  try {
      const response = await BoardModel.deleteBoard(boardId);
      res.status(200).json({ response });
  } catch (error) {
      res.status(400).json({ error: error.message })
  }
}
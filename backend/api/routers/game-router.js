const gamerouter = require('express').Router();
const { getLobby, leaveLobby, joinLobby, getChanges, createLobby } = require('../../services/game-service');
const verifyToken = require('../../middleware/auth');

gamerouter.get('/', verifyToken, async (req, res) => {
    getLobby(req, res);
});

gamerouter.get('/leave', verifyToken, async (req, res) => {
    leaveLobby(req, res);
});

gamerouter.get('/join', verifyToken, async (req, res) => {
    joinLobby(req, res)
});

gamerouter.get('/createLobby', verifyToken, async (req, res) => {
    createLobby(req, res);
});

gamerouter.post('/', verifyToken, async (req, res) => {
    getChanges(req, res);
});


module.exports = gamerouter;
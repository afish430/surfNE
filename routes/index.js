var express = require('express');
var router = express.Router();

// other modules
var showCreateAccountPage = require("./showCreateAccountPage");
var createAccount = require("./createAccount");
var showLoginPage = require("./showLoginPage");
var loginUser = require("./loginUser");
var logoutUser = require("./logoutUser");

var showAllSurfSpotsPage = require("./showAllSurfSpotsPage");
var showAddSurfSpotPage = require("./showAddSurfSpotPage");
var showSurfSpotInfoPage = require("./showSurfSpotInfoPage");
var saveNewSurfSpot = require("./saveNewSurfSpot");
var showEditSurfSpotPage = require("./showEditSurfSpotPage");
var saveUpdatedSurfSpot = require("./saveUpdatedSurfSpot");
var deleteSurfSpot = require("./deleteSurfSpot");
var addComment = require("./addComment");

var apiGetAllSurfSpots = require("./apiGetAllSurfSpots");
var apiGetSurfSpotById = require("./apiGetSurfSpotById");

// routes
router.get('/', function(req, res, next) {
  res.redirect('/surfSpots');
});

router.get('/createAccount', showCreateAccountPage);
router.post('/createAccount', createAccount);
router.get('/login', showLoginPage);
router.post('/login', loginUser);
router.get('/logout', logoutUser);

router.get('/surfSpots', showAllSurfSpotsPage);
router.get('/surfSpots/add', showAddSurfSpotPage);
router.get('/surfSpots/info/:id', showSurfSpotInfoPage);
router.post('/surfSpots/add', saveNewSurfSpot);
router.get('/surfSpots/edit/:id', showEditSurfSpotPage);
router.post('/surfSpots/edit/:id', 	saveUpdatedSurfSpot);
router.get('/surfSpots/delete/:id', deleteSurfSpot);
router.post('/comments', addComment);

router.get('/api/surfSpots', apiGetAllSurfSpots);
router.get('/api/surfSpots/:id', apiGetSurfSpotById);

module.exports = router;

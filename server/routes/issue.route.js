const express = require('express');
const auth = require('../middlewares/authMiddleware');
const checkPermission = require('../middlewares/checkPermission');
const IssueController = require('../controllers/issue.controller');

const router = express.Router();

router.post('/create-issue', auth, checkPermission(['issue:create']), IssueController.createIssue)

router.get('/my-issues', auth, checkPermission(['issue:get-my-issues']), IssueController.getmyissues)

router.get('/one-issue/:id', auth, checkPermission(['issue:get-my-one-issue']), IssueController.getoneissue)

router.put('/update-issue/:id', auth, checkPermission(['issue:update-my-issue']), IssueController.updatemyissue)

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// only admin can access these routes

router.get('/all-issues', auth, checkPermission(['issue:all']), IssueController.getallissues)

router.put('/modify-issue/:id', auth, checkPermission(['issue:modify']), IssueController.modifyissue)


module.exports = router;
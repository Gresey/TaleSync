const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const { SaveJournalEntries, GetJournalEntries } = require('../controller/journalcontroller');

router.post('/save', authenticate, SaveJournalEntries);
router.post('/get', authenticate, GetJournalEntries);

module.exports = router;

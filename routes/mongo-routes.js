const router = require("express").Router();
const {
  getNotes,
  getNote,
  addNote,
  updateText,
  addTag,
  addTags,
  removeTags,
  removeTag,
  deleteNote,
} = require("../controllers/mongo-controller");

router.get("/notes", getNotes);

router.get("/notes/single/:id", getNote);

router.post("/notes", addNote);

router.patch("/notes", updateText);

router.put("/notes", addTag);

router.put("/notes/multi", addTags);

router.delete("/notes/tags/multi", removeTags);

router.delete("/notes/tags/single", removeTag);

router.delete("/notes/:id", deleteNote);

module.exports = router;

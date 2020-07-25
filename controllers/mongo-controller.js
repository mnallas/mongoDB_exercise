const mongojs = require("mongojs");
const databaseUrl = "notetaker_db";
const collections = ["notes"];

const db = mongojs(databaseUrl, collections);
//check if there's connection issue
db.on("error", (err) => console.log({ err_message: err }));

module.exports = {
  // returns object inside array even if empty or just one
  getNotes: (req, res) =>
    db.notes.find({}, (err, data) => (err ? res.send(err) : res.send(data))),

  // getOne returns on object
  getNote: (req, res) => {
    db.notes.findOne({ _id: mongojs.ObjectID(req.params.id) }, (err, data) => {
      err ? res.send(err) : res.send(data);
    });
  },

  //mongodb allows you to save tyour arrays and objects to the collections
  addNote: (req, res) => {
    db.notes.insert(
      {
        text: req.body.text,
        completed: req.body.completed,
        tags: [],
      },
      (err, data) => (err ? res.send(err) : res.send(data))
    );
  },

  //anytime we a re referencing an id you must include mongojs.ObjectID
  updateText: (req, res) => {
    db.notes.update(
      { _id: mongojs.ObjectID(req.body.id) },
      { $set: { text: req.body.text } },
      (err, response) => (err ? res.send(err) : res.send(response))
    );
  },
  addTag: (req, res) => {
    db.notes.update(
      { _id: mongojs.ObjectID(req.body.id) },
      //to add single thing to array
      { $push: { tags: req.body.tags } },
      (err, response) => (err ? res.send(err) : res.send(response))
    );
  },

  addTags: (req, res) => {
    db.notes.update(
      { _id: mongojs.ObjectID(req.body.id) },
      //to add multiple things into array
      { $push: { tags: { $each: req.body.tags } } },
      (err, response) => (err ? res.send(err) : res.send(response))
    );
  },

  removeTags: (req, res) => {
    db.notes.update(
      { _id: mongojs.ObjectID(req.body.id) },
      //to pull a multiple items from a narray just use $pullAll
      {
        $pullAll: { tags: req.body.tags },
      },
      (err, data) => {
        err ? res.send(err) : res.send(data);
      }
    );
  },

  removeTag: (req, res) => {
    db.notes.update(
      { _id: mongojs.ObjectID(req.body.id) },
      {
        //to pull a single item from a narray just use $pull
        $pull: { tags: req.body.tags },
      },
      (err, data) => {
        err ? res.send(err) : res.send(data);
      }
    );
  },

  deleteNote: (req, res) => {
    //to remove an item from the collection by its id
    //any parameter works
    db.notes.remove({ _id: mongojs.ObjectID(req.body.id) }, (err, data) =>
      err ? res.send(err) : res.send(data)
    );
  },
};

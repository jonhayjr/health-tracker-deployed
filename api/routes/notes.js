const express = require('express');
const router = express.Router();
const {Note} = require('../models');

//Imports asyncHandler middleware function
const { asyncHandler } = require('../middleware/async-handler');


// Route that returns all notes
router.get('/notes', asyncHandler(async (req, res) => {
  const notes = await Note.findAll({
    //Exclude createdAt and updatedAt columns from query
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    order: ['id']
  });

  res.json(notes);
}));

// Route that returns note for specific id
router.get('/notes/:id', asyncHandler(async (req, res) => {
  const {id} = req.params;
  const note = await Note.findByPk(id, {
    //Exclude createdAt and updatedAt columns from query
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  });
  
  //If note exists, return it.  If not, throw a 404 error.
  if (note) {
    res.json(note);
  } else {
    res.status(404).json({message: 'Note does not exist'});
 }
  
}));

//Route that creates a new note
router.post('/notes', asyncHandler(async (req, res) => {
    try {
      const note = await Note.create(req.body);
      res.location(`/notes/${note.id}`).status(201).end();
    } catch (error) {
      if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        const errors = error.errors.map(err => err.message);
        res.status(400).json({ errors });   
      } else {
        throw error;
      }
    }
}));

//Route that updates note with the corresponding id
router.put('/notes/:id', asyncHandler(async (req, res, next) => {
  
  const { id } = req.params;
  const note = await Note.findByPk(id);
    try {
      //Checks if course exists
      if (note) {
            await note.update(req.body);
            res.status(204).end();
    } else {
      res.status(404).json({message: `Note ID ${id} does not exist`});
    }
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });
      } else {
          throw error;
      }
  }

}));

//Route that deletes note with the corresponding id
router.delete('/notes/:id', asyncHandler(async (req, res, next) => {

  const { id } = req.params;
  const note = await Note.findByPk(id);
        try {
          //Checks if note exists
          if (note) {
              await note.destroy();
              res.status(204).end(); 
          } else {
              res.status(404).json({message: `Note ID ${id} does not exist`});
            }
      } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
          const errors = error.errors.map(err => err.message);
          res.status(400).json({ errors });
          } else {
              throw error;
          }
      }
}));

module.exports = router;
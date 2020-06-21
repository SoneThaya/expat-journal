const db = require('../data/db-config');

module.exports = {
  get,
  getById,
  insert,
  update,
  remove
}

function get() {
  return db('stories')
    // .select('s.id as story_id', 's.user_id', 's.title', 's.description', 's.date', 's.location', 's.storyImage')
}

function getById() {
  return db('stories').where({id}).first()
}

function insert(story) {
  return db('stories')
    .insert(story)
}

function remove(id) {
  return db('stories').where({id}).del()
}

function update(id, changes) {
  return db("stories").where({ id }).update(changes);
}
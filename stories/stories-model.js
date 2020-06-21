const db = require('../data/db-config');

module.exports = {
  get,
  getByStoryId,
  insert,
  update,
  remove
}

function get() {
  return db('stories')
}

function getByStoryId(id) {
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
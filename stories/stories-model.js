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
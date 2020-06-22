const db = require('../data/db-config');

module.exports = {
  get,
  getByStoryId,
  insert,
  update,
  remove,
  getStoriesByUserId
}

function get() {
  return db('stories')
}

function getByStoryId(id) {
  return db('stories').where({id}).first()
}

function getStoriesByUserId(jwt_id) {
  return db('stories as s')
    .select('s.user_id', 's.id as story_id', 's.title', 's.location', 's.date', 's.description', 's.storyImage')
    .where('s.user_id', jwt_id)
}

function insert(newStory) {
  return db('stories')
    .insert(newStory)
    .where('stories.id', newStory.user_id)
}

function remove(id) {
  return db('stories').where({id}).del()
}

function update(id, changes) {
  return db("stories").where({ id }).update(changes);
}
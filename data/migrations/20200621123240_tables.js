
exports.up = function(knex) {
  return knex.schema.createTable('users', users => {
    users.increments();
    users.string('username', 128)
      .notNullable()
      .unique();
    users.string('password', 128)
      .notNullable();
  })

    .createTable('stories', stories => {
      stories.increments();
      stories.integer('user_id').unsigned().references('users.id');
      stories.string('title', 128).notNullable();
      stories.string('location', 128).notNullable();
      stories.string('date', 128);
      stories.string('description', 255).notNullable();
      stories.string('storyImage', 550);
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTablesIfExists('stories')
    .dropTablesIfExists('users')
};

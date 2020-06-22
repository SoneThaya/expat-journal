
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
      stories.string('title', 128).notNullable();
      stories.string('location', 128).notNullable();
      stories.string('date', 128);
      stories.string('description', 1000).notNullable();
      stories.string('storyImage', 1000);
      stories.integer('user_id')
        .unsigned()
        .references('users.id')
        // .onUpdate("CASCADE")
        // .onDelete("CASCADE");
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('stories')
    .dropTableIfExists('users')
};

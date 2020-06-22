
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'lambda', password: '123456'},
        {id: 2, username: 'steve', password: '123456'},
      ]);
    })
    
    .then(() => knex('stories'))
    .then(function () {
      return knex('stories').insert([
        {
          id: 1,
          title: 'Lounging at the Beach',
          location: 'Tahiti, French Polynesia',
          date: 'June 21, 2020',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          storyImage:
            'https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
          user_id: 1,
        },
        {
          id: 2,
          title: 'Day at the Beach',
          location: 'Miami, FL',
          date: 'May 21, 2019',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          storyImage:
            'https://images.unsplash.com/photo-1495954484750-af469f2f9be5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
          user_id: 1,
        },
        {
          id: 3,
          title: 'Site Seeing',
          location: 'Manhattan, NY',
          date: 'April 21, 2018',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          storyImage:
            'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
          user_id: 2,
        },
        {
          id: 4,
          title: 'Swimming in a Fountain',
          location: 'Rome, Italy',
          date: 'September 1, 2017',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          storyImage:
            'https://images.unsplash.com/photo-1525874684015-58379d421a52?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
          user_id: 2,
        },
      ])
    })
};

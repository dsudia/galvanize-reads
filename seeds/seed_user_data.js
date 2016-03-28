
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),

    // Inserts seed entries
    knex('users').insert({username: 'mherman', name: 'Mike Herman', password: '$2a$10$NwJst4mSZS2nw/KoT710QOjC9UiAAIzWs6A9U00ieT0OQsbms9ZYG', user_type: 'teacher'}),
    knex('users').insert({username: 'dsudia', name: 'Dave Sudia', password: '$2a$10$V7D4z2XEBIF9i4DlrjEATOjcTkAk7cLgrUzSaUHGB9CT8.pfhB5dK', user_type: 'student'})
  );
};

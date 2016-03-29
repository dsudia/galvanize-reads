
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('author_book_rels').del(),

    // Inserts seed entries
    knex('author_book_rels').insert({author_id: knex('authors').select('id').where('first_name', 'Alex'), book_id: knex('books').select('id').where('title', 'Python In A Nutshell')}),
    knex('author_book_rels').insert({author_id: knex('authors').select('id').where('first_name', 'Anna'), book_id: knex('books').select('id').where('title', 'Python In A Nutshell')}),
    knex('author_book_rels').insert({author_id: knex('authors').select('id').where('first_name', 'Steve'), book_id: knex('books').select('id').where('title', 'Python In A Nutshell')}),
    knex('author_book_rels').insert({author_id: knex('authors').select('id').where('first_name', 'Allen B.'), book_id: knex('books').select('id').where('title', 'Think Python')}),
    knex('author_book_rels').insert({author_id: knex('authors').select('id').where('first_name', 'Bonnie'), book_id: knex('books').select('id').where('title', 'Learning React Native')}),
    knex('author_book_rels').insert({author_id: knex('authors').select('id').where('first_name', 'Kyle'), book_id: knex('books').select('id').where('title', 'You Don\'t Know JS: ES6 & Beyond')}),
    knex('author_book_rels').insert({author_id: knex('authors').select('id').where('first_name', 'Kyle'), book_id: knex('books').select('id').where('title', 'You Don\'t Know JS: Scope & Closures')}),
    knex('author_book_rels').insert({author_id: knex('authors').select('id').where('first_name', 'Kyle'), book_id: knex('books').select('id').where('title', 'You Don\'t Know JS: Async & Performance')}),
    knex('author_book_rels').insert({author_id: knex('authors').select('id').where('first_name', 'Alex'), book_id: knex('books').select('id').where('title', 'Python In A Nutshell2')}),
    knex('author_book_rels').insert({author_id: knex('authors').select('id').where('first_name', 'Anna'), book_id: knex('books').select('id').where('title', 'Python In A Nutshell2')}),
    knex('author_book_rels').insert({author_id: knex('authors').select('id').where('first_name', 'Steve'), book_id: knex('books').select('id').where('title', 'Python In A Nutshell2')}),
    knex('author_book_rels').insert({author_id: knex('authors').select('id').where('first_name', 'Allen B.'), book_id: knex('books').select('id').where('title', 'Think Python2')}),
    knex('author_book_rels').insert({author_id: knex('authors').select('id').where('first_name', 'Bonnie'), book_id: knex('books').select('id').where('title', 'Learning React Native2')}),
    knex('author_book_rels').insert({author_id: knex('authors').select('id').where('first_name', 'Kyle'), book_id: knex('books').select('id').where('title', 'You Don\'t Know JS: ES6 & Beyond2')}),
    knex('author_book_rels').insert({author_id: knex('authors').select('id').where('first_name', 'Kyle'), book_id: knex('books').select('id').where('title', 'You Don\'t Know JS: Scope & Closures2')}),
    knex('author_book_rels').insert({author_id: knex('authors').select('id').where('first_name', 'Kyle'), book_id: knex('books').select('id').where('title', 'You Don\'t Know JS: Async & Performance2')})
  );
};

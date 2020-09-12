const resolvers = {
	Query: {
      books: () => books,
      authors: () => authors
	}
  };

const books = [
	{
	  title: 'Harry Potter and the Chamber of Secrets',
	  author: 'J.K. Rowling',
	},
	{
	  title: 'Jurassic Park',
	  author: 'Michael Crichton',
	}
  ];

const authors = [
    {
        id: 1,
        firstName: 'J.K.',
        lastName: 'Rowling',
        books: [
            {
                title: 'Harry Potter and the Philosopher Stone',
                author: 'J.K. Rowling',
            },
            {
                title: 'Harry Potter and the Chamber of Secrets',
                author: 'J.K. Rowling',
            }
        ]
    },
    {
        id: 2,
        firstName: 'George',
        lastName: 'Orwell',
        books: [
            {
                title: 'Book 1',
                author: 'George Orwell',
            },
            {
                title: 'Book 2',
                author: 'George Orwell',
            }
        ]
    }
];

exports.resolvers = resolvers;

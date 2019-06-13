
const translate	= require('../../utils/translates');

var 	Apireference	= (app, db) => {
	/**
	 * 
	 */
	app.get('/authors', (req, res) => {
		var authorsCollection = db.select('authors');

		res.status(200).send({
			message     : 'Success fetch',
			collection  : authorsCollection
		})
	})
	
	/**
	 * 
	 */
	app.post('/authors', (req, res) => {
		// console.log(req.body);
		
		var lang = req.header('lang');
	
		
		if(!req.body.email.includes("@")) {
			return res.status(402).send({
				message: translate(lang, 'ERROR' )
			});
		}
		
		var record = db.insert('authors', req.body);
		
		res.status(200).send({ 
			message: translate(lang, 'SUCCESS' ),
			collection: [record]
		})
		
	});

	/**
	 * 
	 */
	app.get('/authors/:id', (req, res) => {
		var id = req.params.id;
		var lang = req.header('lang');
	
		var collection= db.select('authors', {
			'__id': id
		});

		if(collection.length === 1) {
			return res.status(200).send({
				message : translate(lang, 'API_BOOKS_FETCH_SUCCESS'),
				collection: collection
			});
		}
		return res.status(404).send({
			message: translate(lang, 'API_BOOKS_FETCH_ERROR')
		});
	});

	/**
	 * NOT WORKING
	 */
	app.get('authors/:authorid/books/:bookid', (req, res) => {
		var authorId 	= req.params.authorid;
		var bookId 		= req.params.bookid;
		var lang = req.header('lang');

		var authors = db.select('authors', {
			'__id': authorId
		});

		if( authors.length != 1 ) {
			return res.status(404).send({
				message: translate(lang, 'API_BOOKS_FETCH_ERROR')
			});
		}

		var author = authors[0];

		var booksCheck = {
			name : author.name,
		}

		if(bookId) {
			booksCheck.__id= bookId
		}

		var authorBooks	= db.select('books', booksCheck);

		author[books] = authorBooks;

		return res.status(200).send({
			message: translate(lang, "API_BOOKS_FETCH_SUCCESS"),
			collection: author
		})
	});
	
}
	
	module.exports	= Apireference;
	

const translate	= require('../../utils/translates');

var 	Apireference	= (app, db) => {
	/**
	 * 
	 */
	app.get('/books', (req, res) => {		

		var bookCollection = db.select('books', null , {
			limit	: req.filterData.limit,
			skip	: req.filterData.skip
		});
		
		res.status(200).send({
			message     : translate(req.metaData["lang"], 'SUCCESS' ),
			collection  : bookCollection
		})
	})
	
	/**
	 * 
	 */
	app.post('/books', (req, res) => {

		if(!req.body.title || req.body.isbn.length > 15) {
			return res.status(402).send({
				message: translate(req.metaData["lang"], 'ERROR' )
			});
		}
		
		var record = db.insert('books', req.body);
		
		res.status(200).send({ 
			message: translate(req.metaData["lang"], 'SUCCESS' ),
			collection: [record]
		})
		
	});

	/**
	 * 
	 */
	app.get('/books/:id', (req, res) => {
		var id = req.params.id;

		console.log("#@@@@@@@@" + req.metaData)
	
		var collection= db.select('books', {
			'__id': id
		}, {} );

		if(collection.length === 1) {
			return res.status(200).send({
				message : translate(req.metaData["lang"], 'API_BOOKS_FETCH_SUCCESS'),
				collection: collection
			});
		}
		return res.status(404).send({
			message: translate(lang, 'API_BOOKS_FETCH_ERROR')
		});
	});
	
}
	
	module.exports	= Apireference;
	
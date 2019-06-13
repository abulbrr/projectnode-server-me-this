
var 	Apireference	= (app, db) => {
	/**
	 * 
	 */
	app.get('/menu', (req, res) => {
		var menuCollection = db.select('menu');

		res.status(200).send({
			message     : 'Success fetch',
			collection  : menuCollection
		})
	})
	
	/**
	 * 
	 */
	app.post('/menu', (req, res) => {		
		
		var record = db.insert('menu', req.body);
		
		res.status(200).send({ 
			message:'SUCCESS',
			collection: [record]
		})
		
	});

	app.get('/menu/:id', (req, res) => {
	
		var collection= db.select('menu', {
			'__id': id
		}, {} );

		if(collection.length === 1) {
			return res.status(200).send({
				message : 'menu fetch success',
				collection: collection
			});
		}
		return res.status(404).send({
			message: 'FETCH ERROR'
		});
	});

	app.get('/menu/update/', (req, res) => {
	
		var collection= db.update('menu', req.body);

			return res.status(200).send({
				message : 'menu updated Succesfully',
				collection: collection
			});
		});
	
	app.get('/menu/delete/', (req, res) => {

		var collection= db.delete('menu', req.body);

			return res.status(200).send({
				message : 'menu deleted Succesfully',
				collection: collection
			});
		});
	
}
	
	module.exports	= Apireference;
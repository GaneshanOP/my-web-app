		const express = require('express');
		const mysql = require('mysql');
		const bodyParser = require('body-parser');

		const app = express();
		const PORT = 3000;

		// Configure MySQL connection
		const db = mysql.createConnection({
  			host: 'localhost',
  			user: 'root', // Default user in XAMPP
  			password: '', // Default password in XAMPP
  			database: 'myapp_db',
		});

		// Connect to MySQL
		db.connect((err) => {
  			if (err) {
    				console.error('Database connection failed:', err);
    				return;
  			}
  			console.log('Connected to MySQL database');
		});

		// Middleware
			app.use(bodyParser.urlencoded({ extended: true }));
			app.set('view engine', 'ejs');
			app.use(express.static('public'));

		// Routes
		app.get('/', (req, res) => {
  			res.render('index', { title: 'Home' });
		});

		app.get('/users', (req, res) => {
  			const query = 'SELECT * FROM users';
  			db.query(query, (err, results) => {
    				if (err) throw err;
    				res.render('users', { title: 'Users', users: results });
  			});
		});

		// Start the server
		app.listen(PORT, () => {
  		console.log(`Server running at http://localhost:${PORT}`);
		});
		




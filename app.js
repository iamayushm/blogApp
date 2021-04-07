const express = require('express');
const path = require('path');
const chalk = require('chalk');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { MongoClient } = require('mongodb');

const app = express();

const nav = [{ link: '/posts/new', title: 'Add Post' }];

app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const postRouter = require('./src/routes/postRoutes')(nav);

app.use('/posts', postRouter);

app.get('/', (req, res) => {

    const url = 'mongodb://localhost:27017';
    const dbName = 'blog';
    (async function add() {

        let client;

        try {
            client = await MongoClient.connect(url);
            const db = client.db(dbName);
            const col = db.collection('posts');
            const posts = await col.find().toArray();

            res.render('index', {
                posts,
                nav: [{ link: '/posts/new', title: 'Add Post' }],
                title: "Blog App"
            });

        } catch (err) {
            console.log(err);
        }
        client.close();

    }());

})

app.listen(3000, () => {
    console.log(`listening on port ${chalk.green(3000)} `);
});

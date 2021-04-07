
const { MongoClient, ObjectId } = require('mongodb')



function postController (nav){

    function newPost(req, res){
        res.render('Addpost', {
            title: "Add post",
            nav: nav
        })
    }

    function addPost(req,res){
        const { name,category, content } = req.body;
            const url = 'mongodb://localhost:27017';
            const dbName = 'blog';

            (async function add() {

                let client;

                try {
                    client = await MongoClient.connect(url);
                    const db = client.db(dbName);
                    const col = db.collection('posts');
                    const post = { name, content, category  };
                    const results = await col.insertOne(post);
                    res.redirect('/')

                } catch (err) {
                    console.log(err);
                }
                client.close();

            }());
    }

    function singlePost(req,res){
        const { id } = req.params;
            const url = 'mongodb://localhost:27017';
            const dbName = 'blog';
            (async function single() {
                try {
                    client = await MongoClient.connect(url);
                    const db = client.db(dbName);
                    const col = db.collection('posts')
                    const result = await col.findOne({ _id: new ObjectId(id) });

                    res.render('post', {
                        post: result,
                        title: "Blog app",
                        nav
                    })

                } catch (err) {
                    console.log(err);
                }
                client.close();
            }());
    }

    function singlePostUpdate(req,res){

        const { id } = req.params;
            const { name, category, content } = req.body;
            var newvalues = { $set: { name: name,category: category, content: content } }
            const url = 'mongodb://localhost:27017';
            const dbName = 'blog';
            (async function add() {

                let client;

                try {
                    client = await MongoClient.connect(url);
                    const db = client.db(dbName);
                    const col = db.collection('posts');

                    col.updateOne({ _id: new ObjectId(id) }, newvalues);

                    res.redirect('/')

                } catch (err) {
                    console.log(err);
                }
                client.close();

            }());
    }

    function singlePostDelete(req,res){
        const { id } = req.params;
            const url = 'mongodb://localhost:27017';
            const dbName = 'blog';
            (async function add() {

                let client;

                try {
                    client = await MongoClient.connect(url);
                    const db = client.db(dbName);
                    const col = db.collection('posts');

                    col.deleteOne({ _id: new ObjectId(id) });

                    res.redirect('/')

                } catch (err) {
                    console.log(err);
                }
                client.close();

            }());

    }

    return {newPost, addPost, singlePost, singlePostUpdate, singlePostDelete};


}

module.exports = postController;
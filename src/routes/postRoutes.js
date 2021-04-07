const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const postController = require('../controllers/postController');



postRouter = express.Router();

function router(nav) {

    const {newPost, addPost, singlePost, singlePostUpdate, singlePostDelete} = postController(nav);

    // postRouter.route('/new')
    //     .get((req, res) => {
    //         res.render('Addpost', {
    //             title: "Add post",
    //             nav: nav
    //         })
    //     });

    postRouter.route('/new')
    .get(newPost);

    postRouter.route('/add')
        .post(addPost);

    postRouter.route('/:id')
        .get(singlePost);

    postRouter.route('/:id/update')
        .post(singlePostUpdate);

    postRouter.route('/:id/delete')
        .get(singlePostDelete);





    return postRouter;

}

module.exports = router;
const router = require("express").Router();


router.get("/users",( req, res) =>{
    res.send(`Hello World on users`)
})

// router.get("/users",( req, res) =>{
//     res.send(`Hello World on users`)
// })

router.post("/users",( req, res) =>{
    res.send(`Hello World on users`)
})

router.put("/users",( req, res) =>{
    res.send(`Hello World on users`)
})

router.delete("/users",( req, res) =>{
    res.send(`Hello World on users`)
})

module.exports = router;

// https://www.youtube.com/watch?v=3wzMVj7nxtI&t=   
const express = require("express"),
      router = express.Router();


router.get("/tasks", (req, res) => {
    res.render("todo");
});


module.exports = router;
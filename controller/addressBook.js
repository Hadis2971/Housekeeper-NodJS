const express = require("express"),
      router = express.Router(),
      Contact = require("../model/newContact");


router.get("/addContact", (req, res) => {
    Contact.find({}, (err, data) => {
        if(err) throw err;
        else res.render("addressBook", {contacts: data});
    });
});

router.post("/addContact", (req, res) => {
    let newContact = Contact(req.body).save((err, data) => {
        if(err) throw err;
        else res.json(data);
    });
});

router.put("/addContact", (req, res) => {
    let data = req.body;
    let contact = data.contact;
    let help = data.help;
    Contact.findOneAndUpdate(help, {$set: contact}, (err, back) => {
        if(err) throw err;
        else{
            res.json(back);
        } 
    });
});

router.delete("/addContact", (req, res) => {
    Contact.find(req.body).remove((err, data) => {
        if(err) throw err;
        else res.json(data);
    });
});

module.exports = router;
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/housekeeper", { useNewUrlParser: true });

const contactSchema = new mongoose.Schema({
    name: String,
    last: String,
    home: String,
    mobile: String,
    address: String,
    email: String
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;


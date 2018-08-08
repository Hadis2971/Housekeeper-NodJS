const express = require("express"),
      router = express.Router(),
      path = require("path"),
      mongoose = require("mongoose"),
      crypto = require("crypto"),
      multer = require("multer"),
      GridFsStorage = require("multer-gridfs-storage"),
      Grid = require("gridfs-stream");

      const mongoURI = "mongodb://localhost:27017/housekeeper";

      const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true });
let gfs;
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("uploads");
})

const storage = new GridFsStorage({
url: mongoURI,
file: (req, file) => {
    return new Promise((resolve, reject) => {
    crypto.randomBytes(16, (err, buf) => {
        if (err) {
        return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
        filename: filename,
        bucketName: 'uploads'
        };
        resolve(fileInfo);
    });
    });
}
});
const upload = multer({ storage });

router.get("/images", (req, res) => {
gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
        res.render("imageGallery", {files: false});
    }else{
        res.render("imageGallery", {files: files});
    }
});
});

router.get('/images/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists'
        });
      }
  
      // Check if image
      if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
        // Read output to browser
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      } else {
        res.status(404).json({
          err: 'Not an image'
        });
      }
    });
});

router.post("/images", upload.single("imgUploader"), (req, res) => {
    res.redirect("/gallery/images");
});

router.delete("/images/:id", (req, res) => {
gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
    if (err) {
        return res.status(404).json({ err: err });
    }

    res.redirect('/gallery/images');
    });
});

module.exports = router;
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require("dotenv").config();
const contactsRouter = require('./src/routes/api/contacts');
const authRouter = require("./src/routes/api/auth");
const usersAvatarsRouter = require('./src/routes/api/auth');
const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/avatars');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + ext);
  },
});

const upload = multer({ storage: storage });

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/users", authRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/users/avatars', usersAvatarsRouter);

app.use(express.static('public'));

app.post('/api/upload-avatar', upload.single('avatar'), (req, res) => {
  res.json({ message: 'Avatar uploaded successfully' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server Error" } = err;
  res.status(status).json({ message });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;
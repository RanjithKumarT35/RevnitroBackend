const express = require("express");
const connectToDatabase = require("./database");
const threadRouter = require("./routers/threadRoute");
const notificationRouter = require("./routers/notificationRouter");
const userRouter = require("./routers/userrouter");
const forumRouter = require("./routers/forumRoute");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const imgur = require("imgur");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const fileUpload = require("express-fileupload");
const cors = require("cors");
const app = express();
app.use(fileUpload());
//console.log(process.env.PORT);
const PORT = process.env.PORT || 4000;
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
connectToDatabase();
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json({ limit: "20mb" }));
//app.use(cors({ origin: [], credentials: true }));
app.use(
  cors({
    origin: ["http://localhost:3000"], // || `${process.env.frontUrl}`
    credentials: true,
  })
);
app.use("/uploads", express.static("uploads"));
app.post("/upload", (req, res) => {
  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }

  let sampleFile = req.files.sampleFile;
  let uploadPath = __dirname + "/uploads/" + sampleFile.name;

  sampleFile.mv(uploadPath, function (err) {
    if (err) {
      return res.status(500).send(err);
    }

    // Save the buffer to a temporary file
    fs.writeFileSync(uploadPath, sampleFile.data);

    // Upload to Imgur
    imgur.uploadFile(uploadPath).then((urlObject) => {
      fs.unlinkSync(uploadPath);
      res.send({ link: urlObject.data.link });
    });
  });
});
app.use("/auth", userRouter);
app.use("/threads", threadRouter);
app.use("/notifications", notificationRouter);
app.use("/forum", forumRouter);
app.listen(PORT, () => {
  console.log(`server started on port :${PORT}`);
});

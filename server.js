const express = require("express");
const multer = require("multer");
const upload = multer({ dest: `uploads/` });
const path = require("path");
const { mergepdfs } = require("./merge");
const app = express();
app.use("/static", express.static("public"));
const port = 1000;

// always change the port number to something else because the port numbers in past can't be used anymore due to a bug which isn't solved still now currently used ports are 3000, 9000, 1000 if u use a different port except the used ports then the app will work otherwise it won't work
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, `templates/index.html`));
});

app.post("/merge", upload.array("pdf", 2), async (req, res, next) => {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
  await console.log(req.files);
  let printrandomkey = await mergepdfs(
    path.join(__dirname, req.files[0].path),
    path.join(__dirname, req.files[1].path)
  );
  //   res.send({ data: req.files });
  await res.redirect(`http://localhost:${port}/static/${printrandomkey}.pdf`);
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

const express = require("express");
const app = express();
const router = express.Router(); // Correct usage of Router

let namesArray = [];

router.post("/login", (req, res) => {
  const { name } = req.body;

  if (name) {
    if (namesArray.includes(name)) {
      res.status(400).json({ message: "Name already exists in the array" });
    } else {
      namesArray.push(name);
      res
        .status(200)
        .json({ message: "Name added successfully", names: namesArray });
    }
  } else {
    res.status(400).json({ message: "Name is required" });
  }
});

router.get("/names", (req, res) => {
  res.status(200).json({ names: namesArray });
});

module.exports = router;

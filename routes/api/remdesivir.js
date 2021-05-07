const express = require("express");

const router = express.Router();

// Remdesivir Service Model
const RemdesivirModel = require("../../models/RemdesivirModel");

// @routes GET api/remdesivir
// @desc GET all Remdesivir Service
router.get("/", async (_req, res) => {
  try {
    const remdesivirItems = await RemdesivirModel.find();
    if (!remdesivirItems) throw Error("No items");
    res.status(200).json(remdesivirItems);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes POST api/remdesivir
// @desc create a new Remdesivir Service

router.post("/", async (req, res) => {
  const newRemdesivir = new RemdesivirModel(req.body);
  try {
    const remdesivir = await newRemdesivir.save();
    if (!remdesivir)
      throw Error("An error occured while saving the Remdesivir Service.");
    res.status(200).json(remdesivir);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes DELETE api/remdesivir/:id
// @desc deletes a Remdesivir Service

router.delete("/:id", async (req, res) => {
  try {
    const remdesivir = await RemdesivirModel.findByIdAndDelete(
      req.params.id
    );
    if (!remdesivir) throw Error("No remdesivir service found!");
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes UPDATE api/remdesivir/:id
// @desc update a Remdesivir Service

router.patch("/:id", async (req, res) => {
  try {
    const remdesivir = await RemdesivirModel.findByIdAndUpdate(
      req.params.id, req.body
    );
    if (!remdesivir) throw Error("No remdesivir service found!");
    res.status(200).json({ message: "Updated succesfully!" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes GET api/remdesivir/:id
// @desc GET single Remdesivir Service
router.get("/:id", async (req, res) => {
    try {
      const remdesivir = await RemdesivirModel.findById(req.params.id);
      if (!remdesivir) throw Error("No item");
      res.status(200).json(remdesivir);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });

module.exports = router;

const express = require("express");
const cors = require("cors");

const router = express.Router();

router.use(cors());

// Plasma Donor Service Model
const PlasmaDonorsModel = require("../../models/PlasmaDonorsModel");

// @routes GET api/plasmaDonor
// @desc GET all Plasma Donor Service
router.get("/", (req, res) => {
  var pageNo = parseInt(req.query.pageNo);
  var availability = req.query.availability;
  var size = parseInt(req.query.size);
  var query = {};
  if (pageNo < 0 || pageNo === 0) {
    return res.json({
      status: "error",
      error: "Invalid page number, should start with 1",
    });
  }
  query.skip = size * (pageNo - 1);
  query.limit = size;
  // Find some documents
  if (availability == null) {
    PlasmaDonorsModel.countDocuments({}, function (err, totalCount) {
      if (err) {
        response = {
          status: "error",
          error: "Error fetching data",
        };
      }
      PlasmaDonorsModel.find({}, {}, query, function (err, data) {
        // Mongo command to fetch all data from collection.
        if (err) {
          response = {
            status: "error",
            error: "Error fetching data",
          };
        } else {
          var totalPages = Math.ceil(totalCount / size);
          response = {
            status: "ok",
            data: data,
            pages: totalPages,
            size: data.length,
          };
        }
        res.json(response);
      });
    });
  } else {
    PlasmaDonorsModel.countDocuments(
      { available: availability },
      function (err, totalCount) {
        if (err) {
          response = {
            status: "error",
            error: "Error fetching data",
          };
        }
        PlasmaDonorsModel.find(
          { available: availability },
          {},
          query,
          function (err, data) {
            // Mongo command to fetch all data from collection.
            if (err) {
              response = {
                status: "error",
                error: "Error fetching data",
              };
            } else {
              var totalPages = Math.ceil(totalCount / size);
              response = {
                status: "ok",
                data: data,
                pages: totalPages,
                size: data.length,
              };
            }
            res.json(response);
          }
        );
      }
    );
  }
});

// @routes POST api/plasmaDonor
// @desc create a new Plasma Donor Service

router.post("/", async (req, res) => {
  const newPlasma = new PlasmaDonorsModel(req.body);
  try {
    const plasmaDonor = await newPlasma.save();
    if (!plasmaDonor)
      throw Error("An error occured while saving the Plasma Donor Service.");
    res.status(200).json(plasmaDonor);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes DELETE api/plasmaDonor/:id
// @desc deletes a Plasma Donor Service

router.delete("/:id", async (req, res) => {
  try {
    const plasmaDonor = await PlasmaDonorsModel.findByIdAndDelete(
      req.params.id
    );
    if (!plasmaDonor) throw Error("No plasmaDonor service found!");
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes UPDATE api/plasmaDonor/:id
// @desc update a Plasma Donor Service

router.patch("/:id", async (req, res) => {
  try {
    const plasmaDonor = await PlasmaDonorsModel.findByIdAndUpdate(
      req.params.id, req.body
    );
    if (!plasmaDonor) throw Error("No plasmaDonor service found!");
    res.status(200).json({ message: "Updated succesfully!" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @routes GET api/plasmaDonor/:id
// @desc GET single Plasma Donor Service
router.get("/:id", async (req, res) => {
    try {
      const plasmaDonor = await PlasmaDonorsModel.findById(req.params.id);
      if (!plasmaDonor) throw Error("No item");
      res.status(200).json(plasmaDonor);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });

module.exports = router;

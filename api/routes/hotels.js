import express from 'express'
import Hotel from '../models/Hotel.js';

const router = express.Router();


//Create
router.post("/", async (req, res) => {
    const newHotel = new Hotel(req.body)
    try {
        const saveHotel = await newHotel.save()
        res.status(200).json(saveHotel);

    } catch (err) {
        res.status(500).json(err);
    }
});

//update
router.put("/:id", async (req, res) => {
    try {
        const UpdateHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(UpdateHotel);

    } catch (err) {
        res.status(500).json(err);
    }
});

//delete
router.delete("/:id", async (req, res) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Delete Successfull");

    } catch (err) {
        res.status(500).json(err);
    }
});

//get
router.get("/:id", async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel);

    } catch (err) {
        // res.status(500).json(err);
        next(err);
    }
});

//get all
router.get("/", async (req, res, next) => {

    const failed = true;
    const err = new Error();
    err.status = 404
    err.message = "sorry not found";
    if (failed) return next(err);

    try {
        const hotels = await Hotel.findById("sass")
        res.status(200).json(hotels);

    } catch (err) {
        next(err);
    }
});

export default router;

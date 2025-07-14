import express from 'express'
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom, updateRoomAvailability } from '../controllers/rooms.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

//Create
router.post("/:hotelId", verifyAdmin, createRoom);

//update
router.put("/:id", verifyAdmin, updateRoom);
router.put("/availability/:id", updateRoomAvailability);

//delete
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom);

//get
router.get("/:id", getRoom);

//get all
router.get("/", getRooms);

export default router;

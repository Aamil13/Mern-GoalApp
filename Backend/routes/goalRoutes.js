const express = require("express");
const router = express.Router();
const {getticketCon,postticketCon,putticketCon,deleteticketCon} = require("../ticketControllers/TicketController")
const {protect} = require("../middleware/authMiddleware") 

router.route("/").get(protect,getticketCon).post(protect,postticketCon)

router.route("/:id").put(protect,putticketCon).delete(protect,deleteticketCon)



module.exports=router;
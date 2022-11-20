    const asyncHandler = require('express-async-handler')
    const ticketSchema = require('../modal/TicketModel')
    const User = require("../modal//userModel")
    

// read 
const getticketCon= asyncHandler( async(req,res)=>{
    const ticket = await ticketSchema.find({user: req.user.id})
    res.status(200).json(ticket);
})

// create
const postticketCon= asyncHandler( async(req,res)=>{
    if(!req.body.text){
        res.status(400)
        throw new Error('Empty text field')
    }

    const ticket = await ticketSchema.create({
       text:  req.body.text,
       user: req.user.id
})
    res.status(200).json(ticket);
})


//update
const putticketCon= asyncHandler( async(req,res)=>{

    const ticket = await ticketSchema.findById(req.params.id)

    if(!ticket){
        res.status(400)
        throw new Error("Ticket Not Found")
    }

    

    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("User not authorized")
    }

    const updatedTicket = await ticketSchema.findByIdAndUpdate(req.params.id,req.body,{new: true, })
    res.status(200).json(updatedTicket);
})

const deleteticketCon= asyncHandler( async(req,res)=>{

    const ticket = await ticketSchema.findById(req.params.id)

    if(!ticket){
        res.status(400)
        throw new Error("Ticket Not Found")
    }

    

    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("User not authorized")
    }

     await ticket.remove()

    res.status(200).json({id:req.params.id});
})


module.exports ={
    getticketCon,
    postticketCon,
    putticketCon,
    deleteticketCon,
}


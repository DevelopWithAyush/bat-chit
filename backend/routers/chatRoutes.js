const express = require("express")
const fetchuser = require("../middleware/authMiddleware")
const User = require("../Models/UserModel")
const Chat = require("../Models/ChatModel")
const router = express.Router()

// here we are just checking and make a chat to user on which we click 
// Route to handle creating or fetching a chat between two users
router.post("/", fetchuser, async (req, res) => {
    try {
        // Extracting userId from the request body
        const { userId } = req.body;

        // Check if userId is present in the request body
        if (!userId) {
            console.log("userId param not sent with the request");
        }

        // Check if a chat already exists between the two users
        let isChat = await Chat.find({
            isGroupChat: false,
            $and: [
                { users: { $elemMatch: { $eq: req.user.id } } },
                { users: { $elemMatch: { $eq: userId } } },
            ],
        }).populate("users", "-password").populate("latestMessage");

        // Populate the sender's information for the latest message
        isChat = await User.populate(isChat, {
            path: "latestMessage.sender",
            select: "userName pic email"
        });

        // If a chat exists, send the chat details
        if (isChat.length > 0) {
            res.send(isChat[0]);
        } else {
            // If no chat exists, create a new chat
            const chatData = {
                chatName: "sender",
                isGroupChat: false,
                users: [req.user.id, userId]
            };

            // Create the new chat
            const createChat = await Chat.create(chatData);

            // Fetch the full chat details with user information
            const fullChat = await Chat.findOne({ _id: createChat._id }).populate("users", "-password");

            // Send the full chat details in the response
            res.status(200).send(fullChat);
        }
    } catch (error) {
        // Handle errors and send an appropriate response
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to fetch all chats where the logged-in user is added
router.get("/", fetchuser, async (req, res) => {
    try {
        // Find all chats where the logged-in user is added, populate user, groupAdmin, and latestMessage
        let allChat = await Chat.find({ users: { $elemMatch: { $eq: req.user.id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 });

        // Populate the sender's information for the latest message
        allChat = await User.populate(allChat, {
            path: "latestMessage.sender",
            select: "userName pic email"
        });

        // Send the array of chats in the response
        res.send(allChat);
    } catch (error) {
        // Handle errors and send an appropriate response
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post("/group", fetchuser, async (req, res) => {
    const {name,users} = req.body
if(!name || !users){
    return res.status(400).send({message:"please fill all the fields"})
}
var groupusers =JSON.parse(users);
if(groupusers.length<2){
    return res.status(400).send("more then 2 user are required to form a group chat");
}
if(groupusers.length>2){
     
}

})
router.put("/rename", fetchuser, async (req, res) => {


})
router.put("/groupremove", fetchuser, async (req, res) => {


})
router.put("/groupadd", fetchuser, async (req, res) => {


})

module.exports = router
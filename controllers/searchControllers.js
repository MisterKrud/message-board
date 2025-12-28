const db = require('../db/queries')


//This needs thinking through
const getAllMessagePosts = async(req, res) => {
    const results = await db.getAllMessagePosts();
    console.log("Messages", results)
    res.render("index", {
        title: "Message-board",
        results: results,

    })
} 

const searchMessages = async(req, res, next)=>{
    const queryText = req.query.messagesearch
   const results = await db.searchMessages(queryText)
    console.log(results);
    res.render("messageSearchResults", {
        title: "Message search results",
        results: results,
        queryText,
    })
   

}

const searchUsers = async(req, res)=> {
    const results = await db.searchUsers(req.query.usersearch)
    console.log(results)
    res.render("userSearchResults", {
        title: "User search results",
        results: results,
    })
}

module.exports = {
    searchUsers,
    searchMessages,
    getAllMessagePosts
}


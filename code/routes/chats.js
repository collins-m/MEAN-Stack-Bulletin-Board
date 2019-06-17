const express = require('express');
const passport = require('passport');

const Chat = require('../models/chat');
const Message = require('../models/message');

const router = express.Router();

// view messages
router.get('/', passport.authenticate('jwt', {session:false}), getChats);

// retrieve single chat
router.get('/:chatId', passport.authenticate('jwt', {session:false}), getChat);

// reply
router.post('/:chatId', passport.authenticate('jwt', {session:false}), sendReply);

// start new chat
router.post('/new/:recipient', passport.authenticate('jwt', {session:false}), newChat);

function getChats (req, res, next){
    // snippet
    Chat.find({ participants: req.user._id })
        .select('_id')
        .exec(function(err, chats) {
            if(err){
                throw err;
            }

            // hold chats and snippet
            if(chats.length===0){
                return res.status(200).json({
                    message: "No conversations yet"
                });
            }
            let fullChats = [];
            chats.forEach(function(chat){
                Message.find({ 'chatId': chat._id })
                    .sort('-createdAt')
                    .limit(1)
                    .populate({
                        path: "author",
                        select: "user.username"
                    })
                    .exec(function(err, message){
                        if(err){
                            throw err;
                        }
                        fullChats.push(message);
                        if(fullChats.length === chats.length){
                            return res.status(200).json({ chats: fullChats });
                        }
                    });
            });
        });
}

function getChat(req, res, next){
    Message.find({ chatId: req.params.chatId })
        .select('createdAt body author')
        .populate({
            path: 'author',
            select: 'user.username'
        })
        .exec(function(err, messages){
            if(err){
                throw err;
            }
            res.status(200).json({ chat: messages });
        });
}

function newChat(req, res, next){
    if(!req.params.recipient){
        res.status(422).send({ error: 'Please choose a valid recipient for your message' });
        return next();
    }

    if(!req.body.composedMessage){
        res.status(422).send({ error: 'Please enter a message.' });
        return next();
    }

    const chat = new Chat({
        participants: [req.user._id, req.params.recipient]
    });

    chat.save(function(err, newChat){
        if (err) {
            throw err;
        }
    
        const message = new Message({
          chatId: newChat._id,
          body: req.body.composedMessage,
          author: req.user._id
        });
    
        message.save(function(err, newMessage){
          if (err) {
              throw err;
          }

          res.status(200).json({
              message: 'Chat started!',
              chatId: chat._id
          });
          return next();
        });
    });
}

function sendReply(req, res, next) {  
    const reply = new Message({
      chatId: req.params.chatId,
      body: req.body.composedMessage,
      author: req.user._id
    });
  
    reply.save(function(err, sentReply) {
      if (err) {
          throw err;
      }
  
      res.status(200).json({ message: 'Reply successfully sent!' });
      return(next);
    });
  }

module.exports = router;
const express = require('express');
const app = express();
const session = require('express-session');
const {userstatusonconnect,userstatusondisconnect} = require('./utils/user');
const {unreadmessage,messagesave, chatmessage,messagereview} = require('./utils/messages');
const http = require('http');
const server = http.createServer(app);
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
app.use(cors());
const io = require('socket.io')(server, {
    cors: {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST"],

    },
    maxHttpBufferSize: 1e8
});

const passport = require('passport');
require('./configration/passport')(passport);
const flash = require('connect-flash');
require('dotenv').config();
require('./database/db');

const router = require('./routes/userauth')
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: '45623saif',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV, // Set to true in production
        httpOnly: true
    }

}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.use('/', router)
server.listen('4000', (err) => {

    if (err) throw err;


    console.log('listent to port 4000')

})
const uploadDir = path.join(__dirname, 'public/uploads');

// socket chat 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {

        cb(null, path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage }).array('files');
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).send(req.files);
    });
});

io.on('connection', async (socket) => {

    //on login user its status set to online 
    socket.on('userinfo', async (userid) => {

       try {

                await userstatusonconnect(userid,socket.id,userstatus='online');
                
                await unreadmessage();

            }
       
            catch (error) {

            console.log(error)
        }



    })



    socket.on('chatMessage', async ({ senderId, receiverId, content, contenttype }) => {

        try {

            await messagesave(senderId, receiverId, content, contenttype);

            
            //chat messages
            const allmessages = await chatmessage(senderId,receiverId);

            io.emit('chatMessage', allmessages);

            
            //user last messages
            
            const userlastchat =  await unreadmessage();

            io.emit('userlastchat', userlastchat);

        } catch (err) {
            console.error('Error sending message:', err);
        }
    });
    
    socket.on('file', async (data) => {


        try {
            const fileSavePromises = data.files.map(async (file) => {
                const buffer = Buffer.from(file.data.split(',')[1], 'base64');
                const filePath = path.join(uploadDir, file.name);

                await fs.promises.writeFile(filePath, buffer);
                console.log('File saved:', filePath);
                return file.name;  // Return the filename
            });

            const filenames = await Promise.all(fileSavePromises);


            await messagesave(data.senderId, data.receiverId,filenames, data.contenttype);
            
            
            const allmessages = await chatmessage(data.senderId,data.receiverId)

            io.emit('chatMessage', allmessages);
            
           
        } catch (error) {
            console.error('Error:', error);
        }


    })


    socket.on('msgreview', async (data) => {
       
        const{senderid,receiverid} = data

        try {
       
            await messagereview(senderid,receiverid)
            
            
            
     const allmessages = await chatmessage(senderid,receiverid);

     io.emit('chatMessage', allmessages);
        
       
     //user last messages
            
     const userlastchat =  await unreadmessage();

     io.emit('userlastchat', userlastchat);
        
    } catch (error) {
            console.log(error);
        }
    });
    
    



    socket.on('disconnect', async () => {

        try {

          await userstatusondisconnect(socket.id,userdatatus='offline')

         } catch (err) {
            console.error('Error sending message:', err);
        }
    });

});






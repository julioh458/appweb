const express = require('express');
const cookieParser = require('cookie-parser')

// Google Auth
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '972292004086-4m3cpi1gvnn9fijf1ft9ot2cipkoa2hq.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID);

const router = express.Router();


router.get('/', (req, res)=>{
    res.render('../api/views/index')
})

router.get('/login', (req,res)=>{
    res.render('../api/views/login');
})

router.post('/login', (req,res)=>{
    let token = req.body.token;

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
      }
      verify()
      .then(()=>{
          res.cookie('session-token', token);
          res.send('success')
      })
      .catch(console.error);

})

router.get('/inicio', checkAuthenticated, (req, res)=>{
    let user = req.user;
    res.render('../api/views/inicio', {user});
})

router.get('/biblioteca', checkAuthenticated, (req,res)=>{
    let user = req.user;
    res.render('../api/views/biblioteca', {user});
})

router.get('/bibliotecabuscar', checkAuthenticated, (req,res)=>{
    let user = req.user;
    res.render('../api/views/bibliotecabuscar', {user});
})

router.get('/materialbiblioteca', checkAuthenticated, (req,res)=>{
    let user = req.user;
    res.render('../api/views/MaterialBiblioteca', {user});
})

router.get('/laboratorios', checkAuthenticated, (req,res)=>{
    let user = req.user;
    res.render('../api/views/laboratorios', {user});
})

router.get('/laboratoriosbuscar', checkAuthenticated, (req,res)=>{
    let user = req.user;
    res.render('../api/views/laboratoriosbuscar', {user});
})

router.get('/materiallaboratorios', checkAuthenticated, (req,res)=>{
    let user = req.user;
    res.render('../api/views/MaterialLaboratorios', {user});
})

router.get('/labs', checkAuthenticated, (req,res)=>{
    let user = req.user;
    res.render('../api/views/labs', {user});
})

router.get('/materiallabs', checkAuthenticated, (req,res)=>{
    let user = req.user;
    res.render('../api/views/MaterialLabs', {user});
})

router.get('/guias', checkAuthenticated, (req,res)=>{
    let user = req.user;
    res.render('../api/views/guias', {user});
})

router.get('/materialguias', checkAuthenticated, (req,res)=>{
    let user = req.user;
    res.render('../api/views/MaterialGuias', {user});
})

router.get('/contacto', checkAuthenticated, (req,res)=>{
    let user = req.user;
    res.render('../api/views/contacto', {user});
})

router.get('/logout', (req, res)=>{
    res.clearCookie('session-token');
    res.redirect('/')

})


function checkAuthenticated(req, res, next){

    let token = req.cookies['session-token'];

    let user = {};
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        user.name = payload.name;
        user.email = payload.email;
        user.picture = payload.picture;
      }
      verify()
      .then(()=>{
          req.user = user;
          next();
      })
      .catch(err=>{
          res.redirect('/')
      })

}

module.exports = router;

/*
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})
*/
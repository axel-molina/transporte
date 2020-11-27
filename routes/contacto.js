var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET contacto page. */
router.get('/', function(req, res, next) {
  res.render('contacto',{
    isContacto:true
  });
});

router.post('/', async (req, res, next) =>{
  
  //console.log(req.body); //ver si me estoy trayendo los datos del mail
  var nombre = req.body.nombre;
  var email = req.body.email;
  var tel = req.body.telefono;
  var mensaje = req.body.comentarios;

  var obj = {
    to:'ivanmolina052@gmail.com',
    subject:'Contacto desde la web',
    html: nombre + " se contactó a traves de la web y quiere mas info a este correo " + email + " Ademas hizo el siguiente comentario: " + mensaje + " y su tel es " + tel
  }

  var transporter = nodemailer.createTransport({
    host:process.env.SMTP_HOST,
    port:process.env.SMTP_PORT,
    auth:{
      user:process.env.SMTP_USER,
      pass:process.env.SMTP_PASS
    }    
  })

  var info = await transporter.sendMail(obj);

  res.render('contacto', {
    message: 'Mensaje enviado correctamente',
    isContacto: true
  });

});

module.exports = router;

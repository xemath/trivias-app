const dotenv = require('dotenv').config();
const { urlencoded, query } = require('express');
const express = require('express');
const app = express();
const mysql = require('mysql');
const session = require('express-session')
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}))
app.use(express.json())

const PORT  = process.env.PORT || 3000;

app.use(session({
    secret:'myllavesecreta',
    resave:false,
    saveUninitialized:false,
    
}));


const conexion = mysql.createPool({
    host : process.env.DB_HOST,
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database :process.env.DB_NAME
})

/*conexion.connect((error)=>{
    if(error) throw error;
    console.log('conectado a bd');
})
*/

var mensaje = '';
function setMensaje(alerta){
    
    mensaje = alerta;
}

app.get('/preguntas',(req,res)=>{
    if(req.session.elUsuario){
        usuario = req.session.elUsuario;
        delete req.session.elUsuario;
        res.render('indexaa', {usuario});
    }
    else{
        res.redirect('/');
    }
    
    
})


app.post('/',(req,res)=>{
    console.log(req.body)
    let id;
    let nickname = req.body.nickname;
    let puntaje = req.body.puntaje;
    let tiempo = req.body.tiempo;
    let queryBuscarId = "SELECT * FROM `usuarios` WHERE `nickname` LIKE '"+`${nickname}`+"' ORDER BY `ID` ASC";
    conexion.query(queryBuscarId, (error, results)=>{
        if (error) throw error;
            id = results[0].ID;
            queryInsertPuntajes = "INSERT INTO `puntajes` (`usuarioid`, `puntaje`, `tiempo`) VALUES ('"+`${id}`+"', '"+`${puntaje}`+"', '"+`${tiempo}`+"');"

            conexion.query(queryInsertPuntajes, (err,resultados)=>{
                if(err) throw err;
                console.log(resultados);
            })
        
    })
    
    res.redirect('/resultados')

}) 
app.get('/crear',(req,res)=>{
    res.render('index');
})



app.get('/',(req,res)=>{
    if(mensaje!=''){
        res.render('inicio',{mensaje:mensaje});
    }
    else{
        res.render('inicio',{mensaje:''});
    }
    
})

app.post('/prueba',(req,res)=>{
    console.log(req.body);
})

app.get('/resultados',async(req,res)=>{
    let query = 'SELECT nickname FROM usuarios WHERE ID = ?'
    let queryUsuario = 'SELECT * FROM puntajes'
    var tablaResultados = [];
    let arrayOrdenado=[];
    let arrayOrdenado2=[];
    let usuariosInfo;
    conexion.query(queryUsuario,(error, results)=>{
        if(error) throw error;
        arrayOrdenado = results.sort((prev,next)=>{
            return prev.tiempo.split(':')[0]-next.tiempo.split(':')[0]
        });
        
        arrayOrdenado2 = arrayOrdenado.sort((prev,next)=>{
            return next.puntaje-prev.puntaje
        });
        //console.log(arrayOrdenado2);
        conexion.query('SELECT * FROM usuarios',async(error,resuls)=>{
            if(error) throw error;
            usuariosInfo = resuls;
            //console.log(arrayOrdenado2)
            //console.log(usuariosInfo[0].nickname)

            for(let i = 0; i<arrayOrdenado2.length; i++){
                objeto =  usuariosInfo.find(e=>{
                    //console.log(` error ${arrayOrdenado2[i].usuarioid}`)
                    return e.ID===arrayOrdenado2[i].usuarioid;
                    
                })
                //console.log(objeto.nickname)
                arrayOrdenado2[i].usuarioid = objeto.nickname;
                
            }
            console.log(arrayOrdenado2)
            
            

            res.render('resultados', {resultado:arrayOrdenado2});
        })
    })
    
    
    
    
    
    
})



app.post('/registrarse',(req,res)=>{
    console.log(req.body);
    nickname = req.body.nickname;
    contrasenaUno = req.body.contrasenaUno;
    contrasenaDos = req.body.contrasenaDos;

    myquery = "SELECT * FROM `usuarios` WHERE `nickname` LIKE "+`'${nickname}'`+" ORDER BY `ID` ASC"
    queryInsert = "INSERT INTO `usuarios` (`ID`, `nickname`, `contraseña`) VALUES (NULL, '"+`${nickname}`+"', '"+`${contrasenaUno}`+"');"
    conexion.query(myquery,(error,results)=>{
        if(error) throw error;
        if(results.length>0){
            setMensaje('El usuario ya existe');
            res.redirect('/')
            
        }
        else{
            if(contrasenaUno==contrasenaDos){
                conexion.query(queryInsert,(error,results)=>{
                    if(error) throw error;
                    console.log('enviados correctamente')
                    setMensaje('Su registro ha sido exitoso');
                    res.redirect('/')
                    
                })
                
            }
            else{
                setMensaje('las contraseñas no coinciden');
                res.redirect('/')
                console.log('las contraseñas no coinciden')
            }
        }
    })
    
    //res.redirect('/inicio')
})


app.post('/login',(req,res)=>{
    console.log('si envia datos')
    console.log(req.body);
    nickname = req.body.nickname;
    console.log(nickname);
    laquery = "SELECT * FROM `usuarios` WHERE `nickname` LIKE "+`'${nickname}'`+" ORDER BY `ID` ASC"
    conexion.query(laquery,(error,resultados)=>{
        if(error) throw error;
        //console.log(resultados[0].contraseña)
        if(resultados.length>0){
            if(req.body.contrasena == resultados[0].contraseña){
                console.log('logueado')
                req.session.elUsuario = req.body.nickname;
                res.redirect('/preguntas')
                
            }
            else{
                setMensaje('Contraseña o usuario incorrecta');
                res.redirect('/')
                 
            }
        }
        else{
            setMensaje('Contraseña o usuario incorrecta');
            res.redirect('/')
            console.log('usuario no existe')
            
        }
        
    })

})



app.listen(PORT, ()=>{
    console.log('funcionando...');
})
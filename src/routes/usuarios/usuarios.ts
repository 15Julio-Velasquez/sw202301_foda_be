import { IUsuarios, usuarios } from '@libs/usuarios/usuarios';
import express from 'express';
const router = express.Router();

const UsuarioModel = new usuarios();

UsuarioModel.add({
    codigo: '',
    correo: 'ja_velasqueza@unicah.edu', 
    nombre: 'Julio Alberto Velasquez Alvarez',
    password: 'UNICAH2023' 
});

//Registrar los endpoint en router
//http://localhost:3001/usuarios
router.get('/', (_req, res)=>{
    const jsonUrls = {
        "getAll":{"method":"get","url":"usuarios/all"},
        "getById":{"method":"get","url":"usuarios/byid/:id"},
        "new":{"method":"post","url":"usuarios/new"},
        "update":{"method":"put","url":"usuarios/upd/:id"},
        "delete":{"method":"delete","url":"usuarios/del/:id"}
    }
    res.status(200).json(jsonUrls);
});

router.get('/all',(_req,res)=>{
    res.status(200).json(UsuarioModel.getAll());
});

router.post('/new',(req, res)=>{
    console.log("Usuarios /new request body: ", req.body);

    const {
        correo = "ja_velasqueza@unicah.edu",
        nombre = "Julio Alberto Velasquez Alvarez",
        password = "UNICAH2023"

    } = req.body;

    const newUsuario: IUsuarios = {
        codigo: "",
        correo,
        nombre,
        password
    }

    if(UsuarioModel.add(newUsuario)){
        res.status(200).json({"Created":true});
    }
    return res.status(404).json({"Error":"Error al Agregar una nueva empresa"});
});

router.put('/upd/:id',(req,res)=>{
    const {id} = req.params;

    const {
        correo = "ja_velasqueza@unicah.edu",
        nombre = "Julio Alberto Velasquez Alvarez",
        password = "UNICAH2023",
        roles = [],
        observacion = ""

    } = req.body;

    const updateUsuario:IUsuarios={
        codigo: id,
        correo,
        nombre,
        password,
        roles,
        observacion
    }

    if(UsuarioModel.update(updateUsuario)){
        return res.status(200).json({"update":true});
    }
    return res.status(404).json({"Error":"Error al Actualizar Usuarios"});
});

router.delete('/del/:id', (req,res)=>{
    const {id : codigo} = req.params;

    if(codigo){
        if(UsuarioModel.delete(codigo)){
            return res.status(200).json({"Deleted":true});
        }
    }

    return res.status(404).json({"error":"No se pudo eliminar Usuario"});
});

router.get('/byid/:id',(req,res)=>{
    const {id:codigo}=req.params;
    const usuario = UsuarioModel.getById(codigo);
    if(usuario){
        return res.status(200).json(usuario);
    }
    return res.status(404).json({"error":"No se encontró el usuario"});
})

export default router;
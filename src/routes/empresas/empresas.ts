/* eslint-disable no-irregular-whitespace */
import express from 'express';
const router = express.Router();
import { EmpresasDao } from '@dao/models/Empresas/EmpresasDao';
import { MongoDBConn } from '@dao/MongoDBConn';
import { IEmpresas } from '@dao/models/Empresas/IEmpresas';
import { Empresas } from '@libs/Empresas/Empresas';
const empresaDao = new EmpresasDao(MongoDBConn);
let empresaModel:Empresas;
empresaDao.init().then(()=>{
  empresaModel = new Empresas(empresaDao);
});

//registrar los endpoint en router
//http://localhost:3001/empresas
router.get('/', (_req, res)=>{
  const jsonUrls = {
    "getAll": {"method":"get", "url": "empresas/all"},
    "getById": {"method":"get", "url": "empresas/byid/:id"},
    "new": {"method":"post", "url": "empresas/new"},
    "update": {"method":"put", "url": "empresas/upd/:id"},
    "delete": {"method":"delete", "url": "empresas/del/:id"},
  };
  res.status(200).json(jsonUrls);
});

router.get('/all', async (_req, res) => {
  res.status(200).json(await empresaModel.getAll());
});

router.get('/byid/:id', async (req, res)=>{
  const {id: codigo} = req.params;
  const empresa = await empresaModel.getById(codigo);
  if(empresa){
    return res.status(200).json(empresa);
  }
  return res.status(404).json({"error":"No se encontró Empresa"});
});

router.post('/new', async (req, res) => {
  console.log("Empresas /new request body:", req.body);
  const {
    codigo = "NA",
    nombre ="John Doe Corp",
    status = "Activo"
  } = req.body;
  //TODO: Validar Entrada de datos
  const newEmpresa: IEmpresas = {
    codigo,
    nombre,
    status
  };
  if (await empresaModel.add(newEmpresa)) {
    return res.status(200).json({"created": true});
  }
  return res.status(404).json(
    {"error": "Error al agregar una nueva Empresa"}
  );
});

router.put('/upd/:id', async (req, res) => {
  const { id } = req.params;
  const {
    nombre="----NotRecieved------",
    status="----NotRecieved------",
    observacion = "",
    codigo = "",
  } = req.body;

  if (
    nombre === "----NotRecieved------"
    || status === "----NotRecieved------"
  ) {
    return res.status(403).json({"error":"Debe venir el nombre y status correctos"});
  }
  const UpdateEmpresa : IEmpresas = {
    codigo,
    nombre,
    status,
    observacion
  };

  if (await empresaModel.update(id, UpdateEmpresa)) {
    return res
      .status(200)
      .json({"updated": true});
  }
  return res
    .status(404)
    .json(
      {
        "error": "Error al actualizar Empresa"
      }
    );
});

router.delete('/del/:id', async (req, res)=>{
  const {id } = req.params;
  if(await empresaModel.delete(id)){
    return res.status(200).json({"deleted": true});
  }
  return res.status(404).json({"error":"No se pudo eliminar Empresa"});
});
/*
router.get('/', function(_req, res){

});
 */

export default router;

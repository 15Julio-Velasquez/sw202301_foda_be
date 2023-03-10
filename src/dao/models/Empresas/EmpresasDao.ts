import { MongoDAOBase } from "@dao/MongoDAOBase";
import { IDBConnection } from "@server/dao/IDBConnection";
import { IEmpresas } from "./IEmpresas";

export class EmpresasDao extends MongoDAOBase<IEmpresas>{
  constructor(conexion: IDBConnection){
      super("empresas", conexion);
  }
}
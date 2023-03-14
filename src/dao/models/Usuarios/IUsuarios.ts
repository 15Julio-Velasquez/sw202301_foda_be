export interface IUsuarios{
    codigo: string;
    correo: string;
    nombre: string;
    password: string;
    roles: string[];
    created?: Date;
    lastacces?: Date;
}
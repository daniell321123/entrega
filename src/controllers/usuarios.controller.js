import { Usuario } from '../entidades/Usuario.js'
import { usuariosManager } from '../managers/usuarios.manager.js'
import { criptografiador } from '../utils/criptografia.js'

export async function postUsuariosController(req, res, next) {
    const datosUsuario = req.body

    try {
        datosUsuario.password = criptografiador.hashear(datosUsuario.password)
        const usuario = new Usuario(datosUsuario)
        const usuarioGuardado = await usuariosManager.guardar(usuario.datos())

        const token = criptografiador.generarToken(usuarioGuardado)
        res.cookie('authToken', token, { httpOnly: true, signed: true, maxAge: 1000 * 60 * 60 * 24 })

        req['io'].sockets.emit('usuarios', await usuariosManager.obtenerTodos())

        res.status(201).json(usuarioGuardado)
    } catch (error) {
        next(error)
    }
}
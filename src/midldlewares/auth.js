import { criptografiador } from '../utils/criptografia.js'


export function extraerCredenciales(req, res, next) {
  try {
    const token = req.signedCookies.authToken
    const datosUsuario = criptografiador.decodificarToken(token)
    req.usuario = datosUsuario
  } catch (error) { }
  next()
}


export function soloAutenticados(req, res, next) {
  if (!req.usuario) {
    return next(new Error('AUTHORIZATION ERROR'))
  }
  next()
}
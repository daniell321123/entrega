import { Router } from 'express'
import { videojuegosRouter } from './videojuegos.router.js'
import { usuariosRouter } from './usuarios.router.js'
import { sesionesRouter } from './sesiones.router.js'

export const routerApi = Router()

routerApi.use('/videojuegos', videojuegosRouter)
routerApi.use('/usuarios', usuariosRouter)
routerApi.use('/sesiones', sesionesRouter)

routerApi.use((error, req, res, next) => {
  if (error.message === 'AUTHENTICATION ERROR') {
    return res.sendStatus(401)
  }
  next(error)
})
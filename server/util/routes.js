const Router = require('express')
const persons = require('@controllers/personController')

const router = Router()

router.get('/health', (_, res) => {
  res.send('ok')
})

router.get('/persons/info', persons.info)
router.get('/persons', persons.getAll)
router.get('/persons/:id', persons.getOne)
router.post('/persons', persons.create)
router.delete('/persons/:id', persons.remove)

module.exports = router

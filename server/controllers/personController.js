const Person = require('../models/person')

const info = (req, res, next) => {
  res.set('Content-Type', 'text/html')
  Person.find({})
    .then((persons) => {
      if (persons) {
        res
          .status(200)
          .send(
            `Phonebook has info for ${persons.length} people <p>${Date()}</p>`,
          )
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
}

const getAll = (req, res, next) => {
  Person.find({})
    .then((persons) => {
      if (persons) {
        res.json(persons)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
}

const getOne = (req, res, next) => {
  const { id } = req.params

  Person.findById(id)
    .then((person) => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
}

const update = (req, res, next) => {
  const { id } = req.params
  const { body } = req

  const updatedPerson = {
    name: body.name,
    number: body.number,
    date: body.date,
  }

  Person.findByIdAndUpdate(id, updatedPerson, { new: true })
    .then((person) => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
}

const remove = (req, res, next) => {
  const { id } = req.params
  Person.findByIdAndRemove(id)
    .then(() => res.status(204).end())
    .catch((error) => next(error))
}

const create = (req, res, next) => {
  const { body } = req

  if (!body.name || !body.number) {
    const paramName = !body.name ? 'name' : 'number'
    return res.status(400).json({
      error: `${paramName} missing`,
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
    date: Date(),
  })

  person
    .save()
    .then((p) => {
      console.log('contact saved!')
      res.json(p)
    })
    .catch((error) => {
      next(error)
    })

  return person
}

module.exports = {
  info,
  getAll,
  getOne,
  update,
  create,
  remove,
}

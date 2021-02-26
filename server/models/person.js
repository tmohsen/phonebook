const mongoose = require('mongoose')
const process = require('process')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

// Define your schema as normal.
const personSchema = mongoose.Schema({
  name: {
    type: String, required: true, unique: true, minLength: 3,
  },
  number: { type: String, index: true, minLength: 8 },
  date: { type: Date, required: true },
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  /* eslint-disable */
  // As represented in part3
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
  /* eslint-enable */
})

module.exports = mongoose.model('Persons', personSchema)

const express = require('express')

const app = express()
app.use(express.json())

let persons = [
  { 
    "name": "Arto Hellas", 
    "number": "040-123456",
    "id": 1
  },
  { 
    "name": "Ada Lovelace", 
    "number": "39-44-5323523",
    "id": 2
  },
  { 
    "name": "Dan Abramov", 
    "number": "12-43-234345",
    "id": 3
  },
  { 
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122",
    "id": 4
  }
]

app.get('/info', (req, res) => {
  res.status(200).end(
    `Phonebook has info for ${persons.length} people<br><br>${new Date()}`
  )
})

app.get('/api/persons', (req, res) => {
    res.status(200).json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const person = persons.find(x => x.id === Number(req.params.id))
  if (person) {
    res.status(200).json(person)
  } else
  res.status(404).end(`No number with id ${req.params.id}`)
})

app.post('/api/persons', (req, res) => {
  const newPerson = req.body
  if (newPerson.name && newPerson.number) {
    const personExists = persons.find(x => x.name === newPerson.name)
    
    if (!personExists) {
      newPerson.id = Math.floor(10000 * Math.random())
      persons = persons.concat(newPerson)
      return res.status(200).json(newPerson)
    }
    
    return res.status(400).json({
      error: "Name exists."
    })
  }
  res.status(400).json({
    error: "Content (name or number) missing."
  })
})

app.delete('/api/persons/:id', (req, res) => {
  persons = persons.filter(x => x.id !== Number(req.params.id))
  res.status(200).end("done")
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
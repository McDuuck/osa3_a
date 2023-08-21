const express = require('express')
const app = express()
const morgan = require('morgan')

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    },
    {
        id: 5,
        name: "Ilmo Salo",
        number: "040-98765432"
    }
]
const personsLength = `Phonebook has info for ${persons.length} people`
const time = new Date()

app.get('/info', (req, res) => {
    res.send(`${personsLength} </br> ${time}`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.get('/', (req, res) => {
    res.send('<h1>Hello</h1>')
  })

app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

app.use(express.json())
app.use(morgan('tiny'))
  app.post('/api/persons', (request, response) => {
    const person = request.body;
    const personId = Math.floor(Math.random() * 9999999);
    person.id = personId;
    const names = persons.map(person => person.name);
  
    if (names.includes(person.name)) {
      return response.status(400).json({
        error: 'Name and number must be included, and the name must be unique'
      });
    } else {
      persons = persons.concat(person);
      response.json(person);
      console.log(JSON.stringify(person));
      
    }
  });

  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

 
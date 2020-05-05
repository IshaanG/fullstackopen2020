const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(express.json());
app.use(morgan("tiny"));

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};
const alreadyExist = (p) => {
  return persons.filter((person) => person.name === p).length > 0;
};

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => {
    return person.id === id;
  });
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.get("/info", (req, res) => {
  const date = new Date();
  const nPersons = persons.length;
  res.send(
    `<div>Phonebook has info for ${nPersons} people</div><div>${date}</div>`
  );
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const person = req.body;
  if (!person.name) {
    return res.status(400).json({ error: "name missing" });
  }
  if (!person.number) {
    return res.status(400).json({ error: "number missing" });
  }
  if (alreadyExist(person.name)) {
    return res.status(409).json({ error: "name must be unique" });
  }

  person.id = getRandomInt(1000000000);
  persons = persons.concat(person);
  res.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

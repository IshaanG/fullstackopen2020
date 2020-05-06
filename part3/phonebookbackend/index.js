require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const Person = require("./models/person");
const app = express();
app.use(express.static("build"));
app.use(express.json());
morgan.token("data", (request) => {
  if (request.method == "POST") return " " + JSON.stringify(request.body);
  else return " ";
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons.map((person) => person.toJSON()));
  });
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person.toJSON());
      } else {
        res.status(404).end();
      }
    })
    .catch((e) => next(e));
});

app.get("/info", (req, res) => {
  Person.find({}).then((persons) => {
    res.send(
      `<div>Phonebook has info for ${
        persons.length
      } people</div><div>${new Date()}</div>`
    );
  });
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((e) => next(e));
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.name) {
    return res.status(400).json({ error: "name missing" });
  }
  if (!body.number) {
    return res.status(400).json({ error: "number missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person.save().then((savedNote) => {
    res.json(savedNote.toJSON());
  });
});

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedPerson) => {
      res.json(updatedPerson.toJSON());
    })
    .catch((e) => next(e));
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (e, req, res, next) => {
  console.error(e.message);

  if (e.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }
  next(e);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

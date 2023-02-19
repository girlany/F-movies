const express = require("express");

const todosRoutes = express.Router();

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


// Create

    todosRoutes.post("/todos", async (request, response) => {
      const { titulo, ano } = request.body;
      const todo = await prisma.todo.create({
        data: {
          titulo,
          ano,
        },
      });
    
      return response.status(201).json(todo);
    });
     


   // GET 
    todosRoutes.get("/todos", async (request, response) => {
    const todos = await prisma.todo.findMany();
    return response.status(200).json(todos);
    });


        // UPDATE

      todosRoutes.put("/todos", async (request, response) => {
      const { id, titulo, ano } = request.body;

     if (!id) {
       return response.status(400).json("Id is mandatory");
     }


    const todoAlreadyExist = await prisma.todo.findUnique({ where: { id } });

    if (!todoAlreadyExist) {
       return response.status(404).json("Todo not exist");
    }

   const todo = await prisma.todo.update({
     where: {
      id,
     },
     data: {
       titulo,
       ano,
     },
    });

    return response.status(200).json(todo);
    });


   // DELETE
    todosRoutes.delete("/todos/:id", async (request, response) => {
    const { id } = request.params;

    const intId = parseInt(id);

    if (!intId) {
      return response.status(400).json("Id is mandatory");
    }

    const todoAlreadyExist = await prisma.todo.findUnique({
     where: { id: intId },
    });

    if (!todoAlreadyExist) {
     return response.status(404).json("Todo not exist");
   }

    await prisma.todo.delete({ where: { id: intId } });

    return response.status(200).send();
  
    });

      module.exports = todosRoutes;
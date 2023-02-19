const express = require("express");

const allTodos = [{ nome: "bruno", status: false }];
const categoriaRoutes = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


    categoriaRoutes.post("/categoria", async (request, response) => {
      const { nome } = request.body;
      const todo = await prisma.categoria.create({
        data: {
          nome,
         
        },
      });
    
      return response.status(201).json(todo);
    });


    categoriaRoutes.get("/categoria", async (request, response) => {
         const todos = await prisma.categoria.findMany();
         return response.status(200).json(todos);
      });
      
      // UPDATE

      categoriaRoutes.put("/categoria", async (request, response) => {
  const { nome, id } = request.body;

  if (!id) {
    return response.status(400).json("Id is mandatory");
  }


  const todoAlreadyExist = await prisma.categoria.findUnique({ where: { id } });

  if (!todoAlreadyExist) {
    return response.status(404).json("Todo not exist");
  }

  const todo = await prisma.categoria.update({
    where: {
      id,
    },
    data: {
      nome,
   
    },
  });

  return response.status(200).json(todo);
});


// DELETE
categoriaRoutes.delete("/categoria/:id", async (request, response) => {
  const { id } = request.params;

  const intId = parseInt(id);

  if (!intId) {
    return response.status(400).json("Id is mandatory");
  }

  const todoAlreadyExist = await prisma.categoria.findUnique({
    where: { id: intId },
  });

  if (!todoAlreadyExist) {
    return response.status(404).json("Todo not exist");
  }

  await prisma.categoria.delete({ where: { id: intId } });

  return response.status(200).send();
  
});


    module.exports = categoriaRoutes;

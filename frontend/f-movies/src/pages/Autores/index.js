//import React, { Component } from 'react';

import { Link } from 'react-router-dom'

//import logo from './logo.svg';
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
//import './App.css';
import { useEffect, useState } from "react";
import axios from "axios";


function Autores() {

   

  const Todos = ({ todos }) => {



    return (
      <div className="todos">
        {todos.map((categoria) => {
  
          return (
            <div className="todo">

            
              <p>#ID {categoria.id}</p>
  
         

              <p>nome {categoria.nome}</p>
              
              
  
              <button onClick={() => handleWithEditButtonClick(categoria)}>
                  <AiOutlineEdit size={30} color={"#063970"}></AiOutlineEdit>
                </button>
                <button onClick={() => deleteTodo(categoria)}>
                  <AiOutlineDelete size={30} color={"#6d0a16"}></AiOutlineDelete>
                </button>
            </div>


              
  
          );

    
        })}
    
      </div>
    );


  };



  async function editTodo() {
    const response = await axios.put("http://localhost:3333/categoria", {
      id: selectedTodo.id,
      nome: inputValue,
      
      
      
    });
    setSelectedTodo();
    setInputVisility(false);
    getTodos();
    setInputValue("");
  }
  async function handleWithEditButtonClick(categoria) {
    setSelectedTodo(categoria);
    setInputVisility(true);
    setInputValue(categoria.nome);
 
    
    
  }

  async function deleteTodo(categoria) {
    const response = await axios.delete(
      `http://localhost:3333/categoria/${categoria.id}`
    );
    getTodos();
  }

  async function createTodo() {
    const response = await axios.post("http://localhost:3333/categoria", {
      nome: inputValue,
     
      
    });
    getTodos();
    setInputVisility(!inputVisbility);
    setInputValue("");
  }


  async function handleWithNewButton() {
    
    console.log("fasfas");
    setInputVisility(!inputVisbility);
  }



  async function getTodos() {
    const response = await axios.get("http://localhost:3333/categoria");
    setTodos(response.data);
    console.log(response.data);
  }

  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const [inputVisbility, setInputVisility] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState();


  useEffect(() => {
    getTodos();
  }, []);



  return (
    <div className="App">
     <header className="container">
      <div className="header">
          <h1>Times</h1>
        </div>

        <Todos todos={todos}></Todos>
        <input 
              value={inputValue}
              style={{ display: inputVisbility ? "block" : "none" }}
             onChange={(event) => {
                setInputValue(event.target.value);
             }}
        
        className='inputName'></input>

    



        <button  onClick={
            inputVisbility
              ? selectedTodo
                ? editTodo
                : createTodo
              : handleWithNewButton
          }
          className='newTaskButton'>   {inputVisbility ? "Confirm" : "+ New Time"}</button>
        </header>
    </div>
   


  );

  

  
    
  }
  
export default Autores;
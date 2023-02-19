//import logo from './logo.svg';
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
//import './App.css';
import { useEffect, useState } from "react";
import axios from "axios";

function Filmes() {

  

  const Todos = ({ todos }) => {



    return (
      <div className="todos">
        {todos.map((todo) => {
  
          return (
            <div className="todo">

            
              <p>#ID {todo.id}</p>
  
              <p>{todo.titulo}</p>
              
              
  
              <button onClick={() => handleWithEditButtonClick(todo)}>
                  <AiOutlineEdit size={30} color={"#063970"}></AiOutlineEdit>
                </button>
                <button onClick={() => deleteTodo(todo)}>
                  <AiOutlineDelete size={30} color={"#6d0a16"}></AiOutlineDelete>
                </button>
            </div>


              
  
          );

    
        })}
    
      </div>
    );


  };



  async function editTodo() {
    const response = await axios.put("http://localhost:3333/todos", {
      id: selectedTodo.id,
      titulo: inputValue,
      ano: inputValue2,
      
      
    });
    setSelectedTodo();
    setInputVisility(false);
    getTodos();
    setInputValue("");
  }
  async function handleWithEditButtonClick(todo) {
    setSelectedTodo(todo);
    setInputVisility(true);
    setInputValue(todo.titulo);
    setInputValue2(todo.ano);
    
    
  }

  async function deleteTodo(todo) {
    const response = await axios.delete(
      `http://localhost:3333/todos/${todo.id}`
    );
    getTodos();
  }

  async function createTodo() {
    const response = await axios.post("http://localhost:3333/todos", {
      titulo: inputValue,
      ano: inputValue2,
      
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
    const response = await axios.get("http://localhost:3333/todos");
    setTodos(response.data);
    console.log(response.data);
  }

  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [inputVisbility, setInputVisility] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState();


  useEffect(() => {
    getTodos();
  }, []);



  return (
    <div className="App">
     
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

      <input 
              value={inputValue2}
              style={{ display: inputVisbility ? "block" : "none" }}
             onChange={(event) => {
                setInputValue2(event.target.value);
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
     
    </div>


  );

  

}

export default Filmes;
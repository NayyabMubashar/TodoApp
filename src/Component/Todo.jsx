import React, { useEffect, useRef, useState } from 'react'
import todo_icon from '../assets/assets/todo_icon.png'
import TodoItem from './TodoItem'
const Todo = () => {

    const[todoList,settodoList]=useState(localStorage.getItem("todos")?
     JSON.parse(localStorage.getItem("todos")):[]);

    const inputref=useRef();
    const add=()=>{
 const inputText=inputref.current.value.trim();
 
 if(inputText===""){
  return null;
 }
 const newTodo={
  id:Date.now(),
  text:inputText,
  isComplete:false,
 }

 settodoList((prev)=> [...prev,newTodo]);
 inputref.current.value="";
    }

    const deleteTodo=(id)=>{
     settodoList((prevTodo)=>{
    return  prevTodo.filter((todo)=> todo.id !==id)
     })
    }

    const toggle=(id)=>{
     settodoList((prevTodos)=>{
      return prevTodos.map((todo)=>{
        if(todo.id===id){
          return {...todo,isComplete: !todo.isComplete}
        }
        return todo
      })
     })
    }

    useEffect(()=>{
localStorage.setItem("todos", JSON.stringify(todoList))
    },[todoList])

  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>

{/* Title */}

     <div className=' flex items-center mt-7 gap-2'>
           <img className='w-8' src={todo_icon} alt=''/>
        <h1 className='text-3xl font-semibold'>To-Do List</h1>
     
        </div> 
        {/* Input box */}
       
        <div className='flex items-center my-7 bg-gray-400 rounded-full '>
            <input ref={inputref} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' type='text' placeholder='Enter your task'/>
            <button onClick={add}className='border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg cursor-pointer'>ADD +</button>
        </div>

        {/* TODO LIST */}

        <div>

          {todoList.map((item,index)=>{
            return <TodoItem key={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle}/>
          })}
           

        </div>
    </div>
  )
}

export default Todo

import React from "react";
import { useState } from "react";
import {useForm} from "react-hook-form";

/*function ToDoList(){
const [toDo, setToDo] = useState("");
const [toDoError, setToDoError] = useState(""); 

const onChange = (event:React.FormEvent<HTMLInputElement>) => {
const {currentTarget:{value}} = event;
setToDoError("");
setToDo(value);
    }
const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
event.preventDefault();
//console.log(toDo);

if(toDo.length < 10){
    return setToDoError("ToDo should be longer");
}
console.log("submit")
}

    return (
<div>
    <form onSubmit={onSubmit}>
    <input onChange={onChange} value={toDo} placeholder="Write a to do" />
    <button>Add</button>
    {toDoError !== "" ? toDoError:null}
    </form>
</div>
    )
}*/

function ToDoList(){
    const {register, watch} = useForm();
  //  console.log(register("TODO"));
  console.log(watch())
    return (
<div>
<form>
<input {...register("TODO")} placeholder="Write a to do" />
{/* register함수가 반환하는 객체를 가져다가 input에 props로 준다 */}
<button>Add</button>
</form>
</div>
)
};

export default ToDoList;
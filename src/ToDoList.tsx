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

interface IForm{
errors:{
email:{
type:string;
message:string;
}
}
email: string;
firstname:string;
lastname: string,
password:  string;
passwordConfirm:  string;
username:  string;
}

function ToDoList(){
    const {register, watch, handleSubmit, formState:{errors}} = useForm<IForm>({defaultValues:{email:"@naver.com"}});
   console.log(register("email"));
 // console.log(watch())
const onValid = (data:any) =>{
  console.log(data);
}
console.log(errors);
    return (
<div>
<form
style={{display: "flex", flexDirection: "column"}} onSubmit={ handleSubmit(onValid)}>
<input {...register("email", {required:"Email is required", pattern: {value:/^[A-Za-z0-9.@_%=-]+naver.com$/, message:"Only naver.com allowed"}})} placeholder="Email" />
<span>{errors?.email?.message}</span>
<input {...register("firstname", {required:"write here"})} placeholder="firstname"/>
<span>{errors?.firstname?.message}</span>
<input {...register("lastname", {required:"write here"})} placeholder="lastname"/>
<span>{errors?.lastname?.message}</span>
<input {...register("username", {required:"write here"})} placeholder="username"/>
<span>{errors?.username?.message}</span>
<input {...register("password", {required:"need password", minLength: {value: 5, message:"Your password is too short"}})} placeholder="password"/>
<span>{errors?.password?.message}</span>
<input {...register("passwordConfirm", {required:"need password", minLength:5})} placeholder="passwordConfirm"/>
<span>{errors?.passwordConfirm?.message}</span>
{/* register에 required를 넣는 이유는 HTML에 의지하지않기위함이다 이유는 브라우저가 지원을 안할 수 도있다 */}
{/* register함수가 반환하는 객체를 가져다가 input에 props로 준다 */}
<button>Add</button>
</form>
</div>
)
};

export default ToDoList;
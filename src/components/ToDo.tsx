import React from "react";
import { useSetRecoilState,useRecoilValue } from "recoil";
import { IToDo, toDostate, Categories, toDoSelector,NewCategoryState } from "../atom";

function ToDo({text, category, id}:IToDo){
    {/*const onClick = (newCategory:IToDo["category"]) => {
    console.log(newCategory)}
*/}
    const setToDos = useSetRecoilState(toDostate);
    const toDos = useRecoilValue(toDoSelector);

    const NewCategories = useRecoilValue(NewCategoryState)
console.log(NewCategories)
console.log(text)
//console.log(id)
    
    const onClick = (event:React.MouseEvent<HTMLButtonElement>) => {
      const {currentTarget:{name}} = event;
      // console.log(name)
      // consolee.log(oldToDos);
      setToDos(oldToDos => {
      const targetIndex = oldToDos.findIndex((todo) => todo.id === id);
      //console.log(targetIndex);
      //console.log(id)
      const oldToDo = oldToDos[targetIndex];
      const newToDo = {text, id, category: name as any};
      {/*category는 "TO_DO" | "DOING" | "DONE" 중에 하나여야하는데 name이라 에러 뜬다*/}
      //console.log(oldToDo);
      //console.log(newToDo);
      return [...oldToDos.slice(0,targetIndex), newToDo, ...oldToDos.slice(targetIndex+1)]});
    }
  
    const onDelete = (event:React.MouseEvent<HTMLButtonElement>)=>{
      const {currentTarget:{value}} = event;
     
      setToDos(oldToDos => {
        const targetIndex = oldToDos.findIndex((todo) => todo.id === id);
        console.log(targetIndex)
        return oldToDos.filter((todo) => todo.id !== id)
      })
     }
     

   
    return (
    <>
    <li>
    <span>{text}</span>
    {/* 인자 전달하는 방법
     인자를 전달하기 위해 익명함수 선언  
     인자를 받는 함수를 만든다 
    */}
{/*{category !== "DOING" && <button onClick={()=>onClick("DOING")}>Doing</button>}
    {category !== "TO_DO" && <button onClick={()=>onClick("TO_DO")}>To Do</button>}
    {category !== "DONE" && <button onClick={()=>onClick("DONE")}>Done</button>}
 
*/}
{category !== Categories.DOING 
&& <button /*name={Categories.DOING + ""} string 변환*/ name={Categories.DOING} onClick={onClick}>Doing</button>
}
{category !== Categories.TO_DO 
&& <button /*name={Categories.TO_DO + ""}*/ name={Categories.TO_DO} onClick={onClick}>To Do</button>
}

{category !== Categories.DONE 
&& <button /*name={Categories.DONE + ""}*/ name={Categories.DONE} onClick={onClick}>Done</button>
}

{NewCategories.map((newCategory,i) => {
  if(newCategory !== category){
 return (
    <button name={newCategory} onClick={onClick} key={i}>{newCategory}</button>
  )}
})}


<button onClick={onDelete}>Delete</button>
    </li>
    </>)
}

export default ToDo;
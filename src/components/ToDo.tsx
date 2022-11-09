import { useSetRecoilState } from "recoil";
import { IToDo, toDostate } from "../atom";

function ToDo({text, category, id}:IToDo){
    {/*const onClick = (newCategory:IToDo["category"]) => {
    console.log(newCategory)}
*/}
    const setToDos = useSetRecoilState(toDostate);

    const onClick = (event:React.MouseEvent<HTMLButtonElement>) => {
       const {currentTarget:{name}} = event;
      // console.log(name)
    }
    return (
    <>
    <li>
    <span>{text}</span>
    {/* 인자 전달하는 방법
     인자를 전달하기 위해 익명함수 선언  
     인자를 받는 함수를 만든다 
    */}
  {/*  {category !== "DOING" && <button onClick={()=>onClick("DOING")}>Doing</button>}
    {category !== "TO_DO" && <button onClick={()=>onClick("TO_DO")}>To Do</button>}
    {category !== "DONE" && <button onClick={()=>onClick("DONE")}>Done</button>}
*/}
{category !== "DOING" && <button name="DOING" onClick={onClick}>Doing</button>}
    {category !== "TO_DO" && <button name="TO_DO" onClick={onClick}>To Do</button>}
    {category !== "DONE" && <button name="DONE" onClick={onClick}>Done</button>}
    </li>
    </>)
}

export default ToDo;
import { useRecoilState, useRecoilValue} from "recoil";
import { toDostate, categoryState, Categories, minutesState, hoursSelector,CategorySelector,NewCategoryState } from "../atom";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import { toDoSelector } from "../atom";
import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import CreateCategory from "./CreateCategory";

//const TODO_KEY = 'toDos';
//const CATEGORIES_KEY = 'additional_categories';

function ToDoList(){
    // const toDos = useRecoilValue(toDostate);
    // useRecoilValue: atom이나 selector의 값만 반환

    // const setToDos = useRecoilState(toDostate);
    // useSetRecoilState: atom의 값 바꾸기

  //  const toDos= useRecoilValue(toDostate);
//  const [toDo, doing, done] = useRecoilValue(toDoSelector);
const toDos = useRecoilValue(toDoSelector);
//const [rawToDos, setRawToDos] = useRecoilState(toDostate);
const Category = useRecoilValue(CategorySelector);
//console.log(Object.keys(Category))

const [category, setCategory] = useRecoilState(categoryState);
{/* useRecoilState은 atom 값과 atom을 수정하는 modifier 함수를 반환 */}

const [newcategory, setnewcategory] = useRecoilState(NewCategoryState);
//console.log(newcategory)
const NewCategory = useRecoilValue(NewCategoryState);
//console.log(NewCategory)
//console.log(newcategory);

const onInput = (event:React.FormEvent<HTMLSelectElement>) => {
//console.log(event.currentTarget.value);
const {currentTarget:{value}} = event;
setCategory(value as any);
}
//console.log(category);
//console.log(toDos);
//let ev: any ;
/*const handleInput = (event:React.FormEvent<HTMLSelectElement>) => {
  //ev=event.currentTarget.value;
  //console.log(typeof event.currentTarget.value)
  const {currentTarget:{value}} = event;
  console.log(event.currentTarget.value)
  setnewcategory(value as any)
  }*/

  const onDelete = (event:React.MouseEvent<HTMLButtonElement>)=>{
setnewcategory([]);
   }

// ------------------------------------------------------------------------------------


const [minutes, setMinutes] = useRecoilState(minutesState);
//const hours = useRecoilValue(hoursSelector);
//console.log(hours);
const [hours, setHours] = useRecoilState(hoursSelector);

// useRecoilState를 쓸때 []의 첫번째 item은 atom의 값이거나
// selector의 get함수의 값이다
// 두번째 item은 atom을 수정하는 함수이거나 
// selector의 set property를 실행시키는 함수이다

const onMinutesChange = (event:React.FormEvent<HTMLInputElement>) => {
setMinutes(+event.currentTarget.value);
// 앞의 +는 string을 number로 바꾼다
}

const onHoursChange = (event:React.FormEvent<HTMLInputElement>) => {
  setHours(+event.currentTarget.value);
}

/*useEffect(() => {
  localStorage.setItem(TODO_KEY, JSON.stringify(rawToDos));
}, [rawToDos]);

useEffect(() => {
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(newcategory));
}, [newcategory]);
*/
return (
    <>
    {/*{category === "TO_DO" ? <h1>TO_DO</h1>:null}
    {category==="DOING" ? <h1>DOING</h1>:null}
{category==="DONE" ? <h1>DONE</h1> :null}*/}
    <Link to={{pathname: "/UpgradeToDo/"}}><h1>Draggable Board is here, click here~!</h1></Link>
    <hr />
    <br />
  <select value={category} onInput={onInput}>
    <option value={Categories.TO_DO}>To Do</option>
    <option value={Categories.DOING}>Doing</option>
    <option value={Categories.DONE}>Done</option>
    {newcategory.map((category,i) => (
      <option key={i} value={category}>{category}</option>
    ))}
</select>

 
        <button onClick={onDelete}>Delete categories</button>


    <CreateCategory/>
<h1>{category}</h1>

    <CreateToDo />   
 
   {toDos?.map(aToDo => (<ToDo key={aToDo.id} {...aToDo}/>))}

   {/* {category === "TO_DO" && toDo.map(aToDo => <ToDo key={aToDo.id} {...aToDo}/>)}
    {category === "DOING" && doing.map(aToDo => <ToDo key={aToDo.id} {...aToDo}/>)}
    {category === "DONE" && done.map(aToDo => <ToDo key={aToDo.id} {...aToDo}/>)}
    /*}
  {/*  <h1>To Do</h1>
    <hr />
    <ul> */}

    {/*{toDos.map((toDo) => <ToDo text={toDo.text} category={toDo.category} id={toDo.id}/>)}*/}
   {/* {toDo.map((toDo) => <ToDo key={toDo.id} {...toDo}/>)} {/* toDos배열의 toDo원소 하나하나가 <ToDo>에 필요한 props와 같은 모양이기 때문 */}

 {/*}   </ul>   
    <h1>Doing</h1>
<hr />  
    <ul>
*/}

{/* {toDos.map((toDo) => <ToDo text={toDo.text} category={toDo.category} id={toDo.id}/>)}*/}
{/* {doing.map((toDo) => <ToDo key={toDo.id} {...toDo}/>)}  */}
{/* toDos배열의 toDo원소 하나하나가 <ToDo>에 필요한 props와 같은 모양이기 때문 */}
 
  {/*</ul>   
    <h1>Done</h1>
    <hr />
<ul> */}  

{/*{toDos.map((toDo) => <ToDo text={toDo.text} category={toDo.category} id={toDo.id}/>)}*/}
{/*  {done.map((toDo) => <ToDo key={toDo.id} {...toDo}/>)} */}

{/*  </ul>
*/}  
<hr />
<h1>A TIME CONVERTER</h1>
<br />
<input onChange={onMinutesChange} value={minutes} type="number" placeholder="Minutes" />
<input onChange={onHoursChange} value={hours} type="number" placeholder="Hours" />
    </>)
}

export default ToDoList;
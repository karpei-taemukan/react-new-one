import { useRecoilState, useRecoilValue} from "recoil";
import { toDostate, categoryState } from "../atom";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import { toDoSelector } from "../atom";


function ToDoList(){
    // const toDos = useRecoilValue(toDostate);
    // useRecoilValue: atom으로부터 값 불러오기

    // const setToDos = useRecoilState(toDostate);
    // useSetRecoilState: atom의 값 바꾸기

  //  const toDos= useRecoilValue(toDostate);
//  const [toDo, doing, done] = useRecoilValue(toDoSelector);
const toDos = useRecoilValue(toDoSelector);

const [category, setCategory] = useRecoilState(categoryState);
{/* useRecoilState은 atom 값과 atom을 수정하는 modifier 함수를 반환 */}

const onInput = (event:React.FormEvent<HTMLSelectElement>) => {
//console.log(event.currentTarget.value);
setCategory(event.currentTarget.value);
}
//console.log(category);
    return (
    <div>
    {category === "TO_DO" ? <h1>TO_DO</h1>:null}
    {category === "DOING" ? <h1>DOING</h1>:null}
    {category === "DONE" ? <h1>DONE</h1> :null}
    <hr />
    <select value={category} onInput={onInput}>
    <option value={"TO_DO"}>To Do</option>
    <option value={"DOING"}>Doing</option>
    <option value={"DONE"}>Done</option>
    </select>
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
{/* toDos배열의 toDo원소 하나하나가 <ToDo>에 필요한 props와 같은 모양이기 때문 */}
{/*  </ul>
*/}  
    </div>)
}

export default ToDoList;
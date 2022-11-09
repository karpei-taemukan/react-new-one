import { useRecoilValue} from "recoil";
import { toDostate } from "../atom";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";



function ToDoList(){
    // const toDos = useRecoilValue(toDostate);
    // useRecoilValue: atom으로부터 값 불러오기

    // const setToDos = useRecoilState(toDostate);
    // useSetRecoilState: atom의 값 바꾸기

    const toDos= useRecoilValue(toDostate);
    
   
    return (
    <div>
    <h1>To Dos</h1>
    <hr />
    <CreateToDo />
    <ul>
    {/*{toDos.map((toDo) => <ToDo text={toDo.text} category={toDo.category} id={toDo.id}/>)}*/}
    {toDos.map((toDo) => <ToDo key={toDo.id} {...toDo}/>)} {/* toDos배열의 toDo원소 하나하나가 <ToDo>에 필요한 props와 같은 모양이기 때문 */}
    </ul>   
    </div>)
}

export default ToDoList;
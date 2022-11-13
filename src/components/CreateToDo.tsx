import { useForm } from "react-hook-form";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {categoryState, toDostate} from "../atom";

interface IForm{
    toDo:string;
    }


function CreateToDo(){
const {register,handleSubmit, setValue} = useForm<IForm>();
const setToDos = useSetRecoilState(toDostate)

const category = useRecoilValue(categoryState);

const handleValid = ({toDo}:IForm) => {
        //console.log(data,data.toDo)
        console.log(toDo)
         setValue("toDo", "");
         setToDos((oldToDos) => [...oldToDos,{text:toDo, category, id: Date.now()}]);
         const random = Date.now();
         localStorage.setItem(random+"",toDo);
        }

    return (
    <div>
    <form onSubmit={handleSubmit(handleValid)}>
    <input {...register("toDo")} placeholder="Write a todo List" />    
    <button>Add</button>
    </form>
    </div>)
}

export default CreateToDo;
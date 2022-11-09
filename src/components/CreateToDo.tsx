import { useForm } from "react-hook-form";
import {useSetRecoilState} from "recoil";
import {toDostate} from "../atom";

interface IForm{
    toDo:string;
    }


function CreateToDo(){
    const {register,handleSubmit, setValue} = useForm<IForm>();
   const setToDos = useSetRecoilState(toDostate)
    const handleValid = ({toDo}:IForm) => {
        // console.log(data,data.toDo)
         setValue("toDo", "");
         setToDos((oldToDos) => [...oldToDos,{text:toDo, category:"TO_DO", id: Date.now()}]);
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
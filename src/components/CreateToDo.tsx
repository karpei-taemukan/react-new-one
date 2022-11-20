import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {useRecoilValue, useSetRecoilState} from "recoil";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import {categoryState, toDostate} from "../atom";

interface IForm{
    toDo:string;
    }


function CreateToDo(){
const {register,handleSubmit, setValue} = useForm<IForm>();
const setToDos = useSetRecoilState(toDostate)

const category = useRecoilValue(categoryState);

/*const random = Date.now();
useEffect(() => {
    localStorage.setItem(random+"", JSON.stringify(toDostate));
    }, [toDostate]);
*/

const handleValid = ({toDo}:IForm) => {
        //console.log(data,data.toDo)
        console.log(toDo)
        

        setValue("toDo", "");
        setToDos((oldToDos) => 
        {
       return [...oldToDos,{text:toDo, category, id: Date.now()}]
        });

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
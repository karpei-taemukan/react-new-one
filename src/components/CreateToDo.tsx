import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {categoryState,NewCategoryState, toDostate, Categories} from "../atom";

interface IForm{
    toDo:string,
    }

function CreateToDo(){
const {register,handleSubmit, setValue} = useForm<IForm>();

const setToDos = useSetRecoilState(toDostate);

const category = useRecoilValue(categoryState);

// ----------------------------------------------------------------


//console.log(Category);
/*const random = Date.now();
useEffect(() => {
    localStorage.setItem(random+"", JSON.stringify(toDostate));
    }, [toDostate]);
*/

const handleValid = ({toDo}:IForm) => {
        //console.log(data,data.toDo)
       // console.log(toDo)
        

        setValue("toDo", "");
        setToDos((oldToDos) => 
  [...oldToDos,{text:toDo, category, id: Date.now()}]
        );

        }
 // ----------------------------------------------------------------

     
    return (
    <>
    <form onSubmit={handleSubmit(handleValid)}>
    <input {...register("toDo")} placeholder="Write a todo List" />    
    <button>Add</button>
    </form>
    <br />
    </>)
}

export default CreateToDo;

// toDo 랑 category 똑같이 만들어보기
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {useRecoilValue, useSetRecoilState} from "recoil";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import {categoryState,CategoryState, toDostate, Categories} from "../atom";

interface IForm{
    toDo:string;
    }
interface ICategory{
    category: string;
}
function CreateToDo(){
const {register,handleSubmit, setValue} = useForm<IForm>();
const CategoryForm = useForm<ICategory>();

const setToDos = useSetRecoilState(toDostate);

const category = useRecoilValue(categoryState);

const setCategory = useSetRecoilState(CategoryState);
const Category = useRecoilValue(CategoryState);
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
        {
 return [...oldToDos,{text:toDo, category, id: Date.now()}]
 

        });

        }

        const onValid = ({category}:ICategory) => {
          //  console.log(category);
          CategoryForm.setValue("category", "");
            setCategory((oldCategory) => {
        
               return {
                    ...oldCategory,
                    [category]: [{Ctext: category,Cid: Date.now(), Ccategory:[category]}]
                };

     
            })
            }

    return (
    <>
    <form onSubmit={handleSubmit(handleValid)}>
    <input {...register("toDo")} placeholder="Write a todo List" />    
    <button>Add</button>
    </form>
    <br />
    <form onSubmit={CategoryForm.handleSubmit(onValid)}>
    <input {...CategoryForm.register("category")} placeholder="Write a category List" />  
    <button>Add</button>
    </form>

    </>)
}

export default CreateToDo;

// toDo 랑 category 똑같이 만들어보기
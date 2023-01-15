import { useForm } from "react-hook-form";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {categoryState,NewCategoryState, toDostate, Categories} from "../atom";

interface ICategory{
    category: string;
}

function CreateCategory(){
    const CategoryForm = useForm<ICategory>();
    const setCategory = useSetRecoilState(NewCategoryState);

    const onValid = ({category}:ICategory) => {
        setCategory((oldCategory: any) => 
        [...oldCategory,{Ctext: category, id: Date.now()}])
          CategoryForm.setValue("category", "");
          }
return (
    <form onSubmit={CategoryForm.handleSubmit(onValid)}>
    <input {...CategoryForm.register("category")} placeholder="Write a category List" />  
    <button>Add</button>
    </form>
)
}

export default CreateCategory;
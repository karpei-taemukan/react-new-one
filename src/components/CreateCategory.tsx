import { useForm } from "react-hook-form";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {categoryState,NewCategoryState, toDostate, Categories} from "../atom";

interface IForm{
    category: string;
}

function CreateCategory(){
    const CategoryForm = useForm<IForm>();
    const setCategory = useSetRecoilState(NewCategoryState);

    const onValid = ({category}:IForm) => {
        setCategory((oldCategory: any) => 
        [...oldCategory,category])
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
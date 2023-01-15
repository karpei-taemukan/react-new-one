import { useForm } from "react-hook-form";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {categoryState,NewCategoryState, toDostate, Categories} from "../atom";

interface IForm{
    category: string;
}

function CreateCategory(){
    const CategoryForm = useForm<IForm>();
    const setCategory = useSetRecoilState(categoryState);
   const [newCategory, setNewCategory] = useRecoilState(NewCategoryState)
    const onValid = ({category}:IForm) => {
        setCategory(category as any);
        setNewCategory((oldCategory) => [...oldCategory,category])
          CategoryForm.setValue("category", "");
          }
return (
    <form onSubmit={CategoryForm.handleSubmit(onValid)}>
    <input {...CategoryForm.register("category")} placeholder="Write a category List" type="text" />  
    <button>Add</button>
    </form>
)
}

export default CreateCategory;
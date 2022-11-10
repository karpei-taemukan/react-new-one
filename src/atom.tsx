import { atom, readOnlySelector, selector } from "recoil"

export interface IToDo{
    text:string;
    id: number;
    category: "TO_DO" | "DOING" | "DONE";
    }

export const toDostate = atom<IToDo[]>({ // atom의 type이 ToDO의 배열임을 알려줌
    key:"toDo",
    default:[],
    })

    // atom은 꼭 props를 저장하는 데가 아닌 data 저장 장소이다 

    // selector는 atom의 output을 변형시키는 도구

export const categoryState = atom({
    key:"category",
    default:"TO_DO",
});

export const toDoSelector = selector({
    key:"toDoSelector",
    get: ({get}) => {
        const toDos = get(toDostate);
        const category = get(categoryState);
      return toDos.filter((toDo) => toDo.category === category);
      
    {/*return [
    toDos.filter((toDo) => toDo.category === "TO_DO"),
    toDos.filter((toDo) => toDo.category === "DOING"),
    toDos.filter((toDo) => toDo.category === "DONE")
];*/}
    } 
})
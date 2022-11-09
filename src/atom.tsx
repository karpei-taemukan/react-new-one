import { atom } from "recoil"

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
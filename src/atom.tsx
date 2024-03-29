import { atom, selector } from "recoil"
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist({
    key: "all",
    storage: localStorage
},
)

const TODO_KEY = 'toDos';
const CATEGORIES_KEY = 'additional_categories';

//type categories = "TO_DO" | "DOING" | "DONE";

export enum Categories { 
    // 코드 전체에서 "TO_DO","DOING","DONE" 을 사용하고 싶다
    //"TO_DO","DOING","DONE" 과 같은 string을 쓰면서 실수를 줄이기 위함
     //   "TO_DO","DOING","DONE" 
    // "TO_DO","DOING","DONE" 사실 숫자이다 
    // 그래서 <button name={Categories.TO_DO}></button> 는 에러 
    // name에 숫자가 들어갔기 때문
    "TO_DO"="TO_DO",
    "DOING"="DOING",
    "DONE"="DONE" 
    }

    export interface IToDo{
        text:string;
        id: number;
        category:Categories
        }
        //let output = localStorage.getItem("TODOS");
        //let localData = JSON.parse(output as any);
//-----------------------------------------------------------------------------

/*export interface ICategory {
Ctext:string,
Cid: number
}*/

export const NewCategoryState = atom<string[]>({
    key: "NewCategoryState",
    default:JSON.parse(localStorage.getItem(CATEGORIES_KEY) || '[]'),
  //  effects_UNSTABLE: [persistAtom]
})

export const CategorySelector = selector({
    key: "CategorySelector",
    get: ({get}) => {
    const Category = get(NewCategoryState);
    return Category
    }
    }
)

//-----------------------------------------------------------------------------



export const toDostate = atom<IToDo[]>({ // atom의 type이 ToDO의 배열임을 알려줌
    key:"toDo",
   // default:localData,
   default: JSON.parse(localStorage.getItem(TODO_KEY) || '[]'),
   // effects_UNSTABLE: [persistAtom]
    })

    // atom은 꼭 props를 저장하는 데가 아닌 변경할 data 저장 장소이다 

    // selector는 atom의 output을 변형시키는 도구
    
export const categoryState = atom<Categories>({
    key:"category",
    default:Categories.TO_DO,
});


export const toDoSelector = selector({
    key:"toDoSelector",
    get: ({get}) => { // get 함수는 selector가 어떤 것을 반환할지 결정한다
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


//---------------------------------------------------------------------------------------

export const minutesState = atom({
    key:"minute",
    default: 0,
})

export const hoursSelector = selector({
    key:"hours",
    get: ({get}) => { // selector의 값을 주는 것이다
       const minutes = get(minutesState);
       return minutes / 60;
    },
    set:({set},newValue) => { // state를 수정할 수 있게한다 
       // console.log(newValue);
    const minutes = Number(newValue) * 60;
    set(minutesState,minutes);
    }
})

//---------------------------------------------------------------------------------------

export interface ITodo {
    id:number;
    text:string;
}

interface IToDoState {
    [key:string]:ITodo[];
}


export const UpgradeToDoState = atom<IToDoState>({
    key:"UpgradeToDo",
    default: {
        to_do : [],
        doing: [],
        done: [],
    },
    effects_UNSTABLE: [persistAtom]
});

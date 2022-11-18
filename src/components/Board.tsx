import DragabbleCard from "./DragabbleCard"
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd";
import styled from "styled-components";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { ITodo, UpgradeToDoState } from "../atom";
import { useSetRecoilState } from "recoil";

const Wrapper = styled.div`
width: 300px;
padding-top: 10px;
background-color: ${props => props.theme.boardColor};
border-radius: 5px;
min-height: 200px;
display:flex;
flex-direction: column;
`;

const Title = styled.h1`
text-align: center;
font-weight: 600;
margin-bottom: 10px;
font-size: 18px;
`;

interface IAreaProps{
    isDraggingOver:boolean,
    isDraggingFromThis:boolean;
}

const Area = styled.div<IAreaProps>`
background-color: ${props => props.isDraggingOver ? "#dfe6e9" : props.isDraggingFromThis ? "#b2bec3" : "transparent"};
flex-grow:1;
transition: background-color 0.3s ease-in-out;
padding: 20px;
`
const Form = styled.form`
width:100%;
input{
    width:100%;
    text-align:center;
}
`;

interface IBoardProp{
    toDos: ITodo[],
    boardId: string
} 

interface IForm{
    toDo:string;
}

function Board({toDos, boardId}:IBoardProp){

    const inputRef = useRef<HTMLInputElement>(null); // typescript에게 무엇을 받아올건지 말해야한다
    const onClick = () => {
        inputRef.current?.focus();
        setTimeout(()=>{inputRef.current?.blur()},1000)
    };

const {register, setValue, handleSubmit} = useForm<IForm>();

const setToDos  = useSetRecoilState(UpgradeToDoState);

const onValid = ({toDo}:IForm) => {
//console.log(data)
const newToDo = {
    id:Date.now(),
    text: toDo // toDo는 form에서 작성한 data를 받아옴
}
setToDos(allBoards => {
    return { // form에 입력해서 Board에 작성하는 작업
        ...allBoards,
        [boardId]:[ // boardId: to_do || doing || done
        ...allBoards[boardId],
        newToDo
        ]
    }
})
setValue("toDo", "")
}
    return (
    <Wrapper>
    <Title>{boardId}</Title>

    <Form onSubmit={handleSubmit(onValid)}>
    <input {...register("toDo",{required:true})} type="text" placeholder={`Add task on ${boardId}`} />
    </Form>

    {/*<input ref={inputRef} placeholder="grab me" />
    <button onClick={onClick}>Click</button>*/}
    {/* ref는 react component를 통해서 HTML요소(ex <input/>)를 가져올 수 있도록 한다 */}

    <Droppable droppableId={boardId}>
    {(magic, info)=> (
    <Area 
    isDraggingFromThis={Boolean(info.draggingFromThisWith)} 
    isDraggingOver={info.isDraggingOver} 
    ref={magic.innerRef} 
    {...magic.droppableProps}>
    

    {toDos.map((toDo,index) => 
    <DragabbleCard key={toDo.id} index={index} toDoId={toDo.id} toDoText={toDo.text}/>
    )} 
    {magic.placeholder}   {/* <Card/>를 <Draggable/> 의 밖에 드래그할때 <Draggable/>의 크기를 고정시키는 역할*/}
    </Area>)}
    </Droppable>
    </Wrapper>
    )
}

export default Board;
import DragabbleCard from "./DragabbleCard"
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd";
import styled from "styled-components";
import { useRef } from "react";

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

interface IBoardProp{
    toDos: string[],
    boardId: string
} 

function Board({toDos, boardId}:IBoardProp){
    const inputRef = useRef<HTMLInputElement>(null); // typescript에게 무엇을 받아올건지 말해야한다
    const onClick = () => {
        inputRef.current?.focus();
        setTimeout(()=>{inputRef.current?.blur()},1000)
    };
    return (
    <Wrapper>
    <Title>{boardId}</Title>

    <input ref={inputRef} placeholder="grab me" />
    <button onClick={onClick}>Click</button>
    {/* ref는 react component를 통해서 HTML요소(ex <input/>)를 가져올 수 있도록 한다 */}

    <Droppable droppableId={boardId}>
    {(magic, info)=> (
    <Area 
    isDraggingFromThis={Boolean(info.draggingFromThisWith)} 
    isDraggingOver={info.isDraggingOver} 
    ref={magic.innerRef} 
    {...magic.droppableProps}>
    

    {toDos.map((toDo,index) => 
    <DragabbleCard key={toDo} index={index} toDo={toDo}/>
    )} 
    {magic.placeholder}   {/* <Card/>를 <Draggable/> 의 밖에 드래그할때 <Draggable/>의 크기를 고정시키는 역할*/}
    </Area>)}
    </Droppable>
    </Wrapper>
    )
}

export default Board;
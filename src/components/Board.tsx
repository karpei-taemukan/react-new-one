import DragabbleCard from "./DragabbleCard"
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd";
import styled from "styled-components";

const Wrapper = styled.div`
padding: 20px 10px;
padding-top: 30px;
background-color: ${props => props.theme.boardColor};
border-radius: 5px;
min-height: 200px;
`;

const Title = styled.h1`
text-align: center;
font-weight: 600;
margin-bottom: 10px;
font-size: 18px;
`;

interface IBoardProp{
    toDos: string[],
    boardId: string
} 

function Board({toDos, boardId}:IBoardProp){
    return (
    <Wrapper>
    <Title>{boardId}</Title>
    <Droppable droppableId={boardId}>
    {(magic)=> (
    <div ref={magic.innerRef} {...magic.droppableProps}>
    {toDos.map((toDo,index) => 
    <DragabbleCard key={toDo} index={index} toDo={toDo}/>
    )} 
    {magic.placeholder}   {/* <Card/>를 <Draggable/> 의 밖에 드래그할때 <Draggable/>의 크기를 고정시키는 역할*/}
    </div>)}
    </Droppable>
    </Wrapper>
    )
}

export default Board;
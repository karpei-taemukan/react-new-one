import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import styled from "styled-components";


const Board = styled.div`
padding: 20px 10px;
padding-top: 30px;
background-color: ${props => props.theme.boardColor};
border-radius: 5px;
min-height: 200px;
`;

const Card = styled.div`
border-radius: 5px;
margin-bottom: 5px;
padding: 10px 10px;
background-color: ${props => props.theme.cardColor}
`

const Wrapper = styled.div`
display:flex;
max-width:480px;
width: 100%;
margin: 0 auto;
justify-content: center;
align-items: center;
height: 100vh;
`;

const Boards = styled.div`
display: grid;
width: 100%;
grid-template-columns: repeat(1, 1fr);
`;

const toDos = ["a", "b", "c", "d", "e", "f"];

function UpgradeToDo(){
    const onDragEnd = () => {};
    return <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
            <Boards>
           <Droppable droppableId="one">
            {(magic)=> (<Board ref={magic.innerRef} {...magic.droppableProps}>
            {toDos.map((toDo,index) => (<Draggable draggableId={toDo} index={index}>
                {(provided)=>
                (<Card 
                ref={provided.innerRef}  
                {...provided.draggableProps}
                {...provided.dragHandleProps}>
                {toDo}
                </Card>)}
            </Draggable>))} 
            {magic.placeholder}   {/* <Card/>를 <Draggable/> 의 밖에 드래그할때 <Draggable/>의 크기를 고정시키는 역할*/}
                </Board>)}
            </Droppable>
            </Boards>
        </Wrapper>
    </DragDropContext>
}

export default UpgradeToDo;
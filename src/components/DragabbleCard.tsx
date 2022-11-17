import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{isDragging:boolean}>`
border-radius: 5px;
margin-bottom: 5px;
padding: 10px;
box-shadow: ${(props) => props.isDragging ? "10px 12px 15px rgba(0, 0, 0, 0.5)" : "none"};
background-color: ${(props) => props.isDragging ? "#e4f2ff" : props.theme.cardColor}
`;

interface IDragabbleCardProps{
    toDo: string,
    index: number
}

function DragabbleCard({toDo, index}:IDragabbleCardProps){
   // console.log(toDo, " has rendered")
    return (
        <Draggable key={toDo} draggableId={toDo} index={index}>
            {/* key와 draggableId가 무조건 같아야 한다 */}
                {(magic, snapshot)=>
                (<Card 
                isDragging={snapshot.isDragging}
                ref={magic.innerRef}  
                {...magic.draggableProps}
                {...magic.dragHandleProps}>
                {toDo}
                </Card>)}
            </Draggable>
    );
}

export default React.memo(DragabbleCard);
// parent가 새로고침되면 당연히 children도 새로고침 된다 --> react 특성
// react memo는 react한테 prop이 안 변한 components는 랜더링하지않도록 한다
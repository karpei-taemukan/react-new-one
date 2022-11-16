import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { UpgradeToDoState } from "../atom";
import Board from "./Board";
import DragabbleCard from "./DragabbleCard";



const Wrapper = styled.div`
display:flex;
max-width:1080px;
width: 100%;
margin: 0 auto;
justify-content: center;
align-items: center;
height: 100vh;
`;

const Boards = styled.div`
display: grid;
width: 100%;
grid-template-columns: repeat(3, 1fr);
gap: 10px;
`;


function UpgradeToDo(){
    const [toDos, setToDos] = useRecoilState(UpgradeToDoState);

    /*const onDragEnd = ({draggableId,destination,source}:DropResult) => {
        if(!destination){
            return;
        }*/

     /*   setToDos(oldToDos => {
    const toDosCopy = [...oldToDos];  // state를 mutate하지 않을 것이다

    // 1) source.index 삭제

    //console.log("Delete item on",source.index);
    //console.log(toDosCopy);

    toDosCopy.splice(source.index,1);

    //console.log("Deleted item")
    //console.log(toDosCopy);

    // 2) destination.index에 draggableId 놓기
    //console.log("Put back", destination?.index, "on ",draggableId)

    toDosCopy.splice(destination?.index,0,draggableId)

    //console.log(toDos);
            return toDosCopy;
        })*/



     const onDragEnd = (info:DropResult)=>{
        console.log(info);
        const {destination, draggableId, source} = info;
        if(destination?.droppableId === source.droppableId){
            // 같은 보드 내에서의 움직임
             // 변화된 보드만 복사
            setToDos((allBoards) => {
                const boardCopy = [...allBoards[source.droppableId]];
                boardCopy.splice(source.index,1);
                boardCopy.splice(destination?.index,0,draggableId)
                return {
                    ...allBoards,
                    [source.droppableId]: boardCopy 
    // [source.droppabledId]는 boardCopy의 복사본이다 
                }
            })
        }
     }   

    return (<DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
            <Boards>
        {Object.keys(toDos).map(boardId => (<Board key={boardId} toDos={toDos[boardId]} boardId={boardId}/>))}
            </Boards>
        </Wrapper>
    </DragDropContext>)
}

export default UpgradeToDo;
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { UpgradeToDoState,DeleteToDoState } from "../atom";
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
position: relative;
`;

const Img = styled.div`
margin: 0 auto;
position: absolute;
top: 80%;
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


// **** onDragEnd: DeleteToDoState 가져와서 useRecoilState 사용하여 배열을 가져와서 
// const Delete = [...allBoards[source.droppableId]]; 배열내 원소삭제 
     const onDragEnd = (info:DropResult)=>{
        console.log(info); // 카드를 옮길때 발생하는 정보(info)
        const {destination, draggableId, source} = info;
        if(!destination){
            return;
        }
        if(destination?.droppableId === source.droppableId){
            // 같은 보드 내에서의 움직임
             // 변화된 보드만 추가, 나머지 보드들은 유지한다 

            setToDos((allBoards) => {
                const boardCopy = [...allBoards[source.droppableId]];
                const taskObj = boardCopy[source.index];
                console.log("Array: ",boardCopy, "Object: ", taskObj);
                boardCopy.splice(source.index,1);
                boardCopy.splice(destination?.index,0,taskObj);

// destination?.index 인 이유는 가끔씩 typescript에 따라서 
// destination은 정의된 위치이거나 undefined일 수 도 있기 때문
                return {
                    ...allBoards,
                    [source.droppableId]: boardCopy 
    // [source.droppabledId]는 boardCopy의 복사본이다 
                }
            })
        }
        if(destination?.droppableId !== source.droppableId){
            // 서로 다른 보드끼리의 움직임
            // item이 움직이는 보드와 item을 추가해야하는 보드 2개를 복사

            setToDos((allBoards) => {
               const sourceBoard = [...allBoards[source.droppableId]];
               const destinationBoard = [...allBoards[destination.droppableId]];
               const taskObj = sourceBoard[source.index];
               sourceBoard.splice(source.index,1);
               destinationBoard.splice(destination?.index,0,taskObj);

               return {
                ...allBoards,
                [source.droppableId]:sourceBoard,
                [destination.droppableId]:destinationBoard,
               }
            })
        }
    }   



    return (<DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
            <Boards>
        {Object.keys(toDos).map(boardId => (<Board key={boardId} toDos={toDos[boardId]} boardId={boardId}/>))}
            </Boards>
           
    <Droppable droppableId="delete">
    {(provided) => 
    <Img 
    ref={provided.innerRef}
    {...provided.droppableProps}>
    <Draggable draggableId="first" index={0}>
    {(magic) => 
    <img
    ref={magic.innerRef}
    {...magic.draggableProps} //--> 드래그 가능하게 해줌 
    {...magic.dragHandleProps} //--> 중간 아래 위 다 드래그할 수 있게함  
    style={{width: "100px", height: "100px"}} 
    src="https://cdn-icons-png.flaticon.com/512/3096/3096673.png"
    alt="delete" />
}
</Draggable>
</Img>
    }    
</Droppable>
    
        </Wrapper>
    </DragDropContext>)
}

export default UpgradeToDo;
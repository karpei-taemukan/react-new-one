import { findSourceMap } from "module";
import React, { useState } from "react";
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ObjectFlags } from "typescript";
import { UpgradeToDoState, BoardState } from "../atom";
import Board from "./Board";
import DragabbleCard from "./DragabbleCard";



const Wrapper = styled.div`
display:flex;
max-width:1080px;
width: 100%;
margin: 0 auto;
justify-content: center;
align-items: center;
height: 50vh;
position: relative;
`;

const Boards = styled.div`
display: grid;
width: 100%;
grid-template-columns: repeat(3, 1fr);
gap: 10%;
top: 10%;
position: relative;
`;

const Img = styled.div`
position: absolute;
top: 30%;
right: 45%;
`;

const Form = styled.form`
width: 50%;
position: absolute;
top: 0;
display: flex;
flex-direction: column;
align-items: center;
`;

const Input = styled.input`
border-radius: 15px;
text-align:center;
margin: 10px 0px;
`;

interface IForm{
    todo: string
}

const Btn = styled.button`
border-radius: 15px;
text-align:center;
margin: 10px 0px;
position: absolute;
top: 25px;
`;

const BoardList = styled.div``;

function UpgradeToDo(){
    const [toDos, setToDos] = useRecoilState(UpgradeToDoState);
    const {register, setValue, handleSubmit} = useForm<IForm>();
    const AddBoard  = useSetRecoilState(UpgradeToDoState);
    const [openBoard, setOpenBoard] = useState(false);
    const [boards,setBoards] = useRecoilState(BoardState); 
    //console.log(setBoards);
    const onValid = ({todo}:IForm)=>{
//console.log(todo)

AddBoard((newBoard) => {
   // console.log(todo);
    
    const obj={
        ...newBoard,
        [todo] : [] // 변수 대입 [] 안에 넣기
    }
    return obj;
})
setValue("todo","");
}
const onClick = (event:React.MouseEvent<HTMLButtonElement>) => {
setOpenBoard(current => !current);
}

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

        if(destination?.droppableId === source.droppableId && source.droppableId !== "boards" && destination?.droppableId !== "boards"){
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

        
       else if(destination?.droppableId !== source.droppableId
            && destination?.droppableId === "delete"){
            setToDos((allBoards) => {
               const sourceBoard = [...allBoards[source.droppableId]];
               sourceBoard.splice(source.index,1);
               return {
                   ...allBoards,
                   [source.droppableId]:sourceBoard,
                  }
            });   




           }  
       else if(destination?.droppableId !== source.droppableId 
            && destination?.droppableId !== "delete"){
            // 서로 다른 보드끼리의 움직임
            // item이 움직이는 보드와 item을 추가해야하는 보드 2개를 복사

            setToDos((allBoards) => {
               const sourceBoard = [...allBoards[source.droppableId]];
               const destinationBoard = [...allBoards[destination.droppableId]];
               //console.log(destinationBoard)
              // console.log(typeof destinationBoard)
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

       else if(destination.droppableId ==="boards" && source.droppableId === "boards"){
            /*setToDos((board) => {
               const sourceBoard = [...board[source.index]];
               const destinationBoard = [...board[destination?.index]];
               const taskObj = sourceBoard[source.index]
               sourceBoard.splice(source.index,1);
               destinationBoard.splice(destination?.index,0,taskObj);
                return {
                    ...board,
                    [source.index]:sourceBoard,
                    [destination?.index]:destinationBoard
                }*/

                setToDos((board) => {
                    const arrs = Object.entries(board);
                    console.log(arrs)
                    console.log(source.index, destination?.index);
                    const removeBoard = arrs[source.index]
                    arrs.splice(source.index,1);
                    arrs.splice(destination?.index,0,removeBoard)
                    const moveBoard = Object.fromEntries(arrs);
                    console.log(moveBoard)
                    return moveBoard
                })
            
          

       
         }

     }

    return (<DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
        <Btn onClick={onClick}><h1>Add Board</h1></Btn>
        {openBoard ? <Form onSubmit={handleSubmit(onValid)}>
        
        <Input {...register("todo", {required:true})}
         type="text" placeholder="Add Board"/>
        </Form> : null}
        </Wrapper>
<Droppable droppableId="boards" direction="horizontal" type="board">
{(magic) => 
(<BoardList>
<Boards ref={magic.innerRef} {...magic.droppableProps}>
  {Object.keys(toDos).map((boardId, index) => (
<Board 
key={boardId} 
toDos={toDos[boardId]} 
boardId={boardId}
index={index}
/>)
)}
 {magic.placeholder}
</Boards>
</BoardList>)
  }
</Droppable>




    <Droppable droppableId="delete">
    {(provided) => 
  
    <Img 
    ref={provided.innerRef}
    {...provided.droppableProps}>
   {/* <Draggable draggableId="first" index={0}>
    {(magic) => 
    <img
    ref={magic.innerRef}
    {...magic.draggableProps} //--> 드래그 가능하게 해줌 
    {...magic.dragHandleProps} //--> 중간 아래 위 다 드래그할 수 있게함  
    style={{width: "100px", height: "100px"}} 
    src="https://cdn-icons-png.flaticon.com/512/3096/3096673.png"
    alt="delete" />
}

</Draggable> */}
<img
style={{width: "100px", height: "100px"}} 
src="https://cdn-icons-png.flaticon.com/512/3096/3096673.png" />
{provided.placeholder}
</Img>
  }    
</Droppable>

    </DragDropContext>)
}

export default UpgradeToDo;
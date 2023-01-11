import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ToDoList from './components/ToDoList';
import UpgradeToDo from './components/UpgradeToDo';

function Router(){
return (
<BrowserRouter basename={process.env.PUBLIC_URL}>
<Routes>
<Route path="/" element={<ToDoList/>}/>
<Route path="/UpgradeToDo" element={<UpgradeToDo/>}/>      
</Routes>
</BrowserRouter>
)}
export default Router;
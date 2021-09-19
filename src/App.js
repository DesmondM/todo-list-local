import React, {useState, useEffect} from 'react';
import Alert from './Alert';
import './App.css';
import List from './List';

const getLocalStorage = ()=>{
  let list = localStorage.getItem('list');
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  } else{
    return[]
  }
}
function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID]= useState(null)
  const [alert, setAlert]= useState({show: false, 
                                     msg:'', 
                                     type:''})

  const  handleForm =(e)=>{
    e.preventDefault();
    if(!name){
        showAlert(true, 'Enter todo item', 'danger');
    }
    else if(name&& isEditing){
        setList(
          list.map((item)=>{
            if(item.id===editID){
              return {...item, title: name}
            }
            return item
          })
        )
        setName('');
        setEditID(null);
        setIsEditing(false);
        showAlert(true, 'Item edited', 'success')
    }
    else{
        showAlert(true, 'Item added', 'success')
        const newItem = {id: new Date().getTime().toString(), title: name};
        setList([...list, newItem]);
        setName('');
    }
  }

  const showAlert = (show =false, msg= '', type = '') =>{
      setAlert({show, msg, type})
  }

  const handleClearList = () =>{
    showAlert(true, 'empty list', 'danger');
    setList([]);
  }

  const removeItem =(id) =>{
  showAlert(true, 'Remove one Item', 'danger');
  setList(list.filter((item)=>item.id!==id))
  }

  const editItem = (id)=>{
    const specificItem = list.find((item)=>item.id===id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title)
  }

  useEffect(()=>{
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  return (
    <section className="section-center">
     <form className="grocery-form" onSubmit = {handleForm}>
      {
        alert.show && <p><Alert {...alert} removeAlert = {showAlert} list = {list}/></p>
      }
      <h3>Todo List</h3>
      <div className="form-control">
       <input type = "text"
              className="grocery"
              placeholder= "e.g Jogging"
              value= {name}
              onChange = {(e)=>setName(e.target.value)}
              />
          <button type="submit" className="submit-btn" >{isEditing? 'Edit':'Submit'}</button>
     </div>
     </form>
     {
       list.length>0 &&
       (<div className="grocery-container"><List items = {list} removeItem = {removeItem} editItem={editItem}/>
       <button className="clear-btn" type="submit" onClick={handleClearList}>Clear Items</button>
     
     </div>)
     }
     
    </section>
  );
}

export default App;

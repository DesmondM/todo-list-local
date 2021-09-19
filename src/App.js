import React, {useState, useEffect} from 'react';
import Alert from './Alert';
import './App.css';
import List from './List';

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
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
        //deal with edit
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
  return (
    <section className="section-center">
     <form className="grocery-form" onSubmit = {handleForm}>
      {
        alert.show && <p><Alert {...alert} removeAlert = {showAlert}/></p>
      }
      <h3>Todo List</h3>
      <div className="form-control">
       <input type = "text"
              className="grocery"
              placeholder= "e.g Jogging"
              value= {name}
              onChange = {(e)=>setName(e.target.value)}
              />
          <button type="submit" className="submit-btn">{isEditing? 'Edit':'Submit'}</button>
     </div>
     </form>
     {
       list.length>0 &&
       (<div className="grocery-container"><List items = {list} removeItem = {removeItem}/>
       <button className="clear-btn" type="submit" onClick={handleClearList}>Clear Items</button>
     
     </div>)
     }
     
    </section>
  );
}

export default App;

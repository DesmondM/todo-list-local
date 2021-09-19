import React, {useState, useEffect} from 'react';
import Alert from './Alert';
import './App.css';
import List from './List';

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID]= useState(null)
  const [alert, setAlert]= useState({show: false, msg:'dooo', type:''})

  const  handleForm =(e)=>{
    e.preventDefault();
    if(!name){
        //show alert
    }
    else if(name&& isEditing){
        //deal with edit
    }
    else{
        //deal with alert - this is a submit
        const newItem = {id: new Date().getTime().toString(), title: name};
        setList([...list, newItem]);
        setName('');
    }
  }
  return (
    <section className="section-center">
     <form className="grocery-form" onSubmit = {handleForm}>
      {
        alert.show && <p><Alert/></p>
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
       (<div className="grocery-container"><List items = {list}/>
       <button className="clear-btn" type="submit">Clear Items</button>
     
     </div>)
     }
     
    </section>
  );
}

export default App;

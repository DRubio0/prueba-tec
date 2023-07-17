
import { useState } from 'react'
import './App.css'
import { UserList } from './Components/UserList';
import { UserDetails } from './Components/UserDetails';

function App() {
  const [selectUser, setSelectUser] = useState(null);

  const handleSelectUser = (userId)=>{
    setSelectUser(userId);
  }
 
  return (
    <>
     <h1>Control de Usuarios</h1>
     <div style={{display:'flex'}}>
      <div style={{flex:'1'}}>
        <UserList onSelectUser={handleSelectUser} />
      </div>
      <div style={{flex:'1'}}>
          {selectUser && <UserDetails userId={selectUser}/>}
      </div>
     </div>
    </>
  )
}

export default App

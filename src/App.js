// import './App.scss';
// import { Nav } from './_components/Nav';


// function App() {
//   return (
//     <div className="App-container">
//       <Nav />

//           <MyRouter/>
//     </div>
//   );
// }

// export default App;
/*code cu*/
/*--------------code moi ------------------*/
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

import { history } from './_helpers';
import { Nav, Alert, PrivateRoute } from './_components';
import { Home } from './home';
import { AccountLayout } from './account';
import { UsersLayout } from './users';

import StudentList from './pages/Student';
import StudentCreate from "./pages/StudentCreate.js";
import StudentEdit from "./pages/StudentEdit.js";

export { App };

function App() {
  // init custom history object to allow navigation from 
  // anywhere in the react app (inside or outside components)
  history.navigate = useNavigate();
  history.location = useLocation();

  return (
      <div className="app-container bg-light">
          <Nav />     
          <Alert />
          <div className="container pt-4 pb-4">
          
              <Routes>
                  {/* private */}
                  <Route element={<PrivateRoute />}>
                      <Route path="/" element={<Home />} />
                      <Route path="users/*" element={<UsersLayout />} />
                      <Route path="/students" element={<StudentList />}/>
                      <Route path="/students/create" element={<StudentCreate />}/>
                      <Route path="/students/:id" element={<StudentEdit />}/>     
                  </Route>
                  {/* public */}
                  <Route path="account/*" element={<AccountLayout />} />                 
                  <Route path="*" element={<Navigate to="/" />} />
              </Routes>  
          </div>        
      </div>
  );
}


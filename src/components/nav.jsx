import { Menu } from 'antd';
import { Link } from "react-router-dom";
import UserContext from '../contexts/user';
import React, {  useContext, useState, useEffect } from 'react';



/**
 * Renders a <Nav /> component for the navigation menu.
 * @params props
 */
function Nav(props) {
		const logout = useContext(UserContext);
		
		
	

  return (  
    
  <UserContext.Consumer>
   
      {({logout, user}) => (

    <>
     
      <div className="logo" />

  
                       			
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" >Home<Link to="/"></Link></Menu.Item>
          {user.loggedIn&&    <Menu.Item key="2" >User Info<Link to="/account"></Link></Menu.Item>}
        <Menu.Item key="3" >About<Link to="/dashboard"></Link></Menu.Item>
           {!user.loggedIn&&  
              <Menu.SubMenu title="Account">
             <Menu.Item key="4" type="primary"><Link to="/login">Login</Link> </Menu.Item>
                       <Menu.Item key="5" type="primary"><Link to="/Register">Register</Link> </Menu.Item>  
              </Menu.SubMenu>
           }
         {user.loggedIn&&<Menu.Item key="7" type="primary"  ><Link to="/dog">Upload Dogs</Link>
        </Menu.Item>}

 {user.loggedIn&& user.role=="admin"&&<Menu.Item key="7" onClick={logout} type="primary"  ><Link to="/">Logout</Link>
        </Menu.Item>}


        </Menu>  
   </>
      )}
</UserContext.Consumer>

  );

}

export default Nav;
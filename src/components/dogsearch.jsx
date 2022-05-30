import React, {  useContext, useState } from 'react';
import UserContext from '../contexts/user';
import { PageHeader, Input, message } from 'antd';
import { status, json } from '/utilities/requestHandlers';
import {Table, Alert, Select,Col} from 'antd';
import { Tag, Space } from 'antd';

const { Column} = Table;
const  { Search } = Input;

function SearchDog(props) {
 
 const [press, setPress] = useState("");
 const [usersData, setUsers] = useState([]);
 const[isSearchOK,setSearch]=useState(false);
 const authbasic =props.authbasic;

const onSearch= value => {
  console.log("value ",value)
  console.log("press ",`${press}`)
 let urlPath="https://backend.ansonng0401.repl.co/api/v1/articles";
 if (press==="email"||press==="username") 
   urlPath+=`/search/?fields=${press}&q=${value}`
 else
  if(press==="username&fields=email"&&value==="")
     urlPath+=`/search/?fields=${press}`
 
  console.log("urlPath ",urlPath)
  return(fetch(`${urlPath}`,{
        method: "GET",
        headers:{"Authorization": "Basic " +`${authbasic}`}
  })
  .then(status)
  .then(json)
  .then(data => { 
   console.log("user return  ",JSON.stringify(data) );
   console.log("user data  ",data );
   setUsers(data);
   setSearch(true); 
    value="";
  })
  .catch(err => console.log("Error fetching users", err)) 
  ) 
}

const { Option } = Select;

function handleChange(value) {
  message.info("")
  
  setPress(value);
  console.log(`selected ${value}`);
}
   	

  return (
   <>
     <Col span={16}>   
        <PageHeader
            title="Search Dogs"
            subTitle="Manage Dogs"/>       
       <Search placeholder="Search Dogs"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}/>
       <Select defaultValue="all" style={{ width: 120 }} onChange={handleChange}>

        <Option value="all">Search</Option>
        </Select>	      
  {isSearchOK&&<Table dataSource={usersData}>
   <Column title="DogName" dataIndex="title" key="title" />
   <Column title="Dog Info" dataIndex="alltext" key="alltext" />
   <Column title="Dog Summary" dataIndex="summary" key="summary" />
   </Table>}
   </Col>  

    </>  
  );
  }

export default SearchDog;

  
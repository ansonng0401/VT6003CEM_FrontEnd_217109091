import React from 'react';
import PostCard from './postcard';
import { status, json } from '/utilities/requestHandlers';
import { Form, Input, Button } from 'antd';
import { Row, Col, Space } from 'antd';
import { Table, Tag } from 'antd';
import Dogedit from './editdogform';
const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
};
  
const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
};

const usernameRules = [
    { required: true, message: 'Please input dog informations!', whitespace: true }
]



class Doglist extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    }
  }

  
  componentDidMount() {
  fetch('https://backend.ansonng0401.repl.co/api/v1/articles')
  .then(status)
  .then(json)
  .then(data => {
    this.setState({ posts: data })
 //   console.log("post ", data)
  })
  .catch(err => console.log("Error fetching articles", err));


}

 onFinish = (values) => { 
  console.log('Received values of form: ', values);
  const {confirm,...data } = values;  // ignore the 'confirm' value
    console.log("Json  ",JSON.stringify(data))
    fetch('https://backend.ansonng0401.repl.co/api/v1/articles', {
        method: "put",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }        
    })
    .then(status)
    .then(json)
    .then(data => {
        // For you TODO: display success message and/or redirect
        console.log(data);  
          this.context.regComplete(); 
   //     alert(`Registration Completed! Pls. press login or green button to continue `)      
			  
    })
    .catch(errorResponse => {
        // For you TODO: show nicely formatted error message and clear form
	 console.error(errorResponse);
        alert(`Error: ${errorResponse}`);
    });  
  }
    
  

  
delete = (id) => {
        fetch("https://backend.ansonng0401.repl.co/api/v1/articles/" + id, {
            method: "DELETE",
        })
           then((response) => response.json())
            .then((result) => {
                this.setState({
                    showAlert: true,
                    alertMsg: result.response,
                    alertType: "danger",
                });
                this.fetchAllArticle();
                     alert(`Delete Dog Success`);

            })
            .catch((error) => console.log("error", error));
    };


  render() {
        
    if (!this.state.posts.length) {
      return <h3>Loading Dogs Edit/Delete Page</h3>
    }

    const cardList = this.state.posts.map(post => {


      return (


        <div style={{padding:"10px"}} key={post.id} >
        
          <Col span={6}>

          <table>

  <tr>
    <th>Dog Image</th>
    <th>Dog ID</th>
    <th>Dog Name</th>
    <th>Dog Info</th>
      <th>Dog Summary</th>

    <th>Dog Delete</th>
  </tr>
          
  <tr>
      <td>{<img alt="test" width="50px" height="50px"src={post.imageurl}/>}</td>
    <td>{post.id}</td>
    <td>{post.title}</td>
    <td>{post.allText}</td>
       <td>{post.summary}</td>

     <td>
<Button onClick={() => this.delete(post.id)}>Delete</Button>
     </td>
  </tr>

</table>
   
 


          </Col>   
          




</div>

      )
    });
    return (
      <Row type="flex" justify="space-around">
        {cardList}
      </Row>
    );
  }
}

export default Doglist;

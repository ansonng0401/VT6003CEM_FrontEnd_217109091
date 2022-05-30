import React, {  useContext } from 'react';
import { Form, Input, Button } from 'antd';
import { status, json } from '/utilities/requestHandlers';
import  GoHomeButton  from './goHome';
import UserContext from '../contexts/user';
import { Row, Col, Space } from 'antd';
import { Avatar, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { InputNumber } from 'antd';
import ImageUpload from './ImageUpload'

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
};
const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
};
const emailRules = [
    {type: 'email', message: 'The input is not valid E-mail!'},
    {required: true, message: 'Please input your E-mail!' }
];

const passwordRules = [
    { required: true, message: 'Please input your password!' }
];

const dog = [
    { required: true, message: 'Please input an dog id!', }
]

const confirmRules = [
    { required: true, message: 'Please confirm your password!' },
    // rules can include function handlers in which you can apply additional logic
    ({ getFieldValue }) => ({
        validator(rule, value) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }
            return Promise.reject('The passwords that you entered do not match!');
        }
    })
];
const usernameRules = [
    { required: true, message: 'Please input dog informations!', whitespace: true }
]



class DogEdit extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected   
    };
   this.onFinish = this.onFinish.bind(this);
    
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

  static contextType = UserContext;  
   onFinish = (values) => { 
    console.log('Received values of form: ', values);
    let urlPath="https://BACKEND.ansonng0401.repl.co/api/v1/articles";
    urlPath+=`/${values.id}`
    console.log("Update Path ", urlPath)
    const {...data} = values;
      console.log("Json  ",JSON.stringify(data))
      fetch(urlPath, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(status)
    .then(json)
    .then(data => {
      console.log(data);
       alert(`Edit Dog Success`);
    })
    .catch(errorResponse => {
      message.info(`No Dog Record`)
	    console.error(errorResponse);
    });  
  }
  
  render() { 
   
     return (    


       
       <center> <ImageUpload /><br></br>
  <hr></hr><br></br>
        <Form {...formItemLayout} name="updatedog" scrollToFirstError onFinish={this.onFinish}>
        <h2>Edit Dog Information</h2>
        <p></p>

                 <Form.Item name="id" label="Dog ID" >
            <InputNumber min={1} />
        </Form.Item>
        <Form.Item name="title" label="Dog Name" rules={usernameRules}>
            <Input />
        </Form.Item>
        
        <Form.Item name="allText" label="Dog Description" rules={usernameRules}>
            <Input />
        </Form.Item>
          
        <Form.Item name="summary" label="Dog Summary" rules={usernameRules} >
            <Input />
        </Form.Item>
    

            <Form.Item name="imageurl" label="Image URL" rules={usernameRules}>
            <Input />
        </Form.Item>
          
        <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit"  >
                Update Dog
            </Button>
        </Form.Item>
      </Form>

         
         </center>
    );
  };
};

export default DogEdit;
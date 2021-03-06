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



class DogForm extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected   
    };
   this.onFinish = this.onFinish.bind(this);
    
   }
   
  static contextType = UserContext;  
  
  onFinish = (values) => { 
  console.log('Received values of form: ', values);
  const {confirm,...data } = values;  // ignore the 'confirm' value

    console.log("Json  ",JSON.stringify(data))

    fetch('https://backend.ansonng0401.repl.co/api/v1/articles', {
        method: "POST",
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
			     alert(`Create DogSuccess`);
    })
    .catch(errorResponse => {
	 console.error(errorResponse);
        alert(`Error: ${errorResponse}`);
    });  
  }
    


render() {
 // if(this.context.user.registerOK==true) 
 //   {
 //     return(<div>
 //      <h2> Add Dog Success ! </h2>
 //    </div>)
   
      
 //      }
 // else
 // {
    return (
<center> <ImageUpload /><br></br>
  <hr></hr><br></br>
      <Form {...formItemLayout} name="dogupload" scrollToFirstError onFinish={this.onFinish}>

         <Form.Item name="title" label="Dog Name" rules={usernameRules}>
            <Input />
        </Form.Item>
              <Form.Item name="allText" label="Dog Info" rules={usernameRules}>
            <Input />
        </Form.Item>
            <Form.Item name="summary" label="Dog Summary" rules={usernameRules}>
            <Input />
        </Form.Item>
        
               <Form.Item name="imageurl" label="Image URL" rules={usernameRules}>
            <Input />
        </Form.Item>
    

        <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit"  >
                Upload Dog
            </Button>
      
        </Form.Item>
        
      </Form>
</center>
    );
    }
  };



// }

export default DogForm;
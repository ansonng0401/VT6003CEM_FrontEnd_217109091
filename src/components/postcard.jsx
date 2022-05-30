import React from 'react';
import { Card } from 'antd';
import PostIcon from './posticon';
const { Meta } = Card;
import { Link} from 'react-router-dom'; 

class PostCard extends React.Component {

  render() {
        return( 
      <Card
        style={{ width: 320 }}
       cover={<img alt="test" src={this.props.imageurl}/>}
 
        hoverable={true}
        actions={[
//           <PostIcon type="like" countLink={this.props.links.likes} 
//           handleToggle={this.toggleLike} id={this.props.id}
// />,
//           <PostIcon type="message" />,
//           <PostIcon type="pushpin" />
        ]}>
        

  <p>  Dog Name: {this.props.title}</p>
    <p>   Dog Info:  {this.props.alltext}</p>
    <p>   Dog Summary:  {this.props.summary}</p>
 
 
      </Card>
      
    );
  }
}

export default PostCard; 

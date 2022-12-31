import React,{Component} from 'react';
import axios from 'axios';
import './styles.css';


export default class PostDetails extends Component{
  constructor(props){
    super(props);

    this.state={
      post:{}
    };
  }

  componentDidMount(){
    const id = this.props.match.params.id;

    axios.get(`/post/${id}`).then((res)=>{
      if(res.data.success){
        this.setState({
          post:res.data.post
        });
        console.log(this.state.post);
      }
    });
  }
  


    render(){
      const{topic,description,postCategory} = this.state.post;
      return(
          <div className="container" style={{marginTop:'100px'}}>
            <h4 className="m-5">{topic}</h4>
            <hr/>

          <d1 className="row m-5">
            <dt className="col-sm-3">Description</dt>
            <dd className="col-sm-9">{description}</dd>
            
            <dt className="col-sm-3">Post Category</dt>
            <dd className="col-sm-9">{postCategory}</dd>

          </d1>
        
          </div>
      )
    }
  }
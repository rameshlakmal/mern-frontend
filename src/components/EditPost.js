import React,{Component} from 'react';
import axios from 'axios';
import swal from 'sweetalert';


export default class EditPost extends Component{

  constructor(props){
    super(props);
    this.state={
      topic:"",
      description:"",
      postCategory:""
    }
  }

handleInputChange = (e)=>{
  const{name,value} = e.target;

  this.setState({
    ...this.state,
    [name]:value
  })
}

onSubmit= (e)=>{
  
  e.preventDefault();
  const id = this.props.match.params.id;
  const {topic,description,postCategory} = this.state;

  const data = {
    topic:topic,
    description:description,
    postCategory:postCategory
  }
  console.log(data);

  axios.put(`/post/update/${id}`,data).then((res)=>{
    if(res.data.success){
      swal("Good job!", "Post Updated Successfull...!", "info");
      this.setState({
        topic:"",
        description:"",
        postCategory:""
      })
    }
  })
}

  
  componentDidMount(){
    const id = this.props.match.params.id;

    axios.get(`/post/${id}`).then((res)=>{
      if(res.data.success){
        this.setState({
          topic:res.data.post.topic,
          description:res.data.post.description,
          postCategory:res.data.post.postCategory

        });
        console.log(this.state.post);
      }
    });
  }


  render(){
    return(
        <div className="container col-5" style={{marginTop:'100px'}}>
            <h3 className="font-weight-bold text-center mt-5"><u>Edit post</u></h3>
          <form className="needs-validation m-5" noValidate>
            <div className="form-group mb-4">
              <label for="topic" className='mb-3'>Topic</label>
              <input type="text" className="form-control " id="topic" placeholder="Enter Topic" name='topic' value={this.state.topic} onChange={this.handleInputChange}></input>
            </div>

            <div className="form-group mb-4">
              <label for="description" className='mb-3'>Description</label>
              <textarea type="text" className="form-control " id="description" placeholder="Enter Discription" name='description' value={this.state.description} onChange={this.handleInputChange}></textarea>
            </div>

            <div className="form-group mb-4">
              <label for="postCategory" className='mb-3'>Post Category</label>
              <input type="text" className="form-control" id="postCategory" placeholder="Enter Post Category" name='postCategory' value={this.state.postCategory} onChange={this.handleInputChange}></input>
            </div>

              <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Update</button>
            </form>
        </div>
    )
  }
  }
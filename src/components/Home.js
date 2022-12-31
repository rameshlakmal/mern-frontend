import React, {Component} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import './styles.css';

export default class Home extends Component{
  constructor(props){
    super(props);
    this.state={
      posts:[]
    };
  }

componentDidMount(){
  this.retrievePosts();
}

retrievePosts(){
  axios.get("/posts").then(res=>{
    if(res.data.success){
      this.setState({
        posts:res.data.existingPosts
      });
      console.log(this.state.posts)
    }
  });
}

onDelete=(id)=>{
    axios.delete(`/post/delete/${id}`).then((res)=>{
        swal("Deleted", "Data Record Deleted Successfull...!", "warning");
        this.retrievePosts();
    })
}

filterData(posts,searchKey){
    const result = posts.filter((post)=>
    post.topic.toLowerCase().includes(searchKey)||
    post.description.toLowerCase().includes(searchKey)||
    post.postCategory.toLowerCase().includes(searchKey)
    )
    this.setState({posts:result})
  }

handleSearchArea = (e)=>{
  const searchKey = e.currentTarget.value;

  axios.get("/posts").then(res=>{
    if(res.data.success){
      this.filterData(res.data.existingPosts,searchKey)
    }
  });

}


  render(){
    return(
      <div className='container' style={{marginTop:'100px'}}>
        <h2 className='text-center mt-5'><u>All Posts</u></h2>
        <input className="form-control mr-sm-2 col-3 float-right mb-5" type="search" placeholder="Search" name='searchQuery' onChange={this.handleSearchArea}></input>

        <table className='table table-hover mt-5 pl-5'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Topic</th>
              <th scope='col'>Description</th>
              <th scope='col'>Post Category</th>
              <th scope='col' className='text-center'>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((posts,index)=>(
              <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>
                <a href ={`/post/${posts._id}`} style={{textDecoration:'none'}}>
                    {posts.topic}</a></td>
                <td>{posts.description}</td>
                <td>{posts.postCategory}</td>
                <td className='text-center'>
                  <a className='btn btn-warning' href={`/edit/${posts._id}`}>
                    <i className='fas fa-edit'></i>&nbsp;Edit
                  </a>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <a className='btn btn-danger' href="#" onClick={()=>this.onDelete(posts._id)}>
                  <i className="fa-regular fa-trash-can"></i>&nbsp;Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    <button className='btn btn-success mb-5 mt-5 ml-5'>
        <a href="/add" style={{textDecoration:'none',color:'white'}}>Create New Post</a></button>
      </div>
    )
  }
}
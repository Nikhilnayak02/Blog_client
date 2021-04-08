import React ,{useState,useContext,useEffect} from 'react'
import axios from 'axios'
import {Form,Button,Comment,Divider,Segment,Header} from 'semantic-ui-react'
import {AuthContext} from '../context/auth'
// import { useAlert } from 'react-alert'
import moment from 'moment'


export default function PostForm() {

    const {user} = useContext(AuthContext)
    const [posts,setPosts]=useState([])
    const [blogs,setBlogs]=useState([])
       
    // useEffect(()=>{
    //     const interval=setInterval(()=>{
    //         axios.get('http://127.0.0.1:5000/users/allblogs')
    //     .then(res=>{
    //         // console.log()
    //         let sorteddate= res.data.sort((a,b)=>new Date(...a.created_on.split('/').reverse())-new Date(...b.created_on.split('/').reverse()));
    //         setBlogs(sorteddate)
    //         console.log(sorteddate)
    //     }).catch((err)=>{
    //         console.log(err);
    //     })
    //     },1000);
    //     return ()=>clearInterval(interval)
    // },[])
    
    function clearinput(){
       document.getElementById('clear1').value="";
       setBlogs(blogs);   
    }
        useEffect(()=>{
            axios.get('http://127.0.0.1:5000/users')
            .then(res=>{
                // console.log(res)
                setPosts(res.data)
            }).catch((err)=>{
                console.log(err);
            })
        },[])


        // useEffect(()=>{
        //     axios.get('http://127.0.0.1:5000/users/allblogs')
        //     .then(res=>{
        //         // console.log()
        //         setBlogs(res.data)
        //     }).catch((err)=>{
        //         console.log(err);
        //     })
        // },[])
   

    // const context = useContext(AuthContext)
    const [values,setValues]=useState({
        'post':''
    })

    const onChange=(e)=>{
        setValues({...values,[e.target.name]:e.target.value})
    }

    // const alert = useAlert()
    // const forceUpdate = React.useReducer(bool => !bool)[1];

    // const renderpost=(e)=>{
        
    // }
    // const bp=blogs.reverse()
    // console.log(bp)
    const onSubmit=(e)=>{
        
        e.preventDefault();
        // setBlogs({});
        const b =user.email        
        const a = posts.find(o=>o.email===b)
        if(values.post!==""){
            axios.post('http://127.0.0.1:5000/users/'+a.user_id,values)
            values.post=""
        }else{
            console.log("The post is empty") 
        }
         
            // alert(<div style={{ color: 'red' }}>"The post is empty"</div>)         
    }

    return (
        <div>

            <Comment.Group>
                <Comment>
                <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/steve.jpg' />
                <Comment.Content>
                    <Comment.Author as='a'>{user.name}</Comment.Author>
                    <Comment.Metadata>
                    <div>2 days ago</div>
                    </Comment.Metadata>
                   
                    <Form onSubmit={onSubmit} reply>
                    <Form.TextArea placeholder='Write your blog post......' name="post" id="clear1" onChange={onChange} value={values.body} />
                    <Button
                        content='Post'
                        labelPosition='left'
                        icon='edit'
                        primary
                        type="submit" onClick={clearinput}  color="teal"
                                        />
                    </Form>
                </Comment.Content>
                </Comment>
            </Comment.Group>

            <Divider section />
             {blogs.map(blog=><Segment><Header as='h3'>{blog.post}</Header></Segment>)}   
        </div>
    )
}

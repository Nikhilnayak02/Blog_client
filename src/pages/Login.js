import React,{useState,useEffect,useContext} from 'react'
import {Button,Form} from 'semantic-ui-react' 
import axios from 'axios'
import { useAlert } from 'react-alert'

import {AuthContext}  from "../context/auth"


export default function Login(props) {
    const context = useContext(AuthContext)
    const [values,setValues]=useState({
        name:'',
        email:''
        // password:''
    })

    const [posts,setPosts]=useState([])
    const alert = useAlert()
    useEffect(()=>{
        axios.get('http://127.0.0.1:5000/users')
        .then(res=>{
            // console.log(res)
            setPosts(res.data)
            // console.log(posts)
           
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    const [errors]=useState({});
   


    const onChange=(e)=>{
        setValues({...values,[e.target.name]:e.target.value})
    }

    const onSubmit=(e)=>{
        e.preventDefault();
        // console.log(posts[1].name);
        posts.map((post)=>{
        if(post.name===values.name&&post.email===values.email){
            console.log("success");
            context.login(values)
            props.history.push('/')
            alert.show("Logged in successfully")

        }
        else
        // alert("Password is invalid")
        console.log("cant login");
        props.history.push('/')
        })}


    //     if(posts[i].name===values.name&&posts[i].email===values.email){
    //         console.log("success");
    //     }
    //     else
    //     console.log("cant login");
    // }
    

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate>
                <h1>Login</h1>
                <Form.Input
                  label='name'
                  placeholder="name.."
                  name="name"
                  value={values.username}
                  onChange={onChange} required='true' />
                  <Form.Input
                  label='Email'
                  placeholder="Email.."
                  name="email"
                  value={values.email}
                  onChange={onChange} required='true'/>
                  {/* <Form.Input
                  label='password'
                  placeholder="password.."
                  name="password"
                  value={values.password}
                  onChange={onChange}/> */}

                  <Button type="submit" primary>
                      Login
                  </Button>
                 </Form>

                  {Object.keys(errors).length>0 &&(
                    <div className="ui error message">
                     <ul className="list">
                        {Object.values(errors).map(value=>(
                            <li key={value}>{value}</li>
                        ))}
                     </ul>

                 </div>
                  )}

                 
        </div>
    )
}

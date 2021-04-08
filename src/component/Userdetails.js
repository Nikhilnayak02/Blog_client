
import { Card,Image,Button,Modal,Header,Form } from 'semantic-ui-react'
import React ,{useState,useContext,useEffect} from 'react'
import axios from 'axios'
import {AuthContext} from '../context/auth'


export default function Userdetails(props) {

    const {user} = useContext(AuthContext)
    const [posts,setPosts]=useState([])

    const [values,setValues]=useState({
        'name':'',
        'email':''
    })

    const onChange=(e)=>{
        setValues({...values,[e.target.name]:e.target.value})
    }


        useEffect(()=>{
        axios.get('http://127.0.0.1:5000/users/allblogs')
        .then(res=>{
            // console.log()
            setPosts(res.data).reverse()
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    useEffect(()=>{
        axios.get('http://127.0.0.1:5000/users')
        .then(res=>{
            console.log(res)
            setPosts(res.data)
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    

    const a = posts.find(o=>o.name===user.name)
    // console.log(a.blogposts[0].post)
    
    // a.blogposts.map(b=>console.log(b.post))
    
    const [open, setOpen] = React.useState(false)
    const onSubmit=(e)=>{
        e.preventDefault();
        console.log(values);
        const b =user.email        
        const a = posts.find(o=>o.email===b)
            axios.put('http://127.0.0.1:5000/user/'+a.user_id,values).then(resp=>console.log(resp)) 
            alert.show(<div style={{ color: 'green' }}>"Successfully Updated"</div>)
        }
        const onChange1=(e)=>{
            setValues({...values,[e.target.name]:e.target.value})
        }

    return (
        <Card>
{/* ---------------------------------------------------------------- */}
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={  <Button  inverted color='green'>
      Update Account
      </Button>}
    >
      <Modal.Header>Update User </Modal.Header>
      <Modal.Content image>
        <Image size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' wrapped />
        <Modal.Description>
          <Header> Profile Image</Header>
                <Form onSubmit={onSubmit} noValidate>
                <h1>Register</h1>
                <Form.Input
                  label='name'
                  placeholder="name.."
                  name="name"
                  value={values.username}
                  onChange={onChange1}  required />
                  <Form.Input
                  label='Email'
                  placeholder="Email.."
                  name="email"
                  value={values.email}
                  onChange={onChange1}  required/>
                  <Button type="submit" onClick={() => setOpen(false)} primary>
                      Register
                  </Button>
                 </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
            
 {/* ==============================================================      */}

        <Image src='https://react.semantic-ui.com/images/avatar/large/daniel.jpg' wrapped ui={false} />
        <Card.Content>
        <Card.Header><b>Name : </b>{props.user}</Card.Header>
        <Card.Meta>
            <span className='date'>Joined in 2021</span>
        </Card.Meta>
        <Card.Description>
          {/* {
              a.blogposts.map(b=><p>{b.post}</p>)
          } */}
        </Card.Description>
        </Card.Content>
        <Card.Content extra>
     

        <Button inverted color='red'>
        Delete Account
        </Button>
  
        </Card.Content>
    </Card>
    )
}

import React,{useState,useEffect,useContext} from 'react';
import axios from 'axios'
// import DataFetching from './DataFetching'
import { Grid,Card,Feed,Icon,Image } from 'semantic-ui-react'

import PostCard from '../component/PostCard'
import PostForm from '../component/PostForm'
import {AuthContext} from '../context/auth'
import Userdetails from '../component/Userdetails';


export default function Home() {
    const [posts,setPosts]=useState([])
    const {user}=useContext(AuthContext)
    const [blogs,setblogs]=useState([])

    // console.log(user.name)
    useEffect(()=>{
        axios.get('http://127.0.0.1:5000/users')
        .then(res=>{
            // console.log(res)
            setPosts(res.data)
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    useEffect(()=>{
        axios.get('http://127.0.0.1:5000/users/allblogs')
        .then(res=>{
            // console.log()
            setblogs(res.data)
        }).catch((err)=>{
            console.log(err);
        })
    },[])


    return (

        
            <Grid >
              <Grid.Column width={4}>
               
              {user && (
                          <Grid.Column>
                              <Userdetails user={user.name}/>
                          </Grid.Column>
                      )}
              

              </Grid.Column>
              <Grid.Column width={8}>
               
                          {user && (
                          <Grid.Column>
                              <PostForm/>
                             
                                    
                                        
                          </Grid.Column>
                      )}


              </Grid.Column>
              <Grid.Column width={4}>
              <Grid.Row>


                       <Card>
                            <Card.Content>
                            <Card.Header>New Users</Card.Header>
                            </Card.Content>
                            <Card.Content>
                            
                                     {  posts && posts.map(post=>(
                                            <Feed.Summary key={post.user_id} style={{marginBottom:20}} >
                                                <PostCard post={post}/>
                                            </Feed.Summary>
                                        ))
                                        }
                                   
                                   
                            </Card.Content>
                        </Card>


                  </Grid.Row>
              </Grid.Column>
            </Grid>
          )































        // <div>
        //    {/* <DataFetching/> */}
        //    <Grid columns={3}>
        //           <Grid.Row>
        //             <h1>Recent Posts</h1>
        //           </Grid.Row>
        //           <Grid.Row>
        //               {user && (
        //                   <Grid.Column>
        //                       <PostForm/>
        //                   </Grid.Column>
        //               )}
        //             { 
        //                 posts && posts.map(post=>(
        //                     <Grid.Column key={post.user_id} style={{marginBottom:20}} >
        //                         <PostCard post={post}/>
        //                     </Grid.Column>
        //                 ))
        //             }
        //           </Grid.Row>
        //     </Grid>
           
        // </div>
    
}

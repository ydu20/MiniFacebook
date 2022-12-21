import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import './Home.css';
import Post from '../Post';
import SharePost from '../SharePost';
import axios from 'axios';


function Wall() {
    const auth = localStorage.getItem("authenticated");
    const routeParams = useParams();

    let [allPosts, setPostList] = useState([]);

    var addOneMorePost = ((val) =>  {
        var eq = allPosts;
        eq = eq.push(val)
        setPostList((<h1></h1>));
    });

	useEffect(() => {
        const otherUser = routeParams.username;
        
        // Get user wall posts
        var user1 = {
            username : otherUser,
        };
        axios.post('http://localhost:8080/getPostsUserWall', user1).then((res) => {
            console.log(res.data);

            var postList = res.data;

            postList = postList.map((temp) => {
                return(
                    <div>
                    <Post
                    username={temp.author}
                    content={temp.content}
                    likedUserIds={"temp.likedUserIds"}
                    taggedUserIds={"temp.taggedUserIds"}
                    commentList={temp.comments}
                    recipient = {temp.recipient}
                    timestamp = {temp.timestamp}
                    />
                    <br></br>
                    </div>
                );
            });
            console.log(postList);
            setPostList(postList);

        let interval
        
        interval = setInterval(() => {
            // Get User Wall (Profile Posts)
            axios.post('http://localhost:8080/getPostsUserWall', user1).then((res) => {
                var postList = res.data;
                postList = postList.map((temp) => {
                    return(
                            <div>
                            <Post
                            username={temp.author}
                            content={temp.content}
                            likedUserIds={"temp.likedUserIds"}
                            taggedUserIds={"temp.taggedUserIds"}
                            commentList={temp.comments}
                            recipient = {temp.recipient}
                            timestamp = {temp.timestamp}
                            />
                            <br></br>
                            </div>
                    );
                });
            setPostList(postList);
        }).catch((error) => {
            console.log(error)
        });


    }, 7000);
        }).catch((error) => {
            console.log(error)
        });
	}, [JSON.stringify(allPosts)]);
	
    if (!auth) {
        return <Navigate to = "/login"/>;
    } else {
        return (
            <div classname="color1">
            <div classname="flexNeeded">
                <div classname="flexNeeded">
                    
                    <br></br> <br></br>

                    <SharePost usernameOfPage={routeParams.username} pListFunc ={addOneMorePost} isFriend={true} />
                    
                    <br></br>
                    <div className = "overcontainer2">
                        <h2>Wall Posts</h2>
                    </div>
                    <div classname="padNeeded">
                        {allPosts}
                    </div>
                </div>
            </div>  
            </div>
        )
    }


}

export default Wall;
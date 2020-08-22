import React,{useState, useEffect} from 'react'
import '../styles/comments.css'
import 'materialize-css'
import {useStateValue} from '../StateProvider'
import axios from "axios"
function Comments({movieId, movieTitle}) {

    
    const [{user}, dispatch] = useStateValue()
    const [text, setText] = useState("")
    const [commentSend,setCommentSend] = useState(false)
    const [comments,setCommnets] = useState([])
    const [errors, setErrors]  = useState([])
    useEffect(()=>{
        if(movieId!==undefined)
            axios.get(`https://limitless-reef-63867.herokuapp.com/api/comments/?movie=${movieId}`).then(
                response =>{
                  
                    setCommnets(response.data)
                    setCommentSend(false)
                }
            )
        
       
    },[movieId,commentSend])
    
    const onSubmitButtonClick = (event) =>
    {
        event.preventDefault()
        if(text.length <=10)
        {
            setErrors(<span className="comment__errors">* Your comment length must be more than 10 letters</span>)
        }
        else if(!user)
        {
            setErrors(<span className="comment__errors">* You have to be registered to post comments</span>)
        }
        else
        {
        axios.post("https://limitless-reef-63867.herokuapp.com/api/comments/",{
            username:user,
            body:text,
            movie:movieId,
           
            
        },{
            headers:{
                Authorization:'JWT '+ localStorage.getItem('access')
            }
        }).then(
            setCommentSend(true),
            setText("")
        )
        }
    }
    const convertDate =(date) =>
    {
    
        // Get day, full month name and year 
        date = new Date(date)
        const month = date.toLocaleString('en-GB', {month:'long'})
        return date.getDate()+" "+month+" "+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()
  
    
    }
    return (
        <div className="comments">
            <div className="comments__all">
                {comments?.map(comment=>{
                    return(
                        <div key={comment.id} className="comments__item">
                            <span className="comments__item-username">{comment.username}:</span>
                            <span className="comments__item-date">{convertDate(comment.created_on)}</span>
                            <p className="comments__item-body">{comment.body}</p>
                          </div>
                    )
                   
                })}
              
            </div>
            <h6>Add your thoughts about this movie:</h6>
            <form className="add_comments">
                <textarea value={text} onChange={event =>setText(event.target.value)}  className="comments__textarea"></textarea>
                {errors}
                <button onClick={onSubmitButtonClick} className="comments__submit" type="submit">SEND <i class="material-icons">send</i></button>
            </form>

        </div>
    )
}

export default Comments

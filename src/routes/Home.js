import { dbService } from "fBase"
import React, { useEffect, useState } from "react"

const Home = ({userObj}) => {
    console.log(userObj)

    const [nweet, setNweet] = useState("")
    const [nweets, setNweets] = useState([])

    const getNweets = async()=>{
    const dbNweets = await dbService.collection("nweets").get()
       dbNweets.forEach((doc) => {
           const nweettObj = {
               ...doc.data(),
               id:doc.id
           }
           setNweets((prev)=>[nweettObj,...prev])
        })
    }
    useEffect(()=>{
        getNweets()
    },[])

    const onSubmit = async(event)=>{
        event.preventDefault()
        await dbService.collection("nweets").add({
            text:nweet,
            createdAt : Date.now(),
            creatorId:userObj.uid
        })
        setNweet("")
    }
    const onChange =(event) =>{
        const {target:{value}} = event;
        setNweet(value)
    }
    return(
        <div>
            <form onSubmit={onSubmit}> 
                <input 
                type="text" 
                placeholder="what's your mind" 
                maxLength={120} 
                onChange={onChange} 
                value={nweet}/>
                <input type="submit" value="Nweet" />
            </form>
            <div>
                {nweets.map((nweet)=>(
                    <div key={nweet.id}>
                        <h4>{nweet.text}</h4>
                    </div>
                ))}
            </div>
        </div>
        
    )
}

export default Home;
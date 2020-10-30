import Nweet from "components/Nweet"
import { dbService } from "fBase"
import React, { useEffect, useState } from "react"

const Home = ({userObj}) => {
    const [nweet, setNweet] = useState("") //form 위한 state
    const [nweets, setNweets] = useState([])

    useEffect(()=>{
        //onSnapshot은 데이터베이스에 변화가 있을때마다 알림
        //snpashot을 받을때, 배열을 만들게됨
        //이 배열을 setNweets로 받음
        dbService.collection("nweets").onSnapshot(snapshot=>{
            const nweetArray = snapshot.docs.map((doc)=>({
                //모든 배열의 아이템은 이렇게 생김
                id:doc.id,
                ...doc.data()
            }))
            setNweets(nweetArray)
        }
        ) 
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
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner = {nweet.creatorId === userObj.uid}/>
                ))}
            </div>
        </div>
        
    )
}

export default Home;
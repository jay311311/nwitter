import Nweet from "components/Nweet"
import { dbService, storageService } from "fBase"
import React, { useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid';


const Home = ({userObj}) => {
    const [nweet, setNweet] = useState("") //form 위한 state
    const [nweets, setNweets] = useState([])
    const [attachment, setAttachment] = useState()

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

        //fileRef는 공기중에있는 파일에 
        //데이터를 넣어서 진짜 파일로 만들예정
        let attachmentUrl = "";
        if(attachment !== ""){
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`)
            const response = await  attachmentRef.putString(attachment, "data_url")
            attachmentUrl = await response.ref.getDownloadURL()
        }
        const nweetObj = { 
            text:nweet,
            createdAt : Date.now(),
            creatorId:userObj.uid,
            attachmentUrl
        }

        await dbService.collection("nweets").add(nweetObj)
        setNweet("") 
        setAttachment("")
    }
    const onChange =(event) =>{
        const {target:{value}} = event;
        setNweet(value)
    }

    const onFileChange =(event) =>{
        const {target:{files}} =event

       const theFile =  files[0]
       const reader  = new FileReader()

       reader.onloadend = (finishedEvent) =>{
           const {currentTarget:{result}} = finishedEvent
           setAttachment(result)
       }
       reader.readAsDataURL(theFile)
    }

    const onClearAttachment =()=>{setAttachment(null)}

    return(
        <div>
            <form onSubmit={onSubmit}> 
                <input 
                type="text" 
                placeholder="what's your mind" 
                maxLength={120} 
                onChange={onChange} 
                value={nweet}/>
                <input type="file" accept="image/*" onChange={onFileChange}/>
                <input type="submit" value="Nweet" />
                {attachment&& (
                    <div>
                        <img src={attachment} alt={attachment} width="50px" height="50px"/>
                        <button onClick={onClearAttachment}>clear</button>
                    </div>
                    )}
            </form>
            <div>
                {nweets.map((nweet)=>(
                    <Nweet 
                        key={nweet.id} 
                        nweetObj={nweet} 
                        isOwner = {nweet.creatorId === userObj.uid}
                        />
                ))}
            </div>
        </div>
        
    )
}

export default Home;
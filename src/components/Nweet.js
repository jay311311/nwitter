import { dbService } from "fBase"
import React, { useState } from "react"

const Nweet = ({nweetObj,isOwner}) =>{
    const [editing, setEditing] = useState(false) //edting 모드 확인을 위한  true & false
    const [newNweet, setNewNweet] = useState(nweetObj.text) //input에 입력된 text를 업데이트 해준다

    const onDeleteClick = async()=>{
        const ok = window.confirm("are you sure you want to delete this nweet?")
        
        if(ok){
            // delete nweets
            await    dbService.doc(`nweets/${nweetObj.id}`).delete()
        }
    }

    const toggleEditing = () => setEditing((prev) => !prev)

    const onChange = (event) => {
        const {target:{value}} = event
        setNewNweet(value)  
    }

    const onSubmit= async(event) =>{
        event.preventDefault()
        console.log(nweetObj, newNweet)
        await   dbService.doc(`nweets/${nweetObj.id}`).update({
            text:newNweet
        })
        setEditing(false)
    }
    return(
        <div>
            {editing ? (<>
               {isOwner && (<>
                <form onSubmit={onSubmit}>
                    <input type="text" value={newNweet} onChange={onChange} required/>
                    <input type="submit" value="update nweet" />
                </form>
                <button onClick={toggleEditing}>cancel</button>
                </>
                )} 
                </>)
                : (
                <>
                <h4>{nweetObj.text}</h4>
                {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} /> }
                {isOwner && (
                    <>
                        <button onClick={onDeleteClick}>delete nweet</button>
                        <button onClick={toggleEditing}>edit nweet</button>
                    </>
                    )
                }</>
                )
            }
           
            
        </div>
    )
}

export default Nweet;
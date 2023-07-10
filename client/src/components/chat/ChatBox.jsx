import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { ChatContext } from "../../context/ChatContext"
import { useFetchRecipientUser } from "../../hooks/useFetchRecipients"

const ChatBox=()=>{
    const {user} = useContext(AuthContext)
    const {currentChat} = useContext(ChatContext)
    const {recipientUser} = useFetchRecipientUser(currentChat, user)
        if(!recipientUser) return(
            <p style={{textAlign: 'center', width: '100%'}}>
                No conversation selected yet
            </p>
        );

    
    return <>Chat Box</>
}
export default ChatBox
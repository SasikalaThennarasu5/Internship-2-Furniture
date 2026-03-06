import { useState } from "react";
import api from "../services/api";

function Chatbot(){

const [message,setMessage] = useState("")
const [image,setImage] = useState(null)
const [messages,setMessages] = useState([])

const sendMessage = async () => {

const formData = new FormData()
formData.append("message",message)

if(image){
formData.append("image",image)
}

const res = await api.post("chatbot/",formData)

setMessages([
...messages,
{sender:"user",text:message},
{sender:"bot",text:res.data.reply,products:res.data.products}
])

setMessage("")
setImage(null)

}

return(

<div className="fixed bottom-6 right-6 w-80 bg-white shadow-xl border rounded-lg">

<div className="p-3 bg-black text-white">
AI Interior Assistant
</div>

<div className="h-80 overflow-y-auto p-3">

{messages.map((m,i)=>(
<div key={i}>

<p>{m.text}</p>

{m.products && m.products.map(p=>(
<p key={p.id}>{p.name}</p>
))}

</div>
))}

</div>

<div className="p-2 border-t">

<input
type="text"
value={message}
onChange={(e)=>setMessage(e.target.value)}
className="w-full border p-1"
placeholder="Ask about sofa or upload room photo"
/>

<input
type="file"
onChange={(e)=>setImage(e.target.files[0])}
/>

<button
onClick={sendMessage}
className="bg-black text-white px-3 py-1 mt-1"
>
Send
</button>

</div>

</div>

)

}

export default Chatbot
// importing  axios
import axios from 'axios'
let notesListRootElement=document.querySelector(".notesList")
let noteBtn=document.getElementById('createNoteButton')
// creating the variable for storing updating id and at 1st it is null
let updatingID=null
let notes=[]
noteBtn.addEventListener('click',async()=>{
  const first_name=document.getElementById('first_name').value
 const last_name=document.getElementById('last_name').value
 const email=document.getElementById('email').value
 const phone=document.getElementById('phone').value
  const role=document.getElementById('role').value
  const available=document.querySelector('input[name="available"]:checked')?
  document.querySelector('input[name="available"]:checked').value:'';
  
  if(!first_name||!last_name||!email||!phone||!role){
    document.getElementById('warning-msg').innerHTML="All fields are required"
  }
  let body={first_name,last_name,email,phone,role,available}
  if(updatingID){
    let result=await axios.put(`http://localhost:3000/api/v1/players/update-players/${updatingID}`,body)
     updatingID=null
     noteBtn.innerText='Submit'
  }else{
  let res=await axios.post("http://localhost:3000/api/v1/players/add-players",body)//passing the data in body to db
   document.getElementById('warning-msg').innerHTML=""
}
  renderElementsToScreen()//if the player is added it automatically updates the pg without refreshing the page

 

})
async function renderElementsToScreen(){
// ensuring the delete note is cleared before refreshing the pg
notesListRootElement.innerText=''
let players=await axios.get("http://localhost:3000/api/v1/players/get-players")//fetching data from db and using async and await as apis always returns promise and to handle it we use async and await
 console.log(players.data.data)//see the only data from db not entire object
notes=players.data.data//updating notes with players data
// ensuring notes i s an array  before using forEach
  if(Array.isArray(notes)){
    notes.forEach(note=>{
      renderNoteToList(note,note._id)
    })
  }
}


function renderNoteToList(note,unquieID){
 
 
  let noteDiv=document.createElement('div')
  noteDiv.classList.add('note',`note${unquieID}`)
  let noteTitle=document.createElement('h4')
  let noteContent=document.createElement('p')
  let playermobile=document.createElement('p') 
  let playeravailability=document.createElement('p')
  let playerrole=document.createElement('p')
  let noteDeleteButton=document.createElement('button')
  let updateButton=document.createElement('button')
  noteTitle.innerText=`Name: ${note.first_name} ${note.last_name}`
  noteContent.innerText=`Email: ${note.email}`
  playermobile.innerText=`Phone: ${note.phone}`
  playerrole.innerText=`Role: ${note.role}`
  playeravailability.innerText=`Availabilty: ${note.available?'Yes':'No'}`

  noteDeleteButton.innerText='Delete'
  updateButton.innerText='Update'

  updateButton.style.marginLeft='12px'

  
  noteDeleteButton.addEventListener('click',()=>{
   removeElementFromTheList(unquieID)
  })
  updateButton.addEventListener('click',()=>{
  updatePlayers(unquieID,note)
  })
  
  
  noteDiv.appendChild(noteTitle)
  noteDiv.appendChild(noteContent)
  noteDiv.appendChild(playermobile)
  noteDiv.appendChild(playerrole)
  noteDiv.appendChild(playeravailability)
  noteDiv.appendChild(noteDeleteButton)
  noteDiv.appendChild(updateButton)
  notesListRootElement.appendChild(noteDiv)

  document.getElementById('first_name').value=''
  document.getElementById('last_name').value=''
  document.getElementById('email').value=''
  document.getElementById('phone').value=''
  document.getElementById('role').value=''
  

  
 }
 
async function removeElementFromTheList(id){
  console.log(id) //seeing whether getting correct id i.e the id of the note we are deleting
  let res=await axios.delete(`http://localhost:3000/api/v1/players/delete-players/${id}`)//using id as we are deleting element with its id
  console.log(res.data)
document.querySelector(`.note${id}`).remove()
renderElementsToScreen()//it is for ,after deleting to see updated results without refreshing


}

async function updatePlayers(unquieID,note){
  console.log(note)
  document.getElementById('first_name').value=note.first_name
  document.getElementById('last_name').value=note.last_name
  document.getElementById('email').value=note.email
  document.getElementById('phone').value=note.phone
  document.getElementById('role').value=note.role
  note.available?document.getElementById('role_yes').checked=true:
  document.getElementById('role_no').checked=true
  updatingID=unquieID//when we click update our unquie id is the updating id
  noteBtn.innerHTML='Update'//when clicking on a created note submit button will become update
}

renderElementsToScreen()
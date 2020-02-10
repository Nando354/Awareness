


// const inpKey = document.getElementById("inpKey");
// const inpValue= document.getElementById("InpValue");
// const btnInsert= document.getElementById("btnInsert");
// const lsOutput= document.getElementById("lsOutput");


// btnInsert.onclick = function() {
  
//     const key = inpKey.value;
//     const value = inpValue.value;
  
  
  
//     if (key && value) {
//       localStorage.setItem(key, value);
//       location.reload();
//     }
// };

// for (let i = 0; i < localStorage.length; i++) {
//   const key = localStorage.key(i);
//   const value = localStorage.getItem(key);

//   lsOutput.innerHTML += `${key}: ${value}<br />`;

// }


console.log("Hi Aware");

//queryselect the list where data will go from database
const thoughtsList = document.querySelector('#thoughts-list');
const form = document.querySelector('#add-thoughts-form');




//create elements and render thoughts responses to the dom using a function
function renderThoughts(doc){
    let li = document.createElement('li');
    let thought = document.createElement('span');
    let response = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id); //create attribute for list element
    thought.textContent = doc.data().thought; //create text to go in span element text will grab thoughts from database
    response.textContent = doc.data().response;
    cross.textContent = 'x';

    li.appendChild(thought); //attach thought element to list element
    li.appendChild(response);
    li.appendChild(cross);


    thoughtsList.appendChild(li); //append li tag to the const thoughtsList    

//-------------------Deleteing Data-----------------------------
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('#data-id'); 
        db.collection('mind').doc(id).delete();
    })
}


//-------------------Get Data ----------------------------

//get method to retrieve data already in the database
//inside this get method cycles through each collection and will also call the above function

// db.collection('mind').get().then((snapshot) => {
//   // console.log(snapshot.docs);
//   snapshot.docs.forEach(doc => {
//     // console.log(doc.data()); //to test get method pulling docs
//     renderThoughts(doc);
//   })
// })

//-------------Saving Data-------------
form.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection('mind').add({ // add method takes an object as a parameter
      thought:form.thought.value, // values we entered in form are added to database as object properties
      response: form.response.value
  });
  form.thought.value = ''; //values are removed as empty string from form entry fields when button is pressed so you can enter new data for another entry
  form.response.value = '';
})


// real-time listener in place of Get Data
db.collection('mind').orderBy('thought').onSnapshot(snapshot => {
  let changes = snapshot.docChanges();
  changes.forEach(change => {
      if(change.type == 'added'){
          renderThoughts(change.doc);
      } else if (change.type == 'removed'){
          let li = thoughtsList.querySelector('[data-id=' + change.doc.id + ']');
          thoughtsList.removeChild(li);
        }
    })
 })

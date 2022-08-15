//Thought List <ul> id
const thoughtSections = document.getElementById('thoughtSection');
// First Form Area
const newThoughtFormItem = document.getElementById('thoughtForm');

//Local Storage KEY
const LOCAL_STORAGE_THOUGHT_KEY = 'thought.thoughtLists';
//Local Storage VALUE
//Holds the object with other key value pairs
const LOCAL_STORAGE_SELECTED_THOUGHT_VALUE = 
'thought.keyValueThoughtObj';
//
let thoughtLists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_THOUGHT_KEY)) || [];

let selectedThoughtKey = localStorage.getItem(LOCAL_STORAGE_SELECTED_THOUGHT_VALUE);

let listToDelete = localStorage.getItem(LOCAL_STORAGE_THOUGHT_KEY);

let firstFormArea = document.getElementById("thoughtFormTxt");
let secondFormArea = document.getElementById("responseFormTxt");

//Shows thoughts previously entered onload
window.onload = () => {
  renderThoughts();
}

firstFormArea.addEventListener('keyup', function onEvent(e) {
  if(e.key === "Enter") {
    secondFormArea.focus();
    console.log('enter key pressed on first form input');
  }
})

secondFormArea.addEventListener('keyup', function onEvent(e) {
  if(e.key === "Enter") {
    firstFormArea.focus();
    console.log('enter key pressed on second form input');
    scrollToList();
  }
})

function scrollToModal() {
  // var elmnt = document.getElementById("todoForm");
  var elmnt = document.querySelector("#myModal");
  elmnt.scrollIntoView({behavior: "smooth", block: "end"});
}

function scrollToList() {
  // var elmnt = document.getElementById("todoForm");
  var elmntList = document.querySelector(".activeList");
  elmntList.scrollIntoView({behavior: "smooth", block: "end"});
}

//TODO: The form area where once a list item is typed and button is clicked or enter is pressed, the list value gets added to the createList function which holds the object and also pushed to Local Storage
function formProcess(){
    console.log("formProcess function was set off")
    //Variable that grabs the text entered in the form, thoughtFormTxt is the id of the text area in the form
    let listName = thoughtFormTxt.value;
    console.log(listName);
    let responseName = responseFormTxt.value;
    console.log(responseName);
    if(listName == null || listName === '') return
  //creates a variable named list with a createList function with the form text value as the parameter
    let thoughtList = createList(listName);
  //clears the form text value input area of the form text value so new text can be entered
    thoughtFormTxt.value = null;
  //pushes the list into the array lists or the object stored in local storage
    thoughtLists.push(thoughtList)
    var lastThoughtInForm = thoughtList.id;
    save();    
    // firstFormArea.focus();
    
}


//TODO: List text value is passed as a parameter and returns the object with the text value as a property of name
function createList(name){
    return {
      id: Date.now().toString(),
      name: name,
      completedTasks: false,
      displayTasks: false,
      response: []
    }
}
  
function saveAndRender(){
    save();
    renderThoughts();
}

//TODO: Sets the key to the LOCAL STORAGE variable we named earlier and the object lists is stored to Local Storage as a string 
function save() {
    localStorage.setItem(LOCAL_STORAGE_THOUGHT_KEY, JSON.stringify(thoughtLists));
}

function deletedLi(){
  for(var i =0; i < thoughtLists.length; i++)
    if(thoughtLists[i].id === deletedListId) {
      //delete from the thoughts List
      thoughtLists.splice(i,1);
      //Save to Local Storage
      save()
      break;
    }
  saveAndRender();
}
const arrayCount = thoughtLists[thoughtLists.length];
const lastArray = thoughtLists[thoughtLists.length - 1];

//TODO: Will stop list from duplicating some list values entered on the <ul> unordered list with the ID name newlist, before we call a forEach function in renderLists()
function clearElement(thoughtSections) {
    while (thoughtSections.firstChild) {
      thoughtSections.removeChild(thoughtSections.firstChild)
    }
}

function renderThoughts(lastThoughtInForm) {
    console.log('renderThoughts function set off')
    // console.log(lastThoughtInForm)
    clearElement(thoughtSections)
    thoughtLists.forEach(thoughtList =>   {
        // console.log(thoughtList)
        const thoughtElement = document.createElement('li');
        //give li an id
        thoughtElement.id = thoughtList.id;
        //add a span element
        thoughtSpan = document.createElement('SPAN');
        //text inside the span
        thoughtSpan.innerText = thoughtList.name;
        //append span to li
        thoughtElement.appendChild(thoughtSpan);
        //remove button created
        const seeResponseBtn = document.createElement('button');
        seeResponseBtn.id = 'selectResponseBtn';
        seeResponseBtn.innerText = 'See Response';
        // removeBtn.classList.add('focus-visible-only')
        thoughtElement.appendChild(seeResponseBtn);
        //delete thought/response
        const deleteThoughtRespBtn = document.createElement('button');
        deleteThoughtRespBtn.id = 'deleteBtn';
        deleteThoughtRespBtn.innerText = 'X';
        thoughtElement.appendChild(deleteThoughtRespBtn);
        // console.log(thoughtSections)
        thoughtSections.appendChild(thoughtElement)
        // console.log(thoughtList)

        //TODO: Event when the span text is clicked in the thoughts area, we want it to display the response to that particular thought.
        seeResponseBtn.addEventListener('click', e => {
            console.log('response button has been clicked')
            //the button element with id selectThought from the thought list selected
              console.log(e.target)
              console.log(e.target.parentNode.firstChild.innerText)
              //id of selected thought list item
              var selectedId = e.target.parentNode.id;
              //text of selected thought list tem
              var selectedText = e.target.parentNode.firstChild.innerText;
              console.log(selectedId)
              console.log(selectedText)
              //id and text of selected thought list item is passed into the responseCard function
              responseCard(selectedId, selectedText);
        }, false);

        deleteThoughtRespBtn.addEventListener('click', e => {
          deletedListId = e.target.parentNode.id;
          console.log(thoughtList)
          deletedLi(thoughtList);
          toggleOff();
        })
    })
}

//Function for a task value to be a parameter passed into the object as a property of name
function createResponse(name){
    return {
      id: Date.now().toString(),
      name: name,
      complete: false
    }
  }
//response area text area in form
const newResponseFormItem = document.getElementById('responseForm');
// const pElemInModal = document.getElementById('modalTextSpan');
let pElemInModal = document.createElement('p');
// console.log(pInModal);
pElemInModal.setAttribute('id', 'modalTextSpan'); 
// let pElemInModal = document.getElementById('modalTextSpan');
console.log(pElemInModal);
const removeModalTxtBtn = document.getElementById('removeTxtInModal');
let modal = document.getElementById('myModal');
const thoughtTxtArea = document.getElementById('thoughtFormTxt');
const responseTxtArea = document.getElementById('responseFormTxt');
// const modalRspTxtArea = document.getElementById('modal-content');
// console.log(modalRspTxtArea)

//FORM VALIDATION
//Click button to submit both thought/response from form
newResponseFormItem.addEventListener('submit', e =>{
  console.log('button to add thought/response set off')
  console.log(thoughtTxtArea.value)
  console.log(responseTxtArea.value)
  let thoughtTxt = thoughtTxtArea.value;
  let respTxt = responseTxtArea.value;
  if(respTxt === "" || thoughtTxt === ""){
    console.log('response is blank, fill in')
    return false;
  }
  else {
    console.log("no blanks")
    e.preventDefault();
    formProcess();
    responseFormProcess();
    firstFormArea.focus();
    scrollToList();
    console.log('scroll to List')
  }
})
//Press Enter key to submit both thought/response from form
newResponseFormItem.addEventListener('keypress', ev5 =>{
  if(ev5.key === "Enter"){
  console.log('enter key clicked to add thought/response set off')
  console.log(thoughtTxtArea.value)
  console.log(responseTxtArea.value)
  let thoughtTxt = thoughtTxtArea.value;
  let respTxt = responseTxtArea.value;
  // firstFormArea.focus();
  // console.log('curson on firt form input off of enter')
    if((ev5.key === "Enter") && (respTxt === "" || thoughtTxt === "")){
      console.log('response is blank, fill in')
      return false;
    }
    else {
      console.log("no blanks")
      ev5.preventDefault();
      formProcess();
      responseFormProcess();
      // firstFormArea.focus();
    }
  }
})
  
//References the id responseFormTxt in index.html response form and pushes the typed text to createResponse() function
function responseFormProcess(){
    console.log('responseformprocess was set off')
    let responseName = responseFormTxt.value;
    //if empty return cell and user hits enter do the following after return
    if(responseName == null || responseName === '') return
    //creates a createList function with the text value as the parameter
    let response = createResponse(responseName)
    //clears the form text input area of the text value so new text can be entered
    responseFormTxt.value = null;
    // console.log(thoughtLists);//the object thoughtLists is displayed
    
    let lastThoughtEntered = thoughtLists.slice(-1);
    for(var i = 0; i < thoughtLists.length; i++){
        itemLength = thoughtLists.length;
        // console.log(itemLength)
        let item = thoughtLists[i];
        if((i+1) == (itemLength)){
          let typedResponse = response;
          let selectedresponse = item.response.push(typedResponse);
        }
      saveAndRender();
    }   
    
}

// let txtInModal01 = pElemInModal.innerText

// let modalBox = document.getElementById('modal-content');
let modalBox = document.createElement("div");
modalBox.setAttribute('id', 'modal-content');
let head = document.getElementsByClassName('openHeadCap');
var myElemHead = document.querySelector(".closeHeadCap");

function toggleOn(){
  console.log('ToggleOn was set off');
  modalBox.style.display = "block";
  removeModalTxtBtn.style.display = "block";
  // document.getElementById('closeHeadCap').id = 'moveHeadCap';
  // myElemHead.remove();
  modalBox.classList.add("modal-move");
  //adds a classname which specifically makes the head cap move
  myElemHead.classList.add("moveHeadCap");
  setTimeout(function() {
    myElemHead.classList.remove("moveHeadCap")
    modalBox.classList.remove("modal-move");
  },2000);
  // myElemHead.classList.remove('moveHeadCap');
  console.log(head.classList)
  console.log(modalBox);
  console.log(head);
}
// console.log(modalBox)

function toggleOff(){
  modalBox.style.display = 'none';
  removeModalTxtBtn.style.display = "none";
  console.log(pElemInModal)
  console.log(pElemInModal.innerText)
  pElemInModal.innerText = "";
  console.log(pElemInModal.innerText)
  // document.getElementById('openHeadCap').id = 'closeHeadCap';
  console.log('ToggleOff was set off')
  myElemHead.classList.remove("moveHeadCap");
}
//Create the response pop up section here, pull the id's to match response and thought so they are relevent to one another.
//First need to push the response into the thought LS object in responseFormProcess
//Create the modal usiing DOM
function responseCard(selectedId, selectedText){
  console.log("responseCard was set off");
  
  for (var i =0; i<thoughtLists.length; i++){
    if(thoughtLists[i].name === selectedText){
      console.log(thoughtLists[i].name + " has been selected during renderTasks")
      for(let n = 0, t = thoughtLists[i].response.length; n < t; n++){
        //The response list object related to the selected thoughts list item
        var responseInThoughts = thoughtLists[i].response[n];
        //text in response
        let responseToThought = responseInThoughts.name
        console.log(responseToThought);
        var arrayOfResponses = thoughtLists[i].response[n];
        //thought list name
        var listName = thoughtLists[i].name;
        console.log(listName);
        var listTask = thoughtLists[i].completedTasks;
        //false in response.complete
        console.log(listTask)
        var thoughtId = thoughtLists[i].id;
        console.log(responseInThoughts)
        console.log(responseInThoughts.name)
        console.log(thoughtId);
        console.log(pElemInModal)
        //Create the modal bubble where the p element will show up in
        modal.prepend(modalBox);
        // modal.appendChild(modalBox);
        modalBox.appendChild(pElemInModal);
        //Give the p element the response value as text
        pElemInModal.textContent = responseInThoughts.name;
        console.log(responseInThoughts)
        scrollToModal();
        
        // console.log(modalRspTxtArea);
        //Create removeBtn event
        removeModalTxtBtn.addEventListener('click', e => {
          console.log("removeBtn was clicked")
          toggleOff();
        });
        toggleOn();

        // document.addEventListener('click', function(event){
        //   if(!event.target.closest("#myModal")
          
        //   ){
        //     console.log('clicked outside of modal')
        //   // closeModal()
        //   // toggleOff()
        //   }
        //    },
        //   false
        //    )
      }
    }
  }
}

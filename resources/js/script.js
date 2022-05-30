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




// console.log(thoughtLists);






//TODO: Form entry, where value is entered and added as a list item when enter key is pressed

// function scrollToThought() {
//     var elmnt = document.getElementById("listAddButton");
//     console.log('scroll initiated');
//     elmnt.scrollIntoView({behavior: "smooth", block: "end"});
// };

//TODO: Eventlistener on first todo form where the value is entered into the form and added as a list item when the ENTER KEY is pressed. It calls the function formProcess which creates the thought list item.
// newThoughtFormItem.addEventListener('keypress', e =>{
//     if(e.key === "Enter"){
//         e.preventDefault();
//         formProcess();
//         console.log('enter key on thought form was pressed');
//         // scrollToThought();
//     }
// });
//TODO: Form entry, where value is entered and added as a list item when button is clicked
// newThoughtFormItem.addEventListener('submit', e =>{
//         e.preventDefault();
//         formProcess();
//         console.log('submit button on thought form was clicked');
//         // scrollToThought();
// });



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
  //call the renderlists function which will create the list items and save them in local storage
    // console.log(listName);
    // console.log(thoughtList);
    // console.log(thoughtLists);
    // console.log(thoughtLists.length)
    // console.log(thoughtLists.slice(-1))
    // saveAndRender();
    // console.log(thoughtList.id)//pulls id of thought just processed
    var lastThoughtInForm = thoughtList.id;
    // console.log(lastThoughtInForm);
    // thoughtIdForm = thoughtList.id
    // console.log(thoughtIdForm);
    // console.log('formProcess Completed')
    save();
    // renderThoughts(lastThoughtInForm);
    // transferThought(lastThoughtInForm);
    
}

// let listName = thoughtFormTxt.value;
// console.log(listName)

// let responseName = responseFormTxt.value;


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
const arrayCount = thoughtLists[thoughtLists.length];
// console.log(arrayCount)
const lastArray = thoughtLists[thoughtLists.length - 1];
// console.log(lastArray)
// console.log(thoughtLists)
// let lastOne = thoughtLists.slice(-1);
// console.log(lastOne) 
// console.log(lastOne[0].id)
// console.log(thougthIdForm)


//TODO: Will stop list from duplicating some list values entered on the <ul> unordered list with the ID name newlist, before we call a forEach function in renderLists()
function clearElement(thoughtSections) {
    while (thoughtSections.firstChild) {
      thoughtSections.removeChild(thoughtSections.firstChild)
    }
}

// function transferThought(lastThoughtInForm){

// }


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
        const responseBtn = document.createElement('button');
        responseBtn.id = 'selectThought';
        responseBtn.innerText = 'See Response';
        // removeBtn.classList.add('focus-visible-only')
        thoughtElement.appendChild(responseBtn);
        // console.log(thoughtSections)
        thoughtSections.appendChild(thoughtElement)
        // console.log(thoughtList)

        //TODO: Event when the span text is clicked in the thoughts area, we want it to display the response to that particular thought.
        responseBtn.addEventListener('click', e => {
            console.log('response button has been clicked')
            // if(e.target.tagName === "BUTTON"){
            //   e.preventDefault();
              // console.log("a button was clicked will not call toggler")
            // } else if ((e.target.tagName === "SPAN")){
            //   console.log(e.target.parentNode.id + " a span was clicked")
            //the button element with id selectThought from the thought list selected
              console.log(e.target)
              console.log(e.target.parentNode.firstChild.innerText)
              // let thoughtSectionUl = document.getElementById('thoughtSection');
              // console.log(thoughtSectionUl);
              // var idInLi = document.getElementsByTagName('li')
              // let idFromList = idInLi.getAttribute("id");
              // console.log(idFromList);
              // console.log(idInLi)
              //id of selected thought list item
              var selectedId = e.target.parentNode.id;
              //text of selected thought list tem
              var selectedText = e.target.parentNode.firstChild.innerText;
              // var buttonText = e.target.span;
              // var idLi = selectedId.getElementById('li').id;
              // console.log(idLi)
              // console.log(e.target.innerText)
              // console.log(e.target.parentNode)
              console.log(selectedId)
              // console.log(buttonText)
              console.log(selectedText)
              //id and text of selected thought list item is passed into the responseCard function
              responseCard(selectedId, selectedText);
              // toggleOn();
            //   toggler(e);
              
            // }
          // }, false);
        }, false);
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
const pElemInModal = document.getElementById('modalTextSpan');
const removeBtn = document.getElementById('removeResponse');
let modal = document.getElementById('myModal');
const thoughtTxtArea = document.getElementById('thoughtFormTxt');
const responseTxtArea = document.getElementById('responseFormTxt');
// console.log(thoughtTxtArea.value)
//Enter to create the response
// newResponseFormItem.addEventListener('keypress', e =>{
//   if(e.key === "Enter"){
//       e.preventDefault();
//       responseFormProcess();
//       console.log('enter key on response form');
//       // scrollToThought();
//   }
// });
//Click button to submit response
// newResponseFormItem.addEventListener('submit', ev5 => {
//     ev5.preventDefault();
//     console.log(ev5.target)
//     responseFormProcess();
//     console.log('submit button on response form')
//     // scrollToTask();
//   });

//Create one main button to enter both the thought and response in LS
//Enter to create the response
// newResponseFormItem.addEventListener('keypress', e =>{
//   if(e.key === "Enter"){
//     e.preventDefault();
//     formProcess();
//     responseFormProcess();
//     console.log("text should pull")
//     console.log(rspTxtArea.innerText);
//   }
// })

//FORM VALIDATION
//Click button to submit both thought/response
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
    // console.log(lastThoughtEntered);
    // console.log(lastThoughtEntered.id);
    for(var i = 0; i < thoughtLists.length; i++){
        // console.log(thoughtLists[i]);
        // console.log(response)
        itemLength = thoughtLists.length;
        // console.log(itemLength)
        let item = thoughtLists[i];
        if((i+1) == (itemLength)){
          // console.log(item)
          // console.log(item.id)
          let typedResponse = response;
          let selectedresponse = item.response.push(typedResponse);
        }
      saveAndRender();
    }   
    
}

function toggleOn(){
  // console.log(modal)
  modal.style.display = 'block';
  console.log('ToggleOn was set off')
}

function toggleOff(){
  modal.style.display = 'none';
  console.log('ToggleOff was set off')
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

       //*============
        //Create the modal div
        // let responseDiv = document.createElement('div');
        // //give the div an id and class
        // responseDiv.setAttribute('id', 'myModal');
        // //create the modal content
        // let responseContentDiv = document.createElement('div');
        // responseContentDiv.classList.add('modal-content');
        // //Create p element to place inside responseContentDiv
        // let pElemInModal = document.createElement('p');
        // //Set ID for P element
        // pElemInModal.setAttribute('id', 'modalTextSpan');
        // // let testText = document.createTextNode("for testing only");
        // console.log(responseInThoughts.name)
        // //Give the p element the response value as text
        // pElemInModal.textContent = responseInThoughts.name;
        // //Create the remove button
        // const removeBtn = document.createElement('button');
        // removeBtn.id = 'removeResponse';
        // removeBtn.innerText = 'x';
      //*=============

        //Create var for p element
        // const pElemInModal = document.getElementById('modalTextSpan')
        console.log(pElemInModal)
        //Give the p element the response value as text
        pElemInModal.textContent = responseInThoughts.name;
        // //Create removeBtn event
        removeBtn.addEventListener('click', e => {
          console.log("removeBtn was clicked")
          toggleOff();
        });
        // //Append the p element to the responseContentDiv
        // responseContentDiv.appendChild(pElemInModal);
        // //Append removeBtn to responseContentDiv
        // responseContentDiv.appendChild(removeBtn);
        // //Append the responseContentDiv to the responseDiv
        // responseDiv.appendChild(responseContentDiv);

        //===========//
        // //text from response is placed in a text Node
        // let testText = document.createTextNode(responseToThought);
        // //append response text as a child to the p element
        // responseContentDiv.appendChild(testP);
        // pElemInModal.appendChild(testText);
        // responseDiv.appendChild(responseContentDiv);
        // ===========//

        // let responseArea = document.getElementById('thoughtSection');
        // responseArea.appendChild(responseDiv);

        // var modal = document.getElementById('myModal');
        // modal.style.display = 'block';

        var responseClass = document.getElementsByClassName('modal-content');
        console.log(responseClass);

        // var modalSpanClose = document.getElementsByClassName("close")[0];
        // var modal = document.getElementById('myModal');

        // console.log(modalSpanClose);
        
        // modalSpanClose = function() {
        //   console.log('modal span was closed')
        //   modal.style.display = "none";
        // }
        // modalClose = function() {
        //   console.log('modalClose was set off')
        //   modal.style.display = "none";
        // }


        document.addEventListener('click', function(event){
          if(!event.target.closest("#myModal")
          ){
          // closeModal()
          // toggleOff()
          }
           },
          false
           )

      // function closeModal(){
      //   modal.style.display = "none"
      //   console.log('close modal function called')
      // }
        // window.onclick = function(event) {
        //   console.log(event.target)
        //   if (event.target !== (modal || responseClass)) {
        //     console.log('modal style will be none')
        //     // responseToThought = "";
        //     // testText = "";
        //     modal.style.display = "none";
        //     // spanText = document.getElementById('modalTextSpan')
        //     // console.log(spanText);
        //     // spanText.textContent = "";
        //   }
        // }
      }
    }

  }
  // let spans = thoughtSections.querySelectorAll("span");
  // spans.forEach(function(span){
  //   // if(span.className === "selected"){
  //   if(span.innerText === selectedText){
  //     idInNewThought = span.parentNode.id
  //     console.log(idInNewThought); //id number as text, currently last list id in LS
  //     console.log(selectedId)
      // for(let list of lists) {
      //   if(list.displayTasks === true && list.name === selectedText){
      //     //selectedText was passed down as a parameter into the taskCard(selectedText) function
      //     taskLiTitle.innerText = selectedText.toUpperCase();
      //     taskCont.appendChild(taskLiTitle);
      //   } 
      // }
  //   }
  // });
}

//I would have loved to write some tests for this 
//excercise, but external libraries were explicitly prohibited! D:
document.addEventListener('DOMContentLoaded', function() {
  var submitButton = document.querySelectorAll("button[type=submit]")[0];
  var addButton = document.querySelectorAll("button[class=add]")[0]
  submitButton.addEventListener('click', function(){return submitHousehold();});
  addButton.addEventListener('click', function(){return addPerson();});
});
function submitHousehold(){
  console.log('SUBMIT BUTTON CLICKED');
  //TODO create an ajax request to a fake server. Send data as JSON in POST request use debug DOM element
}

function addPerson(){
  var parentDiv = document.querySelector("div.builder");
  var personParams = {age: parentDiv.querySelector("input[name=age]").value, 
                      relationship: parentDiv.querySelector("select[name=rel]").value, 
                      isSmoker: parentDiv.querySelector("input[name=smoker]").value};
                      
  var errors = validatePerson(personParams);
  if(errors){
    displayErrors(errors);
    return;
  }
  appendPersonToHouseHold(personParams);
}

function removePerson(event){
  var parentList = document.getElementById('hhList');
  var deleteTarget = findParentWithClass(event.target, 'hhMemberItem');
  parentList.removeChild(deleteTarget);
}

function validatePerson(personParams){
  var errors = [];
  var age = parseInt(personParams.age, 10);
  if(!age || age <= 0){
    errors << "Please enter a valid age!";
  }
  
  if(!personParams.relationship){
    errors << "Please select a relationship!";
  }
  
  return errors;
}

function displayErrors(errors){
  var errorDiv = document.querySelector("div#errors");
  if(!errorDiv){
    initializeErrorsContainer();
    errorDiv = document.querySelector("div#errors");
  }
  for(i in errors){
    errorDiv.innerHtml = '<ul><li>'+error[i]+'</li></ul>';
    
  }

}

function appendPersonToHouseHold(){
  console.log('Adding Person!');
  //TODO check if a div has been created for the list of members in a HH

  //TODO if not, invoke initializeHouseHoldContainer
  //TODO append html to the ordered list with #householdList id
  //TODO add X button for deleting household members; invoke bindRemovePerson
}

function initializeHouseholdContainer(){
  //TODO add html <div id="householdContainer"><ol id="hhList"></ol></div>

}

function initializeErrorsContainer(){
  var parentDiv = document.querySelector("div.builder"); //TODO move this to onLoad as global variable
  var errContainer = document.createElement('DIV')
  parentDiv.insertBefore(errContainer, parentDiv.childNodes[0]);
}

function findParentWithClass(ele, cls){
  while ((ele = ele.parentElement) && !ele.classList.contains(cls));
  return ele;
}
//I would have loved to write some tests for this
//excercise, but external libraries were explicitly prohibited! D:
var parentDiv;
document.addEventListener('DOMContentLoaded', function() {
  parentDiv = document.querySelector("div.builder");
  var submitButton = document.querySelector("button[type=submit]");
  var addButton = document.querySelector("button[class=add]");
  //Prevent Form submit (page reload) on button click. This element should have a type declared anyways
  addButton.type = 'button'

  submitButton.addEventListener('click', function(){return submitHousehold(event);});
  addButton.addEventListener('click', function(){return addPerson();});
});
function submitHousehold(event){
  event.preventDefault(); //stop page reload
  var household = [];
  var listItems = document.querySelector('ol.household').children;
  for(i in listItems){
    var item = listItems[i];
    if(item instanceof HTMLElement){
      var person = {age: item.querySelector('span.age').innerHTML,
                    relationship: item.querySelector('span.relationship').innerHTML,
                    smoker: item.querySelector('span.smoker').innerHTML};
      household.push(person);
    }
  }

  var debugEle = document.querySelector('pre.debug');
  var displayData = 'JSON: ' + household + '</br>' +
                    'Stringified: ' + JSON.stringify(household);
  debugEle.innerHTML = displayData;
  debugEle.style.display = 'Block';
}

function addPerson(){
  var personParams = {age: parentDiv.querySelector("input[name=age]").value,
                      relationship: parentDiv.querySelector("select[name=rel]").value,
                      isSmoker: parentDiv.querySelector("input[name=smoker]").checked};

  var errors = validatePerson(personParams);
  if(errors.length){
    displayErrors(errors);
    return;
  }
  appendPersonToHouseHold(personParams);
}

function removePerson(event){
  var parentList = document.querySelector('ol.household');
  var deleteTarget = findParentWithClass(event.target, 'hhPersonItem');
  parentList.removeChild(deleteTarget);
}

function validatePerson(personParams){
  clearErrors();
  var errors = [];
  var age = parseInt(personParams.age, 10);
  if(!age || age <= 0){
    errors.push("Please enter a valid age!");
  }

  if(!personParams.relationship){
    errors.push("Please select a relationship!");
  }

  return errors;
}

function displayErrors(errors){
  var errorDiv = document.querySelector("div.errors");
  if(!errorDiv){
    initializeErrorsContainer();
    errorDiv = document.querySelector("div.errors");
  }
  clearErrors();
  for(i in errors){
    var errorMsg = document.createElement('SPAN');
    errorMsg.innerHTML = errors[i] + '</br>';
    errorDiv.appendChild(errorMsg);
  }

}

function clearErrors(){
  var errorDiv = document.querySelector("div.errors");
  if(errorDiv){
    errorDiv.innerHTML = '';
  }
}

function appendPersonToHouseHold(personParams){
  var hhList = document.querySelector('ol.household');
  var personItem = document.createElement('LI');
  personItem.className = 'hhPersonItem'
  var personDetails = 'Age: <span class="age">' + personParams.age + '</span>,' +
                      ' Relationship: <span class="relationship">' + personParams.relationship + '</span>,' +
                      ' Smoker: <span class="smoker">' + personParams.isSmoker + '</span>&nbsp;';
  personItem.innerHTML = personDetails;

  var deleteButton = document.createElement('BUTTON');
  deleteButton.innerHTML = 'X';
  personItem.appendChild(deleteButton);
  deleteButton.addEventListener('click', function(){return removePerson(event);});

  hhList.appendChild(personItem);
}

function initializeErrorsContainer(){
  var errContainer = document.createElement('DIV');
  errContainer.className = 'errors';
  parentDiv.insertBefore(errContainer, parentDiv.childNodes[0]);
}

function findParentWithClass(ele, cls){
  while ((ele = ele.parentElement) && !ele.classList.contains(cls));
  return ele;
}

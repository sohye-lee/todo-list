// DOM 
const clear = document.querySelector('.clear');
const dateElement = document.getElementById('date');
const list = document.getElementById('list');
const input = document.getElementById('input');
var draggableItem = document.getElementById('draggable');

// CLASS NAMES 
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// VARIABLES : ARRAY 
var LIST ;
var id ;

// GET ITEM FROM LOCAL STORAGE
let data = localStorage.getItem("TODO");

// CHECK IF DATA IS NOT EMPTY
if(data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadToDo(LIST);
} else {
    LIST = [];
    id = 0;
}

// LOAD ITEMS TO THE USER'S INTERFACE
function loadToDo(array) {
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// CLEAR THE LOCAL STORAGE
clear.addEventListener('click', function() {
    localStorage.clear();
    location.reload();
});



// SHOW TODAY'S DATE
const options = {weekday: 'long', month: 'short', day: 'numeric'};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString('en-US', options);

// ADD TO DO FUNCTION
function addToDo(toDo, id, done, trash) {
    
    if (trash) {return;}

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const item = `<li class="item" >
                        <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                        <p class="text ${LINE}">${toDo}</p>
                        <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                    </li>`;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}

// ADD ITEM BY PRESSING ENTER KEY
document.addEventListener("keyup", function(event) {
    if (event.keyCode == 13) {
        const toDo = input.value;
        if (toDo) {
            addToDo(toDo, id, false, false);
            LIST.push(
                {
                    name: toDo,
                    id: id,
                    done: false,
                    trash: false
                }
            );
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id ++
            
        }
        input.value = "";
        
    }
});




// COMPLETE TO DO
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done ? false: true;
}

// REMOVE TO DO
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}



// TARGET THE ITEMS CREATED DYNAMICALLY
list.addEventListener("click", function(event) {
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if(elementJob== 'complete') {
        completeToDo(element);
    }else if(elementJob == 'delete') {
        removeToDo(element);
    }
    localStorage.setItem("TODO", JSON.stringify(LIST));
})




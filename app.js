//Define UI Variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event Listeners
loadEventListeners();

//Load all event Listeners

function loadEventListeners(){
    //DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);

    //Add task event
    form.addEventListener('submit', addTask);

    //Remoce task event
    taskList.addEventListener('click', removeTask);

    //clear tasks event
    clearBtn.addEventListener('click', clearTasks);

    //filter task events
    filter.addEventListener('keyup', filterTasks);
}

//get tasks from LS

function getTasks(){
    let tasks;

    if(localStorage.getItem('tasks') === null ){
        tasks = []; 
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));

    }

    tasks.forEach(function(task){
        //create list element

    const li = document.createElement('li');
    //Add class
    li.className = 'collection-item';
    //create text node and append to li
    li.appendChild(document.createTextNode(task));
    //create new link element
    const link= document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append link to li
    li.appendChild(link);


    //Append li to ul
    taskList.appendChild(li);
    });
}


// Add Task
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a Task');
    }

    //create list element

    const li = document.createElement('li');
    //Add class
    li.className = 'collection-item';
    //create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //create new link element
    const link= document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append link to li
    li.appendChild(link);


    //Append li to ul
    taskList.appendChild(li);

    //store in Local Storage
    storeTaskInLocalStorage(taskInput.value);

    //clear input
    taskInput.value = '';


    e.preventDefault();
}
//Store Task
function storeTaskInLocalStorage(task){
    let tasks;

    if(localStorage.getItem('tasks') === null ){
        tasks = []; 
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));

    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks))


}






// Remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){ 
        e.target.parentElement.parentElement.remove();

        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}
//Remove from LS
function removeTaskFromLocalStorage(taskIten){
    let tasks;

    if(localStorage.getItem('tasks') === null ){
        tasks = []; 
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));

    }
    tasks.forEach(function(task, index){
        if(taskIten.textContent === task){
            tasks.splice(index, 1); 
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks)); 
}



//clear Tasks

function clearTasks(e){
    //taskList.innerHTML = '';

    //faster
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    //clear Tasks
    clearTasksFromLocalStorage();
}
//clear from LS

function clearTasksFromLocalStorage(){

    localStorage.clear();
}




//filter Ttasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }
        else{
            task.style.display = 'none';
        }
    });

}
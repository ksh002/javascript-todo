// 유저가 값을 입력한다
// + 버튼을 클릭하면, 할일이 추가된다
// delete 버튼을 누르면 할일이 삭제된다
// check 버튼을 누르면 할일이 끝나면서 밑줄이 간다
// 1. check 버튼을 클릭하는 순간 true false
// 2. true이면 끝난걸로 알고 밑줄
// 3. false이면 안끝난걸로 알고 그대로

// 진행중 끝남 탭을 누르면, 언더바가 이동한다
// 끝남탭은, 끝난 아이템만, 진행중탭은 진행중인 아이템만
// 전체탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById("task-input")
let addBtn = document.getElementById("add-button")
let taskList = []
let filter = 'all'
let time = document.getElementById("time")
let inputDelete = document.getElementById('input-delete')

function updateTime() {
    const timeElement = document.getElementById('time');
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    timeElement.textContent = formattedTime;
}
updateTime();
setInterval(updateTime, 1000)

addBtn.addEventListener('click', addTask)
inputDelete.addEventListener('click', function(){
    taskInput.value = ""
})

taskInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
})

function addTask(){
    let taskContent = taskInput.value.trim();

    if (taskContent === ""){
        alert("할일을 입력해주세요")
        return;
    }
    let task = {
        id : randomIDGenerate(),
        taskContent : taskInput.value,
        isComplete : false
    }
    taskList.push(task)
    console.log(taskList)
    taskInput.value = ""
    render()
}

function setActiveTab(element) {
    const tabs = document.querySelectorAll('.task-tabs p');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    element.classList.add('active');

    const underLine = document.getElementById('under-line');
    underLine.style.left = element.parentElement.offsetLeft + 'px';
    underLine.style.width = element.parentElement.offsetWidth + 'px';
}

function render(){
    let filteredList = [];
    let resultHTML = '';

    if (filter === 'all'){
        filteredList = taskList;
    } else if (filter === 'active'){
        filteredList = taskList.filter(task => !task.isComplete);
    } else if (filter === 'complete'){
        filteredList = taskList.filter(task => task.isComplete);
    }

    for(let i = 0; i < filteredList.length; i++){
        if (filteredList[i].isComplete){
            resultHTML += `<div class="task">
                    <div class="">
                        <span class=task-done>${filteredList[i].taskContent}</span>
                    </div>
                    <div>
                        <button onclick="toggleComplete('${filteredList[i].id}')"><i class="fa-solid fa-reply"></i></button>
                        <button onclick="deleteTask()"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                </div>`
        } else{
            resultHTML += `<div class="task">
                    <div class="text">
                        ${filteredList[i].taskContent}
                    </div>
                    <div>
                        <button onclick="toggleComplete('${filteredList[i].id}')"><i class="fa-solid fa-check"></i></button>
                        <button onclick="deleteTask('${filteredList[i].id}')"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                </div>`
        }
    }

    document.getElementById('task-board').innerHTML = resultHTML
}

function toggleComplete(id){
    console.log(id)
    for(let i = 0; i < taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render()
    console.log(taskList)
}

function deleteTask(id){
    taskList = taskList.filter(task => task.id !== id);
    console.log(taskList)
    render()
}

function allTask(){
    filter = 'all'
    setActiveTab(document.querySelector('.task-tabs div:nth-child(1) p'));
    render()
}

function activeTask(){
    filter = 'active'
    setActiveTab(document.querySelector('.task-tabs div:nth-child(2) p'));
    render()
}

function completeTask(){
    filter = 'complete'
    setActiveTab(document.querySelector('.task-tabs div:nth-child(3) p'));
    render()
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}

window.onload = () => {
    const activeTab = document.querySelector('.task-tabs div:nth-child(1) p');
    setActiveTab(activeTab);

    if (activeTab) {
        const underLine = document.getElementById('under-line');
        underLine.style.left = activeTab.parentElement.offsetLeft + 'px';
        underLine.style.width = activeTab.parentElement.offsetWidth + 'px';
    }
}
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

addBtn.addEventListener('click', addTask)

function addTask(){
    let task = {
        id : randomIDGenerate(),
        taskContent : taskInput.value,
        isComplete : false
    }
    taskList.push(task)
    console.log(taskList)
    render()
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
                    <div class="task-done">
                        ${filteredList[i].taskContent}
                    </div>
                    <div>
                        <button onclick="toggleComplete('${filteredList[i].id}')"><img src="images/reset.png" alt="리셋표시 이미지"></button>
                        <button onclick="deleteTask()"><img src="images/trash.png" alt="쓰레기통 이미지"></button>
                    </div>
                </div>`
        } else{
            resultHTML += `<div class="task">
                    <div>
                        ${filteredList[i].taskContent}
                    </div>
                    <div>
                        <button onclick="toggleComplete('${filteredList[i].id}')"><img src="images/complete.png" alt="체크표시 이미지"></button>
                        <button onclick="deleteTask('${filteredList[i].id}')"><img src="images/trash.png" alt="쓰레기통 이미지"></button>
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
    render()
}

function activeTask(){
    filter = 'active'
    render()
}

function completeTask(){
    filter = 'complete'
    render()
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}
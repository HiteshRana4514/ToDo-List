const taskInput = document.querySelector('#task');
const saveBtn = document.querySelector('.save-btn');
const todoBodyContent = document.querySelector('.todo-body-content');

let userData = {
    listData : []
}

saveBtn.addEventListener('click',storeListData);


function storeListData(){
    let inputValue = taskInput.value;
    if(inputValue){
        createObjects(inputValue);
    }
}

function createObjects(value){
    let listDataLength = userData.listData.length;
    class taskData {
        constructor(task,id,check){
            this.task = task;
            this.id = id;
            this.checked = check;
        }
    }
    userData.listData.push(new taskData(value,(listDataLength+1),false));

    localStorage.setItem('userData',JSON.stringify(userData));
    getStoredData()
}
function getStoredData(){
    const storedData = localStorage.getItem('userData');
    if(storedData){
        const storeUserData = JSON.parse(storedData);
        userData = storeUserData;
        console.log(storeUserData);
        createListElement(storeUserData);
    }
}

function createListElement(data){
    const listLi = document.createElement('li');
    const dataObj = data.listData[data.listData.length-1];
    console.log(dataObj);
    const html = ` <span class="serial-no">${dataObj.id}</span>
                            <span class="task-content">${dataObj.task}</span>
                            <div class="check-wrap">
                                <input type="checkbox" name="check" class="check-done" id="${dataObj.id}">
                            </div>
                            <span class="delete-btn">
                                <i class="dlt-icon"></i>
                            </span>
                        `
    listLi.innerHTML = html;
    todoBodyContent.appendChild(listLi);
    taskInput.value = "";
    getCheck(data);
    removeTask()
}
function getCheck(markedCheck){
    const checkDone = document.querySelectorAll('.check-done');
    const listData = userData.listData;
    checkDone.forEach(function(e){
        e.onchange = function(){
            let getId = e.getAttribute('id');
            for(let i=0;i<listData.length;i++){
                if(listData[i].id==getId){
                    if(e.checked){
                        listData[i].checked = true;
                    }
                    else{
                        listData[i].checked = false;
                    }
                }
            }
            console.log(userData);
            
            localStorage.setItem('userData',JSON.stringify(userData));
        }
    })
    if(markedCheck){
        checkDone.forEach(function(e){
            let getId = e.getAttribute('id');
            for(let i=0;i<listData.length;i++){
                if(getId == listData[i].id){
                    if(listData[i].checked){
                        e.checked = true;
                    }
                    else{
                        e.checked = false;
                    }
                }
            }
        })
    }
}

function onloadGetData(){
    const storedData = localStorage.getItem('userData');
    if(storedData){
        const storeUserData = JSON.parse(storedData);
        userData = storeUserData
        console.log(storeUserData);
        createElementPre(storeUserData);
        removeTask()
    }
}
function createElementPre(storeUserData){
    const dataArr = storeUserData.listData;
    for(let i=0;i<dataArr.length;i++){
        let taskContent = dataArr[i].task;
        let taskId = dataArr[i].id;
        let isChecked = dataArr[i].checked;
        predefinedElement(taskContent,taskId,isChecked);
    }
}

function predefinedElement(task,id,check){
    let markedCheck = true;
    const listLi = document.createElement('li');
    const html = ` <span class="serial-no">${id}</span>
                            <span class="task-content">${task}</span>
                            <div class="check-wrap">
                                <input type="checkbox" name="check" class="check-done" id="${id}">
                            </div>
                            <span class="delete-btn">
                                <i class="dlt-icon"></i>
                            </span>
                        `
    listLi.innerHTML = html;
    todoBodyContent.appendChild(listLi);
    getCheck(markedCheck);
}
window.onload = onloadGetData;  

function removeTask(){
    const dltBtn = document.querySelectorAll('.delete-btn');
    dltBtn.forEach(function(e){
        e.onclick = function(){
            let dltParent = e.parentElement;
            dltParent.remove();
            updateObjectDlt(dltParent);
        }

    })
}

function updateObjectDlt(dltParent){
    const taskIdElement = dltParent.querySelector('.serial-no');
    const taskId = Number(taskIdElement.innerText);
    userData.listData = userData.listData.filter(obj => obj.id!=taskId);
    reArrangeId()
}

function reArrangeId(){
    let listDataLength = userData.listData.length;
    const serialNo = document.querySelectorAll('.serial-no');
    for(let i=0;i<listDataLength;i++){
        userData.listData[i].id = (i+1);
        serialNo[i].innerText = (i+1);
    }
    localStorage.setItem('userData',JSON.stringify(userData));
}




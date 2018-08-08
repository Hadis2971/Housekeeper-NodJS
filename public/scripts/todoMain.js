const createNtn = document.getElementById("create-btn");
const boxParent = document.getElementById("box-parent");
const listNameInput = document.getElementById("list-name-input")


let appData = {
    elements: [],
    storage: localStorage
}


function closeListBox(){
    let listBox = this.parentNode;
    let parent = listBox.parentNode;

    let title = this.parentNode.getElementsByTagName("h4")[0].textContent;
    let titles = document.getElementsByTagName("h4");

    
    appData.elements = [];
    appData.storage.setItem("htmlElements", JSON.stringify(appData.elements));

    for(let i = 1; i < titles.length; i++){
        if(title !== titles[i].textContent){       
           appData.elements.push(titles[i].parentNode.innerHTML);
        }
    }

    appData.storage.setItem("htmlElements", JSON.stringify(appData.elements));

    parent.removeChild(listBox);

}

function noValidInput(inpt){
    if(!inpt.length){
        alert("Please Enter A Name!!!");
        return true;
    }
}

function removeTask(){
    let parent = this.parentNode.parentNode;
    parent.removeChild(this.parentNode);
    let uls = document.getElementsByClassName("list-box-style");
    appData.elements = [];
    for(let i = 0; i < uls.length; i++){
        appData.elements.push(uls[i].innerHTML);
    }
    appData.storage.setItem("htmlElements", JSON.stringify(appData.elements));
}

function completeTask(){
    if(this.parentNode.classList.contains("completed-task")){
        this.parentNode.classList.remove("completed-task");
    }else{
        this.parentNode.classList.add("completed-task");
    }

    let uls = document.getElementsByClassName("list-box-style");
    appData.elements = [];
    for(let i = 0; i < uls.length; i++){
        appData.elements.push(uls[i].innerHTML);
    }
    appData.storage.setItem("htmlElements", JSON.stringify(appData.elements));
}

function addTasks(){
    let input = this.parentNode.getElementsByTagName("input")[0];
    let list = this.parentNode.getElementsByTagName("ul")[0];

    let li = document.createElement("li");
    li.classList.add("list-item-style");
    li.textContent = input.value;

    list.insertBefore(li, list.childNodes[0]);
    let imgCorrect = document.createElement("img");
    imgCorrect.setAttribute("src", "/images/success.svg");
    imgCorrect.className = "list-img second-img"
    imgCorrect.addEventListener("click", completeTask);

    let imgX = document.createElement("img");
    imgX.className = "list-img first-img"
    imgX.setAttribute("src", "/images/x.svg");
    imgX.addEventListener("click", removeTask);

    li.appendChild(imgCorrect);
    li.appendChild(imgX);

    let uls = document.getElementsByClassName("list-box-style");
    appData.elements = [];
    for(let i = 0; i < uls.length; i++){
        appData.elements.push(uls[i].innerHTML);
    }
    appData.storage.setItem("htmlElements", JSON.stringify(appData.elements));
    
    input.value = "";
}

function createNewList(e){

    if(noValidInput(listNameInput.value)){
        return;
    }

    let box = document.createElement("div");
    box.classList.add("list-box-style");

    let title = document.createElement("h4");
    title.textContent = listNameInput.value;
    title.className = "text-center title-style";
    box.appendChild(title);

    let inputDiv = document.createElement("div");
    inputDiv.className = "form-group list-input-div";
    inputDiv.style.display = "inline-block";
    let inputEl = document.createElement("input");
    inputEl.className = "form-control";

    inputDiv.appendChild(inputEl);
    box.appendChild(inputDiv);

    let btn = document.createElement("button");
    btn.className = "btn btn-primary";
    btn.textContent = "Add Task!"
    btn.addEventListener("click", addTasks);    

    box.appendChild(btn);

    let list = document.createElement("ul");
    list.classList.add("list-ul-style");
    box.appendChild(list);

    let close = document.createElement("span");
    close.innerHTML = "&times";
    close.className = "close";
    close.addEventListener("click", closeListBox);
    box.appendChild(close);


    boxParent.appendChild(box);
    
    appData.elements.push(box.innerHTML);
    appData.storage.setItem("htmlElements", JSON.stringify(appData.elements));
    

    listNameInput.value = "";
}


function onLoad(){
    let elements = [];
    if(appData.storage.getItem("htmlElements")){
        elements = JSON.parse(appData.storage.getItem("htmlElements"));
    }    

    if(elements.length){
        for(let i = 0; i < elements.length; i++){
            let el = document.createElement('div');
            el.innerHTML = elements[i];
            el.classList.add("list-box-style");
            el.getElementsByTagName("span")[0].addEventListener("click", closeListBox);
            el.getElementsByTagName("button")[0].addEventListener("click", addTasks);
            for(let i = 0; i < el.getElementsByClassName("first-img").length; i++){
                el.getElementsByClassName("first-img")[i].addEventListener("click", removeTask);
            }
            for(let i2 = 0; i2 < el.getElementsByClassName("second-img").length; i2++){
                el.getElementsByClassName("second-img")[i2].addEventListener("click", completeTask);
            }
                  
            boxParent.appendChild(el);
        }
    }   
}

window.addEventListener("load", onLoad);

//appData.storage.removeItem("htmlElements");
createNtn.addEventListener("click", createNewList);



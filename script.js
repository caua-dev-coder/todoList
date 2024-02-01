const NewText = document.querySelector(".input-task")
const AddButton = document.querySelector(".add-task")
const NewTaskAdd = document.querySelector(".list-task")

let valueOfList = []

function AddNewTask(){
  valueOfList.push({
    task: NewText.value,
    checked: false,
  })
  
  NewText.value = ''

  showTasks() // Chamamos a próxima Function
}

function showTasks(){
  let NewListAdd = ''

  valueOfList.forEach((newTask, position) => {
    NewListAdd = NewListAdd + `         
      <li class="task ${newTask.checked && "done"}">
        <img src="./imgs/checked.png" onclick="checkTask(${position})">
        <p>${newTask.task}</p>
        <img class="trash" src="./imgs/trash.png" onclick="deleteItem(${position})">
      </li>
    `
  });

  NewTaskAdd.innerHTML = NewListAdd
  localStorage.setItem('list', JSON.stringify(valueOfList))
}

function deleteItem(position){
  valueOfList.splice(position, 1) // Splice serve para remover um item em determinada posição no array dele.

  showTasks()
}

function checkTask(position){  // ! O interrogação inverteu o valor do CHECKED
  valueOfList[position].checked = !valueOfList[position].checked; // Invertemos o Valor de false para True com essa técnica

  showTasks()
}


function rechargeTasks(){
  const taskLocalStorage = localStorage.getItem('list')

  if(taskLocalStorage) {
    valueOfList = JSON.parse(taskLocalStorage)
  }

  showTasks()
}

// Com o JSON.stringfy conseguimos transformar objetos em Strings
// Com o JSON.parse conseguimos transformar as STRINGS em objetos

rechargeTasks()
AddButton.addEventListener('click', AddNewTask)

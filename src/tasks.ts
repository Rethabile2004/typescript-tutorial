const taskForm = document.querySelector<HTMLFormElement>('.form')!;
const formInput = document.querySelector<HTMLInputElement>('.form-input')
const taskListElement = document.querySelector<HTMLUListElement>('.list')
type Task = {
    description: string;
    isComplete: boolean;
}

taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const taskDescription = formInput?.value
    if (taskDescription) {
        formInput.value = ''
        const newTask: Task = { description: taskDescription, isComplete: false }
        addTask(newTask);
        renderTask(newTask)
        localStorage.clear()
        updateTasks()
        return
    }
    alert('please enter a valuer')
})

let tasks: Task[] = loadTasks()
function addTask(task: Task): void {
    tasks.push(task)
}
tasks.forEach(renderTask)

function renderTask(task: Task): void {
    const taskElement = document.createElement('li');
    taskElement.textContent = task.description
    taskListElement?.appendChild(taskElement);
    const taskInputElement=document.createElement('input')
    taskInputElement.type='checkbox'
    taskInputElement.checked=task.isComplete
    taskElement?.appendChild(taskInputElement)
    taskElement.addEventListener('change',()=>{
        task.isComplete=!task.isComplete;
        updateTasks()
    })
}

function updateTasks(): void {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks(): Task[] {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : []
}
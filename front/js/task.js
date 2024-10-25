function taskElement(task) {
    let taskElement = document.createElement('div')
    taskElement.classList.add('task')
    taskElement.id = 'task-' + task.id

    let taskNameElement = document.createElement('div')
    taskNameElement.classList.add('name')
    taskElement.append(taskNameElement)
    let taskNameAElement = document.createElement('a')
    taskNameAElement.innerText = task.name
    taskNameAElement.draggable = false
    taskNameAElement.href = 'https://google.com?s=' + task.id
    taskNameElement.append(taskNameAElement)

    let taskEpicElement = document.createElement('span')
    taskEpicElement.classList.add('epic')
    taskEpicElement.innerText = task.epic
    taskElement.append(taskEpicElement)

    let taskTypeElement = document.createElement('span')
    taskTypeElement.classList.add('type')
    taskTypeElement.innerText = task.type
    taskElement.append(taskTypeElement)

    let taskLabelsElement = document.createElement('div')
    taskLabelsElement.classList.add('labels')
    taskElement.append(taskLabelsElement)
    task.labels.forEach((val) => {
        let taskLabelElement = document.createElement('span')
        taskLabelElement.innerText = val
        taskLabelsElement.append(taskLabelElement)
    })

    let taskFooterElement = document.createElement('div')
    taskFooterElement.classList.add('task-footer')
    taskElement.append(taskFooterElement)
    let taskIconsElement = document.createElement('div')
    taskIconsElement.classList.add('icons')
    taskFooterElement.append(taskIconsElement)
    task.icons.forEach((val) => {
        let taskIconElement = document.createElement('img')
        taskIconElement.classList.add('priority')
        taskIconElement.src = val
        taskIconElement.alt = val
        taskIconsElement.append(taskIconElement)
    })
    let taskTimeoutElement = document.createElement('span')
    taskTimeoutElement.classList.add('timeout')
    taskTimeoutElement.innerText = task.timeout
    taskFooterElement.append(taskTimeoutElement)

    return {el: taskElement, status: task.status}
}


function renderTasks(rowsMap, tasks) {
    document.querySelectorAll(".task").forEach(el => {
        el.remove()
    })
    document.querySelectorAll(".task-box").forEach(el => {
        el.remove()
    })
    tasks.forEach((task) => {
        let taskGen = taskElement(task)
        rowsMap[taskGen.status].append(taskGen.el)
    })
    dragNDrop()
}
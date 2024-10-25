let rowID = ""

function newTaskBox() {
    let taskBox = document.createElement('div')
    taskBox.classList.add('task-box')
    return taskBox
}


function allowDrop(event) {
    event.preventDefault()
    let id = event.target.closest('.row').id
    if (rowID !== id) {
        rowID = id
        document.querySelectorAll('.task-box-on').forEach((e) => {
            e.classList.remove('task-box-on')
        })
        event.target.closest('.row').querySelector('.task-box').classList.add('task-box-on')
    }
}

function drag(event) {
    event.dataTransfer.setData('id', event.target.id)
    event.target.classList.add('task-selected')
}

function drop(event) {
    let id = event.dataTransfer.getData('id')
    let task = document.getElementById(id)
    task.classList.remove('task-selected')
    let row = event.target.closest('.row')
    row.querySelector('.task-box').remove()

    let e = task.cloneNode(true)
    e.style.visibility = 'hidden'
    e.id = ''
    task.replaceWith(e);
    setTimeout(() => {
        e.classList.add('task-remove')
    }, 100)
    setTimeout(() => {
        e.remove()
    }, 500)
    row.append(task)
    row.append(newTaskBox())
    rowID = ""
}

function dragNDrop() {
    const rowsElements = document.querySelectorAll(`.row`);
    const taskElements = document.querySelectorAll(`.task`);

    const imgElements = document.querySelectorAll(`img`);
    imgElements.forEach((img) => {
        img.draggable = false;
    })

    taskElements.forEach((task) => {
        task.draggable = true;
        task.ondragstart = drag
    })

    rowsElements.forEach((row) => {
        row.ondragover = allowDrop
        row.ondrop = drop
        row.append(newTaskBox())
    })
}
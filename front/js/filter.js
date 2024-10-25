function updFilterElement(tasks) {
    let epicFilter = document.getElementById('epic-filter')
    let labelFilter = document.getElementById('label-filter')

    epicFilter.append(...genFilterElements(getEpics(tasks)))
    labelFilter.append(...genFilterElements(getLabels(tasks)))

    labelFilter.onchange = filterOnchange;
    epicFilter.onchange = filterOnchange;
}

function filterOnchange(e) {
    updCheckboxes(e.target)
    let labelOpts = getSelectedOptions(document.querySelector('#label-filter'))
    let epicOpts = getSelectedOptions(document.querySelector('#epic-filter'))
    let filteredTasks = filterTasks(GlobalData.masterTasks.slice(), labelOpts, epicOpts)
    renderTasks(GlobalData.statusesMP, filteredTasks)
}

function updCheckboxes(target) {
    let els = target.closest('.items').querySelectorAll('li input')
    if (target.value === "All") {
        els.forEach(e => e.checked = false)
        target.checked = true
    } else {
        let all = [...els].filter(e => e.value === 'All')[0]
        all.checked = false
        let anyChecked = [...els].filter(e => e.checked).length > 0
        all.checked = !anyChecked
    }
}

function genFilterElements(list) {
    return list.map(val => {
        let inputTag = document.createElement('input')
        inputTag.type = 'checkbox'
        inputTag.value = val
        // inputTag.classList.add("epic-filter")
        let labelTag = document.createElement('label')
        labelTag.append(inputTag)
        labelTag.append(val)
        let liTag = document.createElement('li')
        liTag.append(labelTag)
        return liTag
    })
}

function getLabels(tasks) {
    return [].concat(...(tasks.map(e => e.labels))).filter((v, i, ar) => ar.indexOf(v) === i)
}

function getEpics(tasks) {
    return tasks.map(e => e.epic).filter((v, i, ar) => ar.indexOf(v) === i)
}

function filterTasks(tasks, labels, epics) {
    if (labels.length > 0) {
        tasks = tasks.filter(task => labels.some(label => task.labels.includes(label)))
    }
    if (epics.length > 0) {
        tasks = tasks.filter(task => epics.includes(task.epic))
    }
    return tasks
}

function getSelectedOptions(filter) {
    let res = [...filter.querySelectorAll("li [type='checkbox']:checked")].map(el => el.value)
    if (res.includes('All')) {
        return []
    }
    return res
}
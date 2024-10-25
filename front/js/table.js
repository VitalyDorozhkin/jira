function table(statuses) {
    let mp = {}
    let tableElement = document.createElement('div')
    tableElement.classList.add('myTable')
    statuses.forEach((status) => {
        let rowElement = document.createElement('div')
        rowElement.classList.add('row')
        rowElement.id = ('row-' + status)
        tableElement.append(rowElement)
        mp[status] = rowElement
    })

    return {el: tableElement, mp: mp}
}

function tableHeader(statuses) {
    let headerElement = document.createElement('div')
    headerElement.classList.add('myHeader')
    statuses.forEach((status) => {
        let rowElement = document.createElement('div')
        rowElement.classList.add('headerEl')
        rowElement.innerText = status
        headerElement.append(rowElement)
    })

    return headerElement
}
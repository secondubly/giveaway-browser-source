let table = undefined

function createTable() {
    table = document.createElement('table');
    table.id = 'giveaway-table'
    const tableHeader = document.createElement('thead')
    const headerRow = document.createElement('tr')
    for (let i = 0; i < 2; i++) {
        // create table headers
        const header = document.createElement('th')
        i === 0 ? header.innerHTML = 'Username' : header.innerHTML = 'Tickets' 
        headerRow.appendChild(header)
    } 

    tableHeader.appendChild(headerRow)
    table.appendChild(tableHeader)

    const tableBody = document.createElement('tbody')
    table.appendChild(tableBody)

    const tableContainer = document.getElementById('table-container')
    tableContainer.appendChild(table)
}

function addRecord(username) {
    if(isNullOrEmpty(username)) {
        console.warn("username not provided")
        return
    }

    const tableContainer = document.getElementById('table-container')

    if (tableContainer.children.length === 0) {
        createTable()
    }

    // check if table record exists already
    const existingRecord = getTableRecord(username)
    if(existingRecord) {
        // update the ticket count for them
        updateRecord(existingRecord)
    } else {
        // add new row to the table
        const row = document.createElement('tr')
        let cell = undefined
        for (let i = 0; i < 2; i++) {
            cell = document.createElement('td')
            let cellText = null
            if (i === 0) {
                cellText = document.createTextNode(username)
                cellText.id = `${username}-cell`
            } else {
                cellText = document.createTextNode('1')
                cellText.id = `${username}-ticket-cell`
            }
            cell.appendChild(cellText)
            row.appendChild(cell)
        }
        table.appendChild(row)
    }
}

function getTableRecord(username) {
    const rowLength = table.rows.length

    for (let i = 1; i < rowLength; i++) {
        debugger
        const tableRow = table.rows[i]
        const existingUsername = tableRow.children[0].textContent
        if (existingUsername === username) {
            return i
        }
    }

    return undefined
}

function updateRecord(recordIndex) {
    const row = table.rows[recordIndex]
    const ticketColumn = row.children[1]
    let ticketCount = parseInt(ticketColumn.textContent)
    ticketColumn.textContent = `${++ticketCount}`

    return
}

function isNullOrEmpty(str) {
    return str === "" || !str
}
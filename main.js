const tables = [
    {type: 'standard', description: 'Standard table (fixed internal width and margin-left)'},
    {type: 'alternative', description: 'Alternative table (dynamic internal width and no margin-left)'},
    {type: 'firstRowGrey', description: 'Alternative table with first row grey'}
]
let elements = []
let rows
let columns

//main function
const convert = () =>{
    const input = document.getElementById("textarea").value
    rows = parseInt(document.getElementById("rows").value)
    columns = parseInt(document.getElementById("columns").value)
    if(input !== ''){
        hideErrorMessage()
        elements = getElements(input)
        if(checkError()) showErrorMessage()
        tables.forEach(table=>createTable(table))
    }
    console.log(elements)
}

const checkError = () => elements.length === rows * columns ? false : true

//creates an array of strings with the user input
//each string will be a cell in the table
const getElements = inputValue =>{
    const toHTML = document.createElement('div')
    toHTML.innerText = inputValue
    const HTMLstring = toHTML.innerHTML
    let arrayOfElements = HTMLstring.split("<br><br>")
                        .map(e=> e = e.includes('<br>') ? e.replace('<br>', '') : e)
                        .map(e=> e.trim())
    if(arrayOfElements[arrayOfElements.length - 1] === '') arrayOfElements.pop()
    return arrayOfElements
}

//table creation functions

const createTable = tableObject =>{
    const {type, description} = tableObject
    dataCleaner(type)
    printTitle('h2', description, `${type}TablePreviewTitle`)
    const table = createTableElement()
    const tbody = document.createElement('tbody')
    tbody.appendChild(createTableHeader(type))
    let cellItem = 0
    for(let i=0; i < rows; i++){
        const tr = document.createElement('tr')
        for(let j=0; j < columns; j++){
            tr.appendChild(createCell(i, j, cellItem, type))
            cellItem += 1
        }
        tbody.appendChild(tr)
    }
    table.appendChild(tbody)
    const tableContainer = document.getElementById(`${type}TablePreview`)
    tableContainer.appendChild(table)
    printTitle('h3', 'HTML code:', `${type}TableCodeTitle`)
    const codeContainer = document.getElementById(`${type}TableCode`)
    codeContainer.innerText = tableContainer.innerHTML
}

const createTableElement = () =>{
    const table = document.createElement('table')
    table.cellSpacing = "0"
    table.cellPadding = "0"
    table.border = "1"
    table.width = '550px'
    return table
}

const createTableHeader = (type) =>{
    const specificationsTr = document.createElement('tr')
    const specificationsTd = document.createElement('td')
    specificationsTd.colSpan = `${columns}`
    if(type === 'standard'){
       specificationsTd.style = "background-color: #cd2e2a; padding-left: 3%; border: 1px solid black" 
    }else{
        specificationsTd.style = "background-color: #cd2e2a; padding: 3px; border: 1px solid black" 
    }
    const specificationsP = document.createElement('p')
    specificationsP.innerText = 'Specifications'
    specificationsP.style = "color: white !important; margin: 0"
    specificationsTd.appendChild(specificationsP)
    specificationsTr.appendChild(specificationsTd)
    return specificationsTr
}

const createCell = (i, j, cellItemIndex, type) =>{
    const td = document.createElement('td')
    if(type === 'standard'){
        td.style = "padding-left: 3.0%; border: 1.0px solid black"
        td.width = j === 0 ? "132px" : `${Math.round(418 / columns - 1)}px`
    }else{
        td.style = "padding: 3px; border: 1.0px solid black"
    }
    td.style.backgroundColor = i === 0 && type === 'firstRowGrey' ? 'lightgrey' : null
    const p = document.createElement('p')
    p.innerText = elements[cellItemIndex]
    p.style.margin = 0
    td.appendChild(p)
    return td
}

//HTML helpers

const printTitle = (HTMLtag, text, containerId) =>{
    const container = document.getElementById(containerId)
    const title = document.createElement(HTMLtag)
    title.innerText = text
    container.appendChild(title)
}

const dataCleaner = type =>{
    innerHTMLCleaner(`${type}TablePreviewTitle`)
    innerHTMLCleaner(`${type}TablePreview`)
    innerHTMLCleaner(`${type}TableCodeTitle`)
    innerHTMLCleaner(`${type}TableCode`)
}

const innerHTMLCleaner = elementId =>{
    const element = document.getElementById(elementId)
    element.innerHTML = ''
}

const inputCleaner = inputId =>{
    const input = document.getElementById(inputId)
    input.value = ''
}

const showErrorMessage = () =>{
    const errorMessage = document.getElementById('errorMessage')
    errorMessage.classList.replace('hide', 'show')
}

const hideErrorMessage = () =>{
    const errorMessage = document.getElementById('errorMessage')
    errorMessage.classList.replace('show', 'hide')
}
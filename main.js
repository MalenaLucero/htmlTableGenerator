let elements = []
let rows
let columns

const convert = () =>{
    const input = document.getElementById("textarea").value
    rows = document.getElementById("rows").value
    columns = document.getElementById("columns").value
    if(input !== ''){
        dataCleaner()
        elements = getElements(input)
        if(checkError()) showErrorMessage()
        createTable()
        createAlternativeTable()
        createFirstRowGreyTable()
    }
    console.log(elements)
}

const checkError = () =>
    error = elements.length === rows * columns ? false : true

const dataCleaner = () =>{
    innerHTMLCleaner('result')
    innerHTMLCleaner('HTMLcode')
    innerHTMLCleaner('alternativeResult')
    innerHTMLCleaner('alternativeHTMLcode')
    innerHTMLCleaner('firstRowGreyResult')
    innerHTMLCleaner('firstRowGreyHTMLcode')
    innerHTMLCleaner('standardTablePreviewTitle')
    innerHTMLCleaner('standardTableCodeTitle')
    innerHTMLCleaner('alternativeTablePreviewTitle')
    innerHTMLCleaner('alternativeTableCodeTitle')
    innerHTMLCleaner('firstRowGreyPreviewTitle')
    innerHTMLCleaner('firstRowGreyCodeTitle')
    hideErrorMessage()
}

const getElements = inputValue =>{
    const toHTML = document.createElement('div')
    toHTML.innerText = inputValue
    const HTMLstring = toHTML.innerHTML
    return HTMLstring.split("<br><br>")
                        .map(e=> e = e.includes('<br>') ? e.replace('<br>', '') : e)
                        .map(e=> e.trim())
                        .slice(0,-1)

}

const createTable = () =>{
    printTitle('h2', 'Preview: Standard table (fixed internal width and margin-left)', 'standardTablePreviewTitle')
    let index = 0
    const table = document.createElement('table')
    table.cellSpacing = "0"
    table.cellPadding = "0"
    table.border = "1"
    const tbody = document.createElement('tbody')
    tbody.border = "1"
    const specificationsTr = document.createElement('tr')
    const specificationsTd = document.createElement('td')
    specificationsTd.colSpan = `${columns}`
    specificationsTd.style = "background-color: #cd2e2a; padding-left: 3%; border: 1px solid black"
    specificationsTd.width = "550px"
    const specificationsP = document.createElement('p')
    specificationsP.innerText = 'Specifications'
    specificationsP.style = "color: white !important; margin: 0"
    specificationsTd.appendChild(specificationsP)
    specificationsTr.appendChild(specificationsTd)
    tbody.appendChild(specificationsTr)
    for(let i=0; i < rows; i++){
        const tr = document.createElement('tr')
        tr.border = "1"
        for(let j=0; j < columns; j++){
            const td = document.createElement('td')
            td.style = "padding-left: 3.0%; border: 1.0px solid black"
            td.width = j === 0 ? "132px" : `${Math.round(418 / columns - 1)}px`
            const p = document.createElement('p')
            p.innerText = elements[index]
            p.style.margin = 0
            
            index = index + 1
            td.appendChild(p)
            tr.appendChild(td)
        }
        tbody.appendChild(tr)
    }
    table.appendChild(tbody)
    const p = document.getElementById('result')
    p.appendChild(table)
    printTitle('h3', 'Standard table HTML code:', 'standardTableCodeTitle')
    const codeContainer = document.getElementById('HTMLcode')
    codeContainer.innerText = p.innerHTML
}

const createAlternativeTable = () =>{
    printTitle('h2', 'Preview: Alternative table (dynamic internal width and no margin-left)', 'alternativeTablePreviewTitle')
    let index = 0
    const table = document.createElement('table')
    table.width = '550px'
    table.cellSpacing = "0"
    table.cellPadding = "0"
    table.border = "1"
    const tbody = document.createElement('tbody')
    tbody.border = "1"
    const specificationsTr = document.createElement('tr')
    const specificationsTd = document.createElement('td')
    specificationsTd.colSpan = `${columns}`
    specificationsTd.style = "background-color: #cd2e2a; border: 1px solid black"
    specificationsTd.width = "550px"
    const specificationsP = document.createElement('p')
    specificationsP.innerText = 'Specifications'
    specificationsP.style = "color: white !important; margin: 3px"
    specificationsTd.appendChild(specificationsP)
    specificationsTr.appendChild(specificationsTd)
    tbody.appendChild(specificationsTr)
    for(let i=0; i < rows; i++){
        const tr = document.createElement('tr')
        tr.border = "1"
        for(let j=0; j < columns; j++){
            const td = document.createElement('td')
            td.style = "border: 1.0px solid black"
            const p = document.createElement('p')
            p.innerText = elements[index]
            p.style.margin = '3px'
            index = index + 1
            td.appendChild(p)
            tr.appendChild(td)
        }
        tbody.appendChild(tr)
    }
    table.appendChild(tbody)
    const p = document.getElementById('alternativeResult')
    p.appendChild(table)
    printTitle('h3', 'Alternative table HTML code:', 'alternativeTableCodeTitle')
    const codeContainer = document.getElementById('alternativeHTMLcode')
    codeContainer.innerText = p.innerHTML
}

const createFirstRowGreyTable = () =>{
    printTitle('h2', 'Preview: Alternative table with first row grey', 'firstRowGreyPreviewTitle')
    let index = 0
    const table = document.createElement('table')
    table.width = '550px'
    table.cellSpacing = "0"
    table.cellPadding = "0"
    table.border = "1"
    const tbody = document.createElement('tbody')
    tbody.border = "1"
    const specificationsTr = document.createElement('tr')
    const specificationsTd = document.createElement('td')
    specificationsTd.colSpan = `${columns}`
    specificationsTd.style = "background-color: #cd2e2a; border: 1px solid black"
    specificationsTd.width = "550px"
    const specificationsP = document.createElement('p')
    specificationsP.innerText = 'Specifications'
    specificationsP.style = "color: white !important; margin: 3px"
    specificationsTd.appendChild(specificationsP)
    specificationsTr.appendChild(specificationsTd)
    tbody.appendChild(specificationsTr)
    for(let i=0; i < rows; i++){
        const tr = document.createElement('tr')
        tr.border = "1"
        for(let j=0; j < columns; j++){
            const td = document.createElement('td')
            td.style = "border: 1.0px solid black"
            td.style.backgroundColor = i === 0 ? 'lightgrey' : null
            const p = document.createElement('p')
            p.innerText = elements[index]
            p.style.margin = '3px'
            index = index + 1
            td.appendChild(p)
            tr.appendChild(td)
        }
        tbody.appendChild(tr)
    }
    table.appendChild(tbody)
    const p = document.getElementById('firstRowGreyResult')
    p.appendChild(table)
    printTitle('h3', 'Alternative table with first row grey HTML code:', 'firstRowGreyCodeTitle')
    const codeContainer = document.getElementById('firstRowGreyHTMLcode')
    codeContainer.innerText = p.innerHTML
}

const printTitle = (HTMLtag, text, containerId) =>{
    const container = document.getElementById(containerId)
    const title = document.createElement(HTMLtag)
    title.innerText = text
    container.appendChild(title)
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
let elements = []
let rows
let columns

const convert = () =>{
    const input = document.getElementById("textarea").value
    rows = document.getElementById("rows").value
    columns = document.getElementById("columns").value
    if(input !== ''){
        elements = getElements(input)
        createTable()
    }
    console.log(elements)
}

const getElements = (inputValue) =>{
    const toHTML = document.createElement('div')
    toHTML.innerText = inputValue
    const HTMLstring = toHTML.innerHTML
    return HTMLstring.split("<br><br>")
                        .filter(e=>e!=='')
                        .map(e=>{
                            if(e.includes('<br>')){
                                return e.replace('<br>', '')
                            }else{
                                return e
                            }
                        }).map(e=>e.trim())
}

const createTable = () =>{
    let index = 0
    const table = document.createElement('table')
    table.cellSpacing = "0"
    table.cellPadding = "0"
    table.border = "1"
    //table.style.marginLeft = "20px"
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
    const codeContainer = document.getElementById('HTMLcode')
    codeContainer.innerText = p.innerHTML
}
async function getCases() {
    const response = await fetch('https://covid-api.mmediagroup.fr/v1/cases')
    if (response.status !== 200) return console.warn('Error Getting Cases')
    const data = await response.json()
    return data
}

async function main() {
    const datalist = document.querySelector('#country-list')
    const card_grid = document.querySelector('.card-grid')

    const cases = await getCases()
    const casesArray = Object.values(cases)

    for (const item of casesArray) {
        const { country, confirmed, deaths } = item.All
        if (country === undefined || null) continue

        const optionElement = document.createElement('option')
        optionElement.setAttribute('value', country)
        optionElement.textContent = country

        const card = document.createElement('li')
        card.setAttribute('class', 'card center')

        const header = document.createElement('header')
        header.innerHTML = country
        card.appendChild(header)

        const artical = document.createElement('article')
        artical.innerHTML = `Cases: ${confirmed} <br> Deaths: ${deaths}`
        card.appendChild(artical)

        card_grid.appendChild(card)
        datalist.appendChild(optionElement)
    }

    const select = document.querySelector('#country')
    select.addEventListener('keyup', filter)

    function filter() {
        let input = document.getElementById("country")
        let filter = input.value.toUpperCase();
        let ul = document.querySelector('.card-grid')
        let li = ul.querySelectorAll('.card')

        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("header")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    }

}

main()

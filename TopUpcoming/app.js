const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '0f602f195dmshb4ce39bfe95e95ep1e2fd2jsnf97895daa3dd',
		'X-RapidAPI-Host': 'myanimelist.p.rapidapi.com'
	}
};

fetch('https://myanimelist.p.rapidapi.com/anime/top/upcoming', options)
	.then(response => response.json())
	.then(response => {
        
        console.log(response)
        for (let i = 0; i < response.length; i++){
            // create elements
            const col = document.createElement("div")
            const card = document.createElement("div")
            const cardImage = document.createElement("img")
            const cardBody = document.createElement("div")
            const cardTitle = document.createElement("h5")
            const airedOn = document.createElement("p")
            const animeLink = document.createElement("a")
            // assign class, id, attributes
            col.classList.add("col")
            card.classList.add("card")
            card.classList.add(`c-${i}`)
            card.style.width = "18rem"
            card.style.height = "40rem"
            cardImage.classList.add("card-img-top")
            cardImage.classList.add(`img-${i}`)
            cardImage.classList.add('img-fluid')
            cardImage.style.height = '25rem'
            cardImage.src = response[i].picture_url.replace('/r/50x70', '')
            cardBody.classList.add("card-body")
            cardTitle.classList.add("card-title")
            cardTitle.classList.add(`title-${i}`)
            cardTitle.textContent = response[i].title
            airedOn.classList.add("card-text")
            airedOn.classList.add(`aired-on-${i}`)
            airedOn.textContent = `Scheduled : ${response[i].aired_on}`
            animeLink.classList.add("btn")
            animeLink.classList.add("btn-primary")
            animeLink.classList.add(`anime-link-${i}`)
            animeLink.id = "link"
            animeLink.target = "_blank"
            animeLink.rel = "noopener noreferrer"
            animeLink.href = response[i].myanimelist_url
            animeLink.innerHTML = `Know More <i class="fa-solid fa-arrow-up-right-from-square"></i>`
            // append the elements
            document.querySelector(".row").appendChild(col)
            col.appendChild(card)
            card.appendChild(cardImage)
            card.appendChild(cardBody)
            cardBody.appendChild(cardTitle)
            cardBody.appendChild(airedOn)
            cardBody.appendChild(animeLink)
        }
    })
	.catch(err => {
        console.error(err)
        alert(err.message)
    });
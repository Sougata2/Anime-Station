const previousBtn = document.querySelector('#previous')
const nextBtn = document.querySelector('#next')
const searchBtn = document.querySelector('#search-genre')
let pageNumber = 1;
var genereType = "action";

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '61c3215823msh1ce21b5e6bce66ap117f52jsn985a699a8370',
		'X-RapidAPI-Host': 'gogoanime2.p.rapidapi.com'
	}
};
function showSpinner(){
    searchBtn.classList.add('hidden')
    document.querySelector('.cards-container').classList.add('hidden')
    document.querySelector('.pagination-container').classList.add('hidden')
    document.querySelector('.spinner-container').classList.remove('hidden')
}

function hideSpinner(){
    searchBtn.classList.remove('hidden')
    document.querySelector('.cards-container').classList.remove('hidden')
    document.querySelector('.pagination-container').classList.remove('hidden')
    document.querySelector('.spinner-container').classList.add('hidden')
}

function populateCards(response){
    for (let i = 0; i < 20; i++){
        if (i >= response.length){
            document.querySelector(`.c-${i}`).classList.add('hidden')
        }
        else{
            if (document.querySelector(`.c-${i}`).classList.contains('hidden')){
                document.querySelector(`.c-${i}`).classList.remove('hidden')
            }
            // populating the image
            document.querySelector(`.img-${i}`).src = response[i].animeImg
            //populating the title
            document.querySelector(`.title-${i}`).textContent = response[i].animeTitle
            //populating the released date
            document.querySelector(`.released-date-${i}`).textContent = `Released Date : ${response[i].releasedDate}`
            
            //populating the anime link
            document.querySelector(`.anime-link-${i}`).href = response[i].animeUrl
        }
    }
}

function emptyAlert(){
    alert("End of Secition!")
}

searchBtn.addEventListener('click', function(){
    showSpinner()
    pageNumber = 1;
    genereType = document.querySelector('#select-genre').value;
    fetch(`https://gogoanime2.p.rapidapi.com/genre/${genereType}?page=${pageNumber}`, options)
	.then(response => response.json())
	.then(response => {
        console.log(response)
        hideSpinner()
        pageLimiter(pageNumber)
        setPageNumber(pageNumber)
        populateCards(response)
    })
	.catch(err => {
        emptyAlert()
        console.error(err)
    });
})

function setPageNumber(page){
    document.querySelector('#show-page-no').textContent = page;
}

function pageLimiter(page){
    if (page < 2){
        previousBtn.classList.add('hidden')
    }
    else{
        if(previousBtn.classList.contains('hidden')){
            previousBtn.classList.remove('hidden')
        }
    }
    if (page > 330){
        nextBtn.classList.add('hidden')
    }
    else{
        if(nextBtn.classList.contains('hidden')){
            nextBtn.classList.remove('hidden')
        }
    }
}
previousBtn.addEventListener('click', function(event){
    showSpinner()
    event.preventDefault()
    pageNumber--;
    pageLimiter(pageNumber)
    setPageNumber(pageNumber)
    fetch(`https://gogoanime2.p.rapidapi.com/genre/${genereType}?page=${pageNumber}`, options)
	.then(response => response.json())
	.then(response => {
        console.log(response)
        hideSpinner()
        populateCards(response)
    })
	.catch(err => {
        emptyAlert()
        console.error(err)
    });
    window.scrollTo(0, 0)
})
nextBtn.addEventListener('click', function(event){
    showSpinner()
    event.preventDefault()
    pageNumber++;
    pageLimiter(pageNumber)
    setPageNumber(pageNumber)
    fetch(`https://gogoanime2.p.rapidapi.com/genre/${genereType}?page=${pageNumber}`, options)
	.then(response => response.json())
	.then(response => {
        console.log(response)
        hideSpinner()
        populateCards(response)
    })
	.catch(err => {
        emptyAlert()
        console.error(err)
    });
    window.scrollTo(0, 0)
})



fetch(`https://gogoanime2.p.rapidapi.com/genre/${genereType}?page=${pageNumber}`, options)
	.then(response => response.json())
	.then(response => {
        console.log(response)
        hideSpinner()
        pageLimiter(pageNumber)
        setPageNumber(pageNumber)
        populateCards(response)
    })
	.catch(err => {
        emptyAlert()
        console.error(err)
    });
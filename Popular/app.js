const previousBtn = document.querySelector('#previous')
const nextBtn = document.querySelector('#next')
let pageNumber = 1;

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '61c3215823msh1ce21b5e6bce66ap117f52jsn985a699a8370',
		'X-RapidAPI-Host': 'gogoanime2.p.rapidapi.com'
	}
};

function showSpinner(){
    document.querySelector('.cards-container').classList.add('hidden')
    document.querySelector('.pagination-container').classList.add('hidden')
    document.querySelector('.spinner-container').classList.remove('hidden')
}

function hideSpinner(){
    document.querySelector('.cards-container').classList.remove('hidden')
    document.querySelector('.pagination-container').classList.remove('hidden')
    document.querySelector('.spinner-container').classList.add('hidden')
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
    if (page > 503){
        nextBtn.classList.add('hidden')
    }
    else{
        if(nextBtn.classList.contains('hidden')){
            nextBtn.classList.remove('hidden')
        }
    }
}
function setPageNumber(page){
    document.querySelector('#show-page-no').textContent = page;
}
previousBtn.addEventListener('click', function(event){
    showSpinner()
    event.preventDefault()
    pageNumber--;
    pageLimiter(pageNumber)
    setPageNumber(pageNumber)
    fetch(`https://gogoanime2.p.rapidapi.com/popular?page=${pageNumber}`, options)
	.then(response => response.json())
	.then(response => {
        console.log(response)
        hideSpinner()
        for (let i = 0 ; i < response.length; i++){
            // populating the image
            document.querySelector(`.img-${i}`).src = response[i].animeImg
            //populating the title
            document.querySelector(`.title-${i}`).textContent = response[i].animeTitle
            //populating the released date
            document.querySelector(`.released-date-${i}`).textContent = `Released Date : ${response[i].releasedDate}`
            //populating the anime link
            document.querySelector(`.anime-link-${i}`).href = response[i].animeUrl
        }

    })
	.catch(err => console.error(err));
    window.scrollTo(0, 0)
})
nextBtn.addEventListener('click', function(event){
    showSpinner()
    event.preventDefault()
    pageNumber++;
    pageLimiter(pageNumber)
    setPageNumber(pageNumber)
    fetch(`https://gogoanime2.p.rapidapi.com/popular?page=${pageNumber}`, options)
	.then(response => response.json())
	.then(response => {
        console.log(response)
        hideSpinner()
        for (let i = 0 ; i < response.length; i++){
            // populating the image
            document.querySelector(`.img-${i}`).src = response[i].animeImg
            //populating the title
            document.querySelector(`.title-${i}`).textContent = response[i].animeTitle
            //populating the released date
            document.querySelector(`.released-date-${i}`).textContent = `Released Date : ${response[i].releasedDate}`
            //populating the anime link
            document.querySelector(`.anime-link-${i}`).href = response[i].animeUrl
        }

    })
	.catch(err => console.error(err));
    window.scrollTo(0, 0)
})



fetch(`https://gogoanime2.p.rapidapi.com/popular?page=${pageNumber}`, options)
	.then(response => response.json())
	.then(response => {
        console.log(response)
        hideSpinner()
        pageLimiter(pageNumber)
        setPageNumber(pageNumber)
        for (let i = 0 ; i < response.length; i++){
            // populating the image
            document.querySelector(`.img-${i}`).src = response[i].animeImg
            //populating the title
            document.querySelector(`.title-${i}`).textContent = response[i].animeTitle
            //populating the release date
            document.querySelector(`.released-date-${i}`).textContent = `Released Date : ${response[i].releasedDate}`
            //populating the anime link
            document.querySelector(`.anime-link-${i}`).href = response[i].animeUrl
        }

    })
	.catch(err => console.error(err));
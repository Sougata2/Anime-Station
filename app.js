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
    event.preventDefault()
    pageNumber--;
    pageLimiter(pageNumber)
    setPageNumber(pageNumber)
    fetch(`https://gogoanime2.p.rapidapi.com/recent-release?type=1&page=${pageNumber}`, options)
	.then(response => response.json())
	.then(response => {
        console.log(response)
        for (let i = 0 ; i < response.length; i++){
            // populating the image
            document.querySelector(`.img-${i}`).src = response[i].animeImg
            //populating the title
            document.querySelector(`.title-${i}`).textContent = response[i].animeTitle
            //populating the episode number
            document.querySelector(`.ep-no-${i}`).textContent = `Episode No : ${response[i].episodeNum}`
            //populating the sub or dub
            document.querySelector(`.sub-dub-${i}`).textContent = `Sub or Dub : ${response[i].subOrDub}`
            //populating the episode link
            document.querySelector(`.ep-link-${i}`).href = response[i].episodeUrl
        }

    })
	.catch(err => console.error(err));
    window.scrollTo(0, 0)
})
nextBtn.addEventListener('click', function(event){
    event.preventDefault()
    pageNumber++;
    pageLimiter(pageNumber)
    setPageNumber(pageNumber)
    fetch(`https://gogoanime2.p.rapidapi.com/recent-release?type=1&page=${pageNumber}`, options)
	.then(response => response.json())
	.then(response => {
        console.log(response)
        for (let i = 0 ; i < response.length; i++){
            // populating the image
            document.querySelector(`.img-${i}`).src = response[i].animeImg
            //populating the title
            document.querySelector(`.title-${i}`).textContent = response[i].animeTitle
            //populating the episode number
            document.querySelector(`.ep-no-${i}`).textContent = `Episode No : ${response[i].episodeNum}`
            //populating the sub or dub
            document.querySelector(`.sub-dub-${i}`).textContent = `Sub or Dub : ${response[i].subOrDub}`
            //populating the episode link
            document.querySelector(`.ep-link-${i}`).href = response[i].episodeUrl
        }

    })
	.catch(err => console.error(err));
    window.scrollTo(0, 0)
})



fetch(`https://gogoanime2.p.rapidapi.com/recent-release?type=1&page=${pageNumber}`, options)
	.then(response => response.json())
	.then(response => {
        console.log(response)
        pageLimiter(pageNumber)
        setPageNumber(pageNumber)
        for (let i = 0 ; i < response.length; i++){
            // populating the image
            document.querySelector(`.img-${i}`).src = response[i].animeImg
            //populating the title
            document.querySelector(`.title-${i}`).textContent = response[i].animeTitle
            //populating the episode number
            document.querySelector(`.ep-no-${i}`).textContent = `Episode No : ${response[i].episodeNum}`
            //populating the sub or dub
            document.querySelector(`.sub-dub-${i}`).textContent = `Sub or Dub : ${response[i].subOrDub}`
            //populating the episode link
            document.querySelector(`.ep-link-${i}`).href = response[i].episodeUrl
        }

    })
	.catch(err => console.error(err));
const genre=document.getElementById("genre-in")


let times=0;
function vis(){
  times+=1
  if(times%2==0)
  genre.style.display="inline"
  else
  genre.style.display="none"
}

window.onload = () => {
  originals()
  trending()
  topRated()
}

fetchMovies=(url,element,path_type)=>
{
  fetch(url)
  .then(response=>{
    if(response.ok){
      return response.json()
    }
    else{
      throw new Error('something went wrong')
    }
  })
  .then(data => {
    showMovies(data,element, path_type)
  })
  .catch(error_data => {
    console.log(error_data)
  })
}
const showMovies=(movies,element,path_type)=>{
  let movieEle=document.querySelector(element)
  for(let i=0;i<movies.results.length;i++)
  {
    let movie=movies.results[i]
    var  imgElem=document.createElement('img')
    imgElem.style.margin="5px"
    imgElem.setAttribute('data-id', movie.id)
    imgElem.src = `https://image.tmdb.org/t/p/original${movie[path_type]}`
    movieEle.appendChild(imgElem)
  }
}
const originals=()=>{
  url='https://api.themoviedb.org/3/discover/movie?api_key=47781f72befea27a6d6ca4d57c9e003a&language=en-US'
  fetchMovies(url,'#originals','poster_path')
}
originals()

const trending=()=>{
  url='https://api.themoviedb.org/3/trending/tv/week?api_key=47781f72befea27a6d6ca4d57c9e003a'
  fetchMovies(url,'#trending','backdrop_path')
}
const topRated=()=>{
  url='https://api.themoviedb.org/3/movie/top_rated?api_key=47781f72befea27a6d6ca4d57c9e003a&language=en-US&page=1'
  fetchMovies(url,'#top_rated','poster_path')
}



const getTrailer=(id)=>{
  var url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=47781f72befea27a6d6ca4d57c9e003a&language=en-US`
  fetch(url).then(response=>{
    response.json()
  }).then(json=>{
    console.log(json)
  })
}




// ************************************
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Nzc4MWY3MmJlZmVhMjdhNmQ2Y2E0ZDU3YzllMDAzYSIsInN1YiI6IjY0YzIyY2FlMmYxYmUwMDBhZTRjMTgzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1Um-TRmWEBbwCKouhbnNKZWf5bdLPWG43dM5B5njcxA'
  }
};

const getSearch=()=>{
  let div =document.getElementById("main")
  div.innerHTML=''
  const key=document.getElementById('search').value
  getDet(key)
  
}

const getDet=(key)=>{
  document.getElementById('search').value=key
  fetch(`https://api.themoviedb.org/3/search/multi?query=${key}`, options)
    .then(response => response.json())
    .then(movies => {
      let movieEle=document.querySelector('.searchIN')
      movieEle.innerHTML=''
  for(let i=0;i<movies.results.length;i++)
  {
    let movie=movies.results[i]
    var  imgElem=document.createElement('img')
    imgElem.style.margin="5px"
    imgElem.setAttribute('data-id', movie.id)
    if(movie["poster_path"]==undefined)
    {
      continue;
    }
    imgElem.src = `https://image.tmdb.org/t/p/original${movie["poster_path"]}`
    movieEle.appendChild(imgElem)
  }
})
    .catch(err => console.error(err));
  
  }
  
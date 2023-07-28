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
  url='https://api.themoviedb.org/3/discover/tv?api_key=47781f72befea27a6d6ca4d57c9e003a&language=en-US&page=1'
  fetchMovies(url,'#originals','poster_path')
}
originals()

const trending=()=>{
  url='https://api.themoviedb.org/3/trending/movie/week?api_key=19f84e11932abbc79e6d83f82d6d1045'
  fetchMovies(url,'#trending','backdrop_path')
}
const topRated=()=>{
  url='https://api.themoviedb.org/3/movie/top_rated?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=1'
  fetchMovies(url,'#top_rated','poster_path')
}
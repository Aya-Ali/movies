let allMovies=[];
let moviesContainer=document.getElementById("movies-container");
let search=document.getElementById("search");
let searchResult=document.getElementById("searchResult");
let searchByWord=document.getElementById("searchByWord");
let link=document.querySelectorAll(".nav-item a");
let imgPath="https://image.tmdb.org/t/p/w500";
let category="now_playing";
let paginationContainer=document.getElementById("pagination");
let paginationNumber;
let paginationPage=document.querySelectorAll(".page-item .page");
//Get movies function
function getMovies(category,page="1"){
    let req = new XMLHttpRequest();
    req.open("GET",`https://api.themoviedb.org/3/movie/${category}?api_key=8613e4e1776af4e8633cc311d67b3e09&page=${page}`);
    req.send();
    req.onreadystatechange=function(){
        if(req.readyState == 4 && req.status == 200)
        {
            allMovies=JSON.parse(req.response).results;
            paginationNumber=JSON.parse(req.response).total_pages;
            displayData();
        }
    }
}
//display movies function
function displayData()
{
    let temp="";
//     let pagination=`<li class="page-item">
//     <a class="page-link" href="#" aria-label="Previous">
//       <span aria-hidden="true">&laquo;</span>
//     </a>
//   </li>`;
    for(let i=0;i<allMovies.length;i++)
    {
        temp+=`<div class="col-md-4 mb-2">
        <div class="movie-item">
            <img src="${imgPath+allMovies[i].poster_path}" class="img-fluid">
            <div class="layer">
                <h3 class="mb-5">${allMovies[i].title}</h3>
                <p>${allMovies[i].overview}</p>
                <p>Rate ${allMovies[i].vote_average}</p>
                <p>${allMovies[i].release_date}</p>
            </div>
        </div>
    </div>`;
    }
    // for(let i=1;i<=20;i++)
    // {
    //     pagination+=`<li class="page-item"><a class="page-link" href="#">${i}</a></li>`;

    // }
    moviesContainer.innerHTML=temp;
//     paginationContainer.innerHTML=pagination+` <li class="page-item">
//     <a class="page-link" href="#" aria-label="Next">
//       <span aria-hidden="true">&raquo;</span>
//     </a>
//   </li>`;
}

//search in movies function
search.onkeyup=function()
{
    let word=search.value;
    let ResultContainer=``;
    if(word=="")
    {
        return false
    }
    for(let i=0;i<allMovies.length;i++)
    {
        if(allMovies[i].title.toLowerCase().includes(word.toLowerCase())==true)
        {
            ResultContainer+=`<div class="col-md-4 mb-2">
            <div class="movie-item">
                <img src="${imgPath+allMovies[i].poster_path}" class="img-fluid">
                <div class="layer">
                    <h3 class="mb-5">${allMovies[i].title}</h3>
                    <p>${allMovies[i].overview}</p>
                    <p>Rate ${allMovies[i].vote_average}</p>
                    <p>${allMovies[i].release_date}</p>
                </div>
            </div>
        </div>`;
        }
    }
    searchResult.innerHTML=ResultContainer;

}
searchByWord.onkeyup =function()
{
    getMoviesByWord(searchByWord.value)
}
//search in movies by word function
function getMoviesByWord(word)
{
    let req = new XMLHttpRequest();
    req.open("GET","https://api.themoviedb.org/3/search/movie?api_key=8613e4e1776af4e8633cc311d67b3e09&language=en-US&query="+word+"&page=1&include_adult=false");
    req.send();
    req.onreadystatechange=function(){
        if(req.readyState == 4 && req.status == 200)
        {
            allMovies=JSON.parse(req.response).results;
            displayData();
        }
    }
}
for(let i=0;i<link.length;i++)
{
    link[i].addEventListener("click",function(){
        category=this.getAttribute("movieTitle");
        getMovies(category);
    })
}
for(let i=0;i<paginationPage.length;i++)
{
    paginationPage[i].addEventListener("click",function(){
    page=this.innerText;
    getMovies(category,page);
    })
}
getMovies(category);








// menu
let menu=$("#triggle"),
rightMenu =$(".rightMenu"),
leftMenu = $(".leftMenu"),
nav_item=$(".nav-item li");
menu.click(function(){
    let width=leftMenu.outerWidth();
    if(menu.attr("class")=="open")
    {
        menu.addClass("close").removeClass("open");
        leftMenu.animate({"left":`0px`},1000);
        rightMenu.animate({"left":`${width}`},1000);
        for(let i=1;i<=nav_item.length;i++)
        {
            $(`.item${i}`).animate({opacity:'1',paddingTop:'25px'},i*100+1000);
        }
    }
    else{
        menu.addClass("open").removeClass("close")
        leftMenu.animate({"left":`-${width}`},1000);
        rightMenu.animate({"left":`0px`},1000,function(){
            nav_item.animate({opacity:'0',paddingTop:'500px'},1000);
        });
       
    }
})

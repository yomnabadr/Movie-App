

$('.nav-menu').on('click' , function(){

if($('nav').css('margin-left') == '250px'){
    $('.menu ul li').animate({"paddingTop":"250px","opacity":"0"},1000);
        $(".side-nav").css("margin-left","-250px");
    $('nav').css('margin-left' , "0");
      $('.nav-menu').html('<i class="fa-solid fa-align-justify"></i>');
}else{
    $(".side-nav").css("margin-left","0px");
            $("nav").css("margin-left", "250px");
            $('.menu ul li').animate({"paddingTop":"25px","opacity":"1"},1000);
            $('.nav-menu').html('<i class="fa-solid fa-xmark"></i>');
        }
  });






let allmovies = []

async function getMovie(term) {
    
    let movie = `https://api.themoviedb.org/3/${term}?api_key=eba8b9a7199efdcb0ca1f96879b83c44`
    let myHttp = await fetch(`${movie}`);
    if (myHttp.ok && 400 != myHttp.status) {
        let Data = await myHttp.json();
        
        allmovies = Data.results;
        display();
    
        getMoviesAttr()
        topZero()
    }
}

getMovie("movie/now_playing");

async function searchMovie(term) {
    let movie = `https://api.themoviedb.org/3/${term}?api_key=eba8b9a7199efdcb0ca1f96879b83c44`;
    let myHttp = await fetch(`${movie}`);
    if (myHttp.ok && 400 != myHttp.status) {
        let Data = await myHttp.json();
        allmovies = Data.results;

      
        display();
    }
}




 
 function display()
{


let cartona = ``;
for (let i = 0 ; i < allmovies.length ; i++){
       cartona+= `
          <div class="col-lg-4 col-md-6 col-sm-12 ">
            <div class="item overflow-hidden position-relative ">
              <div class="card-img">
                <img src="
                 https://image.tmdb.org/t/p/w500/${allmovies[i].poster_path}
                "  alt="">
              </div>
              <div class="overlay overflow-hidden animate"  >
                <h1 class="title ">
                  ${allmovies[i].title}
                </h1>
               <p class="desc">
             ${allmovies[i].overview}
    
               </p>
               <p class="date">
                <span>release_date</span>
                <span> 
                 ${allmovies[i].release_date}
                </span>
               </p>
               <h3 class="rate">
                <i class="fa-solid fa-star text-warning fs-6"></i>
                <i class="fa-solid fa-star text-warning fs-6"></i>
                <i class="fa-solid fa-star text-warning fs-6"></i>
                <i class="fa-solid fa-star text-warning fs-6"></i>
               </h3>
               <h3 class="vote">
               ${allmovies[i].vote_average}
               </h3>
    
              </div>
            </div>
    
          </div>`
       }
       document.getElementById('movies').innerHTML = cartona;
       
      
}



    





 
 
function getMoviesAttr(){
    $('a').on('click' , function(){

   
   
    
        if($(this).attr("attr") == "nowPlaying")
            {
                getMovie("movie/now_playing");
                topZero();
            }
            else if($(this).attr("attr") == "popular")
            {
                getMovie("movie/popular");
                topZero();
            }
            else if($(this).attr("attr") == "topRated")
            {
                getMovie("movie/top_rated");
                topZero();
            }
            else if($(this).attr("attr") == "trending")
            {
            getMovie("trending/movie/day");
            topZero();
            }
            else if($(this).attr("attr") == "upcoming")
            {
                getMovie("movie/upcoming");
                topZero();
            }
            
        
    })   }

    




  
    
   

  function topZero(){
    $('#back-to-top').on('click' , function(){
        $('html, body').animate({scrollTop:0}, 1500);
       
       })
    
  }


 function validations(element , msgId ){
 
    var text = element.value;
    var regex = {
        name : /^[a-zA-z\s]{1,36}$/ ,
        email : /^[a-zA-Z0-9]+@[a-z0-9]+\.[a-z]{3}$/ , 
        phone : /^(02)?(01)[0125][0-9]{8}$/ ,
        age : /^(1[6-9]|[2-9][0-9]|100)$/ ,
        password :/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        repassword :/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ ,
    }

    var msg = document.getElementById(msgId)
    var btnerror = document.getElementById('btnerror')
    
   $(element).on('input' , function(){
    if(regex[element.id].test(text) == true){
        msg.innerHTML = "Please fill the field";
        msg.style.color = "red";
        msg.style.display = "block";

    }else if(
        regex[element.id].test($(this).val())
    ){
        msg.innerHTML = "";

    }else{
        msg.innerHTML = "Invalid "+element.id;
        msg.style.color = "red";
        msg.style.display = "block";
        btnerror.style.background = 'tomato'
        btnerror.style.marginLeft = "250px"
        btnerror.style.cursor = 'default'
        btnerror.style.userSelect = "none"
       



    }

    $('.showPass').click(function(){
        if ($('#password').attr('type') == "text") 
        {
            $('#password').attr('type','password');
            $('.showPass').html('<i data-show="show" class="fa-solid fa-eye-slash"></i>');
        } else {
            $('#password').attr('type','text');
            $('.showPass').html('<i data-show="show" class="fa-solid fa-eye"></i>');
        }
    })
    $('#password').focus(function(){
        $('.showPass').css("opacity",1);
        $('.showPass').css("bottom",10);
    })
    $(document).click(function(e){
        if($(e.target)[0] == $('#password')[0] || $(e.target).attr('data-show') == $('.showPass i').attr('data-show') )
        {
            $('.showPass').css("opacity",1);
            $('.showPass').css("bottom",10);
        }
        else
        {
            $('.showPass').css("opacity",0);
            $('.showPass').css("bottom",-20);
        }
    })

   })
}








const searchInput = document.getElementById("search")




$('#search').on("input", e => {
    searchMovie(e.target.value);
    if(e.target.value == "")
    {
        getMovie("movie/now_playing");

    }

});

 async function searchMovie(term) {
    let movie = `https://api.themoviedb.org/3/${term}?api_key=eba8b9a7199efdcb0ca1f96879b83c44`;
    let myHttp = await fetch(`${movie}`);
    if (myHttp.ok && 400 != myHttp.status) {
        let Data = await myHttp.json();
        results = Data.results;

      
        display();
    }
}



$('.menu li a').click(navGetSection);

function navGetSection()
{
    if($(this).attr("section"))
    {
    let sectionLocation = $($(this).attr("section")).offset().top;
    $('html, body').animate({scrollTop:sectionLocation}, 2000);
    }
}


  






$(document).ready(function(){
    $('.loading').fadeOut(2000)
})

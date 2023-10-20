/*Boton*/
const btn_buscar = document.getElementById('btn-buscar'); //tomo boton
btn_buscar.addEventListener('click',()=>{
    consumirAPI();
});




/*Trayendo datos de API*/
//Links de conexion con API - Aclaracion: estos links VAN A SER DISTINTOS. 
let url = 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode='
let region = '';
let API_KEY = '&videoCategoryId=25&key=AIzaSyD8_ZS7DKHeIXj8-5RYyk1VVDqg8P1X8fM';
let link = '';

//const API_KEY = 'AIzaSyD8_ZS7DKHeIXj8-5RYyk1VVDqg8P1X8fM';

let limite_resultados = 5;


 async function traerResultados(){
    region = document.getElementById('input-busqueda').value;
    //let datos = await fetch()
    
    if(region==''){
        alert('PONE ALGO FLACO'); //pseudovalidacion
    }
    else{
       // alert(`Has ingresado: ${region}`);
       try{
            link = '';
            link += url + region + API_KEY;
            console.log(link);
            let data = await fetch(link);
            let data2 = await data.json();
            console.log(data2);
       }catch{
            console.log('error!');
       }

    }

}


async function consumirAPI(){
    region = document.getElementById('input-busqueda').value;
    //let datos = await fetch()
    
    if(region==''){
        alert('PONE ALGO FLACO'); //pseudovalidacion
    }
    else{
       // alert(`Has ingresado: ${region}`);
       try{
            link = '';
            link += url + region + API_KEY;
            console.log(link);
            let data = await fetch(link);
            let data2 = await data.json();
           // console.log(data2);
           renderizarResultados(data2);
       }catch(error){
            console.log(error);
       }

    }

}

function renderizarResultados(json){
let seccion_resultados = document.querySelector('.seccion-resultados'); //tomamos seccion donde van los resultados
seccion_resultados.innerHTML = ''; //lo limpiamos para q no se concatene a posibles busquedas anteriores
let fragmento = document.createDocumentFragment();

        for(let i=0;i<limite_resultados;i++){
            let titulo = json.items[i].snippet.title;
            let canal = json.items[i].snippet.channelTitle;
            let cant_visualizaciones = json.items[i].statistics.viewCount;
            let cant_likes = json.items[i].statistics.likeCount;
            let cant_comentarios = json.items[i].statistics.commentCount;
            let link_imagen = json.items[i].snippet.thumbnails.maxres.url; 

            let div_resultado = document.createElement('div');
            div_resultado.classList.add('resultado');
            div_resultado.innerHTML = 
            `<div class="resultado">
            <p class="numero-resultado">${i+1}.</p> 
            <div class="contenedor-imagen">
            <img src="${link_imagen}" alt="" class="img-resultado">
            </div>
            <div class="datos-video"> <!--este div incluiria titulovideo + nombreCanal + cantLikes - cantComentarios-->
              <p class="titulo-video">${titulo}</p>
              <p class="nombre-canal">${canal}</p>
              <p class="stats">V: ${cant_visualizaciones} - L: ${cant_likes} - C: ${cant_comentarios}</p>
            </div>
          </div>`;
            fragmento.appendChild(div_resultado);
        }
        seccion_resultados.appendChild(fragmento);

}


/*El html*/
/*
                  <div class="resultado">
                    <p class="numero-resultado">1.</p>
                    
                    <div class="contenedor-imagen">
                    <img src="/maxresdefault.jpg" alt="" class="img-resultado">
                    </div>
                  
                    <div class="datos-video"> <!--este div incluiria titulovideo + nombreCanal + cantLikes - cantComentarios-->
                      <p class="titulo-video">🗣️ Javier Milei: "Si el error estadístico está de nuestro lado, ganamos en primera vuelta"</p>
                      <p class="nombre-canal">A24com</p>
                      <p class="stats">V: 382891 - L: 12773 - C: 3682</p>
                    </div>

                  </div>
*/
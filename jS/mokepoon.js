
const sectionReiniciar = document.getElementById('reiniciar')
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const botonMascotaJugador = document.getElementById('boton-mascota')

const botonReiniciar = document.getElementById('boton-reiniciar')

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador =document.getElementById('name-mascotaUser')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensaje = document.getElementById('resultado')
const ataqueDelJugador2 = document.getElementById('ataque-del-jugador')
const ataqueDelEnemigo3 = document.getElementById('ataque-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionVerMapa= document.getElementById('ver-mapa')
const mapa= document.getElementById('mapa')

let mokepones = []
let ataqueJugador=[]
let ataqueEnemigo=[]
let opcionDeMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego
let botonAgua
let botonTierra
let botones=[]
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador= 0
let victoriasEnemigo= 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo= mapa.getContext("2d")
let intervalo
let mapaBackground= new Image()
mapaBackground.src='./Assets/mokemap.png'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600/800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon {
    constructor(nombre, foto,vida, fotoMapa) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho= 40
        this.alto= 40
        this.x= aleatorio(0, mapa.width - this.ancho)
        this.y= aleatorio(0, mapa.height - this.alto)
        this.mapaFoto= new Image()
        this.mapaFoto.src= fotoMapa
        this.velocidadX= 0
        this.velocidadY= 0
    }

    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }

}

let hipodoge = new Mokepon('Hipodoge', './Assets/mokepons_mokepon_hipodoge_attack.png', 5, 'Assets/hipodogeChica.png')
let capipepo = new Mokepon('Capipepo', './Assets/mokepons_mokepon_capipepo_attack.png', 5, 'Assets/capipepoChica.png')
let ratigueya = new Mokepon('Ratigueya', './Assets/mokepons_mokepon_ratigueya_attack.png', 5, 'Assets/ratigueyaChica.png')

let hipodogeEnemigo = new Mokepon('Hipodoge', './Assets/mokepons_mokepon_hipodoge_attack.png', 5, 'Assets/hipodogeChica.png')
let capipepoEnemigo = new Mokepon('Capipepo', './Assets/mokepons_mokepon_capipepo_attack.png', 5, 'Assets/capipepoChica.png')
let ratigueyaEnemigo= new Mokepon('Ratigueya', './Assets/mokepons_mokepon_ratigueya_attack.png', 5, 'Assets/ratigueyaChica.png')

hipodoge.ataques.push(
    {nombre: '💧', id:"boton-agua"},
    {nombre: '💧', id:"boton-agua"},
    {nombre: '💧', id:"boton-agua"},
    {nombre: '🔥', id:"boton-fuego"},
    {nombre: '🌱', id:"boton-tierra"},
)

hipodogeEnemigo.ataques.push(
    {nombre: '💧', id:"boton-agua"},
    {nombre: '💧', id:"boton-agua"},
    {nombre: '💧', id:"boton-agua"},
    {nombre: '🔥', id:"boton-fuego"},
    {nombre: '🌱', id:"boton-tierra"},
)

capipepo.ataques.push(
    {nombre: '🌱', id:"boton-tierra"},
    {nombre: '🌱', id:"boton-tierra"},
    {nombre: '🌱', id:"boton-tierra"},
    {nombre: '🔥', id:"boton-fuego"},
    {nombre: '💧', id:"boton-agua"},
)

capipepoEnemigo.ataques.push(
    {nombre: '🌱', id:"boton-tierra"},
    {nombre: '🌱', id:"boton-tierra"},
    {nombre: '🌱', id:"boton-tierra"},
    {nombre: '🔥', id:"boton-fuego"},
    {nombre: '💧', id:"boton-agua"},
)

ratigueya.ataques.push(
    {nombre: '🔥', id:"boton-fuego"},
    {nombre: '🔥', id:"boton-fuego"},
    {nombre: '🔥', id:"boton-fuego"},
    {nombre: '🌱', id:"boton-tierra"},
    {nombre: '💧', id:"boton-agua"},
)

ratigueyaEnemigo.ataques.push(
    {nombre: '🔥', id:"boton-fuego"},
    {nombre: '🔥', id:"boton-fuego"},
    {nombre: '🔥', id:"boton-fuego"},
    {nombre: '🌱', id:"boton-tierra"},
    {nombre: '💧', id:"boton-agua"},
)

mokepones.push(hipodoge, capipepo, ratigueya)

function iniciarjuego() {

    /* let sectionReiniciar = document.getElementById('reiniciar') */
    sectionReiniciar.style.display = 'none'
    sectionVerMapa.style.display='none'

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
             <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label> `

    contenedorTarjetas.innerHTML += opcionDeMokepones

        inputHipodoge = document.getElementById('Hipodoge')
        inputCapipepo = document.getElementById('Capipepo')
        inputRatigueya = document.getElementById('Ratigueya')

    } )

    /* let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque') */
    sectionSeleccionarAtaque.style.display = 'none'

    /* let botonMascotaJugador = document.getElementById('boton-mascota') */
    botonMascotaJugador.addEventListener('click',seleccionMascotaJugador)

    /* let botonReiniciar = document.getElementById('boton-reiniciar') */
    botonReiniciar.addEventListener('click', reiniciarJuego)

}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)

}

function seleccionMascotaJugador() {
    /* let sectionSeleccionarMascota = document.getElementById('seleccionar-mascota') */
    sectionSeleccionarMascota.style.display = 'none'

    /* let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque') */



    /* let inputHipodoge = document.getElementById('hipodoge')
    let inputCapipepo = document.getElementById('capipepo')
    let inputRatigueya = document.getElementById('ratigueya')
    let spanMascotaJugador =document.getElementById('name-mascotaUser') */

    if(inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if(inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } else {
        alert(" NO has seleccionado a ninguna mascota!")
    }

    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display='flex'
    iniciarMapa()
}
function extraerAtaques(mascotaJugador){
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }

    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        ataquesMokepon = `<button id=${ataque.id} class="boton-ataque BAtaque">${ataque.nombre}</button>`
        contenedorAtaques.innerHTML += ataquesMokepon
    })

    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')

    botones = document.querySelectorAll('.BAtaque')

    /* let botonFuego = document.getElementById('boton-fuego') */
   // botonFuego.addEventListener('click', ataqueFuego)

   /*  let botonAgua = document.getElementById('boton-agua') */
   //botonAgua.addEventListener('click', ataqueAgua)

    /* let botonTierra = document.getElementById('boton-tierra') */
    //botonTierra.addEventListener('click', ataqueTierra)
}

function secuenciaAtaque(){
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            } else if (e.target.textContent === '💧') {
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            } else {
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            }
            ataqueAleatorioEnemigo()
        })
    })

}

function seleccionarMascotaEnemigo(enemigo) {
    //let mascotaAleatorio = aleatorio(0, mokepones.length -1)
    /* let spanMascotaEnemigo = document.getElementById('mascota-enemigo') */

   /* if (mascotaAleatorio == 1) {
        spanMascotaEnemigo.innerHTML = 'Hipodoge'

    } else if (mascotaAleatorio == 2) {
        spanMascotaEnemigo.innerHTML = 'Capipepo'


    } else {
        spanMascotaEnemigo.innerHTML = 'Ratigueya'

    }*/
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.nombre
    secuenciaAtaque()
}

/* function ataqueFuego() {
    ataqueJugador = 'FUEGO'
    ataqueAleatorioEnemigo()
}

function ataqueAgua() {
    ataqueJugador = 'AGUA'
    ataqueAleatorioEnemigo()
}


function ataqueTierra() {
    ataqueJugador = 'TIERRA'
    ataqueAleatorioEnemigo()
}*/

function ataqueAleatorioEnemigo() {
    console.log('ataque enemigo', ataquesMokeponEnemigo );
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1)

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push('FUEGO')
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('AGUA')
    } else {
        ataqueEnemigo.push('TIERRA')
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate()
    }

}

function indexAmbosOponentes(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]

}

function combate() {
    /* let spanVidasJugador = document.getElementById('vidas-jugador')

    let spanVidasEnemigo = document.getElementById('vidas-enemigo') */
    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index)
            crearMensaje("EMPATE")
        } else if(ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA'){
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML= victoriasJugador
        } else if(ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'FUEGO'){
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML= victoriasJugador
        } else if(ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA'){
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML= victoriasJugador
        } else{
            indexAmbosOponentes(index, index)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML= victoriasEnemigo
        }

    }

   /* if(ataqueEnemigo == ataqueJugador) {
        crearMensaje("EMPATE")
    } else if(ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA') {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo

    } else if(ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO') {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo

    } else if(ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA') {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo

    } else {
        crearMensaje("PERDISTE")
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
    }*/
    revisarVidas()
}

function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal('ESTO FUE UN EMPATE')
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal('FELICITACIONES GANASTE!!')
    } else {
        crearMensajeFinal('PERDISTE :(')
    }
}

function crearMensaje(resultado) {
   /*  let sectionMensaje = document.getElementById('resultado')
    let ataqueDelJugador2 = document.getElementById('ataque-del-jugador')
    let ataqueDelEnemigo3 = document.getElementById('ataque-del-enemigo') */

    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensaje.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    //let parrafo = document.createElement('p')
    //parrafo.innerHTML = 'Tu mascota ataco con ' + ataqueJugador + ', las mascotas de tu enemigo ataco con ' + ataqueEnemigo  + '-' + resultado

    ataqueDelJugador2.appendChild(nuevoAtaqueDelJugador)
    ataqueDelEnemigo3.appendChild(nuevoAtaqueDelEnemigo)
}


function crearMensajeFinal(resultadoFinal) {
    /* let sectionMensaje = document.getElementById('resultado') */
    sectionMensaje.innerHTML = resultadoFinal

    /* let botonMascotaJugador = document.getElementById('boton-mascota') */
    botonMascotaJugador.addEventListener('click',seleccionMascotaJugador)

    /* let botonFuego = document.getElementById('boton-fuego') */
    //botonFuego.disabled = true

    /* let botonAgua = document.getElementById('boton-agua') */
   // botonAgua.disabled = true

    /* let botonTierra = document.getElementById('boton-tierra') */
    //botonTierra.disabled = true

    /* let sectionReiniciar = document.getElementById('reiniciar') */
    sectionReiniciar.style.display = 'block'


}

function reiniciarJuego() {
    location.reload()
}

function PintarCanvas(){

    mascotaJugadorObjeto.x += mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y += mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.clientWidth, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
   mascotaJugadorObjeto.pintarMokepon()
   hipodogeEnemigo.pintarMokepon()
   capipepoEnemigo.pintarMokepon()
   ratigueyaEnemigo.pintarMokepon()
   if (mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0) {
    revisarColision(hipodogeEnemigo)
    revisarColision(capipepoEnemigo)
    revisarColision(ratigueyaEnemigo)
   }
}

function moverDerecha(){
    mascotaJugadorObjeto.velocidadX=  5
}
function moverIzquierda(){
    mascotaJugadorObjeto.velocidadX= - 5
}
function moverAbajo(){
    mascotaJugadorObjeto.velocidadY=  5
}
function moverArriba(){
    mascotaJugadorObjeto.velocidadY= - 5
}

function detenerMovimiento(){
    mascotaJugadorObjeto.velocidadX= 0
    mascotaJugadorObjeto.velocidadY= 0
}

function sePresionoUnaTecla(event){
    switch (event.key) {
        case 'ArrowUp':
        case 'w':
            moverArriba()
            break
        case 'ArrowDown':
        case 's':
            moverAbajo()
            break
        case 'ArrowLeft':
        case 'a':
            moverIzquierda()
            break
        case 'ArrowRight':
        case 'd':
            moverDerecha()
            break

        default:
            alert("Favor Digite una tecla valida")
            break
    }
}

function iniciarMapa(){
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    intervalo= setInterval(PintarCanvas, 50)

    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota(){
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }
    }
}

function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x

    if (abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo) {
        return
    }

    detenerMovimiento()
    clearInterval(intervalo)
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
}

window.addEventListener('load', iniciarjuego)

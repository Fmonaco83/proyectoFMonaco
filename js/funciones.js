const lista = document.querySelector('#container')
let contenedor_carrito = document.getElementById("container_carrito");
let carrito = []; 
let boton_1 = document.getElementById("boton_1");
let titulo = document.getElementById('titulo');
let n_p = document.getElementById('n_p');
let correo = document.getElementById('correo');
let direccion = document.getElementById('direccion');
let adicional = document.getElementById('adicional');
let tel = document.getElementById('tel');

//Funcion recarga de pagina 
function actualizar(){location.reload(true)}

mostrarProdcuto();
cargarCarrito();
mostrarCarrito();



//Carga productos guardados en el LocalStorage

function cargarCarrito() {
(localStorage.getItem("StorageCarrito") !== null) ? 
carrito = JSON.parse(localStorage.getItem("StorageCarrito")) 
: localStorage.setItem("StorageCarrito", JSON.stringify(carrito));
}


//Muestra productos, tomados desde archivo JSON
function mostrarProdcuto() {
fetch ('./productos.json')
  .then ( (Response) => Response.json ())
  .then ( (data) => {

    data.forEach( (producto) => {
      const div = document.createElement ('div')
      div.innerHTML += `
      <div class="card" style="width: 18rem;">
      <img src=${producto.foto} class="card-img-top" alt="...">
      <div class="card-body">
        <h4 class="card-title">${producto.nombre}</h4>
        <p class="card-text">Descripcion: ${producto.descripcion}</p>
        <p class="card-text">Precio: ${producto.precio}</p>
        <button  onClick="usuarioCarrito(${producto.id}),(boton_2())" class="btn btn-info">Comprar</button>
      </div>
    </div>
      `;
 
      lista.append(div)

  })
})
}

//Muestra productos en el carrito
function mostrarCarrito () {
  carrito.forEach((producto) => {
    contenedor_carrito.innerHTML += `
    <div class="card" style="width: 18rem; ">
    <img src=${producto.foto} class="card-img-top" alt="...">
    <div class="card-body">
    <h4 class="card-title"> ${producto.nombre}</h4>
    <p class="card-text">Descripcion: ${producto.descripcion}</p>
    <p class="card-text">Precio: ${producto.precio}</p>
    <button  onClick="quitarCarrito(${producto.id}); boton_3()" class="btn btn-info">ELIMINAR</button>
    </div>
    </div>`; 
  });
}


//Carga nuevo producto en el Array
function usuarioCarrito(identificador) {
  let indice = identificador - 1;
  let objeto_seleccionado = {};
  objeto_seleccionado = producto[indice];
  {
	  carrito.push(objeto_seleccionado);
	  localStorage.setItem("StorageCarrito", JSON.stringify(carrito));
    setInterval("actualizar()",600);
  } 
}

//Quita Producto del Array
function quitarCarrito(id) {
  let carrito_filtrado = carrito.shift ();
  localStorage.setItem("StorageCarrito", JSON.stringify(carrito));
  console.log(carrito_filtrado);
  setInterval("actualizar()",600);
}

//sweetalert

boton_1.onclick = ()=>{
    Swal.fire({
        title: 'Pedido Finalizado Con Exito ',
        text: 'Haz click para continuar',
        icon: 'success',
        confirmButtonText: 'OK'
    })
    
}

//Fetch

boton_1.addEventListener('click', () => {
  const info ={
    title: 'Datos compra',
    body: 
      {
        correo_electronico : correo.value,
        nombre_apellido: n_p.value,
        direccion_entrega : direccion.value,
        info_adicional : adicional.value,
        tel : tel.value,
      },
}

fetch('https://jsonplaceholder.typicode.com/posts',{
        method: 'POST',
        body: JSON.stringify(info),
        headers:{
          'Content-type': 'application/json; charset=UTF-8',
        }
      })

.then((Response) => Response.json())
.then((info) => {
  console.log(info);
})
})
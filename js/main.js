fetch("../productos.json")
    .then(response => response.json())
    .then(productos => miPrograma(productos))

function miPrograma(productos) { 

let contenedorCarrito = document.getElementById("contenedorCarrito")

let contenedor = document.getElementById("contenedor-productos")
renderizarProductos(productos)

let carrito = []
if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"))
}
renderizarCarrito(carrito)

let buscador = document.getElementById("buscador")
buscador.addEventListener("input", filtrados)

function filtrados () {
    let productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().includes(buscador.value.toLowerCase()) || producto.categoria.toLowerCase().includes(buscador.value.toLowerCase()))
    renderizarProductos(productosFiltrados)
}


function renderizarProductos(arrayDeProductos) {
    contenedor.innerHTML = ""
    for (const producto of arrayDeProductos) {
        let tarjetaProducto = document.createElement("div")
        tarjetaProducto.className = "producto"
        tarjetaProducto.id = producto.id

        tarjetaProducto.innerHTML = `
        <p>Nombre: ${producto.nombre}</p>
        <p>Categoria: ${producto.categoria}</p>
        <p>Stock en web ${producto.stock}</p>
        <strong>Precio $ ${producto.precio}</strong>
        <img src=${producto.imgRuta}>
        <button class ="boton" id= ${producto.id}>Añadir al carrito</button>
        `

        contenedor.append(tarjetaProducto)
    }
    let botones = document.getElementsByClassName("boton")
    for (const boton of botones){
        boton.addEventListener("click", agregarAlCarrito)
    }
}
function agregarAlCarrito (e) {
    Toastify({
        text: "Agregado correctamente!",
        duration: 2000,
        style: {
            background: "linear-gradient(to right, #5d1c00, #b33600)",
          },
        }).showToast();

    let productoBuscado = productos.find(producto => producto.id == e.target.id)
    let posicionDelProductoBuscado = carrito.findIndex(producto => producto.id == productoBuscado.id)

    if (posicionDelProductoBuscado != -1) {
        carrito[posicionDelProductoBuscado].unidades++
        carrito[posicionDelProductoBuscado].subtotal = carrito[posicionDelProductoBuscado].unidades * carrito[posicionDelProductoBuscado].precioUnitario
    } else {
        carrito.push({id: productoBuscado.id, nombre: productoBuscado.nombre, precioUnitario: productoBuscado.precio, unidades: 1, subtotal: productoBuscado.precio})
    }
    localStorage.setItem("carrito", JSON.stringify(carrito))
    renderizarCarrito(carrito)
}

function renderizarCarrito (arrayDeProductos){
    contenedorCarrito.innerHTML = ' '
    for (const producto of arrayDeProductos) {
        contenedorCarrito.innerHTML += `
        <div class="flex">
        <p>${producto.nombre}</p>
        <p>$ ${producto.precioUnitario}</p>
        <p>U ${producto.unidades}</p>
        <p>Sub-Total ${producto.subtotal}</p>
        </div>
        `
    }
    let total = carrito.reduce ((acc, valorActual) => acc + valorActual.subtotal, 0)
    contenedorCarrito.innerHTML += `
    <h3 id="total"> Total = $${total}</h3>
    `
}

let botonComprar = document.getElementById("comprar")
botonComprar.addEventListener("click", () => {
    carrito.length === 0
    ? alertas("Carrito vacío!", "info", "1000")
    : alertas("Gracias por su compra!", "success", "1000")
    
    localStorage.removeItem("carrito")
    carrito = []
    renderizarCarrito([carrito])
})

function alertas (texto, icono, tiempo) {
    Swal.fire({
        title: texto,
        icon: icono,
        timer: tiempo,
        showConfirmButton: false
      })
}
}

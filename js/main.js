
let productos = [
    { id: 1, nombre: "Pelota", categoria: "accesorios", precio: 1200, stock: 10, imgRuta: "https://f.fcdn.app/imgs/a540da/www.lacancha.uy/lcanuy/ce1a/original/catalogo/HE3771_HE3771_1/800x800/pelota-de-futbol-uefa-champions-league-league-pelota-de-futbol-uefa-champions-league-league.jpg" },
    { id: 2, nombre: "Short", categoria: "ropa", precio: 850, stock: 15, imgRuta: "https://d3ugyf2ht6aenh.cloudfront.net/stores/861/003/products/short_futbol_rojo1-7c5d087f9a14729e4c15856845438109-1024-1024.jpg" },
    { id: 3, nombre: "Medias", categoria: "ropa", precio: 400, stock: 42, imgRuta: "https://f.fcdn.app/imgs/d278f6/www.bas.com.uy/bas/afe7/original/catalogo/S2223W72Negro1/600x900/media-tobillera-x3-negro.jpg" },
    { id: 4, nombre: "Zapatos", categoria: "calzado", precio: 3200, stock: 18, imgRuta: "https://cf.shopee.com.mx/file/7773bed55a76c4a511b93505df05e9c0_tn" },
    { id: 5, nombre: "vendas", categoria: "accesorios", precio: 100, stock: 120, imgRuta: "https://previews.123rf.com/images/kampolg/kampolg1404/kampolg140400003/27712364-vendas-el%C3%A1sticas-azules.jpg" },
    {id: 6, nombre: "Almohadilla para barra", categoria: "accesorios", precio: 356, stock: 21, imgRuta: "https://http2.mlstatic.com/D_NQ_NP_2X_779974-MLU32167510812_092019-F.webp"},
    { id: 7, nombre: "Colchoneta Yoga", categoria: "accesorios", precio: 490, stock: 10, imgRuta: "https://http2.mlstatic.com/D_NQ_NP_881352-MLU42940949272_072020-O.webp" },
    { id: 8, nombre: "Guantes de entrenamiento", categoria: "accesorios", precio: 690, stock: 11, imgRuta: "https://http2.mlstatic.com/D_NQ_NP_885053-MLU44811673440_022021-O.webp" },
    { id: 9, nombre: "Bolso Reebok", categoria: "accesorios", precio: 2039, stock: 7, imgRuta: "https://http2.mlstatic.com/D_NQ_NP_656311-MLU51757923723_092022-O.webp" },
    { id: 10, nombre: "Guantes de entrenamiento", categoria: "ropa", precio: 1450, stock: 3, imgRuta: "https://http2.mlstatic.com/D_NQ_NP_844473-MLU53347544735_012023-O.webp" },
    { id: 11, nombre: "Musculosa Soft fem.", categoria: "ropa", precio: 590, stock: 11, imgRuta: "https://http2.mlstatic.com/D_NQ_NP_643911-MLU53339754560_012023-O.webp" },
    { id: 12, nombre: "Cuerda de salto", categoria: "accesorio", precio: 250, stock: 18, imgRuta: "https://http2.mlstatic.com/D_NQ_NP_930527-MLU52992498175_122022-O.webp" }
]

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
    Swal.fire ({
        text: "Agregado correctamente",
        icon: "success",
        confirmButtonText: "Ok!"
    })
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
    Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: 'Gracias por su compra',
        showConfirmButton: false,
        timer: 1500
      })
    localStorage.removeItem("carrito")
    carrito = []
    renderizarCarrito([carrito])
})

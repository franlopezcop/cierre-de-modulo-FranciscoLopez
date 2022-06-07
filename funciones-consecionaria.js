const autos= require('./autos')

let concesionaria = {
   
    autos: autos,

   buscarAuto: function (patente){
       let autos = this.autos
       let autoBuscado = autos.filter(function(auto){
            return auto.patente == patente
       }) 
        if (autoBuscado.length > 0) {
           return autoBuscado[0]
        } else{
         return null
         }
   },

   venderAuto: function (patente){
    let auto= this.buscarAuto(patente)

     if (auto != undefined){
        return auto.vendido = true
     }
    },

   autosParaLaVenta: function (){
       let autos = this.autos
       let autosEnVenta = autos.filter(function(auto){
        return auto.vendido == false
       })
       return autosEnVenta
   },

   autosNuevos: function (){
       let autosDisponibles = this.autosParaLaVenta()
       let autoNuevo = autosDisponibles.filter(function(auto){
           return auto.km < 100
       })
        return autoNuevo
   },

   listaDeVentas: function (){
       let autos = this.autos;
       let autosVendidos = autos.filter(function(auto){
           return auto.vendido == true
   })
        let arrayPrecios = []
        autosVendidos.forEach(function(auto){
            return arrayPrecios.push(auto.precio)
        })
        return arrayPrecios
   },

   totalDeVentas: function (){
    let arrayPrecios = this.listaDeVentas()   
    if (arrayPrecios.length == 0){
        return 0
    } else{
        let totalDeVentas = arrayPrecios.reduce(function(acum, precio){
            return acum + precio
           })
           return totalDeVentas
    }
   },

   puedeComprar: function(auto, persona){  
       //costoTotal vs capacidadDePagoTotal costo < capacidad
       //cuotas vs capacidadDePagoEnCuotas cuota < capacidad
    if (auto.precio <= persona.capacidadDePagoTotal && (auto.precio / auto.cuotas) <= persona.capacidadDePagoEnCuotas){
        return true
    } else {
        return false
    }
   },

   autosQuePuedeComprar: function(persona){
    let autosDisponibles = this.autosParaLaVenta();
   let autosQuePuedeComprar = autosDisponibles.filter((auto)=>{
        return (this.puedeComprar(auto, persona)) === true;
    });
    return autosQuePuedeComprar
    }

}
console.log(concesionaria.autosQuePuedeComprar({
    nombre: 'juan',
    capacidadDePagoEnCuotas: 200000,
    capacidadDePagoTotal: 1000000
}))

/*console.log(concesionaria.puedeComprar({
    marca: "Ford",
    modelo: "Fiesta",
    precio: 150000 ,
    km: 200,
    color: "Azul",
    cuotas: 12,
    anio: 2019,
    patente: "APL123",
    vendido: false,
},
{
    nombre: 'juan',
capacidadDePagoEnCuotas: 200000,
capacidadDePagoTotal: 1000000
}))*/
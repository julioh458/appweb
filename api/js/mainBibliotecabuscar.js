
document.querySelector(".arrow-btn").addEventListener("click", () => {
  window.open(`/biblioteca`,"_self");
});


const stringToHTML = (s) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(s, 'text/html');
  return doc.body.firstChild;
}

const renderItem = (item) => {


  const elemento = stringToHTML(`<div data-id="${item._id}"> <img src='${item.img}' /> <h3> ${item.nombre} </h3>  
                                  <h6> ${item.categoria} </h6> </div>`);


  
      elemento.addEventListener("click", () => {
        

        Swal.fire({
          title: `${item.nombre}`,
          showDenyButton: true,
          showCancelButton: true,
          showCloseButton: true,
          confirmButtonText: `Editar`,
          denyButtonText: `Eliminar`,
          cancelButtonText: 'Cancelar',
          footer: `<a class="url" href="${item.url}" target="_blank">Ver Matrial</a>`,
        }).then((result) => {
          console.log(result);
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            window.open(`/materialBiblioteca?material=${item._id}`, "_self")
          } else if (result.isDenied) {
            
            
            Swal.fire({
              title: '¿Está seguro de Eliminar este material?',
              showDenyButton: true,
              showConfirmButton: false,
              showCancelButton: true,
              showCloseButton: true,
              denyButtonText: `Eliminar`,
              cancelButtonText: 'Cancelar',
            }).then((result) => {
              console.log(result);
              /* Read more about isConfirmed, isDenied below */
              if (result.isDenied) {
  
  
                fetch(`https://serverless-julio458h-gmailcom.vercel.app/api/biblioteca/${item._id}`, {
                  method: 'DELETE'
                }).then(data => {
                  setTimeout(window.location.reload(),1000);
                  })
                  
                }
              })


          } 
        })

      })

  return elemento;
}


window.onload = () => {


  //Obteniendo valores de la url     
  const valores = window.location.search;

  //Creamos la instancia
  const urlParams = new URLSearchParams(valores);

  //Accedemos a los valores
  let buscar = urlParams.get('nombre');

  
  fetch(`https://serverless-julio458h-gmailcom.vercel.app/api/biblioteca/${buscar}`)
  .then(response => response.json())
  .then(data => {

    const biblio = document.getElementById('cardsID');
    const template = data.map(renderItem);
    template.forEach(element => biblio.appendChild(element));
    console.log(data);

  })
  


  const submit = document.getElementById("aceptar");
  
  submit.addEventListener("click", () =>{
    const valores = document.getElementById("busc").value;
    window.open(`../html/bibliotecabuscar.html?nombre=${valores}`,"_self");
  }); 
  

}
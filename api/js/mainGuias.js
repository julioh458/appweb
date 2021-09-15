document.querySelector("#agregar").addEventListener("click", () => {
  window.open(`/materialguias?asignatura=${asignatura}&lab=${lab}`,"_self");
});

document.querySelector(".arrow-btn").addEventListener("click", () => {
  window.open(`/labs?asignatura=${asignatura}`,"_self");
});

const stringToHTML = (s) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(s, 'text/html');
  return doc.body.firstChild;
}

const renderItem = (item) => {
  const elemento =  stringToHTML(`<div data-id="${item._id}"> <img src='${item.img}' /> <h3> ${item.nombre} </h3></div>`);


  
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
        window.open(`/materialguias?material=${item._id}&asignatura=${asignatura}&lab=${lab}`, "_self")
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


            fetch(`https://serverless-julio458h-gmailcom.vercel.app/api/guias/${item._id}`, {
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
};




window.onload = () => {

  



  //Obteniendo valores de la url     
  const valores = window.location.search;

  //Creamos la instancia
  const urlParams = new URLSearchParams(valores);

  //Accedemos a los valores
  window.lab = urlParams.get('lab');

  window.asignatura = urlParams.get('asignatura');
  

  fetch(`https://serverless-julio458h-gmailcom.vercel.app/api/guias/${lab}`)
    .then(response => response.json())
    .then(data => {

      const labos = document.getElementById('cardsID');
      const template = data.map(renderItem);
      template.forEach(element => labos.appendChild(element));
      //labos.innerHTML = template;
      console.log(data);
    });


};


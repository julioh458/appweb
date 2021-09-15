document.querySelector(".arrow-btn").addEventListener("click", () => {
  window.open(`/labs?asignatura=${asignatura}`, "_self");
});

window.onload = () => {


  //Obteniendo valores de la url     
  const valores = window.location.search;

  //Creamos la instancia
  const urlParams = new URLSearchParams(valores);

  //Accedemos a los valores
  window.asignatura = urlParams.get('asignatura');

  window.material = urlParams.get('material');

  const guardar = document.getElementById("guardar");

  if (material != null) {
    document.getElementById("nombre").style.display = 'none';

    let nombre = document.getElementById("nombre");


    fetch(`http://localhost:3000/api/laboratorios/search/id/${material}`)
          .then(response => response.json())
          .then(data => {
            nombre.style.display = 'inline';

            nombre.value = data.nombre;

          }).catch(error => console.log(error))

  }


  guardar.addEventListener("click", () => {


    const nombre = document.getElementById('nombre').value;
    const guardar = document.getElementById('guardar')
    const img = '../img/book.png'

    if (material == null) {

    if (nombre != '') {

      fetch('http://localhost:3000/api/laboratorios/', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "asignatura_id": asignatura,
          "nombre": nombre,
          "img": img
        })
      }).then(response => response.json())
        .then(data => {
          window.open(`/labs?asignatura=${asignatura}`, '_self');
        })
        .catch(error => console.log(error));

    } else {
      alert("Completar los campos correspondientes!")
    }



  } else {


    if (nombre != '' ) {
      console.log('realizando put!')

      fetch(`http://localhost:3000/api/laboratorios/${material}`, { // Your POST endpoint
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "nombre": nombre
        })
      })
        .then(data => {
          window.open(`/labs?asignatura=${asignatura}`, '_self');
        }).catch(error => console.log(error))
        .catch(
          error => console.log(error) // Handle the error response object
        );

    } else {
      alert('Por favor completar todos los campos!');
    }

  }



  })

}
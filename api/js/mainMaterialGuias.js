document.querySelector(".arrow-btn").addEventListener("click", () => {
  window.open(`/guias?asignatura=${asignatura}&lab=${lab}`,"_self");
});

window.onload = () => {

  //Obteniendo valores de la url     
  const valores = window.location.search;

  //Creamos la instancia
  const urlParams = new URLSearchParams(valores);

  //Accedemos a los valores
  window.lab = urlParams.get('lab');

  window.asignatura = urlParams.get('asignatura');
  
  window.material = urlParams.get('material');

  const guardar = document.getElementById("guardar");

  if (material != null) {
    document.getElementById('fileName').style.display = 'none';
    document.getElementById('fileID').style.display = 'none';
    document.getElementById("nombre").style.display = 'none';

    let nombre = document.getElementById("nombre");


    fetch(`http://localhost:3000/api/guias/search/id/${material}`)
          .then(response => response.json())
          .then(data => {
            nombre.style.display = 'inline';

            nombre.value = data.nombre;

          }).catch(error => console.log(error))

  }

  guardar.addEventListener("click", () => {

    const nombre = document.getElementById("nombre").value;
    
    // Select your input type file and store it in a variable
    const input = document.getElementById('fileID');

    const dataFile = new FormData();
    dataFile.append('file', input.files[0]);

    const img = '../img/book.png'

    if (material == null) {

    //console.log(nombre)
    if (nombre != '' && input.files[0].name != '') {


      fetch("http://localhost:3000/api/guias/files/add", { // Your POST endpoint
        method: 'POST',
        body: dataFile // This is your file object
      }).then(response => response.json())
        .then(data => {
          console.log('archivo subido a drive');

          fetch("http://localhost:3000/api/guias/", { // Your POST endpoint
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 'laboratorio_id': lab,
                                   'nombre': nombre,
                                   'url': data.webViewLink,
                                   "img": img})
          }).then(response => response.json())
            .then(data => {
              window.open(`/guias?asignatura=${asignatura}&lab=${lab}`,'_self');
            }).catch(error => console.log(error))

        })
        .catch(
          error => console.log(error) // Handle the error response object
        );

    } else {
      alert('Por favor completar todos los campos!');
    }


  } else {


    if (nombre != '') {
      console.log('realizando put!')

      fetch(`http://localhost:3000/api/guias/${material}`, { // Your POST endpoint
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "nombre": nombre
        })
      })
        .then(data => {
          window.open(`/guias?asignatura=${asignatura}&lab=${lab}`, '_self');
        }).catch(error => console.log(error))
        .catch(
          error => console.log(error) // Handle the error response object
        );

    } else {
      alert('Por favor completar todos los campos!');
    }

  }



  });
  
}
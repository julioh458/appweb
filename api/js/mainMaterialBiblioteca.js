
window.onload = () => {

  document.querySelector(".arrow-btn").addEventListener("click", () => {
    window.open(`/biblioteca`, "_self");
  });


  //Obteniendo valores de la url     
  const valores = window.location.search;

  //Creamos la instancia
  const urlParams = new URLSearchParams(valores);

  //Accedemos a los valores
  window.material = urlParams.get('material');

  const guardar = document.getElementById("guardar");

  if (material != null) {
    document.getElementById('fileName').style.display = 'none';
    document.getElementById('fileID').style.display = 'none';
    document.getElementById("nombre").style.display = 'none';
    document.getElementById("categoria").style.display = 'none';
    document.getElementById("año").style.display = 'none';

    let nombre = document.getElementById("nombre");
    let categoria = document.getElementById("categoria");
    let año = document.getElementById("año");


    fetch(`http://localhost:3000/api/biblioteca/search/id/${material}`)
          .then(response => response.json())
          .then(data => {
            nombre.style.display = 'inline';
            categoria.style.display = 'inline';
            año.style.display = 'inline';

            nombre.value = data.nombre;
            categoria.value = data.categoria;
            año.value = data.año;

          }).catch(error => console.log(error))

  }

  guardar.addEventListener("click", () => {



    const nombre = document.getElementById("nombre").value;
    const categoria = document.getElementById("categoria").value;
    const año = document.getElementById("año").value;
    const img = '../img/book.png'

    // Select your input type file and store it in a variable
    const input = document.getElementById('fileID');

    const dataFile = new FormData();
    dataFile.append('file', input.files[0]);



    if (material == null) {

      //console.log(nombre)
      if (nombre != '' && categoria != '' && año != '' && input.files[0].name != '') {

        console.log('realizando post!')
        fetch("http://localhost:3000/api/biblioteca/files/add", { // Your POST endpoint
          method: 'POST',
          body: dataFile // This is your file object
        }).then(response => response.json())
          .then(data => {
            console.log('archivo subido a drive');

            fetch("http://localhost:3000/api/biblioteca/", { // Your POST endpoint
              method: 'POST',
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                'nombre': nombre,
                'categoria': categoria,
                'año': año,
                'url': data.webViewLink,
                "img": img
              })
            }).then(response => response.json())
              .then(data => {
                window.open('/biblioteca', '_self');
              }).catch(error => console.log(error))

          })
          .catch(
            error => console.log(error) // Handle the error response object
          );

      } else {
        alert('Por favor completar todos los campos!');
      }

    } else {


      if (nombre != '' && categoria != '' && año != '') {
        console.log('realizando put!')

        fetch(`http://localhost:3000/api/biblioteca/${material}`, { // Your POST endpoint
          method: 'PUT',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "nombre": nombre,
            "categoria": categoria,
            "año": año,
            "img": img
          })
        })
          .then(data => {
            window.open('/biblioteca', '_self');
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
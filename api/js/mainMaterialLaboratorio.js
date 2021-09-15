document.querySelector(".arrow-btn").addEventListener("click", () => {
  window.open(`/laboratorios`, "_self");
});

window.onload = () => {




  //Obteniendo valores de la url     
  const valores = window.location.search;

  //Creamos la instancia
  const urlParams = new URLSearchParams(valores);

  //Accedemos a los valores
  window.material = urlParams.get('material');

  const guardar = document.getElementById("guardar");

  if (material != null) {
    document.getElementById('imgName').style.display = 'none';
    document.getElementById("img").style.display = 'none';

    /*
    document.getElementById("cbox1").style.display = 'none';
    document.getElementById("cbox2").style.display = 'none';
    document.getElementById("cbox3").style.display = 'none';
    document.getElementById("cbox4").style.display = 'none';
    document.getElementById("cbox5").style.display = 'none';
    document.getElementById("cbox6").style.display = 'none';
    document.getElementById("cbox7").style.display = 'none';
    document.getElementById("cbox8").style.display = 'none';
    document.getElementById("cbox9").style.display = 'none';

    */


    let nombre = document.getElementById("nombre");

    let check = [];
    $("input[name='list']").each(function () {
      //Mediante la función push agregamos al arreglo los values de los checkbox
      check.push(($(this).attr("value")));
    });

    fetch(`http://localhost:3000/api/asignaturas/search/id/${material}`)
      .then(response => response.json())
      .then(data => {

        let check2 = []
        let j;
        data.carreras.forEach(x => {
          for (var i = 0; i < check.length; i++) {
            if (x == check[i]) {
              j = i + 1;
              document.getElementById(`cbox${j}`).checked = true;
            }
          }
        })

        nombre.value = data.nombre;

      }).catch(error => console.log(error))

  }



  guardar.addEventListener("click", () => {

    const nombre = document.getElementById("nombre").value;
    const img = document.getElementById("img");

    const guardar = document.getElementById("guardar");

    const dataFile = new FormData();
    dataFile.append('file', img.files[0]);

    //Creamos un array que almacenará los valores de los input "checked"
    var checked = [];
    //Recorremos todos los input checkbox con name = Colores y que se encuentren "checked"
    $("input[name='list']:checked").each(function () {
      //Mediante la función push agregamos al arreglo los values de los checkbox
      checked.push(($(this).attr("value")));
    });

    if (material == null) {

      //console.log(nombre)
      if (nombre != '' && img.files[0].name != '') {


        fetch("http://localhost:3000/api/asignaturas/files/add", { // Your POST endpoint
          method: 'POST',
          body: dataFile // This is your file object
        }).then(response => response.json())
          .then(data => {
            console.log('archivo subido a drive');

            fetch("http://localhost:3000/api/asignaturas/", { // Your POST endpoint
              method: 'POST',
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                'nombre': nombre,
                'carreras': checked,
                'img': data.thumbnailLink
              })
            }).then(response => response.json())
              .then(data => {
                window.open('/laboratorios', '_self');
              }).catch(error => console.l3og(error))

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

        fetch(`http://localhost:3000/api/asignaturas/${material}`, { // Your POST endpoint
          method: 'PUT',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            'nombre': nombre,
            'carreras': checked
          })
        })
          .then(data => {
            window.open('/laboratorios', '_self');
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
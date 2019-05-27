/** Este archivo se usará para poner funciones de ejemplo para llamadas asíncronas
 * Aunque no vienen pensadas en ejercicio original, es bueno pensarlas de una vez.
 */
function peticionAsync(tipo, url, parametros) {
	var ajax = new XMLHttpRequest();
	ajax.onreadystatechange = function () {
		if (ajax.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
			if (ajax.status == 200) {
				//El resultado es exitoso!
				//Tomar las acciones necesarias aquí
				let resp = JSON.parse(ajax.responseText);
				if (resp.error == "0") {
					if (url === '/comentarios') {
						dibujaPublicaciones(resp.registros);
					}
					//A partir de aqui tenemos que prepararnos para otras paticiones
					//y manejarlas segun el caso
					//dado que tenemos la convencion de que la propiedad "error"

				}

			} else if (ajax.status == 404) {
				//No encontró el servicio o API
			} else {
				//Una respuesta inesperada por parte del servidor
				alert('Saliendo precipitadamente de la aldea por culpa de la escaces de rinocerontes');
			}
		}
	};
	//El tipo puede ser GET, POST, PUT, DELETE o cualquier tipo aceptado por HTTP
	//La URL es a dondo hará la petición...
	//Por último, el "true" indica que es una petición asíncrona
	ajax.open(tipo, url, true);
	//Se establece cómo será enviado el contenido.
	ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	//La función encodeURI se encarga que la petición tenga el formato adecuado para ser enviado...
	//un ejemplo de petición puede ser variable=valor&otravariable=otrovalor...
	ajax.send(encodeURI(parametros));
}
function leerPublicaciones() {
	peticionAsync('GET', '/comentarios', '');

}

function doPrueba(){
	var formulario= document.getElementById('frmlogin');
	peticionAsync('POST', '/login', 'usr='+ formulario.usr.value+ '&pwd='+ formulario.onpointerdown.value);
}
function dibujaPublicaciones(publis) {
	let contenedor = document.getElementById('publicaciones');
	for (let i = 0; i < publis.length; i++) {
		let nuevaPublicacion = '<div class="entradas" id="post' +publis[i].id+ '">' + '\
			<img class="img" src="img/img2.jpg">\
			 <h2>' + publis[i].titulo + '</h2>\
			 <small class="ola">'+publis[i].momento +' </small>\
			 <p>' + publis[i].contenido + '</p>\
			 <p class="adios">'+publis[i].idusuario+' </p>\
			 </div>';
		contenedor.innerHTML += nuevaPublicacion;
	}



}



/*<div class="entradas">
            <img class=img src="img/img2.jpg" max-width="100%" height="100%";>
        <h2>Entrada de noticias</h2>

        <p>

        </p>


        </div>
*/
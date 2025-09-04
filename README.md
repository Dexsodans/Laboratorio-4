# Laboratorio-4

En primer lugar abri el repositorio GitHub del docente en mi Visual Studio Code, luego empece a separar por 2 <div> 
para tenerlo mas ordenado y en el primer div poner el label con el input de la serie de los
numeros primos, en el segundo div el text Area del Parrafo largo y un input mas pequenio para la palabra a buscar, 
afuera de los divs solamente estara el boton generar y los resultados que tendre por el js.

En el js cree la funcion del workerPrimos, donde definimos con una constante al limite que recibe del documentByID
luego un let para tener los resultados que obtendremos para el metodo "Criba" en un array que sumara el limite, y 
almacenarlo en la celda 0 y en la celda 1. Luego iniciamos un FOR que inicia en 2 porque es el primer numero primo
y si el resultado es true se hara otro for para evaluar su primera division. Al salir de esta igual hara otra division
y en caso de ser verdadera, se almacenarara en el array.
Yo personalmente tuve un problema en esta parte, ya que no mostraba los primos < 100000, se congelaba practicamente
entonces decidi optimizar un poco en la web, entonces hice un array de filas para que se organice en 100 columnas.

Para la Busqueda binaria jale por DocumentById los inputs de parrafo y palabra, despues se empieza a separar el parrafo 
mediante la funcion split y el sort para ordenarlo. Ahora la busqueda se realiza por la izquierda(primero) y derecha(ultimo)
y se repetira mientras no se encuentre la palabra, luego se dividide a la mitad la cantidad de palabras y busca si esta cerca
a la izquierda o a la derecha. 

Cuando ambos den resultado, se enviara por el onmesagge todo el listado de primos y la palabra si es que se encontro alguna coincidencia.

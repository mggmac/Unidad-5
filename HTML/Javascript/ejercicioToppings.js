var topping = prompt("¿Qué topping quieres?");
		var precio = 0.00;
		var helado = 1.90;
		var precioFinal = 0.00;

		if(topping=="Oreo"||topping=='oreo'){
			precio = 1;
		}else if(topping == "KitKat"||topping=='kitkat'){
			precio = 1.50;
		}else if(topping == "Brownie"||topping=='brownie'){
			precio = 0.75;
		}else  if(topping == "Lacasitos"||topping=='lacasitos'){
			precio = 0.95;
		}else{
			document.write("No tenemos este topping, lo sentimos. ");
			precio = 0;
}


precioFinal = helado + precio;
document.write("Su helado cuesta " + precioFinal + " €");
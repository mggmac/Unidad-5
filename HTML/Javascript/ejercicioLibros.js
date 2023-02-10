const books= [
    {title:'El Quijote', avg_rating:4.5},
    {title:'Don Juan', avg_rating:3.8},
    {title:'Cien años de soledad', avg_rating:4.7},
    {title:'Matar a un ruiseñor', avg_rating:5},
    {title:'El gran Gatsby', avg_rating:3.6},
]

var resultado1= books
.filter(function(i)
{if(i.avg_rating>=4.5)
    return i }). map(function(libro){
        return{title:libro.title, ratting: libro.avg_rating}
    })
console.log(resultado1)


var resultado2= books
.filter(function(i)
{if(i.avg_rating>=4.5)
    return i }). map(libro=>{
        return{title:libro.title, ratting: libro.avg_rating}
    })

console.log(resultado2)
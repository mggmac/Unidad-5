const heros= [
    {name:'Spider-Man'},
    {name:'Thor'},
    {name:'Black-Panther'},
    {name:'Captain Marvel'},
    {name:'Silver Surfer'},
]

heros.map(function(element,index){
    console.log(index,element)
}
)

const superheroes = heros.map(function(heroe, index){
    return{id:index,hero:heroe.name}
}
)
console.log(superheroes)

const superheroes2= heros.map((heroe, index) =>({id:index, superhero:heroe.name}));

console.log(superheroes2)

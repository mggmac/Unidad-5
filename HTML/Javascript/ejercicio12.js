class Square{
    constructor(side){
        this.perimeter = side*4;
        this.area = side*side
    }
}

const pequeño = new Square(2)

console.log(pequeño)

const mediano = new Square(5)
const grande = new Square(10)
console.log(mediano)
console.log(grande)

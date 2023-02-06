const meses = ['enero', 'febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']
const longMeses=meses
.filter(mes => mes.length>7)
.map(mes=> mes.toUpperCase());
console.log(longMeses)
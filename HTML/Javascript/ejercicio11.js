const users = [
    {username: 'ppc90', age: 30, premium: false},
    {username: 'lu650', age: 24, premium: false},
    {username: 'maria3', age: 36, premium: false},
    {username: 'abc123', age: 20, premium: true},
    {username: 'sergio58', age: 26, premium: true},
];



users.map(function(user){
    // console.log('El usuario' + user.username+ 'es Premiuim')
console.log(`El usuario ${user.username} es Premium`)
})

const noPremium = users.filter(function(user){
    return user.premium==false
})

console.log(noPremium)
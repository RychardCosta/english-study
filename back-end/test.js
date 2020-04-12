const axios = require('axios')

async function start(){
    const text = "Hi"

    const trans = await axios.get(`https://translate.google.com.br/?hl=pt-BR#view=home&op=translate&sl=en&tl=pt&text=${text}`)


    console.log(trans.body)
}

start()
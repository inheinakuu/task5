const express = require('express')
const { createSongs } = require('./services/songService')
const app = express()
const PAGE_SIZE = 20
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.get('/', (request, response) => {
    response.render('index')
})
app.get('/api/songs', (request, response) => {
    const seed = request.query.seed || '12345'
    const likes = Number(request.query.likes || 0)
    const language = request.query.language || 'en'
    const page = Number(request.query.page || 1)
    const startIndex = (page - 1) * PAGE_SIZE + 1
    const songs = createSongs(
        seed,
        startIndex,
        PAGE_SIZE,
        likes,
        2,
        language
    )
    response.json(songs)
})
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})
const { getFaker } = require('./locales')
const seedrandom = require('seedrandom')
const { getCover } = require('./coverService')
function getLikes(value, rng) {
    const whole = Math.floor(value)
    const fraction = value - whole
    return whole + (rng() < fraction ? 1 : 0)
}
function getTitle(faker) {
    return faker.word.words({ count: { min: 2, max: 4 } })
}
function getArtist(faker, rng) {
    return rng() > 0.5
        ? faker.person.fullName()
        : faker.company.name()
}
function createReviews(amount, faker) {
    const reviews = []
    for (let i = 0; i < amount; i++) {
        reviews.push(faker.company.catchPhrase())
    }
    return reviews
}
function createSong(seed, index, likesValue, reviewsAmount, language) {
    const rng = seedrandom(`${seed}-${index}`)
    const faker = getFaker(language)
    faker.seed(Math.floor(rng() * 1000000))
    const title = getTitle(faker)
    const artist = getArtist(faker, rng)
    const album = rng() > 0.3 ? getTitle(faker) : 'Single'
    const albumText = album === 'Single' ? 'Single' : `Album: ${album}`
    const genre = faker.music.genre()
    return {
        id: index,
        title,
        artist,
        album,
        albumText,
        genre,
        likes: getLikes(likesValue, rng),
        reviews: createReviews(reviewsAmount, faker),
        cover: getCover(title, artist, `${seed}-${index}`)
    }
}
function createSongs(seed, startIndex, count, likesValue, reviewsAmount, language) {
    const songs = []
    for (let i = startIndex; i < startIndex + count; i++) {
        songs.push(createSong(seed, i, likesValue, reviewsAmount, language))
    }
    return songs
}
module.exports = {
    createSongs
}
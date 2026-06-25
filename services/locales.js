const {
    fakerEN_US,
    fakerDE
} = require('@faker-js/faker')
function getFaker(language) {
    return language === 'de'
        ? fakerDE
        : fakerEN_US
}
module.exports = {
    getFaker
}
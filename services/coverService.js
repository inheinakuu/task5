const seedrandom = require('seedrandom')
function randomInt(rng, max) {
    return Math.floor(rng() * max)
}
function getPalette(rng) {
    const palettes = [
        ['#0f172a', '#2563eb'],
        ['#111827', '#16a34a'],
        ['#1f2937', '#f97316'],
        ['#312e81', '#7c3aed'],
        ['#7f1d1d', '#dc2626'],
        ['#064e3b', '#14b8a6']
    ]

    return palettes[randomInt(rng, palettes.length)]
}
function getVinyl() {
    return `
        <circle cx="150" cy="120" r="70" fill="rgba(0,0,0,0.65)" />
        <circle cx="150" cy="120" r="45" fill="rgba(255,255,255,0.12)" />
        <circle cx="150" cy="120" r="15" fill="rgba(255,255,255,0.85)" />
    `
}
function getMic() {
    return `
        <rect x="130" y="55" width="40" height="95" rx="20" fill="rgba(255,255,255,0.85)" />
        <rect x="145" y="150" width="10" height="45" fill="rgba(255,255,255,0.85)" />
        <rect x="115" y="190" width="70" height="10" rx="5" fill="rgba(255,255,255,0.85)" />
        <path d="M105 105 Q150 165 195 105" stroke="rgba(255,255,255,0.45)" stroke-width="8" fill="none" />
    `
}
function getCassette() {
    return `
        <rect x="55" y="75" width="190" height="105" rx="18" fill="rgba(255,255,255,0.85)" />
        <circle cx="105" cy="128" r="25" fill="rgba(0,0,0,0.45)" />
        <circle cx="195" cy="128" r="25" fill="rgba(0,0,0,0.45)" />
        <rect x="100" y="155" width="100" height="14" rx="7" fill="rgba(0,0,0,0.35)" />
    `
}
function getNotes() {
    return `
        <line x1="75" y1="80" x2="225" y2="80" stroke="rgba(255,255,255,0.45)" stroke-width="4" />
        <line x1="75" y1="105" x2="225" y2="105" stroke="rgba(255,255,255,0.45)" stroke-width="4" />
        <line x1="75" y1="130" x2="225" y2="130" stroke="rgba(255,255,255,0.45)" stroke-width="4" />
        <circle cx="115" cy="130" r="17" fill="rgba(255,255,255,0.9)" />
        <rect x="128" y="70" width="8" height="65" fill="rgba(255,255,255,0.9)" />
        <circle cx="180" cy="105" r="17" fill="rgba(255,255,255,0.9)" />
        <rect x="193" y="50" width="8" height="60" fill="rgba(255,255,255,0.9)" />
    `
}
function getPoster(rng) {
    const x = 55 + randomInt(rng, 80)
    const y = 50 + randomInt(rng, 70)
    return `
        <circle cx="${x}" cy="${y}" r="65" fill="rgba(255,255,255,0.2)" />
        <rect x="130" y="75" width="90" height="90" rx="20" fill="rgba(255,255,255,0.28)" transform="rotate(18 175 120)" />
        <circle cx="210" cy="150" r="35" fill="rgba(0,0,0,0.18)" />
    `
}
function getArt(rng) {
    const variants = [
        getVinyl,
        getMic,
        getCassette,
        getNotes,
        () => getPoster(rng)
    ]
    return variants[randomInt(rng, variants.length)]()
}
function getCover(title, artist, seed) {
    const rng = seedrandom(seed)
    const [dark, main] = getPalette(rng)
    return `
        <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
            <defs>
                <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stop-color="${main}" />
                    <stop offset="1" stop-color="${dark}" />
                </linearGradient>
            </defs>
            <rect width="300" height="300" rx="18" fill="url(#bg)" />
            ${getArt(rng)}
            <rect x="0" y="190" width="300" height="110" fill="rgba(0,0,0,0.5)" />
            <text x="22" y="232" font-size="23" font-weight="700" font-family="Arial" fill="white">
                ${title.slice(0, 22)}
            </text>
            <text x="22" y="263" font-size="16" font-weight="700" font-family="Arial" fill="white">
                ${artist.slice(0, 25)}
            </text>
        </svg>
    `
}
module.exports = {
    getCover
}
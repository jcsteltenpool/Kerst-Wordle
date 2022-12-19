const words = [
'EZEL', 
'MARIA', 
'JOZEF', 
'JEZUS', 
'STAL', 
'HERDER', 
'KRIBBE', 
'KERST', 
'KRANS', 
'DINER', 
'LICHT', 
'NACHT', 
'SCHAAP', 
'KONING', 
'WIJZEN', 
'BOOM', 
'PIEK', 
'BALLEN',
'SAMEN',
'SNEEUW',
'SANTA',
'RUDOLF',
'LIEDJES',
'HERBERG',
'GEBOREN',
'GELOOF',
'FEEST',
'WINTER',
'BIJBEL',
'OOSTEN',
'KERK',
'STER',
'KAARS',
'ADVENT',
'SPAR',
'HULST',
'MUZIEK',
'SLEE',
'KALKOEN',
'MARKT',
'AVOND',
'KAART',
'WENSEN',
'ETEN',
'CADEAU',
'KIND',
'VROLIJK',
'VREDE',
'KLOKJE',
'KLING'
];

const getSolution = () => {
    return words[Math.floor(Math.random() * words.length)];
}

export { getSolution };
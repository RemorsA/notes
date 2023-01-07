export function priceConvert(value, decimal, thousand) {
    if (!decimal) decimal = '.'
    if (!thousand) thousand = '.'
    let parts = value.toString().split('.')

    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, decimal) + (parts[1] ? thousand + parts[1] : '')
}

//     ₽
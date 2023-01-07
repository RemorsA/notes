export function uniqueID(data) {
    let id = 3423301012120
    data.forEach((el) => {
        if (el.id !== Math.random(10, 999999999)) {
            id = String(Math.random(10, 999999999)).slice(2, -1)
        }
    })
    return Number(id)
}
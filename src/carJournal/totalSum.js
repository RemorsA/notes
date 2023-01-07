export function totalSum(sum) {
    let total = 0

    sum.forEach((el) => {
        total += Number(el.sum.split('.').join(''))
    })

    return total
}

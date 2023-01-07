export function setItems(field, data) {
    localStorage.setItem(field, JSON.stringify(data))
}

export function getItems(field) {
    return JSON.parse(localStorage.getItem(field)) !== null ? JSON.parse(localStorage.getItem(field)) : ''
}

export function clearItems(field) {
    localStorage.clear(field)
}
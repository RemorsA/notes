export function filterPagination(data, search_value, page, page_size) {
    return data
        .filter((el) => {
            return el.title.toLowerCase().indexOf(search_value.toLowerCase()) !== -1 ||
            el.sum.toLowerCase().indexOf(search_value.toLowerCase()) !== -1 ||
            el.date.toLowerCase().indexOf(search_value.toLowerCase()) !== -1
        })
        .slice(page_size * page - page_size, page_size * page)
}
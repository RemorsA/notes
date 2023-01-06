<script setup>
    import { ref, onMounted, reactive, computed } from 'vue'

    // const types = reactive([
    //     {value: '⛽', title: 'Бензин'},
    //     {value: '⚙️', title: 'Деталь'},
    //     {value: '👨‍🔧', title: 'Работа'},
    //     {value: '📑', title: 'Прочее'},
    // ])

    onMounted(() => {
        let localStorage_notes = JSON.parse(localStorage.getItem('notes'))
        if (localStorage_notes !== null) {
            localStorage_notes.forEach((el) => {
                notes.push(el)
            })
        }
    })


    let search_value = ref('')
    let page = ref(1)
    let page_size = ref(10)

    const items = computed(() => {
        return notes
            .filter((el) => {
                return el.title.toLowerCase().indexOf(search_value.value.toLowerCase()) !== -1 ||
                el.sum.toLowerCase().indexOf(search_value.value.toLowerCase()) !== -1 ||
                el.date.toLowerCase().indexOf(search_value.value.toLowerCase()) !== -1
            })
            .slice(page_size.value * page.value - page_size.value, page_size.value * page.value)
    })

    function priceConvert(value, decimal, thousand) {
        if (!decimal) decimal = ' '
        if (!thousand) thousand = ' '
        var parts = value.toString().split('.')
        return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, decimal) + (parts[1] ? thousand + parts[1] : '')
    }

    function setItems(data) {
        localStorage.setItem('notes', JSON.stringify(data))
    }

    function uniqueID() {
        let id = 3423301012120
        notes.forEach((el) => {
            if (el.id !== Math.random(10, 999999999)) {
                id = String(Math.random(10, 999999999)).slice(2, -1)
            }
        })
        return Number(id)
    }


    let notes = reactive([])

    function add() {
        let obj = {
            id: uniqueID(),
            date: '',
            title: '',
            sum: ''
        }
        notes.push(obj)
        setItems(notes)
    }
    function spliceData(id) {
        // console.log(index)
        notes.forEach((el, index) => {
            if (el.id === id) {
                notes.splice(index, 1)
            }
        })
        notes.splice(id, 1)
        setItems(notes)
    }
    function update(record, e, mode) {
        switch(mode) {
            case 'date':
                record.date = e ? ('0' + (e.getMonth() + 1)).slice(-2) + '.' + ('0' + e.getDate()).slice(-2) + '.' + e.getFullYear() : ''
                break
            case 'title':
                record.title = e
                break
            case 'sum':
                record.sum = priceConvert(e) + ' ' + '₽'
            break
        }

        setItems(notes)
    }


    const querySearch = (queryString, cb) => {
        const results = queryString ? links.value.filter(createFilter(queryString)) : links.value
        cb(results)
    }
    const createFilter = (queryString) => {
        return (restaurant) => {
            return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
        }
    }

    const links = ref([
        { value: 'Бензин', link: '⛽' },
        // { value: 'Деталь', link: '⚙️' },
        // { value: 'Отчет', link: '📖' }
    ])
</script>

<template>
    <el-table empty-text="Пусто" :data="items">

        <el-table-column label="Дата" min-width="150">
            <template #default="record">
                <el-date-picker
                    style="width: 100%"
                    v-model="record.row.date"
                    @change="(e) => { update(record.row, e, 'date') }"
                    format="DD.MM.YYYY"
                />
            </template>
        </el-table-column>

        <el-table-column label="Сумма" min-width="150">
            <template #default="record">
                <el-input
                    type="textarea"
                    autosize
                    v-model="record.row.sum"
                    @change="(e) => { update(record.row, e, 'sum') }"
                />
            </template>
        </el-table-column>

        <el-table-column label="Наименование" min-width="300">
            <template #default="record">
                <el-autocomplete
                    style="width: 100%"
                    :fetch-suggestions="querySearch"
                    v-model="record.row.title"
                    @change="(e) => { update(record.row, e, 'title') }"
                    highlight-first-item
                    value-key="link"
                />
            </template>
        </el-table-column>

        <el-table-column width="45">
            <template #default="record">
                <el-button
                    link
                    icon="Close"
                    type="danger"
                    @click="spliceData(record.row.id)"
                ></el-button>
            </template>
        </el-table-column>

    </el-table>

    <el-input
        placeholder="Быстрый поиск"
        v-model="search_value"
        clearable
        style="margin-top: 10px"
    >
        <template #prepend>
            <el-icon><Search/></el-icon>
        </template>
    </el-input>

    <el-button
        icon="Plus"
        @click="add"
        type="info"
        style="width: 100%; margin-top: 10px;"
    >Добавить</el-button>

    <el-row justify="center" style="margin-top: 10px;">
        <el-pagination
            small
            background
            layout="prev, pager, next"
            :total="notes.length"
            @size-change="(e) => { page_size = e }"
            @current-change="(e) => { page = e }"
        />
    </el-row>
</template>
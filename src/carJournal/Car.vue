<script setup>
    import { ref, onMounted, reactive, computed } from 'vue'
    import { totalSum } from './totalSum'
    import { uniqueID } from './uniqueID'
    import { priceConvert } from './priceConvert'
    import { dateConvert } from './dateConvert'
    import { filterPagination } from './filterPagination'
    import { getItems, setItems, clearItems  } from './localStore'

    onMounted(() => {
        if (getItems('notes').length) {
            getItems('notes').forEach((el) => {
                notes.push(el)
            })
        }

        other_value.value = getItems('other')
        oil.limit = getItems('oil').limit
        oil.oil = getItems('oil').oil

        if (Number(oil.oil) > Number(oil.limit)) {
            alert('Необходимо заменить масло')
        }
    })

    let search_value = ref('')
    let page = ref(1)
    let page_size = ref(10)
    let notes = reactive([])

    const items = computed(() => {
        return filterPagination(notes, search_value.value, page.value, page_size.value)
    })

    function add() {
        let obj = {
            id: uniqueID(notes),
            date: '',
            title: '',
            sum: ''
        }
        notes.push(obj)
        setItems('notes', notes)
    }

    function spliceData(id) {
        notes.forEach((el, index) => {
            if (el.id === id) {
                notes.splice(index, 1)
            }
        })
        notes.splice(id, 1)
        setItems('notes', notes)
    }

    let other = ref(false)
    let other_value = ref('')

    let oil = reactive({
        drawer: false,
        oil: '',
        limit: ''
    })
</script>

<template>
    <div class="table-container" v-if="items.length">
        <table>
            <thead>
                <td>Дата</td>
                <td>Сумма</td>
                <td>Описание</td>
                <td></td>
            </thead>

            <tbody v-for="(record, index) in items" :key="index">
                <td style="min-width: 150px;">
                    <el-date-picker
                        style="width: 100%"
                        v-model="record.date"
                        @change="(e) => { record.date = e ? dateConvert(e) : '', setItems('notes', notes) }"
                        format="DD.MM.YYYY"
                    />
                </td>
                <td style="min-width: 150px;">
                    <el-input
                        type="textarea"
                        autosize
                        v-model="record.sum"
                        @change="(e) => { record.sum = priceConvert(e) , setItems('notes', notes) }"
                    />
                </td>
                <td style="min-width: 300px">
                    <el-input
                        type="textarea"
                        autosize
                        v-model="record.title"
                        @change="setItems('notes', notes)"
                    />
                </td>
                <td style="width: 45px">
                    <el-button
                        link
                        icon="Close"
                        type="danger"
                        @click="spliceData(record.id)"
                    ></el-button>
                </td>
            </tbody>
        </table>
    </div>

    <el-row v-else justify="center">
        <el-empty description="Пусто"/>
    </el-row>

    <el-row justify="end" style="margin-top: 10px; margin-bottom: 120px;">
        <el-pagination
            small
            background
            layout="prev, pager, next"
            :total="notes.length"
            @size-change="(e) => { page_size = e }"
            @current-change="(e) => { page = e }"
            hide-on-single-page
        />
    </el-row>

    <el-drawer v-model="other" size="100%" :show-close="false" direction="btt">
        <el-input
            v-model="other_value"
            type="textarea"
            autosize
            @change="setItems('other', other_value)"
        />
        <el-row justify="end" style="margin-top: 10px;">
            <el-button @click="other = false" type="danger">Закрыть</el-button>
        </el-row>
    </el-drawer>

    <el-drawer v-model="oil.drawer" size="50%" direction="btt" :show-close="false">
        <el-input
            v-model="oil.oil"
            @change="setItems('oil', oil)"
        >
            <template #prepend>Пробег тыс.</template>
        </el-input>

        <el-input v-model="oil.limit" @change="setItems('oil', oil)" style="margin-top: 10px">
            <template #prepend>Лимит</template>
        </el-input>

        <el-row justify="end" style="margin-top: 10px;">
            <el-button @click="oil.drawer = false" type="danger">Закрыть</el-button>
        </el-row>
    </el-drawer>

    <footer>
        <el-input
            placeholder="Быстрый поиск"
            v-model="search_value"
            clearable
        >
            <template #append>
                <el-button
                    icon="DocumentAdd"
                    @click="add"
                    style="background: #a77730; color: white; border-radius: 0 2px 2px 0"
                >Добавить</el-button>
            </template>
        </el-input>

        <div style="display: flex; gap: 5px; align-items: center; margin: 15px 0 15px 0; justify-content: space-around;">
            <el-button
                link
                icon="EditPen"
                @click="other = true"
            >Записи</el-button>

            <el-button
                link
                icon="Edit"
                style="margin: 0"
                @click="oil.drawer = true"
            >
                Масло {{ priceConvert(oil.oil) }}
            </el-button>

            <el-tag type="success">Сумма {{ totalSum(items) }} ₽</el-tag>
        </div>
    </footer>
</template>

<style scoped>
    .table-container {
        width: 100%;
        overflow: scroll;
        overflow-y: hidden;
    }
    table {
        border-collapse: collapse;
        width: 100%;
    }
    thead {
        background-color: #202124;
    }
    td {
        padding: 10px;
        border-bottom: 1px solid rgb(51, 51, 51);
    }

    footer {
        position: fixed;
        width: 100%;
        bottom: 0;
        left: 0;
        z-index: 1000;
        background-color: #202124;
        padding: 5px
    }
</style>
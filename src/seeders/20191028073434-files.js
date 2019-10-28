
const tableName = 'files'
const dd = Math.floor(Date.now() / 1000)

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert(tableName, [
            { file_ref: 'qwe-1', file_name: 'Рабочий документ', file_ext: 'doc', file_type_id: 2, file_size: 100, tags: "['work', 'document']", ref_set: 'qwe-1', key_words: "['приказ', 'премия', 'наградить']" , deleted_at: 0, created_at: dd, updated_at: dd },
            { file_ref: 'qwe-2', file_name: 'Расчет потребления', file_ext: 'xls', file_type_id: 3, file_size: 100, tags: "['calcuulate', 'document']", ref_set: 'qwe-2', key_words: "['рассчет', 'главных ', 'показателей']", deleted_at: 0, created_at: dd, updated_at: dd },
            { file_ref: 'qwe-3', file_name: 'Фото-1', file_ext: 'jpg', file_type_id: 8, file_size: 100, tags: "['плечо', 'глаза', '3/4']", ref_set: 'qwe-3', key_words: "['расотка', 'девушка', 'ч.б.']", deleted_at: 0, created_at: dd, updated_at: dd },
            { file_ref: 'qwe-4', file_name: 'Фото-2', file_ext: 'jpg', file_type_id: 8, file_size: 100, tags: "['плечо', 'глаза', '3/4']", ref_set: 'qwe-4', key_words: "['расотка', 'девушка', 'ч.б.']", deleted_at: 0, created_at: dd, updated_at: dd },
        ], {})
    },
    down: (queryInterface) => {
        return queryInterface.bulkDelete(tableName, null, {})
    },
}

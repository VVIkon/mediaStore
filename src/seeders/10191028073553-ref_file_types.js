
const tableName = 'ref_file_types'
const dd = Math.floor(Date.now() / 1000)

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert(tableName, [
            { 'file_type': 'Общий тип файла', 'directive': '', 'deleted_at': 0, 'created_at': dd, 'updated_at': dd },
            { 'file_type': 'MS Word', 'directive': '', 'deleted_at': 0, 'created_at': dd, 'updated_at': dd },
            { 'file_type': 'MS Excell', 'directive': '', 'deleted_at': 0, 'created_at': dd, 'updated_at': dd },
            { 'file_type': 'MS PowerPoint', 'directive': '', 'deleted_at': 0, 'created_at': dd, 'updated_at': dd },
            { 'file_type': 'Text', 'directive': '', 'deleted_at': 0, 'created_at': dd, 'updated_at': dd },
            { 'file_type': 'Image', 'directive': '', 'deleted_at': 0, 'created_at': dd, 'updated_at': dd },
            { 'file_type': 'BMP. Рисунок', 'directive': '', 'deleted_at': 0, 'created_at': dd, 'updated_at': dd },
            { 'file_type': 'JPG, TIFF. Фото', 'directive': '', 'deleted_at': 0, 'created_at': dd, 'updated_at': dd },
            { 'file_type': 'PNG, GIF. Интернет фото', 'directive': '', 'deleted_at': 0, 'created_at': dd, 'updated_at': dd },
            { 'file_type': 'Adobe Photoshop', 'directive': '', 'deleted_at': 0, 'created_at': dd, 'updated_at': dd },
            { 'file_type': 'HTML Страница', 'directive': '', 'deleted_at': 0, 'created_at': dd, 'updated_at': dd} ,
            { 'file_type': 'AVI, MOV. Видео', 'directive': '', 'deleted_at': 0, 'created_at': dd, 'updated_at': dd },
            { 'file_type': 'MP3. Звук', 'directive': '', 'deleted_at': 0, 'created_at': dd, 'updated_at': dd },
            { 'file_type': 'ZIP, ARR, 7z. Архив', 'directive': '', 'deleted_at': 0, 'created_at': dd, 'updated_at': dd },
        ], {})
    },
    down: (queryInterface) => {
        return queryInterface.bulkDelete(tableName, null, {})
    },
}

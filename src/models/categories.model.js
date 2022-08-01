const { fetchData } = require('../utils/postgress')

const getCategoriesModel = async () => {
    try {
        const getCategoriesQuery= `
        select ctg.*, json_agg(subCtg) as sub_categories 
        from 
            categories as ctg left join sub_categories as subCtg
            on ctg.category_id = subCtg.category_id 
        group by ctg.category_id `
        return await fetchData(getCategoriesQuery)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getCategoriesModel
}
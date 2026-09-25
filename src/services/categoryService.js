import Category from "../models/category.js";

const checkcategoryExists = async (category) => {

    return await Category.findOne({categoryName:category})
}

const createcategory = async(categoryName)=>{
   const category=  await Category.create({categoryName})
   return category;
}

const findCategoryById = async(categoryId)=>{
   return await Category.findOne({_id:categoryId})
}

const deleteCategories = async(categoryId)=>{
    await Category.findByIdAndDelete(categoryId)
}



const updatecategory = async(category,newCategoryName)=>{
    const updated =  await Category.findByIdAndUpdate(
        category,
        {$set:{categoryName:newCategoryName}},
        {returnDocument: 'after'},
    )
    return updated

}

const getCategories = async (req,res)=>{
    return await Category.find();
}
const categoryService = {
    checkcategoryExists,
    createcategory,
    updatecategory,
    findCategoryById,
    getCategories,
    deleteCategories
}

export default categoryService;
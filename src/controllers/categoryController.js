import category from "../models/category.js";
import categoryService from "../services/categoryService.js";
import constants from "../utils/constant.js";

const createcategory = async (req,res)=>{
    
    const {categoryName} = req.body;

    if(req.user.role!==constants.UserType.Auther){
        return res.status(403).json({
            success:false,
            message:"you are unauthorize to perform this action"
        })
    }

    const categoryExists = await categoryService.checkcategoryExists(categoryName);
    if(categoryExists){
        return res.status(400).json({
            success:false,
            message:"category already exists"
        })
    }

    const newcategory =  await categoryService.createcategory(categoryName);
    return res.status(201).json({
        success:true,
        message:"category Created",
        category:newcategory.categoryName
    })
    
}

const updateCategory = async (req,res)=>{
    
    const {categoryName} = req.body;
    const {id} = req.params;

    if(req.user.role!==constants.UserType.Auther){
        return res.status(403).json({
            success:false,
            message:"you are unauthorize to perform this action"
        })
    }
    

    if(!categoryName){
        return res.status(400).json({
            success:false,
            message:"catagoryName is required"
        })
    }

    const categoryExists = await categoryService.findCategoryById(id);
    
    if(!categoryExists){
        return res.status(400).json({
            success:false,
            message:"category Not exists"
        })
    }
    

    const updatedCategory = await categoryService.updatecategory(id,categoryName);
    
    return res.status(200).json({
        success:true,
        message:"category updated",
        category:{
            categoryId:id,
            categoryName:updatedCategory}
    })
    
}

const getAllCategories = async (req,res)=>{

    if(req.user.role!==constants.UserType.Auther){
        return res.status(403).json({
            success:false,
            message:"you are unauthorize to perform this action"
        })
    }

    const categories= await categoryService.getCategories();
    return res.status(200).json({
        success:true,
        categories:{categories}
    })
}

const deleteCategories = async (req,res)=>{

    const {id} = req.params;

    if(req.user.role!==constants.UserType.Auther){
        return res.status(403).json({
            success:false,
            message:"you are unauthorize to perform this action"
        })
    }

    const categoryExists = await categoryService.findCategoryById(id);
    
    if(!categoryExists){
        return res.status(400).json({
            success:false,
            message:"category Not exists"
        })
    }

    const categories= await categoryService.deleteCategories(id);
    return res.status(200).json({
        success:true,
        message:"category deleted "
    })
}


const categoryController = {
    createcategory,
    updateCategory,
    getAllCategories,
    deleteCategories
}

export default categoryController;
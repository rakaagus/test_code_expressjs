const productModel = require('../models/product')

const getAllProduct = async (req, res) => {
    try {
        const [data] = await productModel.getAllProduct()
        res.json({
            message: "GET all product sucess",
            sucess: true,
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            success: false,
            serverMessage: error.message,
        });
    }
}

const getProductById = async (req, res) => {
    try {
        const { id_product } = req.params;
        const [data] = await productModel.getProductById(id_product)

        if (data.length == 0) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        res.json({
            message: "GET product by ID success",
            success: true,
            data: data[0]
        })
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            success: false,
            serverMessage: error.message,
        });
    }
}

const deleteProductById = async (req, res) => {
    const { id_product } = req.params;
    try {
        await productModel.deleteProductById(id_product)
        res.status(200).json({
            message: "DELETE user success",
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            success: false,
            serverMessage: error.message,
        });
    }
}

const createNewProduct = async (req, res) => {
    const { body } = req;
    try {
        await productModel.crateNewProduct(body)
        res.status(201).json({
            message: "CREATE new product success",
            success: true,
            data: req.body,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            success: false,
            serverMessage: error.message,
        });
    }
}

const updateProductById = async (req, res) => {
    const { id_product } = req.params;
    const { body } = req;

    try {
        await productModel.updateProductById(id_product, body)
        res.json({
            message: "UPDATE user success",
            success: true,
            idProduct: id_product,
            data: {
                ...body
            },
        })
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            success: false,
            serverMessage: error.message,
        });
    }
}

module.exports = {
    getAllProduct,
    getProductById,
    deleteProductById,
    createNewProduct,
    updateProductById
}
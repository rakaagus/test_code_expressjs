const { dbPool } = require('../config/database')

const crateNewProduct = (body) => {
    const Query = `INSERT INTO product (name, category, price) Values (?, ?, ?)`;
    const values = [
        body.name,
        body.category,
        body.price
    ]
    return dbPool.execute(Query, values)
}

const getAllProduct = () => {
    const query = "SELECT * FROM product";
    return dbPool.execute(query)
}

const getProductById = (id_product) => {
    const query = "SELECT * FROM product WHERE id = ?"
    return dbPool.execute(query, [id_product])
}

const updateProductById = async (id_product, body) => {
    const { name, category, price } = body;

    const query = "SELECT product SET name = ?, category = ?, price = ? WHERE id_product = ?"
    let values = [name, category, price, id_product];

    return dbPool.execute(query, values)
}

const deleteProductById = async (id_product) => {
    const deleteQuery = "DELETE FROM product WHERE id_product = ?";
    return dbPool.execute(deleteQuery, [id_user]);
}

module.exports = {
    crateNewProduct,
    getAllProduct,
    getProductById,
    updateProductById,
    deleteProductById
}
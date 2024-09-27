const { dbPool, secretKey } = require('../config/database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getAllUser = () => {
    const query = "SELECT * FROM user";
    return dbPool.execute(query)
}

const getUserById = (id_user) => {
    const SQLQuery = "SELECT * FROM user WHERE id_user = ?";
    return dbPool.execute(SQLQuery, [id_user]);
}

const getUserByEmail = (email) => {
    const SQLQuery = "SELECT * FROM user WHERE email = ?";
    return dbPool.execute(SQLQuery, [email]);
}

const createNewUser = async (body) => {
    const checkEmailQuery = "SELECT * FROM user WHERE email = ?"
    const [existingUser] = await dbPool.execute(checkEmailQuery, [body.email])

    if (existingUser.email > 0) {
        throw new Error("Email already exits!")
    }

    const hashPassword = await bcrypt.hash(body.password, 10);
    const query = `INSERT INTO user(email, password, role) values (?, ?, ?)`;

    const userValue = [
        email,
        hashPassword,
        'user'
    ];
    return dbPool.execute(query, userValue)
}

const loginUser = async (req, email, password = null) => {
    try {
        const checkEmailQuery = "SELECT * FROM user WHERE email = ?";
        const [users] = await dbPool.execute(checkEmailQuery, [email]);

        if (users.length === 0) {
            throw new Error("User with this email does not exist");
        }

        const user = users[0];

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Incorrect password");
        }

        const { password: _, ...userWithoutPassword } = user;

        const token = jwt.sign(
            { email: user.email, password: user.password },
            secretKey,
            { expiresIn: "1h" }
        )

        req.session.user = userWithoutPassword

        return {
            sucess: true,
            user: userWithoutPassword,
            token: token,
            message: "Login Sucess!"
        }
    } catch (error) {
        throw error
    }
}

const updateUserById = async (id_user, body) => {
    const { email, password, role } = body;

    let Query;
    let userValues;

    const hashedPassword = await bcrypt.hash(password, 10);
    Query = "UPDATE user SET email = ?, password = ?, role = ? WHERE id_user =?";
    userValues = [email, hashedPassword, role, id_user]

    return dbPool.execute(Query, userValues)
}

const updateRoleById = async (id_user, newRole) => {
    const checkAdminQuery = "SELECT * FROM user WHERE id_user = ? AND role = 'admin'";
    const [Admin] = await bcrypt.execute(checkAdminQuery, [id_user]);

    if (Admin.length === 0) {
        throw new Error("Only admins can update user roles");
    }

    const query = "UPDATE user SET role = ? WHERE id_user = ?";
    const valuesUpdate = [newRole, id_user];

    return dbPool.execute(query, valuesUpdate);
}

const deleteUserById = async (id_user) => {
    const checkAdminQuery = "SELECT * FROM user WHERE id_user = ? AND role = 'admin'";
    const [Admin] = await bcrypt.execute(checkAdminQuery, [id_user]);

    if (Admin.length === 0) {
        throw new Error("Only admins can delete user");
    }

    const deleteQuery = "DELETE FROM user WHERE id_user = ?";
    return dbPool.execute(deleteQuery, [id_user]);
}

module.exports = {
    getAllUser,
    createNewUser,
    loginUser,
    updateRoleById,
    updateUserById,
    deleteUserById,
    getUserById,
    getUserByEmail
}
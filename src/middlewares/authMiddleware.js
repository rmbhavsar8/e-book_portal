
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "You are unauthorized"
            })
        }
        const token = authHeader.split(" ")[1];
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token"
            })
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET)

        req.user=decoded;

        next()

    } catch (error) {
        res.status(403).json({ message: "Invalid or Expired Token" });
    }

}

export default authMiddleware;
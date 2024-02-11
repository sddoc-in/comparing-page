export async function getFeatures(req, res) {
    const { id, platform } = req.query;

    try {
      
        
        res.status(201).json({ user: user, message: "User registered successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

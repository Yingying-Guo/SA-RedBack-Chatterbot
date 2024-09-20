/**
 * Sends a response confirming the server is operational.
 * 
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
export const handleHeartbeat = (req, res) => {
    res.status(200).send('Server is alive!');
};
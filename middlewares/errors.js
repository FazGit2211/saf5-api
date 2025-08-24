const errors = {
    error400: (req, res, err) => {
        res.status(400).json({
            title: "Error 400 Bad Request",
            message: err,
        })
    },
    error401: (req, res, err) => {
        res.status(401).json({
            title: "Error 401 Authorization Required",
            message: err,
        });
    },
    error403: (req, res, err) => {
        res.status(403).json({
            title: "Error 403 Forbidden",
            message: err,
        });
    },
    error404: (req, res, err) => {
        res.status(404).json({
            title: "Error 404 Not Found",
            message: err,
        });
    },
    error500: (req, res, err) => {
        res.status(500).json({
            title: "Error 500 Internal Server",
            message: err.message,
        });
    },
}

export default errors;
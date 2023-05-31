const errorHandler = (err, req, res, next) => {
	if (err.status == 500) {
		return res.status(500).json({ status: 500, name: err.name, message: err.message });
	}
	res.status(err?.status).json({ status: err.status, name: err.name, message: err.message });
};

export default { errorHandler };

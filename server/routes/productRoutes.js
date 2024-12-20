const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const Product = require('../models/Product');

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: {fileSize: 1000000},
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|webp|gif/;
        const extname = filetypes.test(file.originalname.toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('File format not supported. Only allowed formats:  jpeg, jpg, png, webp, gif.'));
        }
    }
});

function multerErrorHandler(err, req, res, next) {
    if (err instanceof multer.MulterError || err.message === 'File format not supported. Only allowed formats:  jpeg, jpg, png, webp, gif.') {
        return res.status(400).json({ message: err.message });
    }
    next(err);
}

router.post('/products/add', upload.single('image'), multerErrorHandler, async (req, res) => {
    const {name, price, description } = req.body;

    if (!req.file) {
        return res.status(400).json({ message: 'No image uploaded' });
    }

    const compressedFilename = `product-${Date.now()}-${Math.round(Math.random() * 1E9)}.webp`;
    const compressedImagePath = `uploads/${compressedFilename}`;

    try {
        await sharp(req.file.buffer)
            .resize(500)
            .webp({ quality: 80})
            .toFile(compressedImagePath);

        const newProduct = new Product({ name, price, description, image: compressedFilename });
        await newProduct.save();

        res.status(201).json({ message: 'Product succesfully added!'});
    } catch (error) {
        res.status(500).json(error.message);
    }
})

router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json(error.message);
    }
})

router.get('/products/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        if (!product) return res.status(400).send({ message: 'No products found', success: false, data: product});
        res.send({message: 'product has succesfully retrieved', success: true, data: product});
    } catch (error) {
        res.status(500).json(error.message);
    }
})

module.exports = router;
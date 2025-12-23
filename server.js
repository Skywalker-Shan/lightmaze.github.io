const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// 确保assets/images目录存在
const imageDir = path.join(__dirname, 'assets', 'images');
if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
}

// 配置Multer存储
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, imageDir);
    },
    filename: function(req, file, cb) {
        const fileName = req.body.fileName || req.query.filename || file.originalname;
        cb(null, fileName);
    }
});

// 创建Multer实例
const upload = multer({ storage: storage });

// 配置静态文件服务
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

// 图片上传API
app.post('/upload', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }
        
        res.json({
            success: true,
            message: 'Image uploaded successfully',
            fileName: req.file.filename,
            filePath: `/assets/images/${req.file.filename}`
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Image upload endpoint: http://localhost:3000/upload');
    console.log('Static files served from:', __dirname);
});

exports.auth = (req) => {
    const image = req.file;
    const extensions = ['png', 'jpeg', 'jpg', 'gif'];
    const fileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
    const maxSize = 2;

    const file_extension = image.originalname.slice(
        ((image.originalname.lastIndexOf('.') - 1) >>> 0) + 2
    );

    if (!extensions.includes(file_extension) || !fileTypes.includes(image.mimetype)) {
        return 'File must be an image';
    }

    if ((image.size / (1024 * 1024)) > maxSize) {                  
       return 'File too large';
    }
}
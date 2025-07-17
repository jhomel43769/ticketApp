import multer from "multer";

const storage = multer.memoryStorage();
export const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 5 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = [
            'image/jpeg',
            'image/png',
            'aplication/pdf',
            'aplication/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'aplication/vnd.ms-exel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ]
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('ipo de archivo no permitido. Solo se aceptan JPEG, PNG, PDF, DOC, DOCX, XLS, XLSX.'), false)
        }
    }
})


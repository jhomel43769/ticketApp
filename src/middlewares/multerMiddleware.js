import multer from "multer";

const storage = multer.memoryStorage();
export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB límite por archivo
    },
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'application/pdf', // Corregido: era 'aplication/pdf'
            'application/msword', // Corregido: era 'aplication/msword'
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel', // Corregido: era 'aplication/vnd.ms-exel'
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'text/plain'
        ];
        
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Tipo de archivo no permitido. Solo se aceptan JPEG, PNG, GIF, PDF, DOC, DOCX, XLS, XLSX, TXT.'), false);
        }
    }
});
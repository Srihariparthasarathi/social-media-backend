import multer from "multer";
import ApplicationError from "./applicationError.middleware.js";

const UNSUPPORTED_MEDIA_TYPE_CODE = 415;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/media')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, uniqueSuffix + "-" + file.originalname)
    }
})
  

const fileFilter = (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
    } else {
        return cb(new Error('Invalid mime type'));
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter,
    
});


const imageUploadMiddleware = (req, res, next) => {
    const uploadSingle = upload.single('image'); 
    uploadSingle(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return next(new ApplicationError(err.message, UNSUPPORTED_MEDIA_TYPE_CODE));
        } else if (err) {
            return next(err);
        }
        next(); 
    });
};

export default imageUploadMiddleware;


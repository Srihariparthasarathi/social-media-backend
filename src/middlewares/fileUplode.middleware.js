import multer from "multer";
import ApplicationError from "./applicationError.middleware.js";

const UNSUPPORTED_MEDIA_TYPE_CODE = 415;
const INVALID_MIME_TYPE = "Invalid mime type. Only PNG, JPG, and JPEG files are supported.";
const FILE_SIZE_EXCEED = "File size exceeds the 5MB limit.";

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

        if(!err) return next();

        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return next(new ApplicationError(FILE_SIZE_EXCEED, UNSUPPORTED_MEDIA_TYPE_CODE));
            } 
            return next(err);
        } 
        else if(err.message === "Invalid mime type"){
            return next(new ApplicationError(INVALID_MIME_TYPE, UNSUPPORTED_MEDIA_TYPE_CODE));
        }
        return next(err);
    });
};

export default imageUploadMiddleware;


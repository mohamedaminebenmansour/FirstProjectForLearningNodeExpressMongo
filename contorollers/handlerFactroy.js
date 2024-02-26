const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
/** I must learn JavaScript closures */
exports.deleteOne = Model =>catchAsync(async (req, res,next) => {
    const doc = await Model.findByIdAndDelete(req.params.id)
    if(!doc){
      return next(new AppError('Tour not found',404) );
    }   
        res.status(204).json({
            status: 'OK',
            data: null
   })
})
 

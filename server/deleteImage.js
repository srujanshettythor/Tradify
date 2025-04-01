const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'dsntkhf7m',
    api_key: '136828464875523',
    api_secret: 'zP2r_TJ6NNSHj_wZZYfANWoeYXY'
});

// Public ID extracted from the URL
const publicId = 'pfohdz8r1a3vm0c106th';

// Delete the image
cloudinary.uploader.destroy(publicId, { invalidate: true }, (error, result) => {
    if (error) {
        console.error('❌ Error deleting image:', error);
    } else {
        console.log('✅ Image deleted successfully:', result);
    }
});

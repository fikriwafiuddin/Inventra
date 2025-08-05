import multer from "multer"
import cloudinary from "../utils/clodinary.js"
import logger from "../utils/logger.js"

// Config multer untuk menyimpan file di memory
const memoryStorage = multer.memoryStorage()

// File filter untuk validasi tipe file gambar
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|bmp|tiff|svg|webp/
  const extname = allowedTypes.test(
    file.originalname.toLowerCase().split(".").pop()
  )
  const mimetype = allowedTypes.test(file.mimetype)

  if (mimetype && extname) {
    return cb(null, true)
  } else {
    cb(
      new Error(
        "Hanya file gambar yang diizinkan (jpeg, jpg, png, gif, bmp, tiff, svg, webp)"
      )
    )
  }
}

const upload = multer({
  storage: memoryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: fileFilter,
})

// Middleware untuk menangani upload
const uploadFile = (req, res, next) => {
  // Gunakan multer untuk memproses file
  upload.single("image")(req, res, async (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          // Penanganan spesifik untuk ukuran file
          return res
            .status(400)
            .json({ message: "File size exceeds limit of 10MB" })
        }
        // Tambahkan penanganan untuk error Multer lainnya jika diperlukan
        // ...
      }
      // Tangani error dari fileFilter atau error lain dari Multer
      return res
        .status(400)
        .json({ message: err.message || "File upload failed" })
    }

    if (!req.file) {
      return next()
    }

    try {
      // Generate filename unik untuk webp
      const timestamp = Date.now()
      const originalName = req.file.originalname.split(".")[0]
      const webpFilename = `${originalName}_${timestamp}`

      // Konfigurasi upload Cloudinary dengan optimasi WebP
      const uploadOptions = {
        folder: "Inventra/products",
        format: "webp", // Paksa konversi ke WebP
        public_id: webpFilename, // Set custom filename
        allowed_formats: [
          "jpg",
          "png",
          "jpeg",
          "gif",
          "bmp",
          "tiff",
          "svg",
          "webp",
        ],
        transformation: [
          {
            quality: "auto:best", // Kualitas otomatis terbaik
            fetch_format: "webp", // Pastikan format WebP
            flags: "progressive", // Progressive loading
          },
          {
            width: 1200, // Maksimal lebar 1200px
            height: 1200, // Maksimal tinggi 1200px
            crop: "limit", // Jangan crop, hanya resize jika lebih besar
          },
        ],
        // Optimasi tambahan untuk WebP
        webp_options: {
          quality: 85, // Kualitas WebP (0-100)
          method: 6, // Compression method (0-6, 6 = slowest but best compression)
          lossless: false, // Gunakan lossy compression untuk file lebih kecil
        },
      }

      // Upload ke Cloudinary menggunakan upload_stream
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          uploadOptions,
          (error, result) => {
            if (error) {
              logger.error("Cloudinary upload error:", error)
              reject(new Error(`Upload gagal: ${error.message}`))
            } else {
              resolve(result)
            }
          }
        )

        // Kirim buffer langsung ke uploadStream
        uploadStream.end(req.file.buffer)
      })

      // Simpan informasi file hasil upload ke request untuk digunakan di controller
      req.file = {
        ...result,
        originalName: req.file.originalname,
        originalSize: req.file.size,
        compressedSize: result.bytes,
        compressionRatio:
          (((req.file.size - result.bytes) / req.file.size) * 100).toFixed(2) +
          "%",
      }

      logger.info(`✅ Upload berhasil: ${result.public_id}`)
      logger.info(
        `📊 Ukuran asli: ${(req.file.originalSize / 1024).toFixed(2)} KB`
      )
      logger.info(`📊 Ukuran WebP: ${(result.bytes / 1024).toFixed(2)} KB`)
      logger.info(`🗜️ Kompresi: ${req.file.compressionRatio}`)

      next()
    } catch (error) {
      logger.error("Upload middleware error:", error)
      next(error)
    }
  })
}

export default uploadFile

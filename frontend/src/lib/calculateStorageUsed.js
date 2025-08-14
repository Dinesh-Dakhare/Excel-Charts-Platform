 export const calculateStorageUsed = (files) => {
    if (!Array.isArray(files) || files.length === 0) return '0 KB'

    const totalBytes = files.reduce((sum, file) => {
      let size = file.size

      // If size is a string like "4.78 KB", convert it to bytes
      if (typeof size === 'string') {
        const [value, unit] = size.split(' ')
        const numericValue = parseFloat(value)
        switch (unit) {
          case 'KB':
            size = numericValue * 1024
            break
          case 'MB':
            size = numericValue * 1024 * 1024
            break
          case 'GB':
            size = numericValue * 1024 * 1024 * 1024
            break
          case 'TB':
            size = numericValue * 1024 * 1024 * 1024 * 1024
            break
          default: // Bytes
            size = numericValue
        }
      }

      return sum + size
    }, 0)

    return formatBytes(totalBytes)
  }

  // Helper: best unit formatting
  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
  }
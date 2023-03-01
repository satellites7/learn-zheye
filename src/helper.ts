interface CheckCondition {
    format?: string[],
    size?: number
}
type errorType = 'size' | 'format' | null
export const checkBeforeUpload = (file: File, condition: CheckCondition) => {
    const { format, size } = condition
    const isValidFormat = format ? format.includes(file.type) : true
    const isValidSize = size ? (file.size / 1024 / 1024 < size) : true
    let error:errorType = null
    if (!isValidFormat) {
        error = 'format'
    }
    if (!isValidSize) {
        error = 'size'
    }
    return {
        passed: isValidFormat && isValidSize,
        error
    }
}

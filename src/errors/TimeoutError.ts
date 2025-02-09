export default class TimeoutError extends Error {
  constructor(fn: string) {
    super()

    this.name = 'TimeoutError'
    this.message = `Timed out for function "${fn}"`

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, TimeoutError)
    }
    else {
      this.stack = (new Error()).stack
    }
  }
}

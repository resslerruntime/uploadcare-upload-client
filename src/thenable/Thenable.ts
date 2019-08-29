/**
 * Base generic abstract implementation of Promise interface.
 * You need only implement `promise` property.
 */
export abstract class Thenable<T> implements Promise<T> {
  readonly [Symbol.toStringTag]: string

  protected abstract readonly promise: Promise<T>

  then<TFulfilled = T, TRejected = never>(
    onFulfilled?: ((value: T) => (PromiseLike<TFulfilled> | TFulfilled)) | undefined | null,
    onRejected?: ((reason: Error) => (PromiseLike<TRejected> | TRejected)) | undefined | null
  ): Promise<TFulfilled | TRejected> {
    return this.promise.then(onFulfilled, onRejected)
  }

  catch<TRejected = never>(
    onRejected?: ((reason: Error) => (PromiseLike<TRejected> | TRejected)) | undefined | null
  ): Promise<T | TRejected> {
    return this.promise.catch(onRejected)
  }

  finally(onFinally?: (() => void) | null | undefined): Promise<T> {
    return this.promise.finally(onFinally)
  }
}

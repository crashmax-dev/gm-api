// https://github.com/andywer/typed-emitter/blob/master/index.d.ts

export type EventMap = {
  [key: string]: (...args: any[]) => void
}

/**
 * Type-safe event emitter.
 *
 * Use it like this:
 *
 * ```typescript
 * type MyEvents = {
 *   error: (error: Error) => void;
 *   message: (from: string, content: string) => void;
 * }
 *
 * const myEmitter = new EventEmitter() as TypedEmitter<MyEvents>;
 *
 * myEmitter.emit("error", "x")  // <- Will catch this type error;
 * ```
 */
export interface TypedEventEmitter<Events extends EventMap> {
  on<E extends keyof Events>(event: E, listener: Events[E]): this
  off<E extends keyof Events>(event: E, listener: Events[E]): this
  removeAllListeners<E extends keyof Events>(event?: E): this
  emit<E extends keyof Events>(event: E, ...args: Parameters<Events[E]>): this
  // The sloppy `eventNames()` return type is to mitigate type incompatibilities - see #5
  eventNames(): (keyof Events | string | symbol)[]
  listeners<E extends keyof Events>(event: E): Events[E][]
  listenerCount<E extends keyof Events>(event: E): number
}

export default TypedEventEmitter

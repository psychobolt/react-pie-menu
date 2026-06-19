const _Proxy = globalThis.Proxy;

export default class Proxy<TTarget extends object, TOutput extends object> {
  readonly value: TOutput;

  private readonly methods = new Map<PropertyKey, Function>();

  constructor(protected readonly target: TTarget) {
    this.value = new _Proxy(target, {
      get: (target, property, receiver) => this.get(target, property, receiver)
    }) as unknown as TOutput;
  }

  protected register(property: PropertyKey, method: Function) {
    this.methods.set(property, method.bind(this));
  }

  protected get(target: TTarget, property: string | symbol, receiver: unknown) {
    const method = this.methods.get(property);

    if (method) {
      return method;
    }

    return Reflect.get(target, property, receiver);
  }
}

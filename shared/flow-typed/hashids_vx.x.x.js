// flow-typed signature: d2fa0246bd83aaff586fe89d0e112143
// flow-typed version: <<STUB>>/hashids_v^2.2.10/flow_v0.171.0

declare class Hashids {
  encode(value: any): string;
}

declare module 'hashids' {
  declare export default typeof Hashids;
}

export interface BCryptAdapterInterface {
  create(payload: string): Promise<string>;
  compare(payload: string, hashCompare: string): Promise<boolean>;
}

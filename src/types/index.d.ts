export {};

declare global {
  interface Window {
    phantom: any; // whatever type you want to give. (any,number,float etc)
    solflare: any; // whatever type you want to give. (any,number,float etc)
  }
}
const LOGGING = true;

export default function logMessage(message: any): void {
  // eslint-disable-next-line no-unused-expressions
  LOGGING && console.log(message);
}

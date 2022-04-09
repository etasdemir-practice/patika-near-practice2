import { storage, Context } from "near-sdk-as"

export function helloWorld(): string {
  const predecessor = Context.predecessor;
  const balance = Context.accountBalance;
  const contractName = Context.contractName;
  const tip = Context.attachedDeposit;
  const sender = Context.senderPublicKey
  return `hello ${predecessor} contract name: ${contractName} sender: ${sender} balance: ${balance} tip: ${tip}`
}

// read the given key from account (contract) storage
export function read(key: string): string {
  if (storage.hasKey(key)) {
    return `✅ Key [ ${key} ] has value [ ${storage.getString(key)!} ]`
  } else {
    return `🚫 Key [ ${key} ] not found in storage. ( ${storageReport()} )`
  }
}

// write the given value at the given key to account (contract) storage
export function write(key: string, value: string): string {
  storage.set(key, value)
  return `✅ Data saved. ( ${storageReport()} )`
}

// private helper method used by read() and write() above
function storageReport(): string {
  return `storage [ ${Context.storageUsage} bytes ]`
}

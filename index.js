class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    return this.transactions.reduce((accum, currentVal) => accum + currentVal.value,0)
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}


class Transaction {

  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }

  commit() {
    if(!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}

class Deposit extends Transaction {

  isAllowed() {
    return true;
  }

  get value() {
    return this.amount
  }

}

class Withdrawal extends Transaction {

  isAllowed() {

    if (this.account.balance >= this.amount) return true;

    return false;
  }

  get value() {
    return -this.amount;
  }

}



// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account('billybob');

console.log('Starting Balance:', myAccount.balance);

const t0 = new Withdrawal(69.00, myAccount);
t0.commit();
console.log('Balance After t0:', myAccount.balance);

const t1 = new Deposit(120.00, myAccount);
t1.commit();
console.log('Balance After t1:', myAccount.balance);


const t2 = new Withdrawal(50.00, myAccount);
t2.commit();
console.log('Balance After t2:', myAccount.balance);


console.log('Ending Balance:', myAccount.balance);
console.log('Transaction History:', myAccount.transactions)

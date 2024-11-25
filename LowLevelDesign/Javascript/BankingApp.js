import {
  MinPriorityQueue,
  MaxPriorityQueue,
} from "@datastructures-js/priority-queue";

class BankingApp {
  static _instance = null;

  constructor() {
    this.users = {};
    this.cards = {};
    this.accounts = {};
    this.topTransactionCount = 5;
    this.topTransactions = new MinPriorityQueue((transaction) =>
      Math.abs(transaction.amount)
    );
  }

  static getInstance() {
    if (!this._instance) {
      this._instance = new BankingApp();
      Object.freeze(this._instance);
    }
    return this._instance;
  }

  addCard(card) {
    this.cards[card.id] = card;
    card.user.addCard(card);
  }

  addAccount(account) {
    this.accounts[account.id] = account;
    account.user.addAccount(account);
  }

  addUser(user) {
    this.users[user.id] = user;
  }

  withdraw(accountOrCard, amount) {
    try {
      let transaction = accountOrCard.withdraw(amount);
      this.addTransactionToHeap(transaction);
    } catch (err) {
      console.log("doing something to handle errror:", err);
    }
  }

  deposit(accountOrCard, amount) {
    try {
      let transaction = accountOrCard.deposit(amount);
      this.addTransactionToHeap(transaction);
    } catch (err) {
      console.log("doing something to handle errror:", err);
    }
  }

  transferFunds(amount, source, destination) {
    try {
      let withdrawTransaction = source.withdraw(amount);
      let depositTransaction = destination.deposit(amount);
      this.addTransactionToHeap(withdrawTransaction);
      this.addTransactionToHeap(depositTransaction);
    } catch (err) {
      console.log("handle error:", err);
    }
  }

  getTransactionHistory(cardOrAccount) {
    return cardOrAccount.transactions;
  }

  addTransactionToHeap(transaction) {
    this.topTransactions.enqueue(transaction);
    if (this.topTransactions.size() > this.topTransactionCount) {
      this.topTransactions.dequeue();
    }
  }

  getTopTransactions() {
    return this.topTransactions.toArray();
  }

  getTopTransaction() {
    return MaxPriorityQueue.fromArray(
      this.topTransactions.toArray(),
      (transaction) => Math.abs(transaction.amount)
    ).front();
  }
}

class User {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.cards = [];
    this.accounts = [];
  }

  addCard(card) {
    if (!this.cards.includes(card)) this.cards.push(card);
  }

  addAccount(account) {
    if (!this.accounts.includes(account)) this.accounts.push(account);
  }
}

class Account {
  constructor(id, name, accountNumber, user) {
    this.id = id;
    this.name = name;
    this.accountNumber = accountNumber;
    this.user = user;
    this.balance = 0;
    this.transactions = [];
  }

  deposit(amount) {
    this.balance += amount;
    let transaction = new Transaction(
      Transaction.generateTransactionId(),
      amount,
      this
    );
    this.addTransaction(transaction);
    return transaction;
  }

  withdraw(amount) {
    if (this.balance >= amount) {
      this.balance -= amount;
      let transaction = new Transaction(
        Transaction.generateTransactionId(),
        -amount,
        this
      );
      this.addTransaction(transaction);
      return transaction;
    } else {
      throw Error("insufficient funds");
    }
  }

  addTransaction(transaction) {
    if (!this.transactions.includes(transaction))
      this.transactions.push(transaction);
  }
}

class AccountFactory {
  static createAccount(id, name, accountNumber, user) {
    return new Account(id, name, accountNumber, user);
  }
}

class Card {
  constructor(id, name, cardNumber, expiration, cvv, user) {
    this.id = id;
    this.name = name;
    this.cardNumber = cardNumber;
    this.expiration = expiration;
    this.cvv = cvv;
    this.user = user;
    this.balance = 0;
    this.transactions = [];
  }

  withdraw() {
    throw Error("Not Implemented");
  }

  deposit() {
    throw Error("Not Implemented");
  }

  addTransaction(transaction) {
    if (!this.transactions.includes(transaction))
      this.transactions.push(transaction);
  }
}

class CardFactory {
  static createCard(type, id, name, cardNumber, expiration, cvv, user, limit) {
    switch (type) {
      case "debit":
        return new DebitCard(id, name, cardNumber, expiration, cvv, user);
      case "credit":
        return new CreditCard(
          id,
          name,
          cardNumber,
          expiration,
          cvv,
          user,
          limit
        );
      default:
        throw Error("Not Valid Card");
    }
  }
}

class CreditCard extends Card {
  constructor(id, name, cardNumber, expiration, cvv, user, limit) {
    super(id, name, cardNumber, expiration, cvv, user);
    this.limit = limit;
  }

  deposit(amount) {
    this.balance += amount;
    let transaction = new Transaction(
      Transaction.generateTransactionId(),
      amount,
      this
    );
    this.addTransaction(transaction);
    return transaction;
  }

  withdraw(amount) {
    if (this.balance + this.limit >= amount) {
      this.balance -= amount;
      let transaction = new Transaction(
        Transaction.generateTransactionId(),
        -amount,
        this
      );
      console.log(transaction);
      this.addTransaction(transaction);
      return transaction;
    } else {
      throw Error("insufficient funds");
    }
  }
}

class DebitCard extends Card {
  constructor(id, name, cardNumber, expiration, cvv, user) {
    super(id, name, cardNumber, expiration, cvv, user);
  }

  deposit(amount) {
    this.balance += amount;
    let transaction = new Transaction(
      Transaction.generateTransactionId(),
      amount,
      this
    );
    this.addTransaction(transaction);
    return transaction;
  }

  withdraw(amount) {
    if (this.balance >= amount) {
      this.balance -= amount;
      let transaction = new Transaction(
        Transaction.generateTransactionId(),
        -amount,
        this
      );
      this.addTransaction(transaction);
      return transaction;
    } else {
      throw Error("insufficient funds");
    }
  }
}

class Transaction {
  constructor(id, amount, source, destination = null) {
    this.id = id;
    this.amount = amount;
    this.source = source.id;
    this.destination = destination?.id;
    this.date = new Date();
  }

  static generateTransactionId() {
    return (
      "TXN" + Date.now().toString(36) + Math.random().toString(36).slice(2)
    );
  }
}

const app = BankingApp.getInstance();

const user1 = new User(1, "John", "John@example.com", "12345");
const user2 = new User(2, "Jane", "jane@example.com", "12345");

app.addUser(user1);
app.addUser(user2);

const account1 = AccountFactory.createAccount(
  1,
  "Account 1 Bank",
  123456789,
  user1
);
const account2 = AccountFactory.createAccount(
  2,
  "Account 2 Bank",
  123456788,
  user2
);

const card1 = CardFactory.createCard(
  "debit",
  1,
  "Debit Card",
  123456789,
  "10/25",
  123,
  user1
);
const card2 = CardFactory.createCard(
  "credit",
  2,
  "Credit Card",
  123456788,
  "10/25",
  123,
  user2,
  5000
);

app.addAccount(account1);
app.addAccount(account2);

app.addCard(card1);
app.addCard(card1);
app.addCard(card1);
app.addCard(card2);

app.deposit(account1, 1000);
app.deposit(account1, 1000);
app.deposit(account1, 1000);
app.deposit(account1, 1000);
app.deposit(account2, 10000000);

app.deposit(card1, 10000);
app.withdraw(account2, 1000000);
app.withdraw(card1, 1000000);

app.transferFunds(100, account1, account2);

const transactionHistory1 = app.getTransactionHistory(account1);
console.log(transactionHistory1);
const transactionHistory2 = app.getTransactionHistory(account2);

const cardHistory2 = app.getTransactionHistory(card2);

const largestTransaction = app.getTopTransaction();
console.log(largestTransaction);
const largestTransactions = app.getTopTransactions();
console.log(largestTransactions);

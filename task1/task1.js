"use strict";
class BankAccount {
    balance;
    owner;
    #accountNumber;
    constructor(balance, owner) {
        this.balance = balance;
        this.owner = owner;
        this.#accountNumber = Math.floor(100000000 + Math.random() * 800000000);
    }
    getbalance() {
        return this.balance;
    }
    setBalance(newBalance) {
        this.balance = newBalance;
    }
}
class SavingAccount extends BankAccount {
    transfer(amount) {
        this.setBalance(this.getbalance() - amount);
    }
}

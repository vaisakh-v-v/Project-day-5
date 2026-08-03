class BankAccount{
    readonly #accountNumber: number;
    constructor(
        private balance: number,
        public readonly owner: string,
    ){
        this.#accountNumber = Math.floor(100000000 + Math.random()* 800000000);

    }
    getbalance(){
        return this.balance;
    }
    setBalance(newBalance: number){
        this.balance = newBalance;
    }
}

class SavingAccount extends BankAccount{
    protected transfer(amount: number){
        this.setBalance(this.getbalance() - amount);
    }
}
export{}
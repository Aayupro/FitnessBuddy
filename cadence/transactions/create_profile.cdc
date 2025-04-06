import FitnessBuddy from "../contracts/FitnessBuddy.cdc"

transaction {
    prepare(acct: auth(Storage) &Account) {
        FitnessBuddy.createProfile()
    }
}

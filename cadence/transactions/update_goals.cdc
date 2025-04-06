import FitnessBuddy from "../contracts/FitnessBuddy.cdc"

transaction(newGoals: String) {
    prepare(acct: auth(Storage) &Account) {
        if let profile = FitnessBuddy.profiles[acct.address] {
            profile.updateGoals(newGoals: newGoals)
        }
    }
}

import FitnessBuddy from "../contracts/FitnessBuddy.cdc"

transaction(workout: String) {
    prepare(acct: auth(Storage) &Account) {
        if let profile = FitnessBuddy.profiles[acct.address] {
            profile.addWorkout(workout: workout)
        }
    }
}

import FitnessBuddy from "../contracts/FitnessBuddy.cdc"

access(all) fun main(): UInt64 {
    return FitnessBuddy.totalProfiles
}

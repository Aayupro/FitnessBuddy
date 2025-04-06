import FitnessBuddy from "../contracts/FitnessBuddy.cdc"

access(all) fun main(address: Address): FitnessBuddy.IProfile? {
    return FitnessBuddy.profiles[address]
}

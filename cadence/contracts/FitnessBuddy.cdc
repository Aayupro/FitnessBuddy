access(all) contract FitnessBuddy {
    // Events
    access(all) event ProfileCreated(id: UInt64, address: Address)
    access(all) event GoalsUpdated(id: UInt64, newGoals: String)
    access(all) event WorkoutAdded(id: UInt64, workout: String)

    // Main resource interface
    access(all) resource interface IProfile {
        access(all) view fun getID(): UInt64
        access(all) view fun getGoals(): String
        access(all) view fun getWorkouts(): [String]
        access(all) fun updateGoals(newGoals: String)
        access(all) fun addWorkout(workout: String)
    }

    // Profile resource
    access(all) resource Profile: IProfile {
        access(all) let id: UInt64
        access(all) var goals: String
        access(all) var workouts: [String]

        init(id: UInt64) {
            self.id = id
            self.goals = ''
            self.workouts = []
        }

        access(all) view fun getID(): UInt64 {
            return self.id
        }

        access(all) view fun getGoals(): String {
            return self.goals
        }

        access(all) view fun getWorkouts(): [String] {
            return self.workouts
        }

        access(all) fun updateGoals(newGoals: String) {
            self.goals = newGoals
            emit GoalsUpdated(id: self.id, newGoals: newGoals)
        }

        access(all) fun addWorkout(workout: String) {
            self.workouts.append(workout)
            emit WorkoutAdded(id: self.id, workout: workout)
        }
    }

    // Contract fields
    access(all) var totalProfiles: UInt64
    access(all) var profiles: @{Address: Profile}

    init() {
        self.totalProfiles = 0
        self.profiles <- {}
    }

    // Create new profile
    access(all) fun createProfile() {
        let profile <- create Profile(id: self.totalProfiles)
        self.profiles[self.account.address] <-! profile
        self.totalProfiles = self.totalProfiles + 1
        
        emit ProfileCreated(id: self.totalProfiles - 1, address: self.account.address)
    }
}

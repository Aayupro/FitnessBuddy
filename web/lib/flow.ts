import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';

export const initFlow = () => {
  fcl.config()
    .put('accessNode.api', process.env.NEXT_PUBLIC_FLOW_ACCESS_NODE || 'http://localhost:8080')
    .put('discovery.wallet', process.env.NEXT_PUBLIC_FLOW_WALLET || 'http://localhost:8701/fcl/authn')
    .put('app.detail.title', 'Fitness Buddy')
    .put('app.detail.icon', '/favicon.ico');
};

export const getProfile = async (address: string) => {
  return await fcl.query({
    cadence: `
      import FitnessBuddy from 0xFitnessBuddy

      pub fun main(address: Address): FitnessBuddy.IProfile? {
          return FitnessBuddy.profiles[address]
      }
    `,
    args: (arg, t) => [arg(address, t.Address)]
  });
};

export const createProfile = async () => {
  const transactionId = await fcl.mutate({
    cadence: `
      import FitnessBuddy from 0xFitnessBuddy

      transaction {
          prepare(acct: auth(Storage) &Account) {
              FitnessBuddy.createProfile()
          }
      }
    `,
    payer: fcl.authz,
    proposer: fcl.authz,
    authorizations: [fcl.authz],
    limit: 50
  });
  return fcl.tx(transactionId).onceSealed();
};

export const updateGoals = async (newGoals: string) => {
  const transactionId = await fcl.mutate({
    cadence: `
      import FitnessBuddy from 0xFitnessBuddy

      transaction(newGoals: String) {
          prepare(acct: auth(Storage) &Account) {
              if let profile = FitnessBuddy.profiles[acct.address] {
                  profile.updateGoals(newGoals: newGoals)
              }
          }
      }
    `,
    args: (arg, t) => [arg(newGoals, t.String)],
    payer: fcl.authz,
    proposer: fcl.authz,
    authorizations: [fcl.authz],
    limit: 50
  });
  return fcl.tx(transactionId).onceSealed();
};

export const addWorkout = async (workout: string) => {
  const transactionId = await fcl.mutate({
    cadence: `
      import FitnessBuddy from 0xFitnessBuddy

      transaction(workout: String) {
          prepare(acct: auth(Storage) &Account) {
              if let profile = FitnessBuddy.profiles[acct.address] {
                  profile.addWorkout(workout: workout)
              }
          }
      }
    `,
    args: (arg, t) => [arg(workout, t.String)],
    payer: fcl.authz,
    proposer: fcl.authz,
    authorizations: [fcl.authz],
    limit: 50
  });
  return fcl.tx(transactionId).onceSealed();
};

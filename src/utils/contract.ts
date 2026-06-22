import { openContractCall } from '@stacks/connect'
import { uintCV, PostConditionMode, AnchorMode } from '@stacks/transactions'
import { StacksMainnet } from '@stacks/network'

const network  = new StacksMainnet()
const CONTRACT = 'SP1V72500C63KN9E348QDK9X879MASSTN0J3KBQ5N'

export async function callStake(amount: number, lockBlocks: number) {
  return openContractCall({
    network,
    contractAddress: CONTRACT,
    contractName:    'b2s-staking-vault-v2',
    functionName:    'stake',
    functionArgs:    [
      uintCV(Math.floor(amount * 1_000_000)),
      uintCV(lockBlocks),
    ],
    postConditionMode: PostConditionMode.Allow,
    anchorMode:        AnchorMode.Any,
  })
}

export async function callUnstake() {
  return openContractCall({
    network,
    contractAddress:   CONTRACT,
    contractName:      'b2s-staking-vault-v2',
    functionName:      'unstake',
    functionArgs:      [],
    postConditionMode: PostConditionMode.Allow,
    anchorMode:        AnchorMode.Any,
  })
}

export async function callCompound() {
  return openContractCall({
    network,
    contractAddress:   CONTRACT,
    contractName:      'b2s-staking-vault-v2',
    functionName:      'compound-rewards',
    functionArgs:      [],
    postConditionMode: PostConditionMode.Allow,
    anchorMode:        AnchorMode.Any,
  })
}

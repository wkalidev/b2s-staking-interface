import { openContractCall } from '@stacks/connect'
import { uintCV, PostConditionMode, AnchorMode } from '@stacks/transactions'
import { StacksMainnet } from '@stacks/network'

const network  = new StacksMainnet()
const CONTRACT = 'SP936YWJPST8GB8FFRCN7CC6P2YR5K6NNBAARQ96'

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

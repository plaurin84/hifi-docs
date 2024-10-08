---
id: governor-bravo
title: Governor Bravo
sidebar_position: 4
---

# Governor Bravo

Governor Bravo is an advanced and flexible governance system. It is a key component of the decentralized governance infrastructure, which allows token holders to participate in the decision-making process for the management and future direction of a Hifi protocol. It's responsible for handling proposal creation, voting, and execution of governance actions; and it's designed with upgradeability in mind, which means that its logic can be modified or extended without affecting the existing proposals and voting data.

This is the only upgradeable contract in Hifi governance. The most up to date version is [v1.0.0](https://github.com/hifi-finance/hifi-governance/blob/1.0.0/contracts/GovernorBravoDelegate.sol).

## Constant Functions

### getActions

```solidity
function getActions(
    uint256 proposalId
) external returns (address[] targets, uint256[] values, string[] signatures, bytes[] calldatas)
```

Gets actions of a proposal

#### Parameters

| Name         | Type    | Description            |
| :----------- | :------ | :--------------------- |
| `proposalId` | uint256 | The id of the proposal |

#### Return Values

| Name         | Type      | Description         |
| :----------- | :-------- | :------------------ |
| `targets`    | address[] | proposal targets    |
| `values`     | uint256[] | proposal values     |
| `signatures` | string[]  | proposal signatures |
| `calldatas`  | bytes[]   | proposal calldatas  |

### getReceipt

```solidity
function getReceipt(
    uint256 proposalId,
    address voter
) external returns (struct GovernorBravoDelegateStorageV1.Receipt)
```

Returns the receipt of a voter on a given proposal

#### Parameters

| Name         | Type    | Description              |
| :----------- | :------ | :----------------------- |
| `proposalId` | uint256 | the id of proposal       |
| `voter`      | address | The address of the voter |

#### Return Values

| Name  | Type                                          | Description        |
| :---- | :-------------------------------------------- | :----------------- |
| `[0]` | struct GovernorBravoDelegateStorageV1.Receipt | The voting receipt |

### quorumVotes

```solidity
function quorumVotes() public returns (uint256)
```

The number of votes in support of a proposal required in order for a quorum to be reached and for a vote to succeed

### state

```solidity
function state(
    uint256 proposalId
) public returns (enum GovernorBravoDelegateStorageV1.ProposalState)
```

Returns the state of a proposal

#### Parameters

| Name         | Type    | Description            |
| :----------- | :------ | :--------------------- |
| `proposalId` | uint256 | The id of the proposal |

#### Return Values

| Name  | Type                                              | Description    |
| :---- | :------------------------------------------------ | :------------- |
| `[0]` | enum GovernorBravoDelegateStorageV1.ProposalState | Proposal state |

### MAX_PROPOSAL_THRESHOLD

```solidity
function MAX_PROPOSAL_THRESHOLD() public returns (uint256)
```

The maximum settable proposal threshold

### MIN_PROPOSAL_THRESHOLD

```solidity
function MIN_PROPOSAL_THRESHOLD() public returns (uint256)
```

The minimum settable proposal threshold

## Non-Constant Functions

### \_acceptAdmin

```solidity
function _acceptAdmin() external
```

This function is used to accept the transfer of admin rights. The message sender (i.e., msg.sender) must be the pending admin.

### \_setPendingAdmin

```solidity
function _setPendingAdmin(
    address newPendingAdmin
) external
```

Begins transfer of admin rights. The newPendingAdmin must call `_acceptAdmin` to finalize the transfer.

Admin function to begin change of admin. The newPendingAdmin must call `_acceptAdmin` to finalize the transfer.

#### Parameters

| Name              | Type    | Description        |
| :---------------- | :------ | :----------------- |
| `newPendingAdmin` | address | New pending admin. |

### \_setProposalThreshold

```solidity
function _setProposalThreshold(
    uint256 newProposalThreshold
) external
```

Admin function for setting the proposal threshold.

`newProposalThreshold` must be greater than the hardcoded `MIN_PROPOSAL_THRESHOLD`

#### Parameters

| Name                   | Type    | Description            |
| :--------------------- | :------ | :--------------------- |
| `newProposalThreshold` | uint256 | new proposal threshold |

### \_setVotingDelay

```solidity
function _setVotingDelay(
    uint256 newVotingDelay
) external
```

Admin function for setting the voting delay

#### Parameters

| Name             | Type    | Description                 |
| :--------------- | :------ | :-------------------------- |
| `newVotingDelay` | uint256 | new voting delay, in blocks |

### \_setVotingPeriod

```solidity
function _setVotingPeriod(
    uint256 newVotingPeriod
) external
```

Admin function for setting the voting period

#### Parameters

| Name              | Type    | Description                  |
| :---------------- | :------ | :--------------------------- |
| `newVotingPeriod` | uint256 | new voting period, in blocks |

### cancel

```solidity
function cancel(
    uint256 proposalId
) external
```

Cancels a proposal if sender is the proposer, or proposer delegates dropped below proposal threshold

#### Parameters

| Name         | Type    | Description                      |
| :----------- | :------ | :------------------------------- |
| `proposalId` | uint256 | The id of the proposal to cancel |

### castVote

```solidity
function castVote(
    uint256 proposalId,
    uint8 support
) external
```

Cast a vote on a proposal

#### Parameters

| Name         | Type    | Description                                                 |
| :----------- | :------ | :---------------------------------------------------------- |
| `proposalId` | uint256 | The id of the proposal to vote on                           |
| `support`    | uint8   | The support value for the vote. 0=against, 1=for, 2=abstain |

### castVoteBySig

```solidity
function castVoteBySig(
    uint256 proposalId,
    uint8 support,
    uint8 v,
    bytes32 r,
    bytes32 s
) external
```

Cast a vote on a proposal via an EIP-712 signature.

#### Parameters

| Name         | Type    | Description                                                 |
| :----------- | :------ | :---------------------------------------------------------- |
| `proposalId` | uint256 | The id of the proposal to vote on                           |
| `support`    | uint8   | The support value for the vote. 0=against, 1=for, 2=abstain |
| `v`          | uint8   | The recovery byte of the signature                          |
| `r`          | bytes32 | The first 32 bytes of the signature                         |
| `s`          | bytes32 | The second 32 bytes of the signature                        |

### castVoteWithReason

```solidity
function castVoteWithReason(
    uint256 proposalId,
    uint8 support,
    string reason
) external
```

Cast a vote on a proposal with a reason

#### Parameters

| Name         | Type    | Description                                                 |
| :----------- | :------ | :---------------------------------------------------------- |
| `proposalId` | uint256 | The id of the proposal to vote on                           |
| `support`    | uint8   | The support value for the vote. 0=against, 1=for, 2=abstain |
| `reason`     | string  | The reason given for the vote by the voter                  |

### execute

```solidity
function execute(
    uint256 proposalId
) external
```

Executes a queued proposal if eta has passed

#### Parameters

| Name         | Type    | Description                       |
| :----------- | :------ | :-------------------------------- |
| `proposalId` | uint256 | The id of the proposal to execute |

### initialize

```solidity
function initialize(
    address timelock_,
    address hifi_,
    uint256 votingPeriod_,
    uint256 votingDelay_,
    uint256 proposalThreshold_
) public
```

Used to initialize the contract during delegator construction

#### Parameters

| Name                 | Type    | Description                    |
| :------------------- | :------ | :----------------------------- |
| `timelock_`          | address | The address of the Timelock    |
| `hifi_`              | address | The address of the Hifi token  |
| `votingPeriod_`      | uint256 | The initial voting period      |
| `votingDelay_`       | uint256 | The initial voting delay       |
| `proposalThreshold_` | uint256 | The initial proposal threshold |

### propose

```solidity
function propose(
    address[] targets,
    uint256[] values,
    string[] signatures,
    bytes[] calldatas,
    string description
) public returns (uint256)
```

Function used to submit a new proposal. Sender must have delegates above the proposal threshold

#### Parameters

| Name          | Type      | Description                            |
| :------------ | :-------- | :------------------------------------- |
| `targets`     | address[] | Target addresses for proposal calls    |
| `values`      | uint256[] | Eth values for proposal calls          |
| `signatures`  | string[]  | Function signatures for proposal calls |
| `calldatas`   | bytes[]   | Calldatas for proposal calls           |
| `description` | string    | String description of the proposal     |

#### Return Values

| Name  | Type    | Description                 |
| :---- | :------ | :-------------------------- |
| `[0]` | uint256 | Proposal id of new proposal |

### queue

```solidity
function queue(
    uint256 proposalId
) external
```

Queues a proposal of state succeeded

#### Parameters

| Name         | Type    | Description                     |
| :----------- | :------ | :------------------------------ |
| `proposalId` | uint256 | The id of the proposal to queue |

## Events

### ProposalCanceled

```solidity
event ProposalCanceled(
    uint256 id
)
```

An event emitted when a proposal has been canceled

#### Parameters

| Name | Type    | Description                               |
| :--- | :------ | :---------------------------------------- |
| `id` | uint256 | The id of the proposal which was canceled |

### ProposalCreated

```solidity
event ProposalCreated(
    uint256 id,
    address proposer,
    address[] targets,
    uint256[] values,
    string[] signatures,
    bytes[] calldatas,
    uint256 startBlock,
    uint256 endBlock,
    string description
)
```

An event emitted when a new proposal is created

#### Parameters

| Name          | Type      | Description                                                                             |
| :------------ | :-------- | :-------------------------------------------------------------------------------------- |
| `id`          | uint256   | The id of the proposal                                                                  |
| `proposer`    | address   | The address of the proposer                                                             |
| `targets`     | address[] | The ordered list of target addresses for calls to be made                               |
| `values`      | uint256[] | The ordered list of values (i.e. msg.value) to be passed to the calls to be made        |
| `signatures`  | string[]  | The ordered list of function signatures to be called                                    |
| `calldatas`   | bytes[]   | The ordered list of calldata to be passed to each call                                  |
| `startBlock`  | uint256   | The block at which voting begins: holders must delegate their votes prior to this block |
| `endBlock`    | uint256   | The block at which voting ends: votes must be cast prior to this block                  |
| `description` | string    | The description text for the proposal                                                   |

### ProposalExecuted

```solidity
event ProposalExecuted(
    uint256 id
)
```

An event emitted when a proposal has been executed in the Timelock

#### Parameters

| Name | Type    | Description                              |
| :--- | :------ | :--------------------------------------- |
| `id` | uint256 | The id of the proposal that was executed |

### ProposalQueued

```solidity
event ProposalQueued(
    uint256 id,
    uint256 eta
)
```

An event emitted when a proposal has been queued in the Timelock

#### Parameters

| Name  | Type    | Description                                                        |
| :---- | :------ | :----------------------------------------------------------------- |
| `id`  | uint256 | The id of the proposal that was queued                             |
| `eta` | uint256 | The timestamp at which the proposal will be queued in the Timelock |

### VoteCast

```solidity
event VoteCast(
    address voter,
    uint256 proposalId,
    uint8 support,
    uint256 votes,
    string reason
)
```

An event emitted when a vote has been cast on a proposal

#### Parameters

| Name         | Type    | Description                                             |
| :----------- | :------ | :------------------------------------------------------ |
| `voter`      | address | The address which casted a vote                         |
| `proposalId` | uint256 | The proposal id which was voted on                      |
| `support`    | uint8   | Support value for the vote. 0=against, 1=for, 2=abstain |
| `votes`      | uint256 | Number of votes which were cast by the voter            |
| `reason`     | string  | The reason given for the vote by the voter              |

### VotingDelaySet

```solidity
event VotingDelaySet(
    uint256 oldVotingDelay,
    uint256 newVotingDelay
)
```

An event emitted when the voting delay is set

#### Parameters

| Name             | Type    | Description          |
| :--------------- | :------ | :------------------- |
| `oldVotingDelay` | uint256 | The old voting delay |
| `newVotingDelay` | uint256 | The new voting delay |

### VotingPeriodSet

```solidity
event VotingPeriodSet(
    uint256 oldVotingPeriod,
    uint256 newVotingPeriod
)
```

An event emitted when the voting period is set

#### Parameters

| Name              | Type    | Description           |
| :---------------- | :------ | :-------------------- |
| `oldVotingPeriod` | uint256 | The old voting period |
| `newVotingPeriod` | uint256 | The new voting period |

### NewAdmin

```solidity
event NewAdmin(
    address oldAdmin,
    address newAdmin
)
```

Emitted when pendingAdmin is accepted, which means admin is updated

#### Parameters

| Name       | Type    | Description   |
| :--------- | :------ | :------------ |
| `oldAdmin` | address | The old admin |
| `newAdmin` | address | The new admin |

### NewImplementation

```solidity
event NewImplementation(
    address oldImplementation,
    address newImplementation
)
```

Emitted when implementation is changed

#### Parameters

| Name                | Type    | Description            |
| :------------------ | :------ | :--------------------- |
| `oldImplementation` | address | The old implementation |
| `newImplementation` | address | The new implementation |

### NewPendingAdmin

```solidity
event NewPendingAdmin(
    address oldPendingAdmin,
    address newPendingAdmin
)
```

Emitted when pendingAdmin is changed

#### Parameters

| Name              | Type    | Description           |
| :---------------- | :------ | :-------------------- |
| `oldPendingAdmin` | address | The old pending admin |
| `newPendingAdmin` | address | The new pending admin |

### ProposalThresholdSet

```solidity
event ProposalThresholdSet(
    uint256 oldProposalThreshold,
    uint256 newProposalThreshold
)
```

Emitted when proposal threshold is set

#### Parameters

| Name                   | Type    | Description                |
| :--------------------- | :------ | :------------------------- |
| `oldProposalThreshold` | uint256 | The old proposal threshold |
| `newProposalThreshold` | uint256 | The new proposal threshold |

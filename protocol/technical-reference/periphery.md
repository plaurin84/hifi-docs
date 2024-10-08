---
id: periphery
title: Periphery
sidebar_position: 4
---

# Periphery

The Hifi protocol is architected such that every function does one job and job only. In software engineering
parlance, this practice is called separation of concerns, a design principle which makes it easier to reason about how the
protocol behaves. Most importantly, it gives the protocol better security guarantees.

Modularization comes with a cost, though. It forces us to "compose" multiple contract calls, if we wish to provide a
good user experience in our user interface. This is where [DSProxy](https://github.com/dapphub/ds-proxy) comes into play -
a smart contract wallet designed to address this need.

For brevity, we won't expound on the technical properties of DSProxy here. You can refer to this
[guide](https://ethereum.stackexchange.com/questions/90303/what-is-dsproxy-and-how-does-it-work) for a detailed explanation. In short:

1. DSProxy is a smart contract wallet.
2. There is a so-called "target contract" that contains composite scripts, toward which the DSProxy delegate calls.

Is it the target contract that is documented herein.

## Functions

### borrowHTokenAndBuyUnderlying

```solidity
function borrowHTokenAndBuyUnderlying(
    contract IBalanceSheetV2 balanceSheet,
    contract IHifiPool hifiPool,
    uint256 maxBorrowAmount,
    uint256 underlyingOut
) external
```

Borrows hTokens and buys underlying.

Emits a {BorrowHTokenAndBuyUnderlying} event.

#### Parameters

| Name              | Type                     | Description                                                                         |
| :---------------- | :----------------------- | :---------------------------------------------------------------------------------- |
| `balanceSheet`    | contract IBalanceSheetV2 | The address of the BalanceSheet contract.                                           |
| `hifiPool`        | contract IHifiPool       | The address of the HifiPool contract.                                               |
| `maxBorrowAmount` | uint256                  | The amount of hTokens to borrow and the max amount that the user is willing to pay. |
| `underlyingOut`   | uint256                  | The exact amount of underlying that the user wants to buy.                          |

### buyHTokenAndRepayBorrow

```solidity
function buyHTokenAndRepayBorrow(
    contract IHifiPool hifiPool,
    contract IBalanceSheetV2 balanceSheet,
    uint256 maxUnderlyingIn,
    uint256 hTokenOut
) external
```

Buys hTokens with underlying and repays the borrow.

Requirements:

- The caller must have allowed the DSProxy to spend `maxUnderlyingIn` tokens.

#### Parameters

| Name              | Type                     | Description                                                                                 |
| :---------------- | :----------------------- | :------------------------------------------------------------------------------------------ |
| `hifiPool`        | contract IHifiPool       | The address of the HifiPool contract.                                                       |
| `balanceSheet`    | contract IBalanceSheetV2 | The address of the BalanceSheet contract.                                                   |
| `maxUnderlyingIn` | uint256                  | The maximum amount of underlying that the user is willing to pay.                           |
| `hTokenOut`       | uint256                  | The exact amount of hTokens to buy and the amount to repay and the maximum amount to repay. |

### buyHTokenAndRepayBorrowWithSignature

```solidity
function buyHTokenAndRepayBorrowWithSignature(
    contract IHifiPool hifiPool,
    contract IBalanceSheetV2 balanceSheet,
    uint256 maxUnderlyingIn,
    uint256 hTokenOut,
    uint256 deadline,
    bytes signatureUnderlying
) external
```

Buys hTokens with underlying and repays the borrow.

Requirements:

- The `signature` must be a valid signed approval given by the caller to the DSProxy to spend `maxUnderlyingIn`
  tokens for the given `deadline` and the caller's current nonce.

#### Parameters

| Name                  | Type                     | Description                                                                                 |
| :-------------------- | :----------------------- | :------------------------------------------------------------------------------------------ |
| `hifiPool`            | contract IHifiPool       | The address of the HifiPool contract.                                                       |
| `balanceSheet`        | contract IBalanceSheetV2 | The address of the BalanceSheet contract.                                                   |
| `maxUnderlyingIn`     | uint256                  | The maximum amount of underlying that the user is willing to pay.                           |
| `hTokenOut`           | uint256                  | The exact amount of hTokens to buy and the amount to repay and the maximum amount to repay. |
| `deadline`            | uint256                  | The deadline beyond which the signature is not valid anymore.                               |
| `signatureUnderlying` | bytes                    | The packed signature for the underlying.                                                    |

### depositCollateral

```solidity
function depositCollateral(
    contract IBalanceSheetV2 balanceSheet,
    contract IErc20 collateral,
    uint256 depositAmount
) external
```

Deposits collateral into the vault.

Requirements:

- The caller must have allowed the DSProxy to spend `collateralAmount` tokens.

#### Parameters

| Name            | Type                     | Description                               |
| :-------------- | :----------------------- | :---------------------------------------- |
| `balanceSheet`  | contract IBalanceSheetV2 | The address of the BalanceSheet contract. |
| `collateral`    | contract IErc20          | The address of the collateral contract.   |
| `depositAmount` | uint256                  | The amount of collateral to deposit.      |

### depositCollateralWithSignature

```solidity
function depositCollateralWithSignature(
    contract IBalanceSheetV2 balanceSheet,
    contract IErc20Permit collateral,
    uint256 depositAmount,
    uint256 deadline,
    bytes signatureCollateral
) external
```

Deposits collateral into the vault using EIP-2612 signatures.

Requirements:

- The `signature` must be a valid signed approval given by the caller to the DSProxy to spend
  `depositAmount` tokens for the given `deadline` and the caller's current nonce.

#### Parameters

| Name                  | Type                     | Description                                                   |
| :-------------------- | :----------------------- | :------------------------------------------------------------ |
| `balanceSheet`        | contract IBalanceSheetV2 | The address of the BalanceSheet contract.                     |
| `collateral`          | contract IErc20Permit    | The address of the collateral contract.                       |
| `depositAmount`       | uint256                  | The amount of collateral to deposit.                          |
| `deadline`            | uint256                  | The deadline beyond which the signature is not valid anymore. |
| `signatureCollateral` | bytes                    | The packed signature for the collateral.                      |

### depositUnderlyingAndMintHTokenAndAddLiquidity

```solidity
function depositUnderlyingAndMintHTokenAndAddLiquidity(
    contract IHifiPool hifiPool,
    uint256 depositAmount,
    uint256 underlyingOffered
) external
```

Deposits underlying in the HToken contract to mint hTokens, and adds liquidity to the AMM.

Requirements:

- The caller must have allowed the DSProxy to spend `depositAmount + underlyingOffered` tokens.

#### Parameters

| Name                | Type               | Description                                                               |
| :------------------ | :----------------- | :------------------------------------------------------------------------ |
| `hifiPool`          | contract IHifiPool | The address of the HifiPool contract.                                     |
| `depositAmount`     | uint256            | The amount of underlying to deposit to mint equivalent amount of hTokens. |
| `underlyingOffered` | uint256            | The amount of underlying to invest.                                       |

### depositUnderlyingAndMintHTokenAndAddLiquidityWithSignature

```solidity
function depositUnderlyingAndMintHTokenAndAddLiquidityWithSignature(
    contract IHifiPool hifiPool,
    uint256 depositAmount,
    uint256 underlyingOffered,
    uint256 deadline,
    bytes signatureUnderlying
) external
```

Deposits underlying in the HToken contract to mint hTokens, and adds liquidity to the AMM using
EIP-2612 signatures.

Requirements:

- The `signature` must be a valid signed approval given by the caller to the DSProxy to spend
  `depositAmount + underlyingOffered` for the given `deadline` and the caller's current nonce.

#### Parameters

| Name                  | Type               | Description                                                               |
| :-------------------- | :----------------- | :------------------------------------------------------------------------ |
| `hifiPool`            | contract IHifiPool | The address of the HifiPool contract.                                     |
| `depositAmount`       | uint256            | The amount of underlying to deposit to mint equivalent amount of hTokens. |
| `underlyingOffered`   | uint256            | The amount of underlying to invest.                                       |
| `deadline`            | uint256            | The deadline beyond which the signature is not valid anymore.             |
| `signatureUnderlying` | bytes              | The packed signature for the underlying.                                  |

### depositUnderlyingAndRepayBorrow

```solidity
function depositUnderlyingAndRepayBorrow(
    contract IHToken hToken,
    contract IBalanceSheetV2 balanceSheet,
    uint256 underlyingAmount
) external
```

Deposits underlying in the HToken contract to mint hTokens, and repays the borrow.

Requirements:

- The caller must have allowed the DSProxy to spend `underlyingAmount` tokens.

#### Parameters

| Name               | Type                     | Description                               |
| :----------------- | :----------------------- | :---------------------------------------- |
| `hToken`           | contract IHToken         | The address of the HToken contract.       |
| `balanceSheet`     | contract IBalanceSheetV2 | The address of the BalanceSheet contract. |
| `underlyingAmount` | uint256                  | The amount of underlying to deposit.      |

### depositUnderlyingAndRepayBorrowWithSignature

```solidity
function depositUnderlyingAndRepayBorrowWithSignature(
    contract IHToken hToken,
    contract IBalanceSheetV2 balanceSheet,
    uint256 underlyingAmount,
    uint256 deadline,
    bytes signatureUnderlying
) external
```

Supplies underlying to mint hTokens and repay the hToken borrow using EIP-2612 signatures.

Requirements:

- The `signature` must be a valid signed approval given by the caller to the DSProxy to spend `underlyingAmount`
  for the given `deadline` and the caller's current nonce.

#### Parameters

| Name                  | Type                     | Description                                                   |
| :-------------------- | :----------------------- | :------------------------------------------------------------ |
| `hToken`              | contract IHToken         | The address of the HToken contract.                           |
| `balanceSheet`        | contract IBalanceSheetV2 | The address of the BalanceSheet contract.                     |
| `underlyingAmount`    | uint256                  | The amount of underlying to supply.                           |
| `deadline`            | uint256                  | The deadline beyond which the signature is not valid anymore. |
| `signatureUnderlying` | bytes                    | The packed signature for the underlying.                      |

### redeem

```solidity
function redeem(
    contract IHToken hToken,
    uint256 hTokenAmount,
    uint256 underlyingAmount
) external
```

Redeems the underlying in exchange for hTokens.

Requirements:

- The caller must have allowed the DSProxy to spend `hTokenAmount` hTokens.

#### Parameters

| Name               | Type             | Description                         |
| :----------------- | :--------------- | :---------------------------------- |
| `hToken`           | contract IHToken | The address of the HToken contract. |
| `hTokenAmount`     | uint256          | The amount of hTokens to provide.   |
| `underlyingAmount` | uint256          | The amount of underlying to redeem. |

### redeemWithSignature

```solidity
function redeemWithSignature(
    contract IHToken hToken,
    uint256 hTokenAmount,
    uint256 underlyingAmount,
    uint256 deadline,
    bytes signatureHToken
) external
```

Redeems hTokens for underlying using EIP-2612 signatures.

Requirements:

- The `signature` must be a valid signed approval given by the caller to the DSProxy to spend `hTokenAmount`
  for the given `deadline` and the caller's current nonce.

#### Parameters

| Name               | Type             | Description                                                   |
| :----------------- | :--------------- | :------------------------------------------------------------ |
| `hToken`           | contract IHToken | The address of the HToken contract.                           |
| `hTokenAmount`     | uint256          | The amount of hTokens to redeem.                              |
| `underlyingAmount` | uint256          | The amount of underlying to redeem.                           |
| `deadline`         | uint256          | The deadline beyond which the signature is not valid anymore. |
| `signatureHToken`  | bytes            | The packed signature for hToken.                              |

### removeLiquidity

```solidity
function removeLiquidity(
    contract IHifiPool hifiPool,
    uint256 poolTokensBurned
) external
```

Removes liquidity from the AMM.

Requirements:

- The caller must have allowed the DSProxy to spend `poolTokensBurned` tokens.

#### Parameters

| Name               | Type               | Description                           |
| :----------------- | :----------------- | :------------------------------------ |
| `hifiPool`         | contract IHifiPool | The address of the HifiPool contract. |
| `poolTokensBurned` | uint256            | The amount of LP tokens to burn.      |

### removeLiquidityAndRedeem

```solidity
function removeLiquidityAndRedeem(
    contract IHifiPool hifiPool,
    uint256 poolTokensBurned
) external
```

Removes liquidity from the AMM and redeems underlying in exchange for all hTokens
retrieved from the AMM.

Requirements:

- The caller must have allowed the DSProxy to spend `poolTokensBurned` tokens.

#### Parameters

| Name               | Type               | Description                           |
| :----------------- | :----------------- | :------------------------------------ |
| `hifiPool`         | contract IHifiPool | The address of the HifiPool contract. |
| `poolTokensBurned` | uint256            | The amount of LP tokens to burn.      |

### removeLiquidityAndRedeemWithSignature

```solidity
function removeLiquidityAndRedeemWithSignature(
    contract IHifiPool hifiPool,
    uint256 poolTokensBurned,
    uint256 deadline,
    bytes signatureLPToken
) external
```

Removes liquidity from the AMM, and redeems all hTokens for the underlying using EIP-2612 signatures.

Requirements:

- The `signature` must be a valid signed approval given by the caller to the DSProxy to spend `poolTokensBurned`
  for the given `deadline` and the caller's current nonce.

#### Parameters

| Name               | Type               | Description                                                   |
| :----------------- | :----------------- | :------------------------------------------------------------ |
| `hifiPool`         | contract IHifiPool | The address of the HifiPool contract.                         |
| `poolTokensBurned` | uint256            | The amount of LP tokens to burn.                              |
| `deadline`         | uint256            | The deadline beyond which the signature is not valid anymore. |
| `signatureLPToken` | bytes              | The packed signature for LP tokens.                           |

### removeLiquidityAndWithdrawUnderlying

```solidity
function removeLiquidityAndWithdrawUnderlying(
    contract IHifiPool hifiPool,
    uint256 poolTokensBurned,
    uint256 withdrawAmount
) external
```

Removes liquidity from the AMM, and withdraws underlying in exchange for hTokens.

Requirements:

- The caller must have allowed the DSProxy to spend `poolTokensBurned` tokens.
- Can only be called before maturation.

#### Parameters

| Name               | Type               | Description                                                   |
| :----------------- | :----------------- | :------------------------------------------------------------ |
| `hifiPool`         | contract IHifiPool | The address of the HifiPool contract.                         |
| `poolTokensBurned` | uint256            | The amount of LP tokens to burn.                              |
| `withdrawAmount`   | uint256            | The amount of underlying to withdraw in exchange for hTokens. |

### removeLiquidityAndWithdrawUnderlyingWithSignature

```solidity
function removeLiquidityAndWithdrawUnderlyingWithSignature(
    contract IHifiPool hifiPool,
    uint256 poolTokensBurned,
    uint256 withdrawAmount,
    uint256 deadline,
    bytes signatureLPToken
) external
```

Removes liquidity from the AMM, and withdraws underlying in exchange for hTokens
using EIP-2612 signatures.

Requirements:

- The `signature` must be a valid signed approval given by the caller to the DSProxy to spend `poolTokensBurned`
  for the given `deadline` and the caller's current nonce.

#### Parameters

| Name               | Type               | Description                                                   |
| :----------------- | :----------------- | :------------------------------------------------------------ |
| `hifiPool`         | contract IHifiPool | The address of the HifiPool contract.                         |
| `poolTokensBurned` | uint256            | The amount of LP tokens to burn.                              |
| `withdrawAmount`   | uint256            | The amount of underlying to withdraw in exchange for hTokens. |
| `deadline`         | uint256            | The deadline beyond which the signature is not valid anymore. |
| `signatureLPToken` | bytes              | The packed signature for LP tokens.                           |

### removeLiquidityWithSignature

```solidity
function removeLiquidityWithSignature(
    contract IHifiPool hifiPool,
    uint256 poolTokensBurned,
    uint256 deadline,
    bytes signatureLPToken
) external
```

Removes liquidity from the AMM using EIP-2612 signatures.

Requirements:

- The `signature` must be a valid signed approval given by the caller to the DSProxy to spend `poolTokensBurned`
  for the given `deadline` and the caller's current nonce.

#### Parameters

| Name               | Type               | Description                                                   |
| :----------------- | :----------------- | :------------------------------------------------------------ |
| `hifiPool`         | contract IHifiPool | The address of the HifiPool contract.                         |
| `poolTokensBurned` | uint256            | The amount of LP tokens to burn.                              |
| `deadline`         | uint256            | The deadline beyond which the signature is not valid anymore. |
| `signatureLPToken` | bytes              | The packed signature for LP tokens.                           |

### sellHToken

```solidity
function sellHToken(
    contract IHifiPool hifiPool,
    uint256 hTokenIn,
    uint256 minUnderlyingOut
) external
```

Sells hTokens for underlying.

Requirements:

- The caller must have allowed DSProxy to spend `hTokenIn` tokens.

#### Parameters

| Name               | Type               | Description                                                          |
| :----------------- | :----------------- | :------------------------------------------------------------------- |
| `hifiPool`         | contract IHifiPool | The address of the HifiPool contract.                                |
| `hTokenIn`         | uint256            | The exact amount of hTokens that the user wants to sell.             |
| `minUnderlyingOut` | uint256            | The minimum amount of underlying that the user is willing to accept. |

### sellHTokenWithSignature

```solidity
function sellHTokenWithSignature(
    contract IHifiPool hifiPool,
    uint256 hTokenIn,
    uint256 minUnderlyingOut,
    uint256 deadline,
    bytes signatureHToken
) external
```

Sells hTokens for underlying using EIP-2612 signatures.

Requirements:

- The `signature` must be a valid signed approval given by the caller to the DSProxy to spend `hTokenIn`
  hTokens for the given `deadline` and the caller's current nonce.

#### Parameters

| Name               | Type               | Description                                                          |
| :----------------- | :----------------- | :------------------------------------------------------------------- |
| `hifiPool`         | contract IHifiPool | The address of the HifiPool contract.                                |
| `hTokenIn`         | uint256            | The exact amount of hTokens that the user wants to sell.             |
| `minUnderlyingOut` | uint256            | The minimum amount of underlying that the user is willing to accept. |
| `deadline`         | uint256            | The deadline beyond which the signature is not valid anymore.        |
| `signatureHToken`  | bytes              | The packed signature for HTokens.                                    |

### sellUnderlying

```solidity
function sellUnderlying(
    contract IHifiPool hifiPool,
    uint256 underlyingIn,
    uint256 minHTokenOut
) external
```

Sells underlying for hTokens.

Requirements:

- The caller must have allowed DSProxy to spend `underlyingIn` tokens.

#### Parameters

| Name           | Type               | Description                                                       |
| :------------- | :----------------- | :---------------------------------------------------------------- |
| `hifiPool`     | contract IHifiPool | The address of the HifiPool contract.                             |
| `underlyingIn` | uint256            | The exact amount of underlying that the user wants to sell.       |
| `minHTokenOut` | uint256            | The minimum amount of hTokens that the user is willing to accept. |

### sellUnderlyingAndRepayBorrow

```solidity
function sellUnderlyingAndRepayBorrow(
    contract IHifiPool hifiPool,
    contract IBalanceSheetV2 balanceSheet,
    uint256 underlyingIn,
    uint256 minHTokenOut
) external
```

Sells underlying for hTokens, then uses them to repay the hToken borrow.

Requirements:

- The caller must have allowed the DSProxy to spend `underlyingIn` tokens.

#### Parameters

| Name             | Type                     | Description                                                                      |
| :--------------- | :----------------------- | :------------------------------------------------------------------------------- |
| `hifiPool`       | contract IHifiPool       | The address of the HifiPool contract.                                            |
| `balanceSheet`   | contract IBalanceSheetV2 | The address of the BalanceSheet contract.                                        |
| `underlyingIn`   | uint256                  | The exact amount of underlying that the user wants to sell.                      |
| `minHTokenOut`   | uint256                  | The minimum amount of hTokens that the user is willing to accept and the maximum |
| amount to repay. |

### sellUnderlyingAndRepayBorrowWithSignature

```solidity
function sellUnderlyingAndRepayBorrowWithSignature(
    contract IHifiPool hifiPool,
    contract IBalanceSheetV2 balanceSheet,
    uint256 underlyingIn,
    uint256 minHTokenOut,
    uint256 deadline,
    bytes signatureUnderlying
) external
```

Sells underlying for hTokens, then uses them to repay the hToken borrow using EIP-2612 signatures.

Requirements:

- The `signature` must be a valid signed approval given by the caller to the DSProxy to spend `underlyingIn`
  for the given `deadline` and the caller's current nonce.

#### Parameters

| Name                  | Type                     | Description                                                                      |
| :-------------------- | :----------------------- | :------------------------------------------------------------------------------- |
| `hifiPool`            | contract IHifiPool       | The address of the HifiPool contract.                                            |
| `balanceSheet`        | contract IBalanceSheetV2 | The address of the BalanceSheet contract.                                        |
| `underlyingIn`        | uint256                  | The exact amount of underlying that the user wants to sell.                      |
| `minHTokenOut`        | uint256                  | The minimum amount of hTokens that the user is willing to accept and the maximum |
| amount to repay.      |
| `deadline`            | uint256                  | The deadline beyond which the signature is not valid anymore.                    |
| `signatureUnderlying` | bytes                    | The packed signature for the underlying.                                         |

### sellUnderlyingWithSignature

```solidity
function sellUnderlyingWithSignature(
    contract IHifiPool hifiPool,
    uint256 underlyingIn,
    uint256 minHTokenOut,
    uint256 deadline,
    bytes signatureUnderlying
) external
```

Sells underlying for hTokens using EIP-2612 signatures.

Requirements:

- The `signature` must be a valid signed approval given by the caller to the DSProxy to spend `underlyingIn`
  for the given `deadline` and the caller's current nonce.

#### Parameters

| Name                  | Type               | Description                                                       |
| :-------------------- | :----------------- | :---------------------------------------------------------------- |
| `hifiPool`            | contract IHifiPool | The address of the HifiPool contract.                             |
| `underlyingIn`        | uint256            | The exact amount of underlying that the user wants to sell.       |
| `minHTokenOut`        | uint256            | The minimum amount of hTokens that the user is willing to accept. |
| `deadline`            | uint256            | The deadline beyond which the signature is not valid anymore.     |
| `signatureUnderlying` | bytes              | The packed signature for the underlying.                          |

### withdrawCollateral

```solidity
function withdrawCollateral(
    contract IBalanceSheetV2 balanceSheet,
    contract IErc20 collateral,
    uint256 withdrawAmount
) external
```

Withdraws collateral from the vault.

#### Parameters

| Name             | Type                     | Description                               |
| :--------------- | :----------------------- | :---------------------------------------- |
| `balanceSheet`   | contract IBalanceSheetV2 | The address of the BalanceSheet contract. |
| `collateral`     | contract IErc20          | The address of the collateral contract.   |
| `withdrawAmount` | uint256                  | The amount of collateral to withdraw.     |

### wrapEthAndDepositCollateral

```solidity
function wrapEthAndDepositCollateral(
    contract WethInterface weth,
    contract IBalanceSheetV2 balanceSheet
) external
```

Wraps ETH into WETH and makes a collateral deposit in the BalanceSheet contract.

This is a payable function so it can receive ETH transfers.

#### Parameters

| Name           | Type                     | Description                               |
| :------------- | :----------------------- | :---------------------------------------- |
| `weth`         | contract WethInterface   | The address of the WETH contract.         |
| `balanceSheet` | contract IBalanceSheetV2 | The address of the BalanceSheet contract. |

### withdrawCollateralAndUnwrapWeth

```solidity
function withdrawCollateralAndUnwrapWeth(
    contract WethInterface weth,
    contract IBalanceSheetV2 balanceSheet,
    uint256 withdrawAmount
) external
```

Withdraws WETH from the vault and unwraps it into ETH.

#### Parameters

| Name             | Type                     | Description                               |
| :--------------- | :----------------------- | :---------------------------------------- |
| `weth`           | contract WethInterface   | The address of the WETH contract.         |
| `balanceSheet`   | contract IBalanceSheetV2 | The address of the BalanceSheet contract. |
| `withdrawAmount` | uint256                  | The amount of WETH to withdraw.           |

## Events

### BorrowHTokenAndBuyUnderlying

```solidity
event BorrowHTokenAndBuyUnderlying(
    address borrower,
    uint256 borrowAmount,
    uint256 underlyingAmount
)
```

Emitted when hTokens are borrowed and used to buy underlying.

#### Parameters

| Name               | Type    | Description                              |
| :----------------- | :------ | :--------------------------------------- |
| `borrower`         | address | The address of the borrower.             |
| `borrowAmount`     | uint256 | The amount of hTokens borrowed and sold. |
| `underlyingAmount` | uint256 | The amount of underlying bought.         |

## Custom Errors

### HifiProxyTarget\_\_AddLiquidityHTokenSlippage

```solidity
error HifiProxyTarget__AddLiquidityHTokenSlippage(uint256 expectedHTokenRequired, uint256 actualHTokenRequired)
```

Emitted when the hToken slippage is higher than what the user is willing to tolerate.

### HifiProxyTarget\_\_AddLiquidityUnderlyingSlippage

```solidity
error HifiProxyTarget__AddLiquidityUnderlyingSlippage(uint256 expectedUnderlyingRequired, uint256 actualUnderlyingRequired)
```

Emitted when the underlying slippage is higher than what the user is willing to tolerate.

### HifiProxyTarget\_\_TradeSlippage

```solidity
error HifiProxyTarget__TradeSlippage(uint256 expectedAmount, uint256 actualAmount)
```

Emitted when the slippage is higher than what the user is willing to tolerate.

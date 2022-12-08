import { BigNumber } from 'ethers';

export type MintMethodName = 'vipWhiteListMintBetamon'|'whiteListMintBetamon'|'mintBetamon';
export type ContractResponse = (undefined|boolean|BigNumber|string|string[]);
export type ContractVariablesReturnsBigNum = 'mintPrice'
                            | 'maxBalance'
                            | 'totalSupply'
                            | 'getBalance'
                            | 'MAX_SUPPLY'
                            | 'MAX_VIP_WHITE_LIST_SUPPLY'
                            | 'MAX_WHITE_LIST_SUPPLY';
export type ContractVariablesReturnsBoolean = '_isVipWhiteListSaleActive'
                            | '_isWhiteListSaleActive'
                            | '_isSaleActive';
export type ContractVariablesReturnsString = 'tokenURI'
                            | 'ownerOf';
export type ContractVariablesReturnsVoid = 'safeTransferFrom'
                            | 'transferFrom';
export type ContractVariablesReturnsBigNumArray = 'getBetamonByOwner';
export type ContractVariables = ContractVariablesReturnsBigNum
                            | ContractVariablesReturnsBoolean
                            | ContractVariablesReturnsString
                            | ContractVariablesReturnsVoid
                            | ContractVariablesReturnsBigNumArray;
export type ChainList = 'eth'
                            | '0x1'
                            | 'ropsten'
                            | '0x3'
                            | 'rinkeby'
                            | '0x4'
                            | 'goerli'
                            | '0x5'
                            | 'kovan'
                            | '0x2a'
                            | 'polygon'
                            | '0x89'
                            | 'mumbai'
                            | '0x13881'
                            | 'bsc'
                            | '0x38'
                            | 'bsc testnet'
                            | '0x61'
                            | 'avalanche'
                            | '0xa86a'
                            | 'avalanche testnet'
                            | '0xa869'
                            | 'fantom'
                            | '0xfa';
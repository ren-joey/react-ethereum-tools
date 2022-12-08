import { useEffect, useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import { provider as Provider } from 'web3-core';
import Web3 from 'web3';

const checkIsMetaMaskInstalled = () => {
    if (window.ethereum) return window.ethereum?.isMetaMask;
    return false;
};

const useMetaMask = () => {
    const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(checkIsMetaMaskInstalled());
    const [provider, setProvider] = useState<Provider>(null);
    const [accounts, setAccounts] = useState([]);
    const [chainId, setChainId] = useState<null|number>(null);
    const [web3, setWeb3] = useState<Web3|null>(null);

    const enable = () => {
        detectEthereumProvider().then((newProvider: any) => {
            if (newProvider) {
                newProvider.request({
                    method: 'eth_requestAccounts'
                }).then((accounts: any) => {
                    setAccounts(accounts);
                    setIsMetaMaskInstalled(true);
                    bindListeners(newProvider);
                    setProvider(newProvider as Provider);

                    newProvider.request({
                        method: 'eth_chainId'
                    }).then((chainId: string) => {
                        setChainId(Number(chainId));
                    });
                });
            } else {
                setIsMetaMaskInstalled(false);
            }
        });
    };

    const disable = () => {
        setAccounts([]);
        setProvider(null);
        setWeb3(null);
        setChainId(null);
    };

    const bindListeners = (givenProvider: any) => {
        givenProvider.on('chainChanged', disable);
        givenProvider.on('accountsChanged', disable);
    };

    useEffect(() => {
        if (provider !== null) {
            setWeb3(new Web3(provider as any));
        }
    }, [ provider ]);

    return {
        enable,
        disable,
        provider,
        accounts,
        chainId,
        isMetaMaskInstalled,
        web3
    };
};

export default useMetaMask;
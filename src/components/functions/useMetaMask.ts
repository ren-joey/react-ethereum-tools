import { useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';

interface MetaMaskEthereumProvider {
    isMetaMask?: boolean;
    once(eventName: string | symbol, listener: (...args: any[]) => void): this;
    on(eventName: string | symbol, listener: (...args: any[]) => void): this;
    off(eventName: string | symbol, listener: (...args: any[]) => void): this;
    addListener(eventName: string | symbol, listener: (...args: any[]) => void): this;
    removeListener(eventName: string | symbol, listener: (...args: any[]) => void): this;
    removeAllListeners(event?: string | symbol): this;
    request: any;
}

const checkIsMetaMaskInstalled = () => {
    if (window.ethereum) return window.ethereum?.isMetaMask;
    return false;
};

let provider: (MetaMaskEthereumProvider|null) = null;

const useMetaMask = () => {
    const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(checkIsMetaMaskInstalled());
    const [web3, setWeb3] = useState<null|Web3>(null);
    const [accounts, setAccounts] = useState([]);
    const [chainId, setChainId] = useState<null|number>(null);

    const enable = () => {
        detectEthereumProvider().then((_provider: any) => {
            provider = _provider;

            if (provider) {
                setIsMetaMaskInstalled(true);
                bindListeners(provider);
                const newWeb3 = new Web3(provider as any);
                setWeb3(newWeb3);

                provider.request({
                    method: 'eth_requestAccounts'
                }).then((accounts: any) => {
                    setAccounts(accounts);
                });

                newWeb3.eth.net.getId().then((res) => {
                    if (typeof res === 'number') {
                        setChainId(res);
                    }
                });
            } else {
                setIsMetaMaskInstalled(false);
            }
        }).catch(() => {});
    };

    const disable = () => {
        if (provider) {
            setWeb3(null);
            setAccounts([]);
            setChainId(null);
            clearListeners(provider);
        }
    };

    const bindListeners = (provider: MetaMaskEthereumProvider) => {
        provider.on('chainChanged', disable);
        provider.on('accountsChanged', disable);
    };

    const clearListeners = (provider: MetaMaskEthereumProvider) => {
        provider.removeListener('chainChanged', disable);
        provider.removeListener('accountsChanged', disable);
    };

    return {
        web3,
        enable,
        disable,
        chainId,
        provider,
        accounts,
        isMetaMaskInstalled
    };
};

export default useMetaMask;
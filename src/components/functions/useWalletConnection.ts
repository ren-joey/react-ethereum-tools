import WalletConnectProvider from '@walletconnect/web3-provider';
import { useState } from 'react';
import Web3 from 'web3';

window.localStorage.removeItem('walletconnect');

const walletConnectOptions = {
    infuraId: '34bc680607254406bd06c0a5441eaf97'
};

let provider: (WalletConnectProvider|null) = null;

const useWalletconnect = () => {
    const [web3, setWeb3] = useState<null|Web3>(null);
    const [accounts, setAccounts] = useState<any[]>([]);
    const [chainId, setChainId] = useState<null|number>(null);

    const enable = () => {
        provider = new WalletConnectProvider(walletConnectOptions);

        if (provider) {
            provider.enable().then(() => {
                if (provider) {
                    const newWeb3 = new Web3(provider as any);
                    setWeb3(newWeb3);

                    newWeb3.eth.getAccounts().then((accounts) => {
                        setAccounts(accounts);
                    });

                    newWeb3.eth.net.getId().then((res) => {
                        if (typeof res === 'number') {
                            setChainId(res);
                        }
                    });

                    bindListeners(provider);
                }
            });
        }
    };

    const disable = () => {
        if (provider) {
            provider.disconnect().then(() => {
                window.localStorage.removeItem('walletconnect');
                setWeb3(null);
                setAccounts([]);
                setChainId(null);
                if (provider) {
                    clearListeners(provider);
                    provider = null;
                }
            }).catch(() => {});
        }
    };

    const bindListeners = (provider: WalletConnectProvider) => {
        provider.on('chainChanged', disable);
        provider.on('accountsChanged', disable);
    };

    const clearListeners = (provider: WalletConnectProvider) => {
        provider.off('chainChanged', disable);
        provider.off('accountsChanged', disable);
    };

    return {
        web3,
        enable,
        disable,
        provider,
        accounts,
        chainId
    };
};

export default useWalletconnect;
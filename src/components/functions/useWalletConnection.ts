import WalletConnectProvider from '@walletconnect/web3-provider';
import { useEffect, useState } from 'react';
import Web3 from 'web3';

window.localStorage.removeItem('walletconnect');

const walletConnectOptions = {
    infuraId: '34bc680607254406bd06c0a5441eaf97'
};

let provider: (WalletConnectProvider|null) = null;

const useWalletconnect = () => {
    const [web3, setWeb3] = useState<null|Web3>(null);
    const [accounts, setAccounts] = useState<any[]>([]);

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
        provider,
        web3,
        accounts,
        enable,
        disable
    };
};

export default useWalletconnect;
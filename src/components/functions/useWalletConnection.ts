import WalletConnectProvider from '@walletconnect/web3-provider';
import { useEffect, useState } from 'react';
import Web3 from 'web3';

window.localStorage.removeItem('walletconnect');

const walletConnectOptions = {
    infuraId: '34bc680607254406bd06c0a5441eaf97'
};

const useWalletconnect = () => {
    const [provider, setProvider] = useState<WalletConnectProvider|null>(null);
    const [accounts, setAccounts] = useState<any[]>([]);
    const [chainId, setChainId] = useState<null|number>(null);
    const [web3, setWeb3] = useState<Web3|null>(null);

    const enable = () => {
        const provider = new WalletConnectProvider(walletConnectOptions);

        if (provider) {
            provider.enable().then(() => {
                if (provider) {
                    provider.request({
                        method: 'eth_requestAccounts'
                    }).then((accounts: any) => {
                        setAccounts(accounts);
                        bindListeners(provider);
                        setProvider(provider);

                        provider.request({
                            method: 'eth_chainId'
                        }).then((chainId: string) => {
                            setChainId(Number(chainId));
                        });
                    });

                    bindListeners(provider);
                }
            });
        }
    };

    const disable = () => {
        if (provider) {
            provider.disconnect();
        }
        window.localStorage.removeItem('walletconnect');
        setAccounts([]);
        setChainId(null);
        setWeb3(null);
        setChainId(null);
    };

    const bindListeners = (provider: any) => {
        provider.on('chainChanged', disable);
        provider.on('accountsChanged', disable);
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
        web3
    };
};

export default useWalletconnect;
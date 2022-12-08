import { ResponseType } from 'axios';

interface OpenSeaApi {
    retrieve_events: string;
    retrieve_an_asset: (key: number | string) => string;
}

interface OpenSeaHeader {
    'X-API-KEY'?: string;
    Accept: string
}

interface OpenSeaConfig {
    url: OpenSeaApi,
    header: OpenSeaHeader,
    responseType: ResponseType
}

const openSeaConfigGetter = (
    chainId: number,
    address: string
): OpenSeaConfig => {
    return chainId === 1 ? {
        url: {
            retrieve_events: 'https://api.opensea.io/api/v1/events',
            retrieve_an_asset: (i: number|string) => `https://api.opensea.io/api/v1/asset/${address}/${i}`
        },
        header: {
            'X-API-KEY': '41be6f2c49714847a27780d6027f5421',
            Accept: 'application/json'
        },
        responseType: 'json'
    } : {
        url: {
            retrieve_events: 'https://testnets-api.opensea.io/api/v1/events',
            retrieve_an_asset: (i: number|string) => `https://testnets-api.opensea.io/api/v1/asset/${address}/${i}`
        },
        header: {
            // 'X-API-KEY': '41be6f2c49714847a27780d6027f5421',
            Accept: 'application/json'
        },
        responseType: 'json'
    };
};

export default openSeaConfigGetter;
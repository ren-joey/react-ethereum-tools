import axios from 'axios';
import { OpenSeaApiName } from 'src/@types/openseaApi';
import apiUrlGetter from './openSeaApiUrlGetter';
import openSeaConfigGetter from 'src/components/openseaApis/openSeaConfigGetter';

function openSeaApiAxiosGetter<T> (
    apiName: OpenSeaApiName,
    address: string,
    chainId: number,
    tokenId?: number
) {
    let api = undefined;
    const method = 'GET';
    const openSeaConfig = openSeaConfigGetter(chainId, address);
    if (
        (apiName === 'retrieve_an_asset' && tokenId)
        || apiName === 'retrieve_events'
    ) {
        const url = apiUrlGetter(
            apiName,
            address,
            chainId,
            tokenId
        ).toString();

        api = axios.request<T>({
            method,
            url,
            headers: {
                ...openSeaConfig.header
            },
            responseType: openSeaConfig.responseType
        });

        api.then(console.log);
    } else {
        throw new Error('unexpected input');
    }

    return api;
}

export default openSeaApiAxiosGetter;
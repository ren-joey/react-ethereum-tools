import { OpenSeaApiName } from 'src/@types/openseaApi';
import openSeaConfigGetter from 'src/components/openseaApis/openSeaConfigGetter';

const openSeaApiUrlGetter = (
    apiName: OpenSeaApiName,
    address: string,
    chainId: number,
    tokenId?: number
) => {
    let url = undefined;
    const openSeaConfig = openSeaConfigGetter(chainId, address);

    if (apiName === 'retrieve_an_asset' && tokenId) {
        url = new URL(openSeaConfig.url.retrieve_an_asset(tokenId));
        url.searchParams.set('force_update', 'true');
    } else if (apiName === 'retrieve_events') {
        url = new URL(openSeaConfig.url.retrieve_events);
        url.searchParams.set('asset_contract_address', address);
        if (tokenId) url.searchParams.set('token_id', tokenId.toString());
    } else {
        throw new Error('unexpected input');
    }

    return url;
};

export default openSeaApiUrlGetter;
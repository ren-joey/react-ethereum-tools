import { Button, Chip, TextField } from '@mui/material';
import { AxiosResponse } from 'axios';
import { stat } from 'fs';
import { useReducer } from 'react';
import { useState } from 'react';
import { OpenSeaAsset } from 'src/@types/openseaApi';
import sleepHelper from '../../utils/basic/sleepHelper';
import openSeaApiAxiosGetter from '../openseaApis/openSeaApiAxiosGetter';

interface TokenRange {
    start: number,
    end: number
}
interface TokenRangeAction {
    start?: number
    end?: number
}
const initRange: TokenRange = { start: 1, end: 880 };
const reducer = (state: TokenRange, action: TokenRangeAction): TokenRange => {
    if (action.start) {
        if (action.start > state.end) {
            if (action.start > 880) action.start = 880;
            return { start: action.start, end: action.start };
        }
        return { start: action.start, end: state.end };
    } else if (action.end) {
        if (action.end > 880) action.end = 880;
        if (action.end < state.start) return { start: action.end, end: action.end };
        return { start: state.start, end: action.end };
    }
    return { start: state.start, end: state.end };
};

const FetchNftAssetFromOpenSea = ({
    chainId,
    address
}: {
    chainId: number,
    address: string
}) => {
    const [fetching, setFetching] = useState(false);
    const [nfts, setNfts] = useState<OpenSeaAsset[]>([]);
    const [tokenRange, setTokenRange] = useReducer(reducer, initRange);

    const fetchAllNftsFromOpenSea = async (
        start: number,
        end: number
    ) => {
        if (fetching) return;
        else setFetching(true);

        const jump = chainId === 1 ? 2 : 1;
        for (let i = start; i <= end; i += jump) {
            const promises: Promise<AxiosResponse<OpenSeaAsset>>[] = [];

            for (let j = 0; j < jump; j += 1) {
                promises.push(
                    openSeaApiAxiosGetter<
                        OpenSeaAsset
                    >(
                        'retrieve_an_asset',
                        address,
                        chainId,
                        i + j
                    )
                );
            }

            const results = await Promise.all(promises);
            if (results.length > 0) {
                for (let i = 0; i < results.length; i += 1) {
                    setNfts((arr) => [...arr, results[i].data]);
                }
            }

            await sleepHelper(chainId === 1 ? 250 : 1000);
        }

        setFetching(false);
    };

    return (
        <div>
            <div style={{ display: 'flex', margin: '1rem 0' }}>
                <TextField
                    style={{ marginRight: '0.5rem' }}
                    label="Token Start"
                    variant="outlined"
                    size="small"
                    value={tokenRange.start}
                    type="number"
                    onChange={(e) => {
                        const val = Number(e.target.value);
                        setTokenRange({ start: val });
                    }}
                    sx={{
                        width: 'auto',
                        flex: '1'
                    }}
                />
                <TextField
                    style={{ marginRight: '0.5rem' }}
                    label="Token End"
                    variant="outlined"
                    size="small"
                    value={tokenRange.end}
                    type="number"
                    onChange={(e) => {
                        const val = Number(e.target.value);
                        setTokenRange({ end: val });
                    }}
                    sx={{
                        width: 'auto',
                        flex: '1'
                    }}
                />
                <Button
                    variant="contained"
                    disabled={fetching}
                    onClick={() => fetchAllNftsFromOpenSea(
                        tokenRange.start,
                        tokenRange.end
                    )}
                >
                    更新 Opensea
                </Button>
            </div>

            { nfts.length > 0 && (
                <>
                    <div>Results</div>
                    <div>
                        {
                            nfts.map((nft) => (
                                <div
                                    style={{ marginBottom: '0.5rem' }}
                                    key={`${nft.id}_${nft.token_id}`}
                                >
                                    <Chip
                                        style={{ marginRight: '0.5rem' }}
                                        label={`ID ${nft.token_id}`}
                                        variant="outlined"
                                        size="small"
                                    />
                                    <Chip
                                        style={{ marginRight: '0.5rem' }}
                                        label={nft.name}
                                        variant="outlined"
                                        size="small"
                                    />
                                    {
                                        nft.last_sale?.event_timestamp
                                && <div>{nft.last_sale?.event_timestamp}</div>
                                    }
                                    {
                                        nft.last_sale?.transaction.from_account.address
                                && <div>{nft.last_sale?.transaction.from_account.address}</div>
                                    }
                                    {
                                        nft.owner?.address
                                && <div>{nft.owner?.address}</div>
                                    }
                                    <a
                                        href={nft.token_metadata}
                                        target="_blank"
                                        rel="noreferrer"
                                    >{ nft.token_metadata }
                                    </a>
                                </div>
                            ))
                        }
                    </div>
                </>
            )}

            {
                fetching && <div className="alert-loading-icon"></div>
            }
        </div>
    );
};

export default FetchNftAssetFromOpenSea;
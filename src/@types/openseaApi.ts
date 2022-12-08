/**
 * OpenSea API Reference
 * https://docs.opensea.io/reference/retrieving-a-single-asset
 */

import { Nullable, NullableBasicType, NullableString } from "./basicVariable";

export type OpenSeaApiName = 'retrieve_events' | 'retrieve_an_asset';

type OpenSeaTraitDisplayType = null | 'number' | 'boost_number' | 'boost_percentage';

interface OpenSeaNftContract {
    address: string;
    asset_contract_type: string;
    created_date: string;
    name: string;
    nft_version: string;
    opensea_version: Nullable;
    owner: number;
    schema_name: string;
    symbol: string;
    total_supply: NullableString;
    description: string;
    external_link: string;
    image_url: string;
    default_to_fiat: boolean;
    dev_buyer_fee_basis_points: number;
    dev_seller_fee_basis_points: any;
    only_proxied_transfers: boolean;
    opensea_buyer_fee_basis_points: number;
    opensea_seller_fee_basis_points: number;
    buyer_fee_basis_points: number;
    seller_fee_basis_points: number;
    payout_address: NullableString
}

interface OpenSeaPaymentToken {
    id: number;
    symbol: string;
    address: string;
    image_url: string;
    name: string;
    decimals: Nullable;
    eth_price: string;
    usd_price: string;
}

interface OpenSeaPrimaryAssetContract {
    address: string;
    asset_contract_type: string;
    created_date: string;
    name: string;
    nft_version: string;
    opensea_version: NullableString;
    owner: Nullable;
    schema_name: string;
    symbol: string;
    total_supply: NullableString;
    description: string;
    external_link: string;
    image_url: string;
    default_to_fiat: boolean;
    dev_buyer_fee_basis_points: number;
    dev_seller_fee_basis_points: any;
    only_proxied_transfers: boolean;
    opensea_buyer_fee_basis_points: number;
    opensea_seller_fee_basis_points: number;
    buyer_fee_basis_points: number;
    seller_fee_basis_points: number;
    payout_address: NullableString
}

interface OpenSeaCollectionState {
    one_day_volume: number;
    one_day_change: number;
    one_day_sales: number;
    one_day_average_price: number;
    seven_day_volume: number;
    seven_day_change: number;
    seven_day_sales: number;
    seven_day_average_price: number;
    thirty_day_volume: number;
    thirty_day_change: number;
    thirty_day_sales: number;
    thirty_day_average_price: number;
    total_volume: number;
    total_sales: number;
    total_supply: number;
    count: number;
    num_owners: number;
    average_price: number;
    num_reports: number;
    market_cap: number;
    floor_price: number;
}

interface OpenSeaCollectionDisplayData {
    card_display_style: string
}

interface OpenSeaNftCollection {
    payment_tokens: OpenSeaPaymentToken[];
    primary_asset_contracts: OpenSeaPrimaryAssetContract[];
    traits: any;
    stats: OpenSeaCollectionState;
    banner_image_url: string;
    chat_url: NullableString;
    created_date: string;
    default_to_fiat: boolean;
    description: string;
    dev_buyer_fee_basis_points: string;
    dev_seller_fee_basis_points: any;
    discord_url: string;
    display_data: OpenSeaCollectionDisplayData;
    external_url: string;
    featured: boolean;
    featured_image_url: string;
    hidden: boolean;
    safelist_request_status: string;
    image_url: string;
    is_subject_to_whitelist: boolean;
    large_image_url: string;
    medium_username: NullableString;
    name: string;
    only_proxied_transfers: boolean;
    opensea_buyer_fee_basis_points: string;
    opensea_seller_fee_basis_points: string;
    payout_address: NullableString;
    require_email: boolean;
    short_description: NullableString;
    slug: string;
    telegram_url: NullableString;
    twitter_username: string;
    instagram_username: NullableString;
    wiki_url: NullableString;
    is_nsfw: boolean
}

interface OpenSeaAccountUsername {
    username: string
}

interface OpenSeaAccountInformation {
    user: null | OpenSeaAccountUsername;
    profile_img_url: string;
    address: string;
    config: string;
}

interface OpenSeaNftTraits {
    trait_type: string;
    value: NullableBasicType;
    display_type: OpenSeaTraitDisplayType;
    max_value: Nullable;
    trait_count: number;
    order: NullableBasicType
}

interface OpenSeaTransaction {
    block_hash: string;
    block_number: string;
    from_account: OpenSeaAccountInformation;
    id: number;
    timestamp: string;
    to_account: OpenSeaAccountInformation;
    transaction_hash: string;
    transaction_index: string;
}

interface OpenSeaSaleAsset {
    decimals: number;
    token_id: string;
}

interface OpenSeaSaleInformation {
    asset: OpenSeaSaleAsset;
    asset_bundle: NullableString;
    event_type: string;
    event_timestamp: string;
    auction_type: NullableString;
    total_price: NullableString;
    payment_token: OpenSeaPaymentToken;
    transaction: OpenSeaTransaction;
    created_date: string;
    quantity: string;
}

interface OpenSeaOwnership {
    owner: OpenSeaAccountInformation;
    quantity: string
}

export interface OpenSeaAsset {
    id: number;
    num_sales: number;
    background_color: NullableString;
    image_url: string;
    image_preview_url: NullableString;
    image_thumbnail_url: NullableString;
    image_original_url: NullableString;
    animation_url: NullableString;
    animation_original_url: NullableString;
    name: string
    description: NullableString;
    external_link: NullableString
    asset_contract: OpenSeaNftContract;
    permalink: string;
    collection: OpenSeaNftCollection;
    decimals: number;
    token_metadata: string
    is_nsfw: boolean;
    owner: OpenSeaAccountInformation;
    sell_orders: any;
    creator: OpenSeaAccountInformation;
    traits: OpenSeaNftTraits[];
    last_sale: null | OpenSeaSaleInformation;
    top_bid: any;
    listing_date: any;
    is_presale: boolean;
    transfer_fee_payment_token: any;
    transfer_fee: any;
    related_assets: any[];
    orders: any;
    auctions: any[];
    supports_wyvern: boolean;
    top_ownerships: OpenSeaOwnership[];
    ownership: any;
    highest_buyer_commitment: any;
    token_id: string
}

export interface OpenSeaAssetEvent {
    asset: OpenSeaAsset;
    asset_bundle: NullableString;
    event_type: 'transfer' | string;
    event_timestamp: string;
    auction_type: NullableString;
    total_price: NullableString;
    payment_token: null | OpenSeaPaymentToken;
    transaction: OpenSeaTransaction;
    created_date: string;
    quantity: string;
    approved_account: null | OpenSeaAccountInformation;
    bid_amount: any;
    collection_slug: string;
    contract_address: string;
    custom_event_name: any;
    dev_fee_payment_event: any;
    dev_seller_fee_basis_points: any;
    duration: any;
    ending_price: any;
    from_account: null | OpenSeaAccountInformation;
    id: number;
    is_private: any;
    owner_account: null | OpenSeaAccountInformation;
    seller: null | OpenSeaAccountInformation;
    starting_price: NullableString;
    to_account: null | OpenSeaAccountInformation;
    winner_account: null | OpenSeaAccountInformation;
    listing_time: NullableString
}

export interface OpenSeaAssetEventApiResponse {
    next: any;
    previous: any;
    asset_events: OpenSeaAssetEvent[]
}
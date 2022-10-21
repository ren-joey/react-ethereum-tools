import Web3 from 'web3';
import { getUuid } from '../../utils';

interface Props {
    account: string;
    message: string;
    password?: string;
    web3?: any;
}

const sendSignatureRequest = ({
    account,
    message,
    web3,
    password = getUuid()
}: Props) => {
    if (!web3) web3 = new Web3(window.ethereum);

    return web3.eth.personal.sign(message, account, password);
};

export default sendSignatureRequest;
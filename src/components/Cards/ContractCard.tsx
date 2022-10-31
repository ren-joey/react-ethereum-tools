import Web3 from 'web3';
import CardTemplate from '../Shared/CardTemplate';

const ContractCard = ({ web3 }: { web3: Web3 }) => {
    return (
        <CardTemplate
            headLabel="Contract Call"
            title="Dark Betamon"
            subtitle="call by web3.0"
            Content={
                <div>
                    123
                </div>
            }
        />
    );
};

export default ContractCard;
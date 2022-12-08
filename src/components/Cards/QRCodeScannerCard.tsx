import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import QRCodeReader from '../QRCodeReader/QRCodeReader';
import CardTemplate from '../Shared/CardTemplate';

const QRCodeScannerCard = () => {
    const [token, setToken] = useState('');
    const [showScanner, setShowScanner] = useState(false);

    return (
        <CardTemplate
            headLabel="front-end tool"
            title="QRCode Scanner"
            subtitle="by html5-qrcode"
            Content={
                <>
                    { token && (
                        <TextField
                            id="outlined-basic"
                            label="Token"
                            size="small"
                            variant="outlined"
                            value={token}
                            style={{ marginBottom: '0.5rem' }}
                        />
                    )}

                    { showScanner ? (
                        <QRCodeReader
                            onResult={(res) => {
                                setToken(res);
                                setShowScanner(false);
                            }}
                        />
                    ) : (
                        <div>
                            <Button
                                variant="contained"
                                onClick={() => setShowScanner(true)}
                            >
                                Scan
                            </Button>
                        </div>
                    )}
                </>
            }
        />
    );
};

export default QRCodeScannerCard;
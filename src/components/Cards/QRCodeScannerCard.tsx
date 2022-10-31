import { Button, TextField, Typography } from '@mui/material';
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';
import { Html5QrcodeResult } from 'html5-qrcode/esm/core';
import { useEffect, useRef, useState } from 'react';
import { QrReader } from 'react-qr-reader';
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
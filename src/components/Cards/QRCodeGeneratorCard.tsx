import CardTemplate from '../Shared/CardTemplate';
import whiteBg_200 from '../../assets/images/200x200_white.png';
import { AwesomeQR, QRErrorCorrectLevel } from 'awesome-qr';
import downloadURI from '../../utils/network/downloadURI';
import { Button, Checkbox, FormControlLabel, FormGroup, Slider, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { blobDownloader, BlobRequestParam, zipDownloader } from './QRCodeRetrieverCard';

const QRCodeGeneratorCard = () => {
    const [text, setText] = useState('https://www.vbc-labs.com/ttf-game');
    const [logoStatus, setLogoStatus] = useState(false);
    const [size, setSize] = useState(1);
    const [imageUrl, setImageUrl] = useState('');

    const getQrcodeLocalURL = (dataString: string) => new Promise<string>((res, rej) => {
        const scale = size / 100 * 0.4;

        new AwesomeQR({
            ...{
                text: dataString,
                size: 500
            },
            ...logoStatus ? {
                logoImage: whiteBg_200,
                // logoMargin: size,
                logoScale: scale,
                logoCornerRadius: 0,
                whiteMargin: true,
                correctLevel: size > 50 ? QRErrorCorrectLevel.H : QRErrorCorrectLevel.M
            } : {}
        }).draw().then((dataURL) => {
            if (dataURL) {
                res(dataURL.toString());
            }
            rej();
        });
    });

    const renderer = () => {
        const dataStrList = text.split('\n');
        if (dataStrList.length === 1) {
            getQrcodeLocalURL(dataStrList[0]).then((url) => {
                downloadURI(url, 'qrcode.png');
            });
        } else {
            const promises: Promise<string>[] = [];
            for (let i = 0; i < dataStrList.length; i++) {
                const dataStr = dataStrList[i];
                promises.push(getQrcodeLocalURL(dataStr));
            }

            Promise.all(promises).then((urlList) => {
                const blobRequestParam: BlobRequestParam[] = [];

                for (let i = 0; i < urlList.length; i++) {
                    const url = urlList[i];
                    blobRequestParam.push({
                        filename: `${i+1}.png`,
                        url
                    });
                }

                blobDownloader(blobRequestParam).then((blobParam) => {
                    zipDownloader(blobParam);
                });
            });
        }
    };

    useEffect(() => {
        const dataStrList = text.split('\n');
        if (dataStrList.length >= 1) {
            getQrcodeLocalURL(dataStrList[0]).then((url) => {
                setImageUrl(url);
            });
        }
    }, [text, size, logoStatus]);

    return (
        <CardTemplate
            headLabel="QRCode"
            title="QRCode Generator"
            subtitle="Awesome-qr.js"
            Content={
                <div>
                    <FormGroup>
                        <TextField
                            label="資料內容(多筆請用ENTER換行)"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            size="small"
                            multiline
                        />
                    </FormGroup>

                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={(e) => setLogoStatus(e.target.checked)}
                                />
                            }
                            label="Logo"
                        />
                    </FormGroup>

                    {
                        logoStatus && (
                            <FormGroup>
                                <Typography gutterBottom>Logo 大小調整</Typography>
                                <Slider
                                    defaultValue={0}
                                    aria-label="Default"
                                    valueLabelDisplay="auto"
                                    min={1}
                                    max={100}
                                    onChange={(e, v) => setSize(Number(v))}
                                />
                            </FormGroup>
                        )
                    }

                    <img
                        src={imageUrl}
                        width="100%"
                        height="auto"
                        alt="qrcode"
                    />

                    <Button
                        variant="contained"
                        onClick={() => renderer()}
                        disabled={text.length === 0}
                    >
                        { text.split('\n').length > 1 ? `下載 ZIP (${text.split('\n').length})` : '下載 PNG' }
                    </Button>
                </div>
            }
        />
    );
};

export default QRCodeGeneratorCard;
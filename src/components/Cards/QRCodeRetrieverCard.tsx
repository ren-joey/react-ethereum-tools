import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import downloadURI from '../../utils/network/downloadURI';
import CardTemplate from '../Shared/CardTemplate';
import JSZIP from 'jszip';

const url = 'https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=';

export interface BlobRequestParam {
    url: string;
    filename: string;
}

export interface BlobParam {
    filename: string;
    blob: Blob
}

export const blobDownloader = (
    blobRequestParam: BlobRequestParam[]
) => new Promise<BlobParam[]>((resolve) => {
    const promises: Promise<BlobParam>[] = [];
    for (let i = 0; i < blobRequestParam.length; i++) {
        const req = blobRequestParam[i];
        promises.push(new Promise<BlobParam>((res) => {
            fetch(req.url)
                .then((res) => res.blob())
                .then((blob) => res({
                    blob,
                    filename: req.filename
                }));
        }));
    }

    Promise.all(promises).then((res) => resolve(res));
});

export const zipDownloader = (
    blobParam: BlobParam[]
) => {
    const jszip = new JSZIP();

    for (let i = 0; i < blobParam.length; i++) {
        const blobParamEach = blobParam[i];
        jszip.file(blobParamEach.filename, blobParamEach.blob);
    }
    jszip.generateAsync({ type: 'blob' }).then((blob) => {
        const href = URL.createObjectURL(blob);
        downloadURI(href, '1.zip');
    });
};

const QRCodeRetrieverCard = () => {
    const [dataString, setDataString] = useState<string[]>([]);

    const getImages = () => {
        const blobRequestParam: BlobRequestParam[] = [];
        for (let i = 0; i < dataString.length; i++) {
            blobRequestParam.push({
                filename: `${i + 1}.png`,
                url: `${url}${dataString[i]}`
            });
        }
        blobDownloader(blobRequestParam).then((res) => {
            zipDownloader(res);
        });
    };

    return (
        <CardTemplate
            headLabel="QRCode API"
            title="QRCode Image Retriever"
            subtitle="https://goqr.me/api/"
            Content={
                <>
                    <div>
                        <TextField
                            id="outlined-textarea"
                            label="Data string"
                            placeholder="Placeholder"
                            size="small"
                            onChange={(e) => {
                                setDataString(
                                    e.target.value
                                        ? e.target.value.split('\n')
                                        : []
                                );
                            }}
                            multiline
                        />
                    </div>

                    <br />

                    <Button
                        variant="contained"
                        disabled={dataString.length === 0}
                        onClick={() => getImages()}
                    >
                        Get Images
                    </Button>
                </>
            }
        />
    );
};

export default QRCodeRetrieverCard;
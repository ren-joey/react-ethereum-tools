import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import downloadURI from '../../utils/network/downloadURI';
import CardTemplate from '../Shared/CardTemplate';
import JSZIP from 'jszip';

const url = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=';

interface BlobRequestParam {
    url: string;
    filename: string;
}

interface BlobParam {
    filename: string;
    blob: Blob
}

const blobDownloader = (
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

const zipDownloader = (
    blobParam: BlobParam[]
) => {
    const jszip = new JSZIP();

    for (let i = 0; i < blobParam.length; i++) {
        const blobParamEach = blobParam[i];
        jszip.file(blobParamEach.filename, blobParamEach.blob);
    }
    jszip.generateAsync({ type: 'blob' }).then((blob) => {

    });
};

const QRCodeRetrieverCard = () => {
    const [dataString, setDataString] = useState<string[]>([]);

    const getImages = () => {
        const blobRequestParam: BlobRequestParam[] = [];
        for (let i = 0; i < dataString.length; i++) {
            blobRequestParam.push({
                filename: `${i}.json`,
                url: `${url}${dataString[i]}`
            });
        }
        blobDownloader(blobRequestParam).then((res) => {
            console.log(res);
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
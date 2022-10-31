import { useRef } from 'react';
import { Result } from '@zxing/library';
import { QrReader } from 'react-qr-reader';

const QRCodeReader = ({ onResult }: { onResult: (res: string) => void }) => {
    const lastResult = useRef('');

    const onReadResult = (
        result: Result | undefined | null,
        error: Error | undefined | null
    ) => {
        if (!result) return;

        // This callback will keep existing even after
        // this component is unmounted
        // So ignore it (only in this reference) if result keeps repeating
        if (lastResult.current === result.getText()) {
            return;
        }

        lastResult.current = result.getText();
        onResult(result.getText());
    };

    return (
        <QrReader
            onResult={onReadResult}
            constraints={{ facingMode: 'user' }}
        />
    );
};

export default QRCodeReader;
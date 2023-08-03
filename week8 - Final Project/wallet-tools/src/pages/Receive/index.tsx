import { useState, useCallback, useEffect } from 'react';
import { toDataURL } from 'qrcode';
import { useMetamaskStore } from '../../store/metamask';

import Sidebar from '../../components/Sidebar';

import { Container, Section, QRCode } from './style';

function Receive() {
  const { account } = useMetamaskStore();
  const [qrCode, setQrCode] = useState<string>('');

  useEffect(() => {
    const opts = {
      errorCorrectionLevel: 'H',
      type: 'image/jpeg',
      color: {
        dark: '#0177FB',
      },
    };

    if (account !== '') {
      toDataURL(account, opts).then((code) => {
        setQrCode(code);
      });
    }
  }, [account]);

  return (
    <>
      <Container>
        <Sidebar />
        <Section>
          <h1>Scan QR Code</h1>
          <p>Scan this wallet to make the payment</p>
          {qrCode && <QRCode src={qrCode} />}
        </Section>
      </Container>
    </>
  );
}

export default Receive;

import { useNavigate } from 'react-router-dom';
import { QRCode, message } from 'antd';

import { useMetamaskStore } from '../../store/metamask';
import { FiCopy } from 'react-icons/fi';

import Sidebar from '../../components/Sidebar';

import { Container, Section, Headline, CopyPast, Line } from './style';
import { useEffect } from 'react';

function Receive() {
  const { account, requestAccounts } = useMetamaskStore();
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();

  const confirmMessage = () => {
    navigator.clipboard.writeText(account);
    messageApi.open({
      type: 'success',
      content: 'Your address has been copied',
      style: {
        marginLeft: '80vw',
        marginRight: 10,
      },
    });
  };

  useEffect(() => {
    if (!account) {
      navigate('/');
    }
  }, [account]);

  useEffect(() => {
    if (!account) {
      requestAccounts();
    }
  }, []);

  return (
    <>
      {contextHolder}
      <Container>
        <Sidebar />
        <Section>
          <Headline>
            <h1>Scan QR Code</h1>
            <p>Scan this wallet to make the payment</p>
          </Headline>
          <QRCode
            value={account || ' '}
            style={{
              marginTop: 70,
              border: '4px solid #0177FB ',
              borderRadius: 20,
              maxWidth: '100%',
            }}
            size={300}
          />
          <div style={{ marginTop: 70, maxWidth: '100%' }}>
            <Line>
              <div />
              <p>or copy the wallet manually</p>
              <div />
            </Line>
            <CopyPast>
              <input readOnly={true} type='text' value={account} />
              <button onClick={() => confirmMessage()}>
                <FiCopy size={20} />
              </button>
            </CopyPast>
          </div>
        </Section>
      </Container>
    </>
  );
}

export default Receive;

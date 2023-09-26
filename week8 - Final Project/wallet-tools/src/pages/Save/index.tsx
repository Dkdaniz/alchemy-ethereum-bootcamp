import Sidebar from '../../components/Sidebar';

import {
  Container,
  Section,
  Title,
  Line,
  Header,
  Body,
  Register,
  Input,
} from './style';

export default function Save() {
  return (
    <>
      <Container>
        <Sidebar />
        <Section>
          <Header>
            <Title>
              <p>Save</p>
            </Title>
            <Line>
              <div />
            </Line>
          </Header>
          <Body>
            <Register>
              <p>Register new wallet</p>
              <Input />
            </Register>
          </Body>
        </Section>
      </Container>
    </>
  );
}

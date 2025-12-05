import { Card, Divider, Typography } from 'antd';

import { LoginForm } from '@features/auth/login-form';

import './LoginPage.scss';

const { Title } = Typography;

export const LoginPage = () => (
  <main className="login-page">
    <section className="login-page__inner">
      <Card className="login-page__card" variant="borderless">
        <Title level={3} className="login-page__title">
          THE LAST OF GUSS
        </Title>

        <Divider className="login-page__divider" />

        <LoginForm />
      </Card>
    </section>
  </main>
);

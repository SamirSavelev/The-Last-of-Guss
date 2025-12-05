import { useState } from 'react';
import { Alert, Button, Form, Input, Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import { useLoginMutation } from '@shared/api/hooks/useAuth';
import type { ApiError } from '@shared/api/axiosClient';

import './LoginForm.scss';

const { Text } = Typography;

interface LoginFormValues {
  username: string;
  password: string;
}

export const LoginForm = () => {
  const [form] = Form.useForm<LoginFormValues>();
  const navigate = useNavigate();
  const { mutateAsync: login, isPending } = useLoginMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFinish = async (values: LoginFormValues) => {
    setErrorMessage(null);

    try {
      await login(values);
      navigate('/rounds');
    } catch (error: unknown) {
      const apiError = error as ApiError;
      const message =
        apiError.response?.data?.message ??
        'Не удалось войти. Проверьте имя и пароль.';
      setErrorMessage(message);
    }
  };

  return (
    <Space orientation="vertical" size="large" className="login-form">
      <Form<LoginFormValues>
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        autoComplete="off"
        className="login-form__form"
      >
        <Form.Item
          label={<Text className="login-form__label">Имя пользователя:</Text>}
          name="username"
          rules={[{ required: true, message: 'Введите имя пользователя' }]}
        >
          <Input
            size="large"
            className="login-form__input"
            autoComplete="off"
          />
        </Form.Item>

        <Form.Item
          label={<Text className="login-form__label">Пароль:</Text>}
          name="password"
          rules={[{ required: true, message: 'Введите пароль' }]}
        >
          <Input.Password
            size="large"
            className="login-form__input"
            autoComplete="off"
          />
        </Form.Item>

        <Form.Item className="login-form__actions">
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={isPending}
            className="login-form__submit"
          >
            Войти
          </Button>
        </Form.Item>
      </Form>

      {errorMessage && (
        <Alert
          type="error"
          title={errorMessage}
          showIcon
          className="login-form__alert"
        />
      )}
    </Space>
  );
};

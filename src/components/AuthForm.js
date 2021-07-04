import { Card, Form, Input, Button } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import sibDevLogo from '../resources/sibdev-logo.png'

const AuthForm = () => {
  const [form] = useForm()

  const onFinish = (values) => {
    console.log(values)
  }

  const cardHead = (
    <>
      <div className="card__pretitle">
        <img src={sibDevLogo} alt="" />
      </div>
      Вход
    </>
  )

  return (
    <Card title={cardHead} className="form form-auth">
      <Form form={form} layout={'vertical'} onFinish={onFinish} requiredMark={false}>
        <Form.Item
          name="login"
          label="Логин"
          rules={[{ required: true, message: 'Необходимо указать логин' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Пароль"
          rules={[{ required: true, message: 'Необходимо указать пароль' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default AuthForm

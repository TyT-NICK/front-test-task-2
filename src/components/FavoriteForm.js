import { Card, Form, Input, Button, Select, Slider, Row, Col, InputNumber } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useMemo, useState } from 'react'

const { Option } = Select

const FavoriteForm = (props) => {
  const { type } = props
  const formTitle = useMemo(() => {
    if (!type) return ''
    return type.charAt(0).toUpperCase() + type.slice(1), [type]
  }, [type])

  const [form] = useForm()
  const [maxResultsValue, setMaxResultsValue] = useState(12)

  const onFinish = (values) => {
    console.log(values)
  }

  const onMaxResultsChange = (value) => {
    setMaxResultsValue(value)
  }

  return (
    <Card title={`${formTitle} запрос`} className="form form-favorite">
      <Form form={form} layout={'vertical'} onFinish={onFinish}>
        <Form.Item name="searchString" label="Запрос">
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          label="Название"
          rules={[{ required: true, message: 'Необходимо указать название' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="order" label="Сортировать по">
          <Select defaultValue="relevance">
            <Option value="relevance">Релевантности</Option>
            <Option value="date">Дате</Option>
            <Option value="title">Наименованию</Option>
            <Option value="rating">Рейтингу</Option>
            <Option value="viewCount">Числу просмотров</Option>
          </Select>
        </Form.Item>
        <Form.Item name="maxResults" label="Максимальное количество">
          <Row gutter={16}>
            <Col flex="4">
              <Slider
                defaultValue={12}
                min={1}
                max={50}
                step={1}
                onChange={onMaxResultsChange}
                value={typeof maxResultsValue === 'number' ? maxResultsValue : 0}
              />
            </Col>
            <Col flex="1">
              <InputNumber min={1} max={50} value={maxResultsValue} onChange={onMaxResultsChange} />
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {formTitle}
          </Button>
          <Button htmlType="button">Отмена</Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default FavoriteForm

import { Form, Input, Select, Slider, Row, Col, InputNumber } from 'antd'
import { useState } from 'react'

const { Option } = Select

const FavoriteForm = ({ onChange, form }) => {
  const [maxResultsValue, setMaxResultsValue] = useState(form.getFieldValue('maxResults'))

  const onFinish = (values) => {
    console.log(values)
  }

  const onMaxResultsChange = (value) => {
    setMaxResultsValue(value)
    onChange({ ...form.getFieldsValue(), maxResults: value })
  }

  const valuesChangeHandler = (_, allValues) => {
    onChange(allValues)
  }

  return (
    <Form
      form={form}
      className="form form-favorite"
      layout={'vertical'}
      onFinish={onFinish}
      onValuesChange={valuesChangeHandler}
    >
      <Form.Item name="searchString" label="Запрос">
        <Input />
      </Form.Item>
      <Form.Item
        name="title"
        label="Название"
        rules={[{ required: true, message: 'Необходимо указать название' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="order" label="Сортировать по">
        <Select>
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
      {/* <Form.Item>
          <Button type="primary" htmlType="submit">
            {formTitle}
          </Button>
          <Button htmlType="button">Отмена</Button>
        </Form.Item> */}
    </Form>
    // <Card title={`${formTitle} запрос`} >
    // </Card>
  )
}

export default FavoriteForm

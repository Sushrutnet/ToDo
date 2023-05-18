const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  const { title } = JSON.parse(event.body);

  const params = {
    TableName: process.env.TODO_TABLE,
    Item: {
      id: uuidv4(),
      title,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  };

  try {
    await dynamoDb.put(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create Todo item' }),
    };
  }
};

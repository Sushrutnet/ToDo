const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  const { id } = event.pathParameters;
  const { title } = JSON.parse(event.body);

  const params = {
    TableName: process.env.TODO_TABLE,
    Key: { id },
    UpdateExpression: 'SET title = :title, updatedAt = :updatedAt',
    ExpressionAttributeValues: {
      ':title': title,
      ':updatedAt': Date.now(),
    },
    ReturnValues: 'ALL_NEW',
  };

  try {
    const result = await dynamoDb.update(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to update Todo item' }),
    };
  }
};

// import { Request, Response, NextFunction } from 'express';
const StructuredError = require( '../errors/StructuredError');

const fieldCheck = (requestedFields) => (
  req, res, next
) => {
  const { body } = req;
  const isMissingField = requestedFields.some((field) => !body[field]);
  if (isMissingField) {
    throw new StructeredError('Missing field', 400);
  }
  next();
};

module.exports = fieldCheck;
